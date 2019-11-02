import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import LanguageSelector from "../../LanguageSelector/LanguageSelector";

const NavigationItems = props => {
  return (
    <div className={classes.NavigationItems}>
      <LanguageSelector countryID="gb" clicked={props.changeLang} />
      <LanguageSelector countryID="pl" clicked={props.changeLang} />
      <LanguageSelector countryID="de" clicked={props.changeLang} />
      <NavigationItem>GAME</NavigationItem>
      <NavigationItem>HIGHSCORE</NavigationItem>
    </div>
  );
};

export default NavigationItems;
