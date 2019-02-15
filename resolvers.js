const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { SECRET } = require('./config/keys');

function createToken({ username, email }, secret, expiresIn) {
  return jwt.sign({ username, email }, secret, { expiresIn });
}

exports.resolvers = {
  Query: {
    async getAllRecipes(root, args, { Recipe }) {
      return Recipe.find().sort({ createdDate: 'desc' });
    },
    async getRecipe(root, { _id }, { Recipe }) {
      return Recipe.findOne({ _id });
    },
    async getCurrentUser(root, args, { currentUser, User }) {
      if (!currentUser) return null;

      const user = await User.findOne({ username: currentUser.username }).populate({
        path: 'favorites',
        model: 'Recipe'
      });

      return user;
    }
  },
  Mutation: {
    async addRecipe(root, { name, description, category, instructions, username }, { Recipe }) {
      return new Recipe({
        name,
        description,
        category,
        instructions,
        username
      }).save();
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
  }
};
