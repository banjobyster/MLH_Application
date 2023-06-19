import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  workspaces: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.workspaces = [];
    },
    setWorkspaces: (state, action) => {
      state.workspaces = action.payload;
    }
  },
});

export const { setLogin, setLogout, setWorkspaces } = authSlice.actions;
export default authSlice.reducer;
