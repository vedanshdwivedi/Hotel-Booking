const express = require("express");
const hotelController = require("../controller/hotel");

const { createError } = require("../utils/error");
const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

router.post("/", verifyAdmin, hotelController.createHotel);
router.put("/:id", verifyAdmin, hotelController.updateHotel);
router.delete("/:id", verifyAdmin, hotelController.deleteHotel);
router.get("/find/:id", hotelController.getHotelById);
router.get("/find", hotelController.getAllHotels);
router.get("/countByCity", hotelController.countByCity);
router.get("/countByType", hotelController.countByType);

module.exports = router;
