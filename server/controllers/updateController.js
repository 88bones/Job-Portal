const UserModel = require("../models/userModel");
// const RecruiterModel = require("../models/userModel");

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    res.json(updatedUser);
  } catch (err) {
    res.json(err);
  }
};

module.exports = { updateUser };
