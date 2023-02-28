export type taskState = {
  tasks: {
    id: number;
    name: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    createdUser: number;
  }[];
  editedTask: {
    id: number;
    name: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    createdUser: number;
  };
  selectedTask: {
    id: number;
    name: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    createdUser: number;
  };
};
