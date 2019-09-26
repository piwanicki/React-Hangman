import React, {Component} from 'react';
import classes from './PuzzleWord.module.css';
import PuzzleLetter from './PuzzleLetter/PuzzleLetter';
import axios from 'axios';
import Auxiliary from '../../../hoc/Auxiliary';
import KonvaDrawer from '../../../components/KonvaDrawer/KonvaDrawer'
import LoadingSpinner from '../../../UI/LoadingSpinner/LoadingSpinner'

class PuzzleWord extends Component {

  state = {
    word: '',
    guessedLetters: [],
    chances: 6,
    puzzle: [],
    loading: false,
    gamePlaying: false
  }

  getPuzzle = () => {
    this.setState({loading: true});
    axios.get(`http://puzzle.mead.io/puzzle?wordCount=1`).then(response => {
      this.setupPuzzle(response.data.puzzle.toLowerCase());
    if(this.props.lang !== 'en') {
      axios.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190729T200219Z.af5b237995a37b64.de861d375a64ea3d5d51764c8f5aa22d42d59972&text=${this.state.word}&lang=en-${this.props.lang}`).then(response => {
        this.setupPuzzle(response.data.text.join('').toLowerCase());
      });
    }   
    console.log(this.state.word);
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
      guessedLetters: []
    });
    this.setState({
      loading: false,
      gamePlaying: true});
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

  // Moved to getPuzzle()
  translateToPL = (word) => {
    axios.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190729T200219Z.af5b237995a37b64.de861d375a64ea3d5d51764c8f5aa22d42d59972&text=${word}&lang=en-pl`).then(response => this.setState({wordPL: response.data.text}));
  }

  componentDidMount() {
    document.addEventListener('keydown', (event) => {
      this.guessedLetterHandler(event.key);
    });
    this.getPuzzle();
  }
  
  render() {

    let letters = <LoadingSpinner />

    if(!this.state.loading) {
      letters = this.state.puzzle.map((el,idx) => <PuzzleLetter key={idx} letter={el} />)
    }

    return (
      <Auxiliary>
        <button onClick={this.getPuzzle}>Pobierz haslo</button>
            <div className={classes.PuzzleWord} >
              {letters}
            </div>
            <KonvaDrawer chances={this.state.chances}/>
      </Auxiliary>
    )
  }
}

export default PuzzleWord;

