export interface User {
  name: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Messages {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
  id: string;
}

export interface Message {
  deleted: boolean;
  message: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}
