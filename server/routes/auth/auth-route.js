const express = require("express");
const {
  registerUser,
  loginUser,
  logOut,
  authMiddleware,
} = require("../../controllers/auth/auth-controller"); // fixed path if you're using lowercase

const router = express.Router();

// Public routes
router.post("/register", registerUser); // Only for students
router.post("/login", loginUser);

// Protected route for logging out
router.post("/logout", logOut);

// Protected route to check current user auth (useful for frontend token check)
router.get("/check-auth", authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      message: "Authenticated user!",
      user,
    });
  });

module.exports = router;
