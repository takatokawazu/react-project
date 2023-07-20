const User = require('../models/user');
const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    res.json(registeredUser);
  } catch (e) {
    res.status(400).json(e);
  }
};

const loginUser = (req, res) => {
  const user = new User({ username: req.body.username, email: req.body.email });
  res.status(202).json(user);
};

const getByEmail = async (req, res) => {
  try {
    const email = req.query.email; // クエリパラメータを取得する場合
    const user = await User.findOne({ email });
    return res.status(201).json(user);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { registerUser, loginUser, getByEmail };
