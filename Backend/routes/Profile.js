const express = require("express");
const router = express.Router();
const User = require("../model/AdminSchema"); // Use Student model if needed
const { fetchUser } = require("../middleware/FetchUser");

// 🖼️ Set avatar (after file uploaded via /upload)
router.put("/update-avatar", fetchUser, async (req, res) => {
  try {
    const { avatar } = req.body;
    if (!avatar) return res.status(400).send("No avatar URL provided.");

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar },
      { new: true }
    );
    res.json({ avatar: user.avatar });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update avatar.");
  }
});

// 🗑️ Delete avatar
router.delete("/delete-avatar", fetchUser, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: null },
      { new: true }
    );
    res.json({ avatar: null });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to delete avatar.");
  }
});

// 📝 Update full profile
router.put("/update-profile", fetchUser, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    ).select("-password");

    res.json({ updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update profile.");
  }
});

module.exports = router;
