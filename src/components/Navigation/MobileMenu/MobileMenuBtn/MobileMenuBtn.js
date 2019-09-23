import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons'
import classes from './MobileMenuBtn.module.css'


const MobileMenuBtn = props => {
  return (
    <div className={classes.MobileMenuBtn} onClick={props.clicked}>
      <FontAwesomeIcon icon={faBars}/>
    </div>
  )
}

export default MobileMenuBtn;
