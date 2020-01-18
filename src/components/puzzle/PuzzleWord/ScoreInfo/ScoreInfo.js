import React from "react";
import classes from "./ScoreInfo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

const scoreInfo = props => {
  const scoreArr = props.highscores;
  const scores = [];
  scoreArr.forEach(el => scores.push(el.score));
  let trophyColor;
  if (scoreArr !== undefined) {
    if (props.scoreStrike > scores[2]) {
      trophyColor = "#a5682a";
    } else if (props.scoreStrike > scores[1] || (props.scoreStrike > 0 && scores.length === 1 )) {
      trophyColor = "#c0c0c0";
    } else if (props.scoreStrike > scores[0]) {
      trophyColor = "#ffbf00";
    } else {
      trophyColor = "#ffffff00";
    }
  } else {
    trophyColor = "#ffbf00";
  }

  return (
    <div className={classes.ScoreInfo}>
      <p>
        Your score :{" "}
        <span style={{ fontWeight: "bold", fontSize: "1.05em" }}>
          {props.scoreStrike}
        </span>
        <br></br>Keep going!
      </p>
      Place :
      <FontAwesomeIcon
        icon={faTrophy}
        style={{ fontSize: "20px", color: trophyColor }}
      />
    </div>
  );
};

// export default scoreInfo;

const mapPropsToState = state => {
  return {
    highscores: state.highscores
  };
};

export default connect(mapPropsToState, null)(scoreInfo);
