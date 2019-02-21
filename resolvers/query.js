const Query = {
  async getAllRecipes(root, args, { Recipe }) {
    return Recipe.find().sort({ createdDate: 'desc' });
  },
  async getRecipe(root, { _id }, { Recipe }) {
    return Recipe.findOne({ _id });
  },
  async searchRecipes(root, { searchTerm }, { Recipe }) {
    if (searchTerm) {
      return Recipe.find(
        {
          $text: { $search: searchTerm }
        },
        {
          score: { $meta: 'textScore' }
        }
      ).sort({
        score: { $meta: 'textScore' }
      });
    }

    return Recipe.find().sort({
      likes: 'desc',
      createdDate: 'desc'
    });
  },
  async getUserRecipes(root, { username }, { Recipe }) {
    return Recipe.find({ username }).sort({ createdDate: 'desc' });
  },
  async getCurrentUser(root, args, { currentUser, User }) {
    if (!currentUser) return null;

    const user = await User.findOne({ username: currentUser.username }).populate({
      path: 'favorites',
      model: 'Recipe'
    });

    return user;
  }
};

module.exports = Query;
