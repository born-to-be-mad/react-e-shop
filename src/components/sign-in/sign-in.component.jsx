import React from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth } from "../../firebase/firebase.utils";
import { googleSignInStart } from "../../redux/user/user.actions";

import "./sign-in.styles.scss";

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {}

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        email: "",
        password: ""
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleChange = event => {
    //handles both fielsd(email and password)
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    const { googleSignInStart } = this.props;
    return (
      <div className="sign-in">
        <h2 className="title">I already have an account</h2>
        <span>Sign-in with e-mail and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            label="E-mail"
            name="email"
            type="email"
            value={email}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            value={password}
            handleChange={this.handleChange}
            required
          />
          <div className="buttons">
            <CustomButton type="submit">Sign-in</CustomButton>
            <CustomButton
              type="button"
              onClick={googleSignInStart}
              isGoogleSignIn
            >
              Sign-in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart())
});

export default connect(null, mapDispatchToProps)(SignIn);
