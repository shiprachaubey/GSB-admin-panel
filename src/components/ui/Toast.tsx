import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType) => {
    const newToast: Toast = {
      id: Math.random().toString(36).substring(2, 9),
      message,
      type,
    };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {createPortal(
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
          {toasts.map(toast => (
            <ToastItem 
              key={toast.id} 
              toast={toast} 
              onClose={() => removeToast(toast.id)} 
            />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

const ToastItem: React.FC<{ 
  toast: Toast;
  onClose: () => void;
}> = ({ toast, onClose }) => {
  const { type, message } = toast;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const baseClasses = "px-4 py-3 rounded-md shadow-md flex items-center justify-between min-w-[300px]";
  
  const typeClasses = {
    success: "bg-green-100 text-green-800 border-l-4 border-green-600",
    error: "bg-red-100 text-red-800 border-l-4 border-red-600",
    warning: "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-600",
    info: "bg-blue-100 text-blue-800 border-l-4 border-blue-600",
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]} animate-slide-in`}>
      <span>{message}</span>
      <button 
        onClick={onClose}
        className="ml-4 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastContainer: React.FC = () => {
  return <ToastProvider>{null}</ToastProvider>;
};