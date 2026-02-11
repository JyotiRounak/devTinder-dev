import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: null,
  reducers: {
    getConnection: (state, action) => {
      return action.payload;
    },
    removeConnection: (state, action) => {
      return null;
    },
  },
});

export const { getConnection, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
