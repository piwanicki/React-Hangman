import React from 'react';
import classes from './GameSelector.module.css';
import GameLink from './GameLink/GameLink';
import TictactoeIcon from '../../../assets/img/tictactoe-icon2.png';

const GameSelector = (props) => {

  return (
    <div className={classes.GameSelector}>
        <GameLink 
          to='https://kolkoikrzyzyk.000webhostapp.com/' 
          linkInfo='TIC TAC TOE' 
          icon={TictactoeIcon}
          iconAlt='Tic Tac Toe icon'
          />
    </div>
  )
}


export default GameSelector;