const initialState = {
  fetching: false,
  showMailDialog: false,
  showHighscoreDialog: false,
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_MAIL_DIALOG": {
      return {
        ...state,
        showMailDialog: !state.showMailDialog
      };
    }

    case "SHOW_HIGHSCORE_DIALOG": {
      return {
        ...state,
        showHighscoreDialog: !state.showHighscoreDialog
      };
    }

    case "UPDATE_HS_BOARD": {
      return {
        ...state,
        fetching: action.fetching
      };
    }

    case 'FETCH_DB_SCORES' : {
      return {
        ...state,
        highscores: action.scores
      }
    }

    default: {
      return state;
    }
  }
};

export default reducers;
