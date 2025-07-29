const express = require("express");
const router = express.Router();
const Admin = require("../model/AdminSchema");
const Student = require("../model/StudentSchema");
const { fetchUser } = require("../middleware/FetchUser");

// GET /api/profile/me - fetch profile for logged-in user (admin or student)
router.get("/me", fetchUser, async (req, res) => {
  try {
    let user;
    if (req.user.role === "admin") {
      user = await Admin.findById(req.user.id).select("-password");
    } else {
      user = await Student.findById(req.user.id).select("-password").populate("course", "name");
    }
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch profile.");
  }
});

// 🖼️ Set avatar (after file uploaded via /upload)
router.put("/update-avatar", fetchUser, async (req, res) => {
  try {
    const { avatar } = req.body;
    if (!avatar) return res.status(400).send("No avatar URL provided.");
    let user;
    if (req.user.role === "admin") {
      user = await Admin.findByIdAndUpdate(
        req.user.id,
        { avatar },
        { new: true }
      );
    } else {
      user = await Student.findByIdAndUpdate(
        req.user.id,
        { avatar },
        { new: true }
      );
    }
    res.json({ avatar: user.avatar });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update avatar.");
  }
});

// 🗑️ Delete avatar
router.delete("/delete-avatar", fetchUser, async (req, res) => {
  try {
    let user;
    if (req.user.role === "admin") {
      user = await Admin.findByIdAndUpdate(
        req.user.id,
        { avatar: null },
        { new: true }
      );
    } else {
      user = await Student.findByIdAndUpdate(
        req.user.id,
        { avatar: null },
        { new: true }
      );
    }
    res.json({ avatar: null });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to delete avatar.");
  }
});

// 📝 Update full profile
router.put("/update-profile", fetchUser, async (req, res) => {
  try {
    let updatedUser;
    if (req.user.role === "admin") {
      updatedUser = await Admin.findByIdAndUpdate(
        req.user.id,
        req.body,
        { new: true }
      ).select("-password");
    } else {
      updatedUser = await Student.findByIdAndUpdate(
        req.user.id,
        req.body,
        { new: true }
      ).select("-password");
    }
    res.json({ updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update profile.");
  }
});

module.exports = router;
