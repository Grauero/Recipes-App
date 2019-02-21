import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import withSession from '../utils/withSession';
import { GET_RECIPE, LIKE_RECIPE, UNLIKE_RECIPE } from '../../queries';

class LikeRecipe extends Component {
  state = {
    username: '',
    liked: false
  };

  componentDidMount() {
    if (this.props.session.getCurrentUser) {
      const { username, favorites } = this.props.session.getCurrentUser;
      const { _id } = this.props;
      const prevLiked = favorites.findIndex(favorite => favorite._id === _id) > -1;

      this.setState({ username, liked: prevLiked });
    }
  }

  handleClick = (likeRecipe, unlikeRecipe) => {
    this.setState(
      prevState => ({
        liked: !prevState.liked
      }),
      () => this.handleLike(likeRecipe, unlikeRecipe)
    );
  };

  handleLike = async (likeRecipe, unlikeRecipe) => {
    // like
    if (this.state.liked) {
      await likeRecipe();
      await this.props.refetch();
    } else {
      // unlike
      await unlikeRecipe();
      await this.props.refetch();
    }
  };

  updateLike = (cache, { data: { likeRecipe } }) => {
    const { _id } = this.props;
    const { getRecipe } = cache.readQuery({ query: GET_RECIPE, variables: { _id } });

    cache.writeQuery({
      query: GET_RECIPE,
      variables: { _id },
      data: {
        getRecipe: { ...getRecipe, likes: likeRecipe.likes + 1 }
      }
    });
  };

  updateUnlike = (cache, { data: { unlikeRecipe } }) => {
    const { _id } = this.props;
    const { getRecipe } = cache.readQuery({ query: GET_RECIPE, variables: { _id } });

    cache.writeQuery({
      query: GET_RECIPE,
      variables: { _id },
      data: {
        getRecipe: { ...getRecipe, likes: unlikeRecipe.likes - 1 }
      }
    });
  };

  render() {
    const { username, liked } = this.state;
    const { _id } = this.props;

    return (
      <Mutation mutation={UNLIKE_RECIPE} variables={{ _id, username }} update={this.updateUnlike}>
        {unlikeRecipe => (
          <Mutation mutation={LIKE_RECIPE} variables={{ _id, username }} update={this.updateLike}>
            {likeRecipe =>
              username && (
                <button
                  type="button"
                  className="like-button"
                  onClick={() => this.handleClick(likeRecipe, unlikeRecipe)}
                >
                  {liked ? 'Unlike' : 'Like'}
                </button>
              )
            }
          </Mutation>
        )}
      </Mutation>
    );
  }
}

LikeRecipe.propTypes = {
  session: PropTypes.shape({
    getCurrentUser: PropTypes.shape({
      username: PropTypes.string.isRequired,
      favorites: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired
    }).isRequired
  }).isRequired,
  _id: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired
};

export default withSession(LikeRecipe);
