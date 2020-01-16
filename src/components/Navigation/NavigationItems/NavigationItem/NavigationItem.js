import React from "react";
import classes from "./NavigationItem.module.css";

const NavigationItem = props => {
  return (
    <li className={classes.NavigationItem}>
      <p></p>
      {props.children}
    </li>
  );
};

export default NavigationItem;
