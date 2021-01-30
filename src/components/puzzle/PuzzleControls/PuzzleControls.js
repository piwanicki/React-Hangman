import React from "react";
import classes from "./PuzzleControls.module.scss";
import PuzzleHint from "../PuzzleWord/PuzzleHint";
import { connect } from "react-redux";
import {
  LightTooltip,
  HintTooltip,
} from "../PuzzleWord/HintTooltip/HintTooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { textContent } from "../../../textContent/textContent";

const PuzzleControls = (props) => {
  const text = textContent[props.lang];
  const toolTipTitle =
    props.chances > 1 ? text.useHintInfo : text.cantUseMoreHint;

  const useHintBtn = (
    <FontAwesomeIcon
      icon={faQuestion}
      onClick={props.hintUsed}
      className={classes.UseHint}
    />
  );

  return (
    <div className={classes.PuzzleControls}>
      <PuzzleHint definitions={props.definitions} />

      <div className={classes.newWordBtn} onClick={props.getWord}>
        {text.newBtn}
      </div>

      <LightTooltip
        title={toolTipTitle}
        placement={"bottom"}
        className={classes.HintTooltip}
      >
        <HintTooltip>{useHintBtn}</HintTooltip>
      </LightTooltip>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    highscore: state.highscore,
    showVirtualKeyboard: state.showVirtualKeyboard,
    lang: state.lang,
    chances: state.chances,
    // score: state.score
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showHighscoreDialog: () => dispatch({ type: "SHOW_HIGHSCORE_DIALOG" }),
    // updateScore: () => dispatch({type: 'UPDATE_SCORE'})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PuzzleControls);
