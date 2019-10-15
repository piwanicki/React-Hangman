import React from 'react';
import classes from './PuzzleContainer.module.css';
import PuzzleWord from '../../components/puzzle/PuzzleWord/PuzzleWord';


const PuzzleContainer = (props) => {

  return (
    <div className={classes.PuzzleContainer}>
      <PuzzleWord lang={props.language}/>
      {props.children}
    </div>
  )
}

export default PuzzleContainer;