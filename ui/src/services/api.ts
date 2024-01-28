// src/services/api.ts

import axios from "axios";
import { ReactNode } from "react";


export interface User {
  gender: string;
  email: ReactNode;
  name: {
    title: string;
    first: string;
    last: string;
  };
  picture: any;
  // Define your user type based on the API response
  // ...

  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
}

interface ApiResponse {
  results: User[];
}

const API_URL = "https://randomuser.me/api/";

export const fetchUsers = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get(API_URL + "?results=100");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchUser = async (uuid: string): Promise<User> => {
  try {
    const response = await axios.get(`${API_URL}?uuid=${uuid}`);
    return response.data.results[0];
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
