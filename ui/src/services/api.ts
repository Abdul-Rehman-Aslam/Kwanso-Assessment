import axios from 'axios';
import { User, UserList } from '../types/users';

const API_URL = 'https://randomuser.me/api/';

export const fetchUsers = async (): Promise<UserList> => {
  try {
    const response = await axios.get(API_URL + '?results=100');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUser = async (uuid: string): Promise<User> => {
  try {
    const response = await axios.get(`${API_URL}?uuid=${uuid}`);
    return response.data.results[0];
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
