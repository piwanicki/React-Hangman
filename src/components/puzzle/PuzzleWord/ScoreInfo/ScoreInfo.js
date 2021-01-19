import React from "react";
import classes from "./ScoreInfo.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrophy} from "@fortawesome/free-solid-svg-icons";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {connect} from "react-redux";

const scoreInfo = (props) => {
  const scoreArr = props.highscores;
  const scores = scoreArr.map((el) => el.score);
  let trophyColor;
  if (scoreArr.length > 0) {
    if (props.scoreStrike >= scores[2] && props.scoreStrike < scores[1]) {
      trophyColor = "#a5682a";
    } else if (
      props.scoreStrike >= scores[1] &&
      props.scoreStrike < scores[0]
    ) {
      trophyColor = "#c0c0c0";
    } else if (props.scoreStrike >= scores[0]) {
      trophyColor = "#ffbf00";
    } else {
      trophyColor = "#ffffff00";
    }
  } else {
    trophyColor = "#ffbf00";
  }

  return (
    <ReactCSSTransitionGroup
      transitionName="fade"
      transitionEnterTimeout={2000}
      transitionLeaveTimeout={1500}
    >
      <div className={classes.ScoreInfo}>
        <p>
          Your score :
          <span style={{fontWeight: "bold", fontSize: "1.05em"}}>
            {props.scoreStrike}
          </span>
          <br></br>Keep going!
        </p>
        Place :
        <FontAwesomeIcon
          icon={faTrophy}
          style={{fontSize: "20px", color: trophyColor}}
        />
      </div>
    </ReactCSSTransitionGroup>
  );
};

const mapPropsToState = (state) => {
  return {
    highscores: state.highscores,
  };
};

export default connect(mapPropsToState, null)(scoreInfo);
