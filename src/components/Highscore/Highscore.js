import React, { Component } from "react";
import classes from "./Highscore.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faSync } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import highscoreDB from "../../axios-highscore";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import Auxiliary from "../../hoc/Auxiliary";

class HighScore extends Component {
  state = {
    scoreArr: [],
    fetching: false
  };

  getDBHighscores = () => {
    let scoreArr = [];
    highscoreDB
      .get("/highscore.json")
      .then(response => {
        let highscoreJSON = Object.values(response.data);
        highscoreJSON.sort((a, b) => (a.score < b.score ? 1 : -1)).splice(3);
        highscoreJSON.forEach(el =>
          scoreArr.push(`${el.name} - ${el.score} Pts.`)
        );
        this.props.fetchDB(highscoreJSON);
        this.props.updateHighscoreBoard(false);

        this.setState({
          scoreArr: scoreArr,
          fetching: false
        });
      })
      .catch(error => {
        this.props.updateHighscoreBoard(false);
        this.setState({
          fetching: false
        });
      });
  };

  componentDidMount() {
    this.getDBHighscores();
  }

  componentDidUpdate(prevProps) {
    if (this.props.fetching !== this.state.fetching) {
      console.log(`zaktualizuj haj`);
      this.getDBHighscores();
    }
  }

  render() {
    const scoreArr = this.state.scoreArr;

    return (
      <div className={classes.HighScore}>
        {this.props.fetching ? (
          <LoadingSpinner />
        ) : (
          <Auxiliary>
            <p style={{ fontSize: "0.85em" }}>
              <FontAwesomeIcon icon={faTrophy} className={classes.FirstPlace} />{" "}
              {scoreArr[0]}
            </p>
            <p style={{ fontSize: "0.75em" }}>
              <FontAwesomeIcon
                icon={faTrophy}
                className={classes.SecondPlace}
              />{" "}
              {scoreArr[1]}
            </p>
            <p style={{ fontSize: "0.65em" }}>
              <FontAwesomeIcon icon={faTrophy} className={classes.ThirdPlace} />{" "}
              {scoreArr[2]}
            </p>
            <div className={classes.Refresh} onClick={this.getDBHighscores}>
              <FontAwesomeIcon icon={faSync} />
            </div>
          </Auxiliary>
        )}
      </div>
    );
  }
}

const mapPropsToState = state => {
  return {
    score: state.score,
    fetching: state.fetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchDB: scoreArray =>
      dispatch({ type: "FETCH_DB_SCORES", scores: scoreArray }),
    updateHighscoreBoard: fetch =>
      dispatch({ type: "UPDATE_HS_BOARD", fetching: fetch })
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(HighScore);
