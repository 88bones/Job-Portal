const UserModel = require("../models/userModel");
const jwtGenerator = require("../utils/jwtGenerator");

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified) {
      return res.status(400).json({ message: "Already verified" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // mark verified
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    // now issue token
    const token = jwtGenerator(user._id);

    res.json({
      success: true,
      message: "Account created!",
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        address: user.address,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { verifyOtp };
