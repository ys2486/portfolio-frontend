import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../stores/store';

//バナータイプ
type AlertColor = 'success' | 'info' | 'warning' | 'error';

//バナーの型
type bannerType = {
  bannerIsopen: boolean;
  bannerType: AlertColor;
  bannerMessage: String;
};

//initialState
const initialState: bannerType = {
  bannerIsopen: false,
  bannerType: 'success',
  bannerMessage: '',
};

const bannerSlice = createSlice({
  name: 'banner',
  initialState: initialState,
  reducers: {
    editBannerIsopen(state, action) {
      state.bannerIsopen = action.payload;
    },
    editBanner(state, action) {
      state.bannerIsopen = action.payload.bannerIsopen;
      state.bannerType = action.payload.bannerType;
      state.bannerMessage = action.payload.bannerMessage;
    },
  },
});

export const { editBannerIsopen, editBanner } = bannerSlice.actions;
export const selectBannerIsopen = (state: RootState) =>
  state.banner.bannerIsopen;
export const selectBannerType = (state: RootState) => state.banner.bannerType;
export const selectBannerMessage = (state: RootState) =>
  state.banner.bannerMessage;

export default bannerSlice.reducer;
