import { ReactNode } from 'react';

export interface User {
  uuid: string;
  gender: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  email: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  id: {
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  location: {
    coordinates: {
      longitude: string;
      latitude: string;
    };
  };
  phone: string;
  dob: {
    date: string;
    age: number;
  };
}

export interface UserList extends User {
  results: User[];
}
