const initialState = {
  fetching: false,
  showMailDialog: false,
  showHighscoreDialog: false,
  showVirtualKeyboard: false,
  lang: "en",
  highscores: [],
  score: 0
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_MAIL_DIALOG": {
      return {
        ...state,
        showMailDialog: !state.showMailDialog
      };
    }

    case "SHOW_VIRTUAL_KEYBOARD": {
      return {
        ...state,
        showVirtualKeyboard: !state.showVirtualKeyboard
      };
    }

    case "SHOW_HIGHSCORE_DIALOG": {
      return {
        ...state,
        showHighscoreDialog: !state.showHighscoreDialog
      };
    }

    // case "UPDATE_SCORE": {
    //   return {
    //     ...state,
    //     score: action.score
    //   }
    // }

    case "UPDATE_HS_BOARD": {
      return {
        ...state,
        fetching: action.fetching
      };
    }

    case "FETCH_DB_SCORES": {
      return {
        ...state,
        highscores: action.scores
      };
    }

    case "CHANGE_LANGUAGE": {
      return {
        ...state,
        lang: action.lang
      };
    }

    default: {
      return state;
    }
  }
};

export default reducers;
