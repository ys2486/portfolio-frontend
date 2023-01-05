import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginSlice from '../features/login/loginSlice';
import taskSlice from '../features/task/taskSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    task: taskSlice,
    login: loginSlice,
  },
  //A non-serializable value was detected対策
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActionPaths: ['payload'], // action.payload に対しては serializableCheck しない
  //     },
  //   }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
