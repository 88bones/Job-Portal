import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullname: localStorage.getItem("fullname") || "",
  role: localStorage.getItem("role") || "",
  loggedIn: !!localStorage.getItem("fullname"),
  _id: localStorage.getItem("_id") || "",
  email: localStorage.getItem("email") | "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      const { fullname, role, _id, email } = action.payload;
      state.fullname = fullname;
      state.role = role;
      state._id = _id;
      state.email = email;
      state.loggedIn = true;

      localStorage.setItem("fullname", fullname);
      localStorage.setItem("role", role);
      localStorage.setItem("_id", _id);
      localStorage.setItem("email", email);
    },
    logout(state) {
      state.fullname = "";
      state.role = "";
      state._id = "";
      state.email = "";
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
    updateEmail(state, action) {
      state.email = action.payload;
      localStorage.setItem("email", action.payload);
    },
  },
});

export const { login, logout, updateFullname, updateRole, updateEmail } =
  userSlice.actions;
export default userSlice.reducer;
