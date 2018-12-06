import { USER_LOGIN, GET_ALL_JOBCODE, GET_ALL_EMP, GET_TIME, SET_TOKEN, LOADING_API_DATA } from "./types";

export const toggleLoading =(value)=>{
//  console.log(value);
  return  {
  type:LOADING_API_DATA,
  payLoad:value
  };
};

export const setAuthToken = (token) => {
  return {
    type: SET_TOKEN,
    payload: token
  };
};

export const getCurrentTime = (dateTime) => {
  return {
    type: GET_TIME,
    payload: dateTime
  };
};

export const getAllEmployees = (employeeList) => {
  return {
    type: GET_ALL_EMP,
    payload: employeeList
  };
};

export const userSignIn = userData => {
  return {
    type: USER_LOGIN,
    payload: userData
  };
};

export const getAllJobCodes = (jobCodes) => {
  return {
    type: GET_ALL_JOBCODE,
    payload: jobCodes
  };
};
