if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const campgroundRoute = require('./routes/campgrounds.js');
const reviewRoute = require('./routes/reviews.js');
const userRoute = require('./routes/users.js');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const uploadRoute = require('./routes/uploads.js');
const PORT = 8080;

const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const sessionConfig = {
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});
app.use('/api/campgrounds', campgroundRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/auth', userRoute);
app.use('/api/uploads', uploadRoute);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected!'))
  .catch((err) => {
    console.log('MongoDBコネクションエラー');
    console.log(err);
  });

app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: '予期せぬエラーが発生しました。' });
});

app.listen(PORT, () => console.log(`ポートで${PORT}リクエスト待受中`));
