import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import Error from '../error/Error';
import { SIGNIN_USER } from '../../queries';

const initialState = {
  username: '',
  password: ''
};

class Signin extends Component {
  state = { ...initialState };

  clearState = () => this.setState({ ...initialState });

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e, signinUser) => {
    e.preventDefault();

    const { data } = await signinUser();
    localStorage.setItem('token', data.signinUser.token);
    await this.props.refetch();

    this.clearState();
    this.props.history.push('/');
  };

  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;

    return isInvalid;
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="App">
        <h2 className="App">Signin</h2>
        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
          {(signinUser, { loading, error }) => (
            <form className="form" onSubmit={e => this.handleSubmit(e, signinUser)}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={this.handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}
              />

              <button
                type="submit"
                disabled={loading || this.validateForm()}
                className="button-primary"
              >
                Submit
              </button>

              {error && <Error error={error} />}
            </form>
          )}
        </Mutation>
      </div>
    );
  }
}

Signin.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  refetch: PropTypes.func.isRequired
};

export default withRouter(Signin);
