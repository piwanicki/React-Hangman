import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import classes from "./GuessedLetterInfo.module.scss";
import { connect } from "react-redux";
import { textContent } from '../../../../../textContent/textContent'

const GuessedLetterInfo = (props) => {
  const open = Boolean(props.show);
  const id = open ? "simple-popover" : undefined;
  const typographyClass = !props.darkMode
    ? [classes.PuzzleHintsContainer, classes.lightMode].join(" ")
    : classes.PuzzleHintsContainer;

    const text = textContent[props.lang];

  return (

      <Typography
        className={typographyClass}
        //onMouseLeave={props.onAway}
      >
       {text.typedLetterInfo} {props.letter}
      </Typography>
  );
};

const mapStateToProps = (state) => {
  return {
    darkMode: state.darkMode,
    lang: state.lang,
  };
};

export default connect(mapStateToProps, null)(GuessedLetterInfo);
