import React, { useState } from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import classes from "./PuzzleHintsContainer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function SimplePopover(props) {
  const open = Boolean(props.show);
  const id = open ? "simple-popover" : undefined;
  let hint = "";

  //const [hint, setHint] = useState(null)

  const disableClickClosing = (e) => {
    e.stopPropagation();
  };

  // useEffect(() => {
  //   console.log("definitions");
  //   // Zaktualizuj tytuł dokumentu korzystając z interfejsu API przeglądarki
  // }, [props.definitions]);
  console.log(props.definitions);
  if (props.definitions) {
    if (props.definitions.length > 0) {
      hint = props.definitions[props.hintIndex];

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
    //setHint(hint)
  } else {
    hint = "No hints available ;<";
  }


  return (
    <Popover
      id={id}
      open={open}
      anchorEl={props.anchorE1}
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
        className={classes.PuzzleHintsContainer}
        onMouseLeave={props.onAway}
        onClick={disableClickClosing}
      >
        <span className={classes.HintControlsBox}>
          <button
            className={classes.NavArrow}
            disabled={props.hintIndex === 0}
            onClick={props.previousHintHandler}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className={classes.NavArrow}
            disabled={props.hintIndex === props.hintsNum - 1}
            onClick={props.nextHintHandler}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </span>

        <span className={classes.HintText}>{hint}</span>
      </Typography>
    </Popover>
  );
}
