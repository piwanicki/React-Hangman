import React, {Component} from 'react';
import classes from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import hangmanLogo from '../../../assets/img/hangTransparent.png';
import ticTacToeLogo from '../../../assets/img/tictactoe-icon2.png'
import { Link } from 'react-router-dom';
import MailDialog from '../../MailDialog/MailDialog';
import Auxiliary from '../../../hoc/Auxiliary';

class Footer extends Component  {

  state = {
    showMailer: false,
  }

  showMailerHandler = () => {
    const showing = this.state.showMailer;
    this.setState({
      showMailer: !showing,
    })
  }

  render(){
    return (
      <Auxiliary>
      <MailDialog showMailer={this.state.showMailer} mailerParentUpdate={this.showMailerHandler}/>
      <footer className={classes.Footer}>
        <div className={classes.InfoSection}>
        <h4>Info</h4>
          <ul>
            <li className={classes.GitIcon}>
              <a href="https://github.com/piwanicki/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} /> <p>Github</p>
              </a>
            </li>
            <li className={classes.ContactIcon} onClick={this.showMailerHandler}><FontAwesomeIcon icon={faEnvelope} /> <p>Contact Me</p></li>
          </ul>
        </div>
        <div className={classes.QuickNav}>
        <h4>Quick Nav</h4>
          <ul>
            <li>
              <Link to='/home'>
                <FontAwesomeIcon icon={faHome}/> <p>Home</p>
              </Link>
            </li>
            <li>
              <div>
                <Link to='/tictactoe' >
                  <img src={ticTacToeLogo} alt="tictactoe logo" /> <p>TicTacToe</p>
                </Link>
              </div>
            </li>
            <li>
              <Link to='/' >
               <img src={hangmanLogo} alt="hangman logo" /> <p>Hangman</p>
              </Link>
            </li>
          </ul>
        </div>
      </footer>
      </Auxiliary>
    )
  }
}

export default Footer;
