const initialState = {
  score: new Map(),
  fetching: false,
}

const reducers = (state = initialState, action ) => {
  switch (action.type) {
    case 'UPDATE_HIGHSCORE_BOARD' : 
      const updatedHSMap = new Map(state.score);
      updatedHSMap.set(action.name,action.score);
      return {
        ...state,
        score: updatedHSMap
      }

      case 'FETCH_HIGHSCORE_BOARD' :
        const fetch = state.fetching;
        console.log(state.fetching);
      return {
        ...state,
        fetching: !fetch,
      }

      default: {
        return state 
      }
  }
   
}

export default reducers;