import axios from "axios"; // no need for node_modules path

export const deleteUser = async (id, role) => {
  try {
    const res = await axios.delete(
      `http://localhost:3001/api/users/deleteUser/${id}/${role}`
    );
    return res.data; // { message: "Deleted successfully" }
  } catch (err) {
    return {
      error:
        err.response?.data?.message ||
        "Something went wrong while deleting user",
    };
  }
};
