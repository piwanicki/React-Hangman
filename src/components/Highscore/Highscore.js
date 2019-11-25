import React, {Component} from 'react';
import classes from './Highscore.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrophy} from '@fortawesome/free-solid-svg-icons';
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
    let scoreArr = this.state.scoreArr;
    highscoreDB.get('/highscore.json')
      .then(response => {
        let highscoreJSON = Object.values(response.data);
        highscoreJSON.sort((a,b) => (a.score < b.score) ? 1 : -1);
        console.log(highscoreJSON);
        highscoreJSON.splice(3); 
        for(let el of highscoreJSON){
          scoreArr.push(`${el.name} - ${el.score} Pts.`);
          
        }
        this.setState({scoreArr: scoreArr});
        this.props.fetchingDone();
      })
      .catch(error => {
        this.props.fetchingDone();
        console.log(error)
      });
  } 

  componentDidMount() {
    this.getDBHighscores();
  }

  componentDidUpdate() {
    
  }

  render() {
    const scoreArr = this.state.scoreArr;

    return (
      <div className={classes.HighScore}>
        {this.props.fetching ? <LoadingSpinner /> : 
        <Auxiliary>
        <p style={{fontSize:'1.05em'}}><FontAwesomeIcon icon={faTrophy} className={classes.FirstPlace}/> { scoreArr[0] }</p>
        <p style={{fontSize:'0.8em'}}><FontAwesomeIcon icon={faTrophy} className={classes.SecondPlace}/> { scoreArr[1] }</p>
        <p style={{fontSize:'0.7em'}}><FontAwesomeIcon icon={faTrophy} className={classes.ThirdPlace}/> { scoreArr[2] }</p>
        </Auxiliary>
      }  
      </div>
    )
  }
}

const mapPropsToState = state => {
  return {
    score: state.score,
    fetching: state.fetching
  }
}

const mapDispatchToprops = (dispatch) => {
  return {
    fetchingDone : () => dispatch({type: 'FETCH_HIGHSCORE_BOARD'})
  }
}


export default connect(mapPropsToState,mapDispatchToprops)(HighScore);