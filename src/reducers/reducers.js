import {TOGGLE_DARKMODE} from '../actions/setStyleMode';


const  darkModeOn = localStorage.getItem('darkModeOn');

const initialState = {
  fetching: false,
  showMailDialog: false,
  showHighscoreDialog: false,
  showVirtualKeyboard: false,
  lang: "en",
  highscores: [],
  score: 0,
  darkMode: darkModeOn === 'false' ? false : true,
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

    default: {
      return state;
    }
  }
};

export default reducers;
