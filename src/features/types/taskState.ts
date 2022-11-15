export type taskState = {
  tasks: {
    id: number;
    name: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
  editedTask: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  selectedTask: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
};
