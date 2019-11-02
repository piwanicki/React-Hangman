import React from 'react';
import {Link} from 'react-dom';
import classes from './GameLink.module.css'

const GameLink = (props) => {
  return (
    <div className={classes.GameLink}>
      <a href={props.to}/> 
        <p>{props.linkInfo}</p>
    </div>
  )
}

export default GameLink;