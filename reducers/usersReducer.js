import {
  USER_LOGIN,
  GET_ALL_JOBCODE,
  GET_ALL_EMP,
  GET_TIME,SET_TOKEN,
  LOADING_API_DATA
} from "../actions/types";

const initialState = {
  loggedInUser: {},
  allJobcodes: [],
  isLoadingRequestData: false
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        loggedInUser: action.payload
      };
    case GET_ALL_JOBCODE:
      return {
        ...state,
        allJobcodes: action.payload
      };
    case GET_ALL_EMP:
      return {
        ...state,
        allEmployees: action.payload
      };
    case GET_TIME:
      return {
        ...state,
        currentTime: action.payload
      };
      case SET_TOKEN:
      return {
        ...state,
        authToken: action.payload
      };
      case LOADING_API_DATA:
      return {
        ...state,
        isLoadingRequestData: action.payload
      };
        break;
    default:
      return state;
  }
};

export default usersReducer;
