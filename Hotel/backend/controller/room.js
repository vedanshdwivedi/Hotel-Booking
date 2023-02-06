const { HotelModel } = require("../model/Hotel");
const { roomModel } = require("../model/Room");

const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new roomModel(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await HotelModel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;

  try {
    await roomModel.findByIdAndDelete(req.params.id);
    try {
      await HotelModel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted");
  } catch (err) {
    next(err);
  }
};

const getRoomlById = async (req, res, next) => {
  const roomId = req.params.id;

  try {
    const room = await roomModel.findById(roomId);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await roomModel.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

const updateRoom = async (req, res, next) => {
  const roomId = req.params.id;

  try {
    const updatedRoom = await roomModel.findByIdAndUpdate(
      roomId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateRoom);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRoom,
  deleteRoom,
  getRoomlById,
  getAllRooms,
  updateRoom,
};
