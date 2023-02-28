import Task from '../task/Task';

// ログイン後にヘッダーとともに表示したい画面を記述
export const HomeRoutes = [
  {
    path: '/tasks',
    children: <Task />,
  },
];
