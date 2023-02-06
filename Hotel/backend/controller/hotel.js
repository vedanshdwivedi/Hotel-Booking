const { HotelModel } = require("../model/Hotel");

const createHotel = async (req, res, next) => {
  const newHotel = new HotelModel(req.body);
  newHotel.type = newHotel.type.toLowerCase();
  newHotel.city = newHotel.city.toLowerCase();
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

const updateHotel = async (req, res, next) => {
  const hotelId = req.params.id;

  try {
    const updatedHotel = await HotelModel.findByIdAndUpdate(
      hotelId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

const deleteHotel = async (req, res, next) => {
  const hotelId = req.params.id;

  try {
    await HotelModel.findByIdAndDelete(hotelId);
    res.status(200).json("Hotel has been deleted");
  } catch (err) {
    next(err);
  }
};

const getHotelById = async (req, res, next) => {
  const hotelId = req.params.id;

  try {
    const hotel = await HotelModel.findById(hotelId);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await HotelModel.find();
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return HotelModel.countDocuments({ city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

const countByType = async (req, res, next) => {
  const hotelCount = await HotelModel.countDocuments({ type: "hotel" });
  const apartmentCount = await HotelModel.countDocuments({ type: "apartment" });
  const resortCount = await HotelModel.countDocuments({ type: "resort" });
  const villaCount = await HotelModel.countDocuments({ type: "villa" });
  const cabinCount = await HotelModel.countDocuments({ type: "cabin" });
  try {
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotelById,
  getAllHotels,
  countByCity,
  countByType,
};
