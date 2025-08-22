const UserModel = require("../models/userModel");
const RecruiterModel = require("../models/recruiterModel");
const jwtGenerator = require("../utils/jwtGenerator");

const verifyOtp = async (req, res) => {
  try {
    const { email, otp, role } = req.body;

    // choose the correct model based on role
    const Model = role === "recruiter" ? RecruiterModel : UserModel;

    const account = await Model.findOne({ email });

    if (!account) return res.status(404).json({ message: `${role} not found` });

    if (account.isVerified) {
      return res.status(400).json({ message: "Already verified" });
    }

    if (account.otp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // mark verified
    account.isVerified = true;
    account.otp = null;
    account.otpExpires = null;
    await account.save();

    // issue JWT
    const token = jwtGenerator(account._id);

    res.json({
      success: true,
      message: `${role} account created!`,
      token,
      user: {
        id: account._id,
        fullname: account.fullname,
        email: account.email,
        address: account.address,
        phone: account.phone,
        role: account.role,
      },
    });
  } catch (err) {
    console.error("Error in verifyOtp:", err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { verifyOtp };
