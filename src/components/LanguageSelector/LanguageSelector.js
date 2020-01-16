import React from "react";
import classes from "./LanguageSelector.module.css";
import { connect } from "react-redux";

const LanguageSelector = props => {
  const countryID = `https://www.countryflags.io/${props.countryID}/shiny/64.png`;
  const validLang = props.countryID === "gb" ? "en" : props.countryID;

  return (
    <div
      className={classes.LanguageSelector}
      onClick={() => props.changeLang(validLang)}
    >
      <img
        src={countryID}
        id={props.validLang}
        alt={validLang}
        className={classes.FlagImg}
      ></img>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    lang: state.lang
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeLang: lang => dispatch({ type: "CHANGE_LANGUAGE", lang: lang })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelector);
