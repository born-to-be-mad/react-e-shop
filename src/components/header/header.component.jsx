import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdownContainer from "../cart-dropdown/cart-dropdown.container";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from "./header.styles";

const Header = ({ currentUser, hidden }) => {
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="/shop">SHOP</OptionLink>
        <OptionLink to="/contact">CONTACT</OptionLink>
        {currentUser ? (
          //<OptionDiv onClick={() => auth.signOut()}>Sign-out</OptionDiv>
          <OptionLink as="div" onClick={() => auth.signOut()}>
            Sign-out
          </OptionLink>
        ) : (
          <OptionLink to="/sign-in">Sign-in</OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
      {hidden ? null : <CartDropdownContainer />}
    </HeaderContainer>
  );
};

//standard version
//const mapStateToProps = state => ({
//  currentUser: selectCurrentUser(state),
//  hidden: selectCartHidden(state)
//});
// more readable form
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
