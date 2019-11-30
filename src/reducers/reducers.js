import Backdrop from "../UI/Backdrop/Backdrop";
import React,{ReactChild} from 'react';

const initialState = {
  fetching: false,
  showBackrop: true,
  score: 0
}


const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SWITCH_BACKDROP' :
    if(action.event.target.className.includes('Backdrop')) {
      return {
        ...state,
       showBackrop: !state.showBackrop
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
