import React, {Component} from 'react';
import classes from './Highscore.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrophy} from '@fortawesome/free-solid-svg-icons';


class HighScore extends Component {

  render() {

    let scores = this.props.score; 
    console.log(scores);

    
    return (
      <div className={classes.HighScore}>
        <p style={{fontSize:'1.2em'}}><FontAwesomeIcon icon={faTrophy} className={classes.FirstPlace}/> 1. Miejsce</p>
        <p style={{fontSize:'1em'}}><FontAwesomeIcon icon={faTrophy} className={classes.SecondPlace}/> 2. Miejsce</p>
        <p style={{fontSize:'0.75em'}}><FontAwesomeIcon icon={faTrophy} className={classes.ThirdPlace}/> 3. Miejsce</p>
      </div>
    )
  }


}

export default HighScore;