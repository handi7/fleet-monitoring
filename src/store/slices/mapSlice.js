import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "maps",
  initialState: { isLoaded: false },
  reducers: {
    setLoaded: (state) => {
      state.isLoaded = true;
    },
  },
});

export const { setLoaded } = mapSlice.actions;
export default mapSlice;
