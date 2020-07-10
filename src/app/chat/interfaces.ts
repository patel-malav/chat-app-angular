export interface User {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  image?: string;
  age?: number;
}

export interface UserMessages {
  id: string;
  name: string;
  email: string;
  messages: Message[];
  image?: string;
  age?: number;
  createdAt: string;
  updatedAt: string;
}

export enum Sender {
  user = 'user',
  admin = 'admin',
}

export interface Message {
  deleted?: boolean;
  sender?: Sender;
  message: string;
  createdAt?: string;
  updatedAt?: string;
  id?: string;
}
