import React, { Component } from "react";
import classes from "./PuzzleHint.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faChevronRight,
  faChevronLeft,
  faKeyboard,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PuzzleHintsContainer from "./PuzzleHIntsContainer";

import { connect } from "react-redux";

class PuzzleHint extends Component {
  state = {
    definitions: this.props.definitions,
    hintIndex: 0,
    hintsShow: false,
    showVirtualKeyboard: false,
  };

  showVirtualKeyboard = () => {
    const visible = this.state.showVirtualKeyboard;
    this.setState({ showVirtualKeyboard: !visible });
  };


  nextHint = () => {
    const currentIndex = this.state.hintIndex;
    this.setState({ hintIndex: currentIndex + 1 });
  };

  previousHint = () => {
    const currentIndex = this.state.hintIndex;
    this.setState({ hintIndex: currentIndex - 1 });
  };


  showHintsBox = (event) => {
    this.setState({ hintsShow: true, anchorE1: event.currentTarget });
  };

  hideHintsBox = () => {
    this.setState({ hintsShow: false, anchorE1: null });
  };

  render() {
    const index = this.state.hintIndex;
    return (
      <div className={classes.PuzzleHintContainer}>
        <FontAwesomeIcon
          icon={faKeyboard}
          onClick={this.props.showVirtualKeyboard}
          className={classes.VirtualKeyboard}
        />
        <FontAwesomeIcon
          icon={faInfoCircle}
          className={classes.HintIcon}
          onMouseEnter={this.showHintsBox}
        />

        <PuzzleHintsContainer
          show={this.state.hintsShow}
          anchorE1={this.state.anchorE1}
          previousHintHandler={this.previousHint}
          nextHintHandler={this.nextHint}
          definitions={this.props.definitions}
          hintIndex={this.state.hintIndex}
          onAway={this.hideHintsBox}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showVirtualKeyboard: state.showVirtualKeyboard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showVirtualKeyboard: () => dispatch({ type: "SHOW_VIRTUAL_KEYBOARD" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PuzzleHint);
