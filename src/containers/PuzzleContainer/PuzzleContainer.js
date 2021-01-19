import React, {useState, useEffect} from "react";
import classes from "./PuzzleContainer.module.scss";
import PuzzleWord from "../../components/puzzle/PuzzleWord/PuzzleWord";
import PuzzleControls from "../../components/puzzle/PuzzleControls/PuzzleControls";
import axios from "axios";
import {connect} from "react-redux";

const PuzzleContainer = (props) => {
  const [word, setWord] = useState();
  const [fetching, setFetching] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [canUseHint, setCanUseHint] = useState(null);

  const getWord = () => {
    setFetching(true);
    axios.get(`http://puzzle.mead.io/puzzle?wordCount=1`).then((response) => {
      setWord(response.data.puzzle.toLowerCase());
      if (props.lang !== "en") {
        axios
          .get(
            `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190729T200219Z.af5b237995a37b64.de861d375a64ea3d5d51764c8f5aa22d42d59972&text=${word}&lang=en-${props.lang}`
          )
          .then((response) => {
            setWord(response.data.puzzle.toLowerCase());
            setFetching(false);
          });
      }
      setFetching(false);
    });
  };

  // ComponentDidMount
  useEffect(() => {
    getWord();
  }, []);

  const hintUsedHandler = () => {
    setHintsUsed(hintsUsed + 1);
  };

  const canUseHintHandler = (canUseHandler) => {
    console.log(canUseHandler);
  };

  return (
    <div className={classes.PuzzleContainer}>
      <PuzzleControls
        getWord={getWord}
        hintUsed={hintUsedHandler}
        canUseHintHandler={canUseHintHandler}
        canUseHint={canUseHint}
      />
      <PuzzleWord
        lang={props.language}
        mailOpened={props.showMailDialog}
        word={word}
        getWord={getWord}
        fetching={fetching}
        hintsUsed={hintsUsed}
      />
      {props.children}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    lang: state.lang,
  };
};

export default connect(mapStateToProps, null)(PuzzleContainer);
