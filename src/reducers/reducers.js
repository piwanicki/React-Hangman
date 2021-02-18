import {TOGGLE_DARKMODE} from '../actions/setStyleMode';
import {FETCH_HIGHSCORES_PENDING, FETCH_HIGHSCORES_SUCCESS, FETCH_HIGHSCORES_ERROR} from '../actions/highscoreActions';


const  darkModeOn = localStorage.getItem('darkModeOn');

const initialState = {
  hsFetching: false,
  showMailDialog: false,
  showHighscoreDialog: false,
  showVirtualKeyboard: false,
  lang: "en",
  highscores: [],
  score: 0,
  darkMode: darkModeOn === 'false' ? false : true,
  error: null,
};

const reducers = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_HIGHSCORES_ERROR : {
      return {
        ...state,
        error: action.error,
      }
    }

    case FETCH_HIGHSCORES_PENDING : {
      return {
        ...state,
        hsFetching: true,
      }
    }

    case FETCH_HIGHSCORES_SUCCESS : {
      return {
        ...state,
        highscores: action.highscores,
      }
    }

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

    case TOGGLE_DARKMODE : {
      localStorage.setItem('darkModeOn',!state.darkMode);
      return {
        ...state,
        darkMode: !state.darkMode
      }
    }

    case "SET_CHANCES" : {
      return {
        ...state,
        chances : action.chances
      }
    }

    case "SET_SCORE" : {
      return {
        ...state,
        score : action.score
      }
    }

    default: {
      return state;
    }
  }
};

export default reducers;
