import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import withSession from '../utils/withSession';
import { LIKE_RECIPE } from '../../queries';

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

  handleClick = (likeRecipe) => {
    this.setState(
      prevState => ({
        liked: !prevState.liked
      }),
      () => this.handleLike(likeRecipe)
    );
  };

  handleLike = async (likeRecipe) => {
    // like
    if (this.state.liked) {
      await likeRecipe();
      await this.props.refetch();
    }

    // unlike
  };

  render() {
    const { username, liked } = this.state;
    const { _id } = this.props;

    return (
      <Mutation mutation={LIKE_RECIPE} variables={{ _id, username }}>
        {likeRecipe =>
          username && (
            <button type="button" onCLick={() => this.handleClick(likeRecipe)}>
              {liked ? 'Liked' : 'Like'}
            </button>
          )
        }
      </Mutation>
    );
  }
}

LikeRecipe.propTypes = {
  session: PropTypes.shape({
    getCurrentUser: PropTypes.shape({
      username: PropTypes.string.isRequired,
      favorites: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
  }).isRequired,
  _id: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired
};

export default withSession(LikeRecipe);
