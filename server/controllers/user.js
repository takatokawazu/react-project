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
  const user = new User({ username: req.body.username });
  res.status(202).json(user);
};

module.exports = { registerUser, loginUser };
