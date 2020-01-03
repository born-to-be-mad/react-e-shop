import React from "react";

import "./menu-item.styles.scss";

const MenuItem = ({ title, imageUrl, size }) => {
  const SHOP_BUTTON = "SHOP NOW";
  return (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
      className={`${size} menu-item`}
    >
      <div className="content">
        <h1 className="title">{title}</h1>
        <span className="subtitle">{SHOP_BUTTON}</span>
      </div>
    </div>
  );
};

export default MenuItem;
