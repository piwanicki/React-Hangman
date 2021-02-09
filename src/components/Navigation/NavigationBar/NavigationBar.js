import React from "react";
import {connect} from "react-redux";
import "./NavigationBar.scss";
import {FormControlLabel, Switch} from "@material-ui/core";
import MobileMenuBtn from "./MobileMenuBtn";
import {TOGGLE_DARKMODE} from "../../../actions/setStyleMode";
import {withStyles} from "@material-ui/core/styles";
import LangSelector from "../../../UI/LangSelector/LangSelector";
import {textContent} from '../../../textContent/textContent';

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
        <span>{textContent[props.lang].light}</span>
        <FormControlLabel
          control={
            <IOSSwitch
              checked={props.darkMode}
              onChange={props.toggleDarkMode}
              name="darkMode"
            />
          }
        />
        <span>{textContent[props.lang].dark}</span>
      </div>
      <LangSelector>
      </LangSelector>
      <MobileMenuBtn clicked={props.showSideMenu} />
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    darkMode: state.darkMode,
    lang: state.lang
  };
};

const mapDistpatchToProps = (dispatch) => {
  return {
    toggleDarkMode: () => dispatch({type: TOGGLE_DARKMODE}),
  };
};

export default connect(mapStateToProps, mapDistpatchToProps)(NavigationBar);
