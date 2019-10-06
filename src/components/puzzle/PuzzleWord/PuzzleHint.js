import React, {Component} from 'react';
import classes from './PuzzleHint.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons'
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
    hint: '',
    hintIndex: 0,
  }


  getDefinitions = () => {
    //notepad
    axios.get(`https://api.datamuse.com/words?ml=${this.props.word}&md=d&max=1`)
    // axios.get(`https://api.datamuse.com/words?ml=notepad&md=d&max=1`)
      .then(response => {
        console.log(`word props : ${this.props.word}`)
        let hints = response.data[0].defs;
        this.setState({definitions: hints})
        // this.renderHint(this.state.hintIndex);
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

  render() {

    const index = this.state.hintIndex;
    let hint = this.state.definitions[index];

    if( hint ) {
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


    return (
      <div className={classes.PuzzleHintContainer}>
        <ReactHover options={optionsCursorHover}>
          <ReactHover.Trigger type='trigger'>
            <FontAwesomeIcon icon={faInfoCircle} />
          </ReactHover.Trigger>
          <ReactHover.Hover type='hover'>
            <div className={classes.hover}>
              <button className={'arrow left'} onClick={this.previousHint} disabled={this.state.hintIndex === 0}>Prev</button>
              <button className={'arrow right'} onClick={this.nextHint} disabled={this.state.hintIndex === this.state.definitions.length-1}>Next</button>
              <blockquote className={classes.quote}>{hint}</blockquote>
            </div>
          </ReactHover.Hover>
        </ReactHover>
      </div>
    )
  }

}

export default PuzzleHint;