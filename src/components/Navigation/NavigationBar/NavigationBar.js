import React from "react";
import classes from "./NavigationBar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import MobileMenuBtn from "../MobileMenu/MobileMenuBtn/MobileMenuBtn";

const NavigationBar = props => {
  return (
    <header>
      <div className={classes.NavigationBar}>
        <nav>
          <MobileMenuBtn clicked={props.showSideMenu} />
          <ul className={classes.NavigationMenu}>
            <div className={classes.DesktopOnly}>
              <NavigationItems changeLang={props.languageChanger} />
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavigationBar;
