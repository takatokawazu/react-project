const { validationResult } = require('express-validator');
const Campground = require('../models/campground');

const getAllCamps = async (req, res, next) => {
  const campgrounds = await Campground.find().sort({ updatedAt: -1 });
  res.status(200).json(campgrounds);
};

const registerCamp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array()[0]);
  }

  const campground = new Campground(req.body);
  await campground.save();
  res.status(201).json(campground);
};

const updateCamp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors.array());
  const { id } = req.params;
  const campgroud = await Campground.findByIdAndUpdate(id, { ...req.body });
  if (campgroud === null) return res.status(404).send('Book Not Found');
  return res.json(campgroud);
};

const deleteCamp = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndDelete(id);

  if (campground === null) return res.status(404).send('Campground Not Found');

  res.json({ msg: 'Delete succeeded.' });
};

const getCampById = async (req, res, next) => {
  const campground = await Campground.findById(req.params.id).populate(
    'reviews'
  );
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
