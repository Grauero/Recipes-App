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
    }
  }
};
