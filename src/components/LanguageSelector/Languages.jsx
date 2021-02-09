import React from "react";
import {connect} from "react-redux";
import './Languages.scss';
import en from "./images/en.png";
import pl from "./images/pl.png";
import de from "./images/de.png";

const icons = {
  pl: pl,
  en: en,
  de: de,
};

const Languages = (props) => {
  const langSelectHandler = (e) => {
    const lang = e.target.dataset.lang;
    if(lang !== undefined) {
      props.changeLanguage(lang);
    }
  };

  return (
    <div className="LanguageBox">
      {Object.keys(icons).map((langID) => {
        const icon = icons[langID];
        return (
          <div className="LangBtn" onClick={langSelectHandler} key={langID}>
            <img src={icon} alt={props.lang} data-lang={langID} />
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    lang: state.lang,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (lang) => dispatch({type: "CHANGE_LANGUAGE", lang: lang}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Languages);
