const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// Utility: sanitize user data for response
const sanitizeUser = (user) => ({
  id: user._id,
  userName: user.userName,
  email: user.email,
  role: user.role,
  regNo: user.regNo,
});

// POST /register (only students can self-register)
const registerUser = async (req, res) => {
  const { userName, email, password, regNo } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        success: false,
        message: "Email already in use. Please try logging in.",
      });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      role: "student", // Only students can self-register
      regNo,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Registration successful!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error during registration.",
    });
  }
};

// POST /login (using regNo + password instead of email)
const loginUser = async (req, res) => {
  const { regNo, password } = req.body;

  try {
    const user = await User.findOne({ regNo });
    if (!user)
      return res.status(401).json({
        success: false,
        message: "No account found with this registration number.",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({
        success: false,
        message: "Invalid password.",
      });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        userName: user.userName,
        regNo: user.regNo,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful!",
        user: sanitizeUser(user),
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error during login.",
    });
  }
};

// POST /logout
const logOut = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logout successful!",
  });
};

// Middleware to protect routes (sets req.user if verified)
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Please login.",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token invalid or expired.",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logOut,
  authMiddleware,
};
