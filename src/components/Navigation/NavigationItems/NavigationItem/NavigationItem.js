import React from "react";
import classes from "./NavigationItem.module.css";

const NavigationItem = props => {
  return (
    <li className={classes.NavigationItem}>
      <a href="/"></a>
      {props.children}
    </li>
  );
};

export default NavigationItem;
