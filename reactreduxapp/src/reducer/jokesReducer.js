import { START_FETCHING, FETCH_SUCCESS, FETCH_FAILURE } from '../actions'

export const initialState = {
  joke: {},
  isFetching: false,
  error: ''
}

// type: '', //single or twopart
// joke: '', //only present for single type
// setup: '', //only present for twopart
// delivery: '', //only present for twopart

export const reducer = (state = initialState, action) => {
  switch (action.type){
    case START_FETCHING:
      return{
        ...state,
        isFetching: true,
        error: ''
      };
    case FETCH_SUCCESS:
      return{
        ...state,
        isFetching: false,
        error: '',
        joke: action.payload
      };
    case FETCH_FAILURE:
      return{
        ...state,
        isFetching: false,
        error: action.payload
      };
    default:
      return state
  }
}