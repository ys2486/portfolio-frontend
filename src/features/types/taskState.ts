export type taskState = {
  tasks: {
    id: number;
    name: string;
    completed: boolean;
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
