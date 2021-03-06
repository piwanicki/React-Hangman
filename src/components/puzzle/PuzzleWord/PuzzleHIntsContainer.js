import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import classes from "./PuzzleHintsContainer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { textContent } from "../../../textContent/textContent";

const HintsPopover = (props) => {
  const open = Boolean(props.show);
  const id = open ? "simple-popover" : undefined;
  let hint = "";

  let nextHintBtnDis = false;
  let prevHintBtnDis = false;

  const disableClickClosing = (e) => {
    e.stopPropagation();
  };

  if (props.definitions) {
    if (props.definitions.length > 0) {
      hint = props.definitions[props.hintIndex];
      prevHintBtnDis = props.hintIndex === 0;
      nextHintBtnDis = props.hintIndex === props.definitions.length - 1;
      if (hint) {
        if (hint.startsWith("n")) {
          hint = hint.replace("n	", "noun / ");
        }
        if (hint.startsWith("adj")) {
          hint = hint.replace("adj	", "adjective / ");
        }
        if (hint.startsWith("v")) {
          hint = hint.replace("v	", "verb / ");
        }
      }
    }
  } else {
    hint = textContent[props.lang].noHints;
  }

  const typographyClass = !props.darkMode
    ? [classes.PuzzleHintsContainer, classes.lightMode].join(" ")
    : classes.PuzzleHintsContainer;
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={props.anchorE1}
      onClose={props.onAway}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Typography
        className={typographyClass}
        onMouseLeave={props.onAway}
        onClick={disableClickClosing}
      >
        <span className={classes.HintControlsBox}>
          <button
            className={classes.NavArrow}
            disabled={prevHintBtnDis}
            onClick={props.previousHintHandler}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className={classes.NavArrow}
            disabled={nextHintBtnDis}
            onClick={props.nextHintHandler}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </span>
        <span className={classes.HintText}>{hint}</span>
      </Typography>
    </Popover>
  );
};

const mapStateToProps = (state) => {
  return {
    darkMode: state.darkMode,
    lang: state.lang,
  };
};

export default connect(mapStateToProps, null)(HintsPopover);
