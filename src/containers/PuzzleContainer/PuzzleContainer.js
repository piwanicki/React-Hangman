import React from 'react';
import classes from './PuzzleContainer.module.css';
import PuzzleWord from '../../components/puzzle/PuzzleWord/PuzzleWord';
import PuzzleControls from '../../components/puzzle/PuzzleControls/PuzzleControls';

const PuzzleContainer = (props) => {

  return (
    <div className={classes.PuzzleContainer}>
      <PuzzleControls /> 
      <PuzzleWord lang={props.language} mailOpened={props.showMailDialog}/>
      {props.children}
    </div>
  )
}

export default PuzzleContainer;