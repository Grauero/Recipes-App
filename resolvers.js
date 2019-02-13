const jwt = require('jsonwebtoken');
const { SECRET } = require('./config/keys');

function createToken({ username, email }, secret, expiresIn) {
  return jwt.sign({ username, email }, secret, { expiresIn });
}

exports.resolvers = {
  Query: {
    async getAllRecipes(root, args, { Recipe }) {
      return Recipe.find();
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
    async signupUser(root, { username, email, password }, { User }) {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error('User already exists');
      }

      const newUser = await new User({
        username,
        email,
        password
      }).save();

      return { token: createToken(newUser, SECRET, '1hr') };
    }
  }
};
