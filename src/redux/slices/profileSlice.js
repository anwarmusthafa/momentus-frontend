// slices/profileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    userLogin(state, action) {
      state.profile = action.payload;
    },
    userLogout(state) {
      state.profile = null;
    },
  },
});

export const { userLogin, userLogout } = profileSlice.actions;

export default profileSlice.reducer;
