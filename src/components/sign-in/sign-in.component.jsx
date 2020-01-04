import React from "react";

import "./sign-in.styles.scss";

import FormInput from "../form-input/form-input.component";

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {}

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      email: "",
      password: ""
    });
  };

  handleChange = event => {
    //hanndles both fielsd(email and password)
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign-in with e-mail and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            label="E-mail"
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            required
          />
          <input type="submit" value="Submit form" />
        </form>
      </div>
    );
  }
}

export default SignIn;
