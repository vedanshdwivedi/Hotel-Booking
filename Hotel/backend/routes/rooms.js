const express = require("express");
const roomController = require("../controller/room");
const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

router.post("/:hotelId", verifyAdmin, roomController.createRoom);
router.put("/:id", verifyAdmin, roomController.updateRoom);
router.delete("/:hotelId/:id", verifyAdmin, roomController.deleteRoom);
router.get("/:id", roomController.getRoomlById);
router.get("/", roomController.getAllRooms);

module.exports = router;
