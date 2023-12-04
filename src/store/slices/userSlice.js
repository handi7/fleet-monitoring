import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {
      id: null,
      name: null,
      email: null,
      verified_at: null,
      created_at: null,
      updated_at: null,
    },
  },
  reducers: {
    setUser: (state, action) => {
      const id = action?.payload?.id;
      const name = action?.payload?.name;
      const email = action?.payload?.email;
      const verified_at = action?.payload?.verified_at;
      const created_at = action?.payload?.created_at;
      const updated_at = action?.payload?.updated_at;
      state.data = { id, name, email, verified_at, created_at, updated_at };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice;
