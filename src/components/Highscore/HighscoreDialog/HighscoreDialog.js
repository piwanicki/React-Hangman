import React, {Component} from 'react';
import classes from './HighscoreDialog.module.css';
import {connect} from 'react-redux';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import highscoreInstance from '../../../axios-highscore';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp} from '@fortawesome/free-regular-svg-icons';
import Auxiliary from '../../../hoc/Auxiliary';

class HighscoreDialog extends Component  {

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  sendHighscoreToDB = () => {
    const input = this.inputRef.current;
    const highscore = {
      name: input.value,
      score: this.props.score
    };
    highscoreInstance
      .post("/highscore.json", highscore)
      .then(response => {
        console.log(response);
        this.props.fetchHighscoreBoard();
      })
      .catch(error => console.log(error));
   };


  render() {

    return (
      <>
      { this.props.show ?  
      <Auxiliary>
      <Backdrop show={true} clicked={this.props.closeHighscoreDialog} />
        <div className={classes.HighscoreDialog} >
          <p className={classes.ScoreInfo}>Congrats! You scored {this.props.score} points!</p>
          <FontAwesomeIcon icon={faThumbsUp} className={[classes.Like,classes.ScaleInCenter].join(" ")}/>
          <input type='text' placeholder='Type you name...' ref={this.inputRef} maxLength={8}></input>
          <p className={classes.SendBtn}  onClick={this.sendHighscoreToDB}>SEND</p>
        </div> 
        </Auxiliary>
        : null
      }
      </>
      )
   }
}

const mapStateToProps = (state) => {
  return {
    show: state.showHighscoreDialog,
    score: state.score
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeHighscoreDialog: () => dispatch({type: 'SHOW_HIGHSCORE_DIALOG'}),
    fetchHighscoreBoard: () => dispatch({type: 'FETCH_HIGHSCORE_BOARD'}),
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(HighscoreDialog);

 