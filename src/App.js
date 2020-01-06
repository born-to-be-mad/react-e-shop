import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/header/header.component";
import SignInSignUpPage from "./pages/sign-in-sign-up/sign-in-sign-up-page.component";
import HomePage from "./pages/home/home-page.component";
import ShopPage from "./pages/shop/shop-page.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }
  unsubscribeFromAuth = null;

  componentDidMount() {
    //sunscribe and save the subscrioption to the variable
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        console.dir(userRef);
        userRef.onSnapshot(userSnapShot => {
          this.setState(
            {
              currentUser: {
                id: userSnapShot.id,
                ...userSnapShot.data() //firebase snapshot data
              }
            },
            () => {
              const { currentUser } = this.state;
              console.log(
                currentUser.displayName +
                  "(" +
                  currentUser.email +
                  ") is logged-in"
              );
            }
          );
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    //close subscription
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/sign-in" component={SignInSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
