import React from "react";
import classes from "./MobileMenu.module.css";
import Backdrop from "../../../UI/Backdrop/Backdrop";
import Auxiliary from "../../../hoc/Auxiliary";
import NavigationItems from "../NavigationItems/NavigationItems";

const MobileMenu = props => {
  let attachedClasses = [classes.MobileMenu, classes.Close];

  if (props.show) {
    attachedClasses = [classes.MobileMenu, classes.Open];
  }

  return (
    <Auxiliary>
      <Backdrop show={props.show} clicked={props.close} />
      <div className={attachedClasses.join(" ")}>
        <div>
          <nav>
            <NavigationItems />
          </nav>
        </div>
      </div>
    </Auxiliary>
  );
};

export default MobileMenu;
