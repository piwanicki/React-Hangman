import React from "react";
import classes from "./PuzzleControls.module.scss";
import PuzzleHint from "../PuzzleWord/PuzzleHint";
import {connect} from "react-redux";
import {LightTooltip, HintTooltip} from "../PuzzleWord/HintTooltip/HintTooltip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestion} from "@fortawesome/free-solid-svg-icons";

const PuzzleControls = (props) => {
  let downloadBtnString = "Nowe Hasło";
  if (props.lang === "en") {
    downloadBtnString = "New Word";
  }
  if (props.lang === "de") {
    downloadBtnString = "Neues Wort";
  }

  const canUsehint = true;
  const toolTipTitle = canUsehint
    ? "Use hint? You'll loose one chance."
    : "You can't use more hint.";

  const useHintBtn = (
    <FontAwesomeIcon
      icon={faQuestion}
      //onClick={this.props.hintUsed}
      className={classes.UseHint}
    />
  );

  return (
    <div className={classes.PuzzleControls}>
      <PuzzleHint
      // word={this.state.wordEng}
      // hintUsed={this.hintUsedHandler}
      // canUseHint={this.state.canUseHint}
      />

      <div className={classes.newWordBtn} onClick={props.getWord}>
        {downloadBtnString}
      </div>

      <LightTooltip
        title={toolTipTitle}
        placement="right-end"
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
    // score: state.score
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showHighscoreDialog: () => dispatch({type: "SHOW_HIGHSCORE_DIALOG"}),
    // updateScore: () => dispatch({type: 'UPDATE_SCORE'})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PuzzleControls);
