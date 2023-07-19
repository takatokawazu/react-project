const router = require('express').Router();
const passport = require('passport');
const { registerUser, loginUser } = require('../controllers/user');

router.post('/register', registerUser);

router.post(
  '/login',
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
  }),
  loginUser
);

module.exports = router;
