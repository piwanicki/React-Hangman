import React from "react";
import classes from "./GameLink.module.css";

const GameLink = props => {
  return (
    <div className={classes.GameLink}>
      <img src={props.icon} alt={props.iconAlt} className={classes.Icon} />
      <a href={props.to} rel="noopener noreferrer" target="_blank">
        {props.linkInfo}
      </a>
    </div>
  );
};

export default GameLink;
