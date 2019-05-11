const getAllRecipes = async (root, args, { Recipe }) => {
  return Recipe.find().sort({ createdDate: 'desc' });
};

const getRecipe = async (root, { _id }, { Recipe }) => {
  return Recipe.findOne({ _id });
};

const searchRecipes = async (root, { searchTerm }, { Recipe }) => {
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
};

const getUserRecipes = async (root, { username }, { Recipe }) => {
  return Recipe.find({ username }).sort({ createdDate: 'desc' });
};

const getCurrentUser = async (root, args, { currentUser, User }) => {
  if (!currentUser) return null;

  const user = await User.findOne({ username: currentUser.username }).populate({
    path: 'favorites',
    model: 'Recipe'
  });

  return user;
};

module.exports = {
  getAllRecipes,
  getRecipe,
  searchRecipes,
  getUserRecipes,
  getCurrentUser
};
