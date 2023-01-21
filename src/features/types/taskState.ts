export type taskState = {
  tasks: {
    id: number;
    name: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    createdUser: string;
  }[];
  editedTask: {
    id: number;
    name: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    createdUser: string;
  };
  selectedTask: {
    id: number;
    name: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    createdUser: string;
  };
};
