import React, { Component } from "react";
import classes from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faHome,
  faChevronUp,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import hangmanLogo from "../../../assets/img/hangTransparent.png";
import ticTacToeLogo from "../../../assets/img/tictactoe-icon2.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Footer extends Component {
  state = {
    mobileFooterShow: false
  };

  openFooterHandler = () => {
    const footerShow = this.state.mobileFooterShow;
    this.setState({ mobileFooterShow: !footerShow });
  };

  render() {
    const footerArrowIcon = !this.state.mobileFooterShow
      ? faChevronUp
      : faChevronDown;
    const classesFooterCont = !this.state.mobileFooterShow
      ? classes.FooterContainer
      : [classes.FooterContainer, classes.Open].join(" ");

    const footer = (
      <footer className={classes.Footer}>
        <span className={classes.YandexAdnotation}>Powered by Yandex API</span>
        <div className={classes.InfoSection}>
          <h4>Info</h4>
          <ul>
            <li className={classes.GitIcon}>
              <a
                href="https://github.com/piwanicki/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} /> <p>Github</p>
              </a>
            </li>
            <li
              className={classes.ContactIcon}
              onClick={this.props.showMailDialog}
            >
              <FontAwesomeIcon icon={faEnvelope} /> <p>Contact Me</p>
            </li>
          </ul>
        </div>
        <div className={classes.QuickNav}>
          <h4>Quick Nav</h4>
          <ul>
            <li>
              <a
                href="http://paweliwanickiportfolio.dx.am/pl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faHome} /> <p>Home</p>
              </a>
            </li>
            <li>
              <div>
                {/* <Link to="/tictactoe"> */}
                <a
                  href="http://kolkoikrzyzyk.000webhostapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={ticTacToeLogo} alt="tictactoe logo" />
                  <p>TicTacToe</p>
                  {/* </Link> */}
                </a>
              </div>
            </li>
            {/* <li>
              <Link to="/">
                <img src={hangmanLogo} alt="hangman logo" /> <p>Hangman</p>
              </Link>
            </li> */}
          </ul>
        </div>
      </footer>
    );

    return (
      <div className={classesFooterCont}>
        <div className={classes.FooterArrowCont}>
          <FontAwesomeIcon
            icon={footerArrowIcon}
            className={classes.OpenFooter}
            onClick={this.openFooterHandler}
          />
        </div>
        {footer}
      </div>
    );
  }
}

// export default Footer;

const mapDispatchToProps = dispatch => {
  return {
    showMailDialog: () => dispatch({ type: "SHOW_MAIL_DIALOG" })
  };
};

export default connect(null, mapDispatchToProps)(Footer);
