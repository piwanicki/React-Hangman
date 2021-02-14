import React from 'react';
import classes from "./TextPopupInfo.module.scss";
import { connect } from "react-redux";

const TextPopupInfo = (props) => {
  const show = props.show;

  return (
    show ? <div className={classes.TextInfo}>
      {props.children}
    </div> : null
  );
};

const mapStateToProps = (state) => {
  return {
    darkMode: state.darkMode,
    lang: state.lang,
  };
};

export default connect(mapStateToProps, null)(TextPopupInfo);
