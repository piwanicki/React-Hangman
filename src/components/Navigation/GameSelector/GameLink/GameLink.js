import React from 'react';
import {Link} from 'react-dom';
import classes from './GameLink.module.css'


const GameLink = (props) => {
  return (
    <div className={classes.GameLink}>
      <img src={props.icon} alt={props.iconAlt} className={classes.Icon}/>
      <a href={props.to}> {props.linkInfo} </a>
    </div>
  )
}

export default GameLink;