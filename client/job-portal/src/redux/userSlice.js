import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullname: localStorage.getItem("fullname") || "",
  role: localStorage.getItem("role") || "",
  loggedIn: !!localStorage.getItem("fullname"),
  _id: localStorage.getItem("_id") || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      const { fullname, role, _id } = action.payload;
      state.fullname = fullname;
      state.role = role;
      state._id = _id;
      state.loggedIn = true;

      localStorage.setItem("fullname", fullname);
      localStorage.setItem("role", role);
      localStorage.setItem("_id", _id);
    },
    logout(state) {
      state.fullname = "";
      state.role = "";
      state._id = "";
      state.loggedIn = false;

      localStorage.clear();
    },
    updateFullname(state, action) {
      state.fullname = action.payload;
      localStorage.setItem("fullname", action.payload);
    },
    updateRole(state, action) {
      state.role = action.payload;
      localStorage.setItem("role", action.payload);
    },
  },
});

export const { login, logout, updateFullname, updateRole } = userSlice.actions;
export default userSlice.reducer;
