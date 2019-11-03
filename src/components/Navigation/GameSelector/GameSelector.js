import React from 'react';
import classes from './GameSelector.module.css';
import GameLink from './GameLink/GameLink';
import HangmanIcon from '../../../assets/img/hangTransparent.png';
import TictactoeIcon from '../../../assets/img/tictactoe-icon2.png';

const GameSelector = (props) => {

  return (
    <div className={classes.GameSelector}>
        <GameLink 
          to='/tictactoe' 
          linkInfo='TIC TAC TOE' 
          icon={TictactoeIcon}
          iconAlt='Tic Tac Toe icon'  
          />
        <GameLink 
          to='/hangman' 
          linkInfo='HANGMAN' 
          icon={HangmanIcon}
          iconAlt='Hangman icon'  
          />
    </div>
  )
}


export default GameSelector;