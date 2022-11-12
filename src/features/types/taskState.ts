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
    title: string;
    created_at: string;
    updated_at: string;
  };
  selectedTask: {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
  };
};
