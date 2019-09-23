import React from 'react';
import classes from './PuzzleLetter.module.css';
import Auxiliary from '../../../../hoc/Auxiliary';

const PuzzleLetter = (props) => {


  return (
    <Auxiliary>
    {props.letter !== ' ' ? <div className={classes.PuzzleLetter} onKeyDown={props.keyPressed}>
        {props.letter}
      </div> : <p></p> }
    </Auxiliary>
 
  )
}

export default PuzzleLetter;