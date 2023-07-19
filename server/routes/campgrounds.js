const { body } = require('express-validator');
const router = require('express').Router();
const requestErrorHandler = require('../helpers/helper');
const {
  getAllCamps,
  registerCamp,
  updateCamp,
  deleteCamp,
  getCampById,
} = require('../controllers/campground');

router.get('/', requestErrorHandler(getAllCamps));

router.delete('/:id', requestErrorHandler(deleteCamp));

router.get('/:id', requestErrorHandler(getCampById));

router.post(
  '/',
  body('title').notEmpty().withMessage('タイトルを入力してください。'),
  body('image').notEmpty(),
  body('price').notEmpty().isInt(),
  body('description').notEmpty(),
  body('location').notEmpty(),
  requestErrorHandler(registerCamp)
);

router.put(
  '/:id/edit',
  body('title')
    .optional()
    .notEmpty()
    .withMessage('タイトルを入力してください。'),
  body('image').optional().notEmpty(),
  body('price').optional().notEmpty().isInt(),
  body('description').optional().notEmpty(),
  body('location').optional().notEmpty(),
  requestErrorHandler(updateCamp)
);

router.use((err, req, res, next) => {
  res.status(500).json('問題が起きました。');
});

module.exports = router;
