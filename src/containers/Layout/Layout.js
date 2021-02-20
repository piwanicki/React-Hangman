import React from "react";
import classes from "./Layout.module.scss";
import NavigationBar from "../../components/Navigation/NavigationBar/NavigationBar";
import PuzzleContainer from "../PuzzleContainer/PuzzleContainer";
import Footer from "../../components/Navigation/Footer/Footer";
import Auxiliary from "../../hoc/Auxiliary";
import ContactForm  from '../../components/MailDialog/ContactForm' ;
import {connect} from "react-redux";

const Layout = (props) => {
  const layoutModeClass = props.darkMode ? [classes.Layout, classes.LayoutDark].join(" ") : classes.Layout;



  const hideVirtualKeyboard = () => {
    console.log('prosadasd');
    //props.hideKeyboard();
  }


  return (
    <Auxiliary>
      <div className={layoutModeClass} onClick={hideVirtualKeyboard}>
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

const mapDispatchToProps = (dispatch) => {
  return {
    hideKeyboard: () => dispatch({type : 'HIDE_VIRTUAL_KEYBOARD'})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
