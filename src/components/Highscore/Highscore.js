import React, {Component} from 'react';
import classes from './Highscore.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrophy} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';

class HighScore extends Component {

  render() {

    const scores = this.props.score; 
    let scoreArr = [];
    
    for( const el of scores) {
      // console.log(`${el[0]} &#45 ${el[1]}`)
      scoreArr.push(`${el[0]}  ${el[1]} Pts`);
    }

    return (
      <div className={classes.HighScore}>
        <p style={{fontSize:'1.2em'}}><FontAwesomeIcon icon={faTrophy} className={classes.FirstPlace}/> {scoreArr.length > 0 ? scoreArr[0] : null} </p>
        <p style={{fontSize:'1em'}}><FontAwesomeIcon icon={faTrophy} className={classes.SecondPlace}/> {scoreArr.length > 1 ? scoreArr[1] : null}</p>
        <p style={{fontSize:'0.75em'}}><FontAwesomeIcon icon={faTrophy} className={classes.ThirdPlace}/> {scoreArr.length > 2 ? scoreArr[2] : null}</p>
      </div>
    )
  }
}

const mapPropsToState = state => {
  return {
    score: state.score
  }
}

export default connect(mapPropsToState,null)(HighScore);