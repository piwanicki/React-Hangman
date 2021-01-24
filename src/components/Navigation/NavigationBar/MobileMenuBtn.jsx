import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import Drawer from "../Drawer/Drawer";
import "./MobileMenuBtn.scss";


const MobileMenuBtn = (props) => {
  const [mobileMenu, openMobileMenu] = useState(false);

  const openMobileMenuH = () => {
    openMobileMenu(!mobileMenu);
  };

  return (
    <>
      <div className="MobileBtn" {...props}>
        <FontAwesomeIcon icon={faEllipsisV} onClick={openMobileMenuH} />
      </div>
      <Drawer open={mobileMenu} toggleDrawer={openMobileMenu} />
    </>
  );
};

export default MobileMenuBtn;
