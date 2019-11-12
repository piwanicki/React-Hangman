export const updateHighscore = (state = [], action) => {
  switch(action.type) {
    case 'UPDATE_HIGHSCORE_BOARD' :
      return [...action.highscore];
    default:
      return state;  
  }
}