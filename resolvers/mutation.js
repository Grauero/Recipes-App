const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { SECRET } = require('../config/keys');

const createToken = ({ username, email }, secret, expiresIn) => {
  return jwt.sign({ username, email }, secret, { expiresIn });
};

const addRecipe = async (root, args, { Recipe }) => {
  const { name, imageUrl, description, category, instructions, username } = args;

  return new Recipe({
    name,
    imageUrl,
    description,
    category,
    instructions,
    username
  }).save();
};

const deleteUserRecipe = async (root, { _id }, { Recipe }) => {
  return Recipe.findOneAndRemove({ _id });
};

const updateUserRecipe = async (root, args, { Recipe }) => {
  const { _id, name, imageUrl, category, description } = args;

  return Recipe.findOneAndUpdate(
    { _id },
    { $set: { name, imageUrl, category, description } },
    { new: true }
  );
};

const likeRecipe = async (root, { _id, username }, { Recipe, User }) => {
  const recipe = await Recipe.findOneAndUpdate({ _id }, { $inc: { likes: 1 } });
  await User.findOneAndUpdate({ username }, { $addToSet: { favorites: _id } });

  return recipe;
};

const unlikeRecipe = async (root, { _id, username }, { Recipe, User }) => {
  const recipe = await Recipe.findOneAndUpdate({ _id }, { $inc: { likes: -1 } });
  await User.findOneAndUpdate({ username }, { $pull: { favorites: _id } });

  return recipe;
};

const signinUser = async (root, { username, password }, { User }) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('User not found');

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new Error('Invalid password');

  return { token: createToken(user, SECRET, '1hr') };
};

const signupUser = async (root, { username, email, password }, { User }) => {
  const user = await User.findOne({ username });
  if (user) throw new Error('User already exists');

  const newUser = await new User({
    username,
    email,
    password
  }).save();

  return { token: createToken(newUser, SECRET, '1hr') };
};

module.exports = {
  addRecipe,
  deleteUserRecipe,
  updateUserRecipe,
  likeRecipe,
  unlikeRecipe,
  signinUser,
  signupUser
};
