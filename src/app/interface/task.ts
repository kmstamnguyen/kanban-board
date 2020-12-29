import { User } from './user';
import { Board } from './board';

export interface Task {
    _id: string;
    title: string;
    status: string;
    board: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  }

export interface DetailTask {
    _id: string;
    title: string;
    status: string;
    board: Board;
    joined: User[];
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  }
