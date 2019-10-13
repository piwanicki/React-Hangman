import React, {Component} from 'react';
import classes from './PuzzleWord.module.css';
import PuzzleLetter from './PuzzleLetter/PuzzleLetter';
import axios from 'axios';
import Auxiliary from '../../../hoc/Auxiliary';
import KonvaDrawer from '../../../components/KonvaDrawer/KonvaDrawer'
import LoadingSpinner from '../../../UI/LoadingSpinner/LoadingSpinner'
import PuzzleHint from './PuzzleHint';

// const deadKeys = [
//   'AltLeft', 'AltRight', 'ControlLeft', 'ControlRight'
// ]

class PuzzleWord extends Component {

  state = {
    word: '',
    guessedLetters: [],
    chances: 6,
    puzzle: [],
    loading: false,
    gamePlaying: false,
    hint: '',
    wordEng: ''
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.lang !== prevProps.lang) {
      this.getPuzzle();
    }
  }

   getDefinitionHint = () => {

  //   axios.get(`https://api.datamuse.com/words?ml=${this.state.word}&md=d&max=1`)
  //     .then(response => {
  //       let hint = response.data[0].defs[0].split('n	');
  //       this.setState({hint: hint[1]})
  //       console.log(this.state.hint)
  //     })
  //     .catch(error => console.log(error));
     };


  getPuzzle = () => {
    this.setState({loading: true});
    axios.get(`http://puzzle.mead.io/puzzle?wordCount=1`).then(response => {
      this.setupPuzzle(response.data.puzzle.toLowerCase());
      this.setState({wordEng: response.data.puzzle.toLowerCase()})
      console.log(`wordEng: ${this.state.wordEng}`);
    if(this.props.lang !== 'en') {
      axios.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190729T200219Z.af5b237995a37b64.de861d375a64ea3d5d51764c8f5aa22d42d59972&text=${this.state.word}&lang=en-${this.props.lang}`).then(response => {
        this.setupPuzzle(response.data.text.join('').toLowerCase());
        console.log(this.state.word);
      });
    }   
    console.log(this.state.word);
    this.getDefinitionHint();
    });
  }

  guessedLetterHandler = (key) => {
    if(this.state.chances > 0 && this.state.gamePlaying) {
      const puzzles = [...this.state.puzzle];
      const wordArray = [...this.state.word.split('')]
      const chances = this.state.chances;
      if(wordArray.indexOf(key) > -1 && this.state.guessedLetters.indexOf(key) === -1 ){
        this.state.guessedLetters.push(key);
        var indices = wordArray.map((e, i) => e === key ? i : '').filter(String)
        indices.forEach(el => puzzles[el] = key);
        this.setState({puzzle: puzzles})
      } else if (this.state.guessedLetters.indexOf(key) > -1 ) {
        console.log('Podales już tą litere, podaj inną.')
      } else {
        this.setState({chances: chances-1});
        console.log(`Pozostale szanse: ${this.state.chances}`)
      }
      this.checkIfWin();
    }
  }

  setupPuzzle = (word) => {
    const wordArr = word.split('');
    const puzzles = wordArr.map(el => el !== ' ' ? el = '_' : el);
    this.setState({
      word: word,
      puzzle: puzzles,
      chances: 6,
      guessedLetters: [],
      loading: false,
      gamePlaying: true,
      hint: ''
    });
  }


  checkIfWin = () => {
      const puzzles = [...this.state.puzzle];
      if ( this.state.chances > 0 && puzzles.indexOf('_') === -1) {
          alert(`wygrales!`);
          this.setState( {gamePlaying: false})
      } 
      if (this.state.chances === 0 ) {
        alert(`przegrales`);  
        console.log(`Haslo to : ${this.state.word}`)
        this.setState( {gamePlaying: false})
    }
  }

  // // Moved to getPuzzle()
  // translateToPL = (word) => {
  //   axios.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190729T200219Z.af5b237995a37b64.de861d375a64ea3d5d51764c8f5aa22d42d59972&text=${word}&lang=en-pl`).then(response => this.setState({wordPL: response.data.text}));
  // }

  componentDidMount() {
    document.addEventListener('keydown', (event) => {
        if(event.code !== 'AltLeft' &&  
           event.code !== 'AltRight' &&
           event.code !== 'ControlLeft' &&
           event.code !== 'ControlRight' ) {
          this.guessedLetterHandler(event.key);
      }
    });
    this.getPuzzle();
  }
  
  render() {

    let downloadBtnString = 'Nowe Hasło'
    if(this.props.lang === 'en') { downloadBtnString = 'New Word'}
    if(this.props.lang === 'de') { downloadBtnString = 'Neues Wort'}

    let letters = <LoadingSpinner />

    if(!this.state.loading) {
      letters = this.state.puzzle.map((el,idx) => <PuzzleLetter key={idx} letter={el} />)
    }

    return (
      <Auxiliary>
        <PuzzleHint word={this.state.wordEng} showHints={this.props.showHints}/>
        <div onClick={this.getPuzzle} className={classes.newWordBtn}>{downloadBtnString}</div>
            <div className={classes.PuzzleWord} >
              {letters}
            </div>
            <KonvaDrawer chances={this.state.chances}/>
      </Auxiliary>
    )
  }
}

export default PuzzleWord;

