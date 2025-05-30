// src/api/team.ts
import axios from 'axios';
import { TeamMember } from '../types';

export const getAllTeamMembers = async (): Promise<TeamMember[]> => {
  const response = await axios.get('http://localhost:9000/api/teams/all-members');
  return response.data.data;
};

export const addTeamMember = async (data: {
  fullName: string;
  email: string;
  department: string;
}): Promise<any> => {
  return await axios.post('http://localhost:9000/api/teams/add-members', data);
};

export const assignChat = async (chatId: string, memberId: string) => {
  const response = await axios.put('http://localhost:9000/api/chat/chats/assign', {
    chatId,
    memberId,
  });
  return response.data;
};