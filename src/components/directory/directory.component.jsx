import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import MenuItem from "../menu-item/menu-item.component";

import { selectDirectorySections } from "../../redux/directory/directory.selectors";

import { MenuDirectoryContainer } from "./directory.styles";

const Directory = ({ sections }) => {
  return (
    <MenuDirectoryContainer>
      {sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </MenuDirectoryContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);
