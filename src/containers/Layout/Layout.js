import React from "react";
import classes from "./Layout.module.scss";
import NavigationBar from "../../components/Navigation/NavigationBar/NavigationBar";
import PuzzleContainer from "../PuzzleContainer/PuzzleContainer";
import Footer from "../../components/Navigation/Footer/Footer";
import Auxiliary from "../../hoc/Auxiliary";
import ContactForm  from '../../components/MailDialog/ContactForm' ;
import {connect} from "react-redux";

const Layout = (props) => {
  console.log(props.darkMode);

  const layoutModeClass = props.darkMode ? [classes.Layout, classes.LayoutDark].join(" ") : classes.Layout;

  return (
    <Auxiliary>
      <div className={layoutModeClass}>
        <NavigationBar />
        <PuzzleContainer />
        <main className={classes.Content}>{props.children}</main>
        <Footer />
      </div>
      <ContactForm />
    </Auxiliary>
  );
};

const mapStateToProps = (state) => {
  return {
    darkMode: state.darkMode,
  };
};

export default connect(mapStateToProps, null)(Layout);
