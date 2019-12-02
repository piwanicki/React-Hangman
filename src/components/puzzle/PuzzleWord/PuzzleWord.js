import React, { Component } from "react";
import classes from "./PuzzleWord.module.css";
import PuzzleLetter from "./PuzzleLetter/PuzzleLetter";
import axios from "axios";
import Auxiliary from "../../../hoc/Auxiliary";
import KonvaDrawer from "../../../components/KonvaDrawer/KonvaDrawer";
import LoadingSpinner from "../../../UI/LoadingSpinner/LoadingSpinner";
import PuzzleHint from "./PuzzleHint";
import KeyboardEventHandler from "react-keyboard-event-handler";
//import {updateHighscoreBoard} from '../../../actions/index';
import { connect } from "react-redux";

class PuzzleWord extends Component {
  state = {
    word: "",
    guessedLetters: [],
    chances: 6,
    puzzle: [],
    loading: false,
    gamePlaying: false,
    hint: "",
    wordEng: "",
    scoreStrike: 0,
    showHighscoreDialog: true
  };

  componentDidUpdate(prevProps) {
    if (this.props.lang !== prevProps.lang) {
      this.getPuzzle();
    }
  }

  getPuzzle = () => {
    this.setState({ loading: true });
    axios.get(`http://puzzle.mead.io/puzzle?wordCount=1`).then(response => {
      this.setupPuzzle(response.data.puzzle.toLowerCase());
      this.setState({ wordEng: response.data.puzzle.toLowerCase() });
      console.log(`wordEng: ${this.state.wordEng}`);
      if (this.props.lang !== "en") {
        axios
          .get(
            `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190729T200219Z.af5b237995a37b64.de861d375a64ea3d5d51764c8f5aa22d42d59972&text=${this.state.word}&lang=en-${this.props.lang}`
          )
          .then(response => {
            this.setupPuzzle(response.data.text.join("").toLowerCase());
          });
      }
      console.log(this.state.word);
    });
  };

  guessedLetterHandler = key => {
    if (this.state.chances > 0 && this.state.gamePlaying) {
      const puzzles = [...this.state.puzzle];
      const wordArray = [...this.state.word.split("")];
      const chances = this.state.chances;
      if (
        wordArray.indexOf(key) > -1 &&
        this.state.guessedLetters.indexOf(key) === -1
      ) {
        this.state.guessedLetters.push(key);
        var indices = wordArray
          .map((e, i) => (e === key ? i : ""))
          .filter(String);
        indices.forEach(el => (puzzles[el] = key));
        this.setState({ puzzle: puzzles });
      } else if (this.state.guessedLetters.indexOf(key) > -1) {
        console.log("You typed this char : " + key);
      } else {
        this.setState({ chances: chances - 1 });
        console.log(`Left chances:  ${this.state.chances}`);
      }
      this.checkIfWin();
    }
  };

  setupPuzzle = word => {
    const wordArr = word.split("");
    const puzzles = wordArr.map(el => (el !== " " ? (el = "_") : el));
    this.setState({
      word: word,
      puzzle: puzzles,
      chances: 6,
      guessedLetters: [],
      loading: false,
      gamePlaying: true,
      hint: ""
    });
  };

  checkIfWin = () => {
    let puzzles = [...this.state.puzzle];
    const word = this.state.word;
    let scoreStrike = this.state.scoreStrike;

    if (this.state.chances > 0 && puzzles.indexOf("_") === -1) {
      this.setState({
        gamePlaying: false,
        scoreStrike: scoreStrike + 1
      });
      console.log(`You have ${this.state.scoreStrike} points!! keep going!!`);
    }

    if (this.state.chances === 0) {
      let minScoreInDB = this.props.score;
      let minScore =
        minScoreInDB.size > 0
          ? minScoreInDB
              .sort((a, b) => (a.score > b.score ? 1 : -1))
              .splice(1)[0].score
          : 0;
        if (scoreStrike > minScore) {
          this.props.showHighscoreDialog();
        }
        puzzles = word.split("").map(el => el);
        this.setState({
          puzzle: puzzles,
          gamePlaying: false,
          scoreStrike: 0
        });
        console.log(`The word is : ${this.state.word}`);
        this.setState({ gamePlaying: false });
      }
    }

  componentDidMount() {
    this.getPuzzle();
  }

  render() {
    let downloadBtnString = "Nowe Hasło";
    if (this.props.lang === "en") {
      downloadBtnString = "New Word";
    }
    if (this.props.lang === "de") {
      downloadBtnString = "Neues Wort";
    }

    let letters = <LoadingSpinner />;

    if (!this.state.loading) {
      letters = this.state.puzzle.map((el, idx) => (
        <PuzzleLetter key={idx} letter={el} />
      ));
    }

    return (
      <Auxiliary>
        <PuzzleHint word={this.state.wordEng} />
        <div onClick={this.getPuzzle} className={classes.newWordBtn}>
          {downloadBtnString}
        </div>
        <KeyboardEventHandler
          handleKeys={[
            "alphabetic",
            "alt+a",
            "alt+l",
            "alt+n",
            "alt+s",
            "alt+x",
            "alt+z",
            "alt+e",
            "alt+o"
          ]}
          handleEventType={"keydown"}
          onKeyEvent={(key, e) => this.guessedLetterHandler(e.key)}
          isDisabled={this.props.mailOpened}
        ></KeyboardEventHandler>
        <div className={classes.PuzzleWord}>{letters}</div>
        <KonvaDrawer chances={this.state.chances} />
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    show: state.showHighscoreDialog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showHighscoreDialog: () => dispatch({ type: "SHOW_HIGHSCORE_DIALOG" })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PuzzleWord);
