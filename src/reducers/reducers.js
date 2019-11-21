const initialState = {
  score: new Map(),
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

      default: {
        return state 
      }
  }
   
}

export default reducers;