import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import Error from '../common/Error';
import { SIGNUP_USER } from '../../queries';

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: ''
};

class Signup extends Component {
  state = { ...initialState };

  clearState = () => this.setState({ ...initialState });

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e, signupUser) => {
    e.preventDefault();

    const { data } = await signupUser();
    localStorage.setItem('token', data.signupUser.token);
    await this.props.refetch();

    this.clearState();
    this.props.history.push('/');
  };

  validateForm = () => {
    const {
      username, email, password, passwordConfirmation
    } = this.state;
    const isInvalid = !username
      || !email
      || !password
      || !passwordConfirmation
      || password !== passwordConfirmation;

    return isInvalid;
  };

  render() {
    const {
      username, email, password, passwordConfirmation
    } = this.state;

    return (
      <div className="App">
        <h2 className="App">Signup</h2>
        <Mutation mutation={SIGNUP_USER} variables={{ username, email, password }}>
          {(signupUser, { loading, error }) => (
            <form className="form" onSubmit={e => this.handleSubmit(e, signupUser)}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={this.handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={this.handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}
              />

              <input
                type="password"
                name="passwordConfirmation"
                placeholder="Confirm Password"
                value={passwordConfirmation}
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

Signup.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  refetch: PropTypes.func.isRequired
};

export default withRouter(Signup);
export { Signup };
