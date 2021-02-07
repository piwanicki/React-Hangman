import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {faTimesCircle} from "@fortawesome/free-regular-svg-icons";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";
import {faLinkedin, faGithub} from "@fortawesome/free-brands-svg-icons";
import {textContent} from '../../../textContent/textContent';
import {connect} from "react-redux";
import "./Footer.scss";

const Footer = (props) => {
  const text = textContent[props.lang]
  return (
    <div className="footer">
      <Navbar variant="dark">
        <Nav activeKey={props.active}>
          <Nav.Link href="/">
            <FontAwesomeIcon icon={faHome} />
            <span id="nav-home">{text.portfolio}</span>
          </Nav.Link>
          <Nav.Link
            href="https://kolkoikrzyzyk.000webhostapp.com/"
            target="_blank"
            rel="norefferer"
          >
            <FontAwesomeIcon icon={faTimesCircle} />
            <span id="nav-projects">{text.ticTacToe}</span>
          </Nav.Link>
          <Nav.Link
            href="https://github.com/piwanicki/"
            className="github-link"
          >
            <FontAwesomeIcon icon={faGithub} />
            <span id="nav-github">{text.github}</span>
          </Nav.Link>
          <Nav.Link
            href="https://www.linkedin.com/in/paweliwanicki92/"
            target="_blank"
            rel="norefferer"
            className="linkedin-link"
          >
            <FontAwesomeIcon icon={faLinkedin} />
            <span id="nav-linkedin">Linkedin</span>
          </Nav.Link>
          <Nav.Link onClick={() => props.setContactModalShow()}>
            <FontAwesomeIcon icon={faEnvelope} />
            <span id="nav-contact">{text.contact}</span>
          </Nav.Link>
        </Nav>
      </Navbar>
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
    setContactModalShow: () => dispatch({ type: 'SHOW_MAIL_DIALOG' }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
