import React, {Component} from 'react';
import classes from './PuzzleHint.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faInfoCircle , faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import ReactHover from 'react-hover';
import axios from 'axios';


const optionsCursorHover = {
  followCursor:false,
  shiftX: 0,
  shiftY: 0
}

class PuzzleHint extends Component  {

  state = {
    definitions : [],
    hintIndex: 0,
    hintsShow: false
  }


  getDefinitions = () => {
    //notepad
    axios.get(`https://api.datamuse.com/words?ml=${this.props.word}&md=d&max=1`)
    // axios.get(`https://api.datamuse.com/words?ml=notepad&md=d&max=1`)
      .then(response => {
        let hints = response.data[0].defs;
        this.setState({definitions: hints})
        console.log(hints)
      })
      .catch(error => console.log(error));
  }

  nextHint = () => {
    const currentIndex = this.state.hintIndex;
    this.setState({hintIndex: currentIndex+1})
  }

  previousHint = () => {
    const currentIndex = this.state.hintIndex;
    this.setState({hintIndex: currentIndex-1});
  }

  componentDidMount() {
    this.getDefinitions();
  }

  componentDidUpdate(prevProps,prevState) {
    if(prevProps.word !== this.props.word ) {
      this.getDefinitions();
    };
  }

  lockHints = () => {
    const clicked = this.state.hintsShow;
    this.setState({hintsShow: !clicked});
    console.log(this.state.hintsShow)
  }

  render() {

    const index = this.state.hintIndex;
    let hint = this.state.definitions[index];
    if(hint ) {
      if(hint.startsWith('n') ){
        hint = hint.replace('n	','noun / ');
      }
      if(hint.startsWith('adj') ){
        hint = hint.replace('adj	','adjective / ');
      }
      if(hint.startsWith('v') ){
        hint = hint.replace('v	','verb / ');
      }
    }

    const hoverHints = (
      <div className={classes.hover}>
        <button className={classes.NavArrow} onClick={this.previousHint} disabled={this.state.hintIndex === 0}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className={classes.NavArrow} onClick={this.nextHint} disabled={this.state.hintIndex === this.state.definitions.length-1}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <blockquote className={classes.quote}>{hint}</blockquote>
      </div>
    )

    return (
      <div className={classes.PuzzleHintContainer} onClickCapture={this.lockHints}>
        <ReactHover options={optionsCursorHover}>
          <ReactHover.Trigger type='trigger' >
            <FontAwesomeIcon icon={faInfoCircle} />
          </ReactHover.Trigger>
          <ReactHover.Hover type='hover'>
            {hoverHints}
          </ReactHover.Hover> }
        </ReactHover>
      </div>
    )
  }
}

export default PuzzleHint;