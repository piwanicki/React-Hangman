import {
  fetchHighscoresPending,
  fetchHighscoresSuccess,
  fetchHighscoresError,
} from "./highscoreActions";
import highscoreDB from "../axios/axios-highscore";

export const fetchHighscores = () => {
  return (dispatch) => {
    dispatch(fetchHighscoresPending());
    return highscoreDB
    .get("/highscore.json")
    .then((response) => {
        let highscoreJSON = Object.values(response.data);
        highscoreJSON.sort((a, b) => (a.score < b.score ? 1 : -1)).splice(10);
        dispatch(fetchHighscoresSuccess(highscoreJSON));
      })
      .catch((error) => {
        dispatch(fetchHighscoresError(error));
        console.log(error);
      });
  };
};

