import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import LanguageSelector from "../../LanguageSelector/LanguageSelector";
import ReactHover from 'react-hover';
import GameSelector from "../GameSelector/GameSelector";
import optionsCursorHover from '../../../componentOptions/ReactHoverOptions'
import HighScore from "../../Highscore/Highscore";

const NavigationItems = props => {
  return (
    <div className={classes.NavigationItems}>
      <LanguageSelector countryID="gb" clicked={props.changeLang} />
      <LanguageSelector countryID="pl" clicked={props.changeLang} />
      <LanguageSelector countryID="de" clicked={props.changeLang} />
      
      <div className={classes.GameSelector}>
        <ReactHover options={optionsCursorHover}>
          <ReactHover.Trigger type='trigger' >
            <NavigationItem>GAME</NavigationItem>
          </ReactHover.Trigger>
          <ReactHover.Hover type='hover'>
            <GameSelector />
          </ReactHover.Hover>
        </ReactHover>
      </div>

      <div className={classes.HighScore}>
      <ReactHover options={optionsCursorHover}>
          <ReactHover.Trigger type='trigger' >
          <NavigationItem>HIGHSCORE</NavigationItem>
          </ReactHover.Trigger>
          <ReactHover.Hover type='hover'>
            <HighScore score={props.score} />
          </ReactHover.Hover>
        </ReactHover>
      </div>
    </div>
  );
};

export default NavigationItems;
