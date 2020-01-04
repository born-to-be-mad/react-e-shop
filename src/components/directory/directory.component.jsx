import React from "react";

import "./directory.styles.scss";

import MenuItem from "../menu-item/menu-item.component";

import SECTIONS_DATA from "./sections.data";

class Directory extends React.Component {
  constructor() {
    super();

    this.state = {
      sections: SECTIONS_DATA
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="menu-directory">
        {this.state.sections.map(({ id, ...otherSectionProps }) => (
          <MenuItem key={id} {...otherSectionProps} />
        ))}
      </div>
    );
  }
}

export default Directory;
