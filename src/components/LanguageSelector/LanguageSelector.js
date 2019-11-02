import React from "react";
import classes from "./LanguageSelector.module.css";

const LanguageSelector = props => {
  const countryID = `https://www.countryflags.io/${props.countryID}/shiny/64.png`;

  return (
    <div className={classes.LanguageSelector} onClick={props.clicked}>
      <img src={countryID} id={props.countryID} alt={props.countryID}></img>
    </div>
  );
};

export default LanguageSelector;
