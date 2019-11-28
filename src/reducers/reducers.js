const initialState = {
  score: new Map(),
  fetching: true
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_HS_BOARD": {
      return {
        ...state,
        fetching: action.fetching
      };
    }

    case "FETCH_DB_SCORES":
      return {
        ...state,
        score: action.scores
      };

    default: {
      return state;
    }
  }
};

export default reducers;
