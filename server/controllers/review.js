const { validationResult } = require('express-validator');
const Campground = require('../models/campground');
const Review = require('../models/review');

const registerReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array()[0]);
  }

  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body);
  if (!review.author) {
    return res.status(400).json({ msg: 'ログインしてください。' });
  }
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  return res.json(campground);
};

const deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  const { username } = req.body;
  console.log(req.body);
  const review = await Review.findById(reviewId);
  // console.log(review.author);
  console.log(username);

  try {
    if (review.author === username) {
      await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
      await Review.findByIdAndDelete(reviewId);
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
};

module.exports = { registerReview, deleteReview };
