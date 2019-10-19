import React from 'react';
import classes from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch, faEnvelope, faHome, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import hangmanLogo from '../../../assets/img/hangTransparent.png';
import ticTacToeLogo from '../../../assets/img/tictactoe-icon2.png'

const Footer = (props) => {

  return (
    <footer className={classes.Footer}>
      <div className={classes.InfoSection}>
        <ul>
          <li><FontAwesomeIcon icon={faCodeBranch}/> Github</li>
          <li><FontAwesomeIcon icon={faEnvelope}/> Contact Me</li>
        </ul>
      </div>
      <div className={classes.QuickNav}>
        <ul>
          <li><FontAwesomeIcon icon={faHome}/> Home</li>
          <li><img src={ticTacToeLogo} alt="tictactoe logo" /> TicTacToe</li>
          <li><img src={hangmanLogo} alt="hangman logo" />Hangman</li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;