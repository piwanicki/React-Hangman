import React from "react";
import {connect} from "react-redux";
import "./NavigationBar.scss";
import {FormControlLabel, Switch} from "@material-ui/core";
import MobileMenuBtn from "./MobileMenuBtn";
import {TOGGLE_DARKMODE} from "../../../actions/setStyleMode";
import {withStyles} from "@material-ui/core/styles";

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({classes, ...props}) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const NavigationBar = (props) => {
  return (
    <header className="NavigationBar">
      <div>
        <span>Light</span>
        <FormControlLabel
          control={
            // <Switch
            //   size="medium"
            //   onChange={props.toggleDarkMode}
            //   checked={props.darkMode}
            // />
            <IOSSwitch
              checked={props.darkMode}
              onChange={props.toggleDarkMode}
              name="darkMode"
            />
          }
        />
        <span>Dark</span>
      </div>
      <MobileMenuBtn clicked={props.showSideMenu} />
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    darkMode: state.darkMode,
  };
};

const mapDistpatchToProps = (dispatch) => {
  return {
    toggleDarkMode: () => dispatch({type: TOGGLE_DARKMODE}),
  };
};

export default connect(mapStateToProps, mapDistpatchToProps)(NavigationBar);
