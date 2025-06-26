const User = require('../models/User');

const getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

const updateUserRole = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.role = req.body.role;
  await user.save();
  res.json({ message: 'Role updated', user });
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  await user.remove();
  res.json({ message: 'User deleted' });
};

module.exports = { getUsers, updateUserRole, deleteUser };
