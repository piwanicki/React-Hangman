import React, { Component } from "react";
import classes from "./Layout.module.css";
import NavigationBar from "../../components/Navigation/NavigationBar/NavigationBar";
import MobileMenu from "../../components/Navigation/MobileMenu/MobileMenu";
import PuzzleContainer from "../PuzzleContainer/PuzzleContainer";
import Footer from "../../components/Navigation/Footer/Footer";
import Auxiliary from "../../hoc/Auxiliary";
import MailDialog from "../../components/MailDialog/MailDialog";

class Layout extends Component {
  state = {
    showMobileMenu: false,
    language: "en"
  };

  openMobileMenuHandler = () => {
    this.setState({ showMobileMenu: true });
    console.log("open");
  };

  closeMobileMenuHandler = () => {
    this.setState({ showMobileMenu: false });
    console.log("closed");
  };

  changeLanguageHandler = e => {
    if (e.target.id === "gb") {
      e.target.id = "en";
    }
    this.setState({ language: e.target.id });
  };

  render() {
    return (
      <Auxiliary >
        <div className={classes.Layout}>
          <MobileMenu
            close={this.closeMobileMenuHandler}
            show={this.state.showMobileMenu}
          />
          {/* <NavigationBar
            showSideMenu={this.openMobileMenuHandler}
            languageChanger={e => this.changeLanguageHandler(e)}
          /> */}
          <PuzzleContainer
            language={this.state.language}
            showMailDialog={this.state.showMailDialog}
          />
          <main className={classes.Content}>{this.props.children}</main>
        </div>
        <MailDialog />
        {/* <Footer /> */}
      </Auxiliary>
    );
  }
}

export default Layout;
