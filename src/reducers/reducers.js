
const initialState = {
  fetching: false,
  showMailDialog: false,
  showHighscoreDialog:false,
  score: 0
}

const reducers = (state = initialState, action) => {
  switch (action.type) {

    case 'SHOW_MAIL_DIALOG' : {
      console.log('SHOW_MAIL_DIALOG') ;
      return {
        ...state,
        showMailDialog: !state.showMailDialog
      }
    }
 
    case 'SHOW_HIGHSCORE_DIALOG' : {
      console.log('SHOW_HIGHSCORE_DIALOG') ;
      return {
        ...state,
        showHighscoreDialog: !state.showHighscoreDialog
      }
    }


    case "UPDATE_HS_BOARD": {
      return {
        ...state,
        fetching: action.fetching
      };
    }


      case 'UPDATE_SCORESTRIKE' : {
        return {
          ...state,
          score: action.score
        }
      }

      default: {
        return state 
      }

  }
};

export default reducers;
