export const FETCH_HIGHSCORES_PENDING = "FETCH_HIGHSCORES_PENDING";
export const FETCH_HIGHSCORES_SUCCESS = "FETCH_HIGHSCORES_SUCCESS";
export const FETCH_HIGHSCORES_ERROR = "FETCH_HIGHSCORES_ERROR";

export function fetchHighscoresPending() {
  return {
    type: FETCH_HIGHSCORES_PENDING,
  };
}

export function fetchHighscoresSuccess(scores) {
  return {
    type: FETCH_HIGHSCORES_SUCCESS,
    highscores: scores,
  };
}

export function fetchHighscoresError(error) {
  return {
    type: FETCH_HIGHSCORES_ERROR,
    error: error,
  };
}
