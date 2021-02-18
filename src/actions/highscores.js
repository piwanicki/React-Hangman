import {
  fetchHighscoresPending,
  fetchHighscoresSuccess,
  fetchHighscoresError,
} from "./highscoresAction";
import highscoreDB from "../../../axios/axios-highscore";

export const fetchHighscores = () => {
  return (dispatch) => {
    dispatch(fetchHighscoresPending());
    return highscoreDB
    .get("/highscore.json")
    .then((response) => {
        dispatch(fetchHighscoresSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(fetchHighscoresError(error));
        console.log(error);
      });
  };
};

