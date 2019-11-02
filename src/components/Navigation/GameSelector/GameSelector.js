import React from 'react';
import classes from './GameSelector.module.css';
import GameLink from './GameLink/GameLink';

const GameSelector = (props) => {

  return (
    <div className={classes.GameSelector}>
        <GameLink 
          to='/tictactoe' 
          linkInfo='TIC TAC TOE' />
        <GameLink 
          to='/hangman' 
          linkInfo='HANGMAN' />
    </div>
  )
}


export default GameSelector;