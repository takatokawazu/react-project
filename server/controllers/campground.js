const { validationResult } = require('express-validator');
const Campground = require('../models/campground');
const User = require('../models/user');

const getAllCamps = async (req, res) => {
  const campgrounds = await Campground.find().sort({ updatedAt: -1 });
  res.status(200).json(campgrounds);
};

const registerCamp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array()[0]);
  }
  const campground = new Campground(req.body);
  campground.image = req.body.image.files;
  await campground.save();
  res.status(201).json(campground);
};

const updateCamp = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors.array());
  const { id } = req.params;
  const email = req.query.email;
  const campground = await Campground.findById(id);
  const imgs = req.body.image.files;
  campground.image.push(...imgs);
  const user = await User.findOne({ email });
  if (!campground.author._id.equals(user._id)) {
    console.log('更新できない');
    return res.status(400).json('更新する権限がありません。');
  }
  const camp = await Campground.findByIdAndUpdate(id, {
    ...campground,
  });
  if (camp === null) return res.status(404).send('Book Not Found');
  return res.json(camp);
};

const deleteCamp = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndDelete(id);

  if (campground === null) return res.status(404).send('Campground Not Found');

  res.json({ msg: 'Delete succeeded.' });
};

const getCampById = async (req, res) => {
  const campground = await Campground.findById(req.params.id)
    .populate('reviews')
    .populate('author');
  if (campground === null) return res.status(404).send('Campground Not Found');
  return res.status(200).json(campground);
};

module.exports = {
  getAllCamps,
  registerCamp,
  updateCamp,
  deleteCamp,
  getCampById,
};
