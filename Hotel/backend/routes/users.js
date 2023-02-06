const express = require("express");
const userController = require("../controller/user");

const { createError } = require("../utils/error");
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utils/verifyToken");

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("Hello User, You are logged in!");
});

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send("Hello User, You are logged in and can delete this account!");
});

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.send("Hello Admin!!!");
});

router.put("/:id", verifyUser, userController.updateUser);
router.delete("/:id", verifyUser, userController.deleteUser);
router.get("/:id", verifyUser, userController.getUserById);
router.get("/", verifyAdmin, userController.getAllUsers);

module.exports = router;
