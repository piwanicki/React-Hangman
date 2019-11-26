import React, {Component} from 'react';
import classes from './Highscore.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrophy, faSync} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import highscoreDB from '../../axios-highscore';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import Auxiliary from '../../hoc/Auxiliary';

class HighScore extends Component {

  state = {
   scoreArr: [],
   fetching: false
  }

  getDBHighscores = () => {
    this.setState({
      fetching: true
    })
    let scoreArr = [];
    highscoreDB.get('/highscore.json')
      .then(response => {
          let highscoreJSON = Object.values(response.data);
          highscoreJSON.sort((a,b) => (a.score < b.score) ? 1 : -1).splice(3);
          for(let el of highscoreJSON){
            scoreArr.push(`${el.name} - ${el.score} Pts.`);
          }
          this.setState({
            scoreArr: scoreArr,
            fetching: false});
        })
      .catch(error => {
        console.log(error)
        this.setState({
          fetching: false})
      });
  } 

  componentDidMount() {
    this.getDBHighscores();
  }

  render() {
    const scoreArr = this.state.scoreArr;

    return (
      <div className={classes.HighScore}>
        {this.state.fetching ? <LoadingSpinner /> : 
        <Auxiliary>
        <p style={{fontSize:'1.05em'}}><FontAwesomeIcon icon={faTrophy} className={classes.FirstPlace}/> { scoreArr[0] }</p>
        <p style={{fontSize:'0.8em'}}><FontAwesomeIcon icon={faTrophy} className={classes.SecondPlace}/> { scoreArr[1] }</p>
        <p style={{fontSize:'0.7em'}}><FontAwesomeIcon icon={faTrophy} className={classes.ThirdPlace}/> { scoreArr[2]}</p>
        <div className={classes.Refresh} onClick={this.getDBHighscores}><FontAwesomeIcon icon={faSync} /></div>
        </Auxiliary>
      }  
      </div>
    )
  }
}

const mapPropsToState = state => {
  return {
    score: state.score,
  }
}



export default connect(mapPropsToState,null)(HighScore);