import React, { useState } from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { signUpStart } from "../../redux/user/user.actions";

import "./sign-up.styles.scss";

const SignUp = ({ signUpStart }) => {
  const [userCredentials, setCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    signUpStart({ displayName, email, password });
  };

  const handleChange = event => {
    //handles both fielsd(email and password)
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-up">
      <h2 className="title">I do not have an account</h2>
      <span>Sign-up with your e-mail and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          label="Dislay name"
          name="displayName"
          type="displayName"
          value={displayName}
          handleChange={handleChange}
          required
        />
        <FormInput
          label="E-mail"
          name="email"
          type="email"
          value={email}
          handleChange={handleChange}
          required
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          required
        />
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          handleChange={handleChange}
          required
        />
        <div className="buttons">
          <CustomButton type="submit">Sign-up</CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);
