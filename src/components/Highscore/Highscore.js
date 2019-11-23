import React, {Component} from 'react';
import classes from './Highscore.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrophy} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import highscoreDB from '../../axios-highscore';

class HighScore extends Component {

  state = {
   scoreArr: [] 
  }

  getDBHighscores = () => {
    let scoreArr = this.state.scoreArr;
    highscoreDB.get('/highscore.json')
      .then(response => {
        for(const el of Object.values(response.data)) {
          scoreArr.push(`${el.name} - ${el.score} Pts.`);
          this.setState({scoreArr : scoreArr});
        }
      })
      .catch(error => console.log(error));
  } 


  componentDidMount() {
    this.getDBHighscores();
  }


  render() {
    const scoreArr = this.state.scoreArr;

    return (
      <div className={classes.HighScore}>
        <p style={{fontSize:'1.05em'}}><FontAwesomeIcon icon={faTrophy} className={classes.FirstPlace}/> { scoreArr[0] }</p>
        <p style={{fontSize:'0.8em'}}><FontAwesomeIcon icon={faTrophy} className={classes.SecondPlace}/> { scoreArr[1] }</p>
        <p style={{fontSize:'0.7em'}}><FontAwesomeIcon icon={faTrophy} className={classes.ThirdPlace}/> { scoreArr[2] }</p>
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