import React from "react";

import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText
} from "./error-boundary.styles";

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      errorOccured: false
    };
  }

  //this method is called during the “render” phase, so side-effects are not permitted.
  //For those use cases, use componentDidCatch() instead.
  static getDerivedStateFromError(error) {
    //process the error
    return { errorOccured: true };
  }

  componentDidCatch(error, info) {
    //logging or sending information about the error

    console.log(error);
  }

  render() {
    if (this.state.errorOccured) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl="/misc/client_error.png"></ErrorImageContainer>
          <ErrorImageText>Sorry this page is broken</ErrorImageText>
        </ErrorImageOverlay>
      );
    }
    //if no error, we render the children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
