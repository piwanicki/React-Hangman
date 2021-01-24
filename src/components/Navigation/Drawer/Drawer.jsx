import React from "react";
import {Link} from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {connect} from "react-redux";
//import textContent from "../textContent/textContent"
import "./Drawer.scss";
import {faTimesCircle} from "@fortawesome/free-regular-svg-icons";
import Languages from "../../LanguageSelector/Languages";

const MobileDrawer = (props) => {
  // const text = textContent[props.lang]

  return (
    <Drawer
      anchor="right"
      open={props.open}
      onClose={() => props.toggleDrawer(false)}
    >
      <div
        className="ListContainer"
        role="presentation"
        onClick={() => props.toggleDrawer(false)}
        onKeyDown={() => props.toggleDrawer(false)}
      >
        <List>
          <Link to="/">
            <ListItem button key={"home"}>
              <ListItemIcon>
                <FontAwesomeIcon icon={faHome} />
              </ListItemIcon>
              <ListItemText primary="Portfolio" />
            </ListItem>
          </Link>
          <Divider />
          <Link to="/about">
            <ListItem button key={"about"}>
              <ListItemIcon>
                <FontAwesomeIcon icon={faTimesCircle} />
              </ListItemIcon>
              <ListItemText primary="TicTacToe" />
            </ListItem>
          </Link>
          <Divider />
          <a
            href="https://github.com/piwanicki"
            target="_blank"
            className="github"
            rel="noopener noreferrer"
          >
            <ListItem button key={"github"}>
              <ListItemIcon>
                <FontAwesomeIcon icon={faGithub} />
              </ListItemIcon>
              <ListItemText primary={"Github"} />
            </ListItem>
          </a>
          <Divider />
          <a
            href="https://www.linkedin.com/in/paweliwanicki92/"
            target="_blank"
            className="linkedin"
            rel="noopener noreferrer"
          >
            <ListItem button key={"linkedin"}>
              <ListItemIcon>
                <FontAwesomeIcon icon={faLinkedin} />
              </ListItemIcon>
              <ListItemText primary={"Linkedin"} />
            </ListItem>
          </a>
          <Divider />
          <ListItem button key={"contact"}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faEnvelope} />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </div>
      <Languages />
    </Drawer>
  );
};

const mapStateToProps = (state) => {
  return {
    lang: state.lang,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setContactModalShow: () => dispatch({type: "SHOW_MAIL_DIALOG"}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileDrawer);
