import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginSlice from '../features/auth/slice/loginSlice';
import taskSlice from '../features/task/slice/taskSlice';
import bannerSlice from '../components/banner/bannerSlice';

export const store = configureStore({
  reducer: {
    task: taskSlice,
    login: loginSlice,
    banner: bannerSlice,
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
