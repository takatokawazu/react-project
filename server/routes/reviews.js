const { body } = require('express-validator');
const router = require('express').Router();
const requestErrorHandler = require('../helpers/helper');
const { registerReview, deleteReview } = require('../controllers/review');

router.post(
  '/:id',
  body('rating')
    .notEmpty()
    .isInt({ min: 1, max: 5 })
    .withMessage('評価を入力してください。'),
  body('body').notEmpty().withMessage('コメントを書いてください。'),
  requestErrorHandler(registerReview)
);

router.delete('/:id/:reviewId', requestErrorHandler(deleteReview));

module.exports = router;
