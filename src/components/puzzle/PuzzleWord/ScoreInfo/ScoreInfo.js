import React from "react";
import classes from "./ScoreInfo.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { connect } from "react-redux";
import { textContent } from "../../../../textContent/textContent";

const scoreInfo = (props) => {
  const scoreArr = props.highscores;
  const scores = scoreArr.map((el) => el.score);
  let trophyIconClass;
  const text = textContent[props.lang];

  if (scoreArr.length > 0) {
    if (props.scoreStrike >= scores[2] && props.scoreStrike < scores[1]) {
      trophyIconClass = classes.TrophyPlace3;
    } else if (
      props.scoreStrike >= scores[1] &&
      props.scoreStrike < scores[0]
    ) {
      trophyIconClass = classes.TrophyPlace2;
    } else if (props.scoreStrike >= scores[0]) {
      trophyIconClass = classes.TrophyPlace1;
    } 
  } else {
    trophyIconClass = classes.TrophyPlace1;
  }

  const scoreInfoDivClass = !props.darkMode ? [classes.ScoreInfo,classes.lightMode].join(' ') : classes.ScoreInfo;
  

  return (
    <ReactCSSTransitionGroup
      transitionName="fade"
      transitionEnterTimeout={2000}
      transitionLeaveTimeout={1500}
    >
      <div className={scoreInfoDivClass}>
        <p>
          {text.yourScore} :
          <span className={classes.BoldText}>
            {props.scoreStrike}
          </span>
          <br />
          {text.keepGoing}
        </p>
        {text.place} :
        <FontAwesomeIcon
          icon={faTrophy}
          className={[classes.TrophyIcon,trophyIconClass].join(' ')}
        />
      </div>
    </ReactCSSTransitionGroup>
  );
};

const mapPropsToState = (state) => {
  return {
    darkMode: state.darkMode,
    highscores: state.highscores,
    lang: state.lang,
  };
};

export default connect(mapPropsToState, null)(scoreInfo);
