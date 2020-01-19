import React, { Component } from "react";
import classes from "./PuzzleWord.module.css";
import PuzzleLetter from "./PuzzleLetter/PuzzleLetter";
import axios from "axios";
import Auxiliary from "../../../hoc/Auxiliary";
import KonvaDrawer from "../../../components/KonvaDrawer/KonvaDrawer";
import LoadingSpinner from "../../../UI/LoadingSpinner/LoadingSpinner";
import PuzzleHint from "./PuzzleHint";
import KeyboardEventHandler from "react-keyboard-event-handler";
import { connect } from "react-redux";
import HighscoreDialog from "../../Highscore/HighscoreDialog/HighscoreDialog";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import ScoreInfo from "./ScoreInfo/ScoreInfo";

class PuzzleWord extends Component {
  constructor() {
    super();
    this.inRef = React.createRef();
  }

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
    showHighscoreDialog: true,
    canUseHint: true,
    keyboardLayout: "default",
    showScoreInfo: false
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
      this.setState({
        wordEng: response.data.puzzle.toLowerCase()
      });
      console.log(`wordEng: ${this.state.wordEng}`);
      if (this.props.lang !== "en") {
        this.setState({ keyboardLayout: "default" });
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
    if (key === "alt") {
      const currentAltKeyboard = this.state.keyboardLayout;
      if (currentAltKeyboard === "altPL" || currentAltKeyboard === "altDE") {
        this.setState({ keyboardLayout: "default" });
      } else if (this.props.lang !== "en") {
        const altKeyboard = this.props.lang === "pl" ? "altPL" : "altDE";
        this.setState({ keyboardLayout: altKeyboard });
      }
      return null;
    }
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
      hint: "",
      canUseHint: true
    });
  };

  checkIfWin = () => {
    let puzzles = [...this.state.puzzle];
    const word = this.state.word;
    let scoreStrike = this.state.scoreStrike;
    const chances = this.state.chances;
    let minScoreInDB = this.props.highscore;

    if (this.state.chances > 0 && puzzles.indexOf("_") === -1) {
      this.setState({
        gamePlaying: false,
        scoreStrike: scoreStrike + 1,
        showScoreInfo: true
      });

      setTimeout(() => {
        this.setState({
          showScoreInfo: false
        });
      }, 1500);
    } else if (chances === 0) {
      
      let minScore =
        minScoreInDB !== undefined
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
      });
      console.log(`The word is : ${this.state.word}`);
      this.setState({ gamePlaying: false });
    }
  };

  highscoreSendedHandler = () => {
    setTimeout(() => {
      this.setState({ scoreStrike: 0 });
    },500)
  }

  hintUsedHandler = () => {
    const chances = this.state.chances;
    const word = this.state.word;
    const gamePlaying = this.state.gamePlaying;
    const puzzles = [...this.state.puzzle];
    let emptyIdx = [];

    puzzles.forEach((el, idx) => (el === "_" ? emptyIdx.push(idx) : null));
    const idx = emptyIdx[Math.floor(Math.random() * emptyIdx.length)];
    const canUseHint = chances === 1 || emptyIdx.length === 1 ? false : true;
    this.setState({ canUseHint: canUseHint });

    const letter = word.split("")[idx];
    puzzles[idx] = letter;
    if (gamePlaying && canUseHint) {
      this.setState({
        puzzle: puzzles,
        chances: chances - 1
      });
    }
  };

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
        <HighscoreDialog
          show={this.props.show}
          scoreStrike={this.state.scoreStrike}
          resetScoreStrike={this.highscoreSendedHandler}
        />
        <PuzzleHint
          word={this.state.wordEng}
          hintUsed={this.hintUsedHandler}
          canUseHint={this.state.canUseHint}
        />
        <div onClick={this.getPuzzle} className={classes.newWordBtn}>
          {downloadBtnString}
        </div>
        {this.state.showScoreInfo ? (
          <ScoreInfo scoreStrike={this.state.scoreStrike} />
        ) : null}
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
        <div className={classes.PuzzleWord} onClick={this.showMobileKeyboard}>
          {letters}
        </div>

        {this.props.showVirtualKeyboard ? (
          <Keyboard
            onKeyPress={button => this.guessedLetterHandler(button)}
            useTouchEvents={true}
            baseClass={classes.VirtualKeyboard}
            layout={{
              default: [
                "q w e r t y u i o p",
                "a s d f g h j k l",
                "z x c v b n m alt"
              ],
              altPL: [
                "q w ę r t y u i ó p",
                "ą ś d f g h j k ł",
                "ż ź ć v b n m alt"
              ],
              altDE: [
                "q w e r t y u i o p ü",
                "a s d f g h j k l ö ä",
                "z x c v b n m alt"
              ]
            }}
            layoutName={this.state.keyboardLayout}
          />
        ) : null}

        <KonvaDrawer chances={this.state.chances} />
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    highscore: state.highscore,
    showVirtualKeyboard: state.showVirtualKeyboard,
    lang: state.lang,
    // score: state.score
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showHighscoreDialog: () => dispatch({ type: "SHOW_HIGHSCORE_DIALOG" }),
    // updateScore: () => dispatch({type: 'UPDATE_SCORE'})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PuzzleWord);
