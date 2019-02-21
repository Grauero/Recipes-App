const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { SECRET } = require('../config/keys');

function createToken({ username, email }, secret, expiresIn) {
  return jwt.sign({ username, email }, secret, { expiresIn });
}

const Mutation = {
  async addRecipe(
    root,
    { name, imageUrl, description, category, instructions, username },
    { Recipe }
  ) {
    return new Recipe({
      name,
      imageUrl,
      description,
      category,
      instructions,
      username
    }).save();
  },
  async deleteUserRecipe(root, { _id }, { Recipe }) {
    return Recipe.findOneAndRemove({ _id });
  },
  async likeRecipe(root, { _id, username }, { Recipe, User }) {
    const recipe = await Recipe.findOneAndUpdate({ _id }, { $inc: { likes: 1 } });
    await User.findOneAndUpdate({ username }, { $addToSet: { favorites: _id } });

    return recipe;
  },
  async unlikeRecipe(root, { _id, username }, { Recipe, User }) {
    const recipe = await Recipe.findOneAndUpdate({ _id }, { $inc: { likes: -1 } });
    await User.findOneAndUpdate({ username }, { $pull: { favorites: _id } });

    return recipe;
  },
  async signinUser(root, { username, password }, { User }) {
    const user = await User.findOne({ username });
    if (!user) throw new Error('User not found');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error('Invalid password');

    return { token: createToken(user, SECRET, '1hr') };
  },
  async signupUser(root, { username, email, password }, { User }) {
    const user = await User.findOne({ username });
    if (user) throw new Error('User already exists');

    const newUser = await new User({
      username,
      email,
      password
    }).save();

    return { token: createToken(newUser, SECRET, '1hr') };
  }
};

module.exports = Mutation;
