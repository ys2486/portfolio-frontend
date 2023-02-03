import Task from '../task/Task';

export const HomeRoutes = [
  {
    path: '/tasks',
    children: <Task />,
  },
];
