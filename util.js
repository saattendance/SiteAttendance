import { AsyncStorage } from 'react-native';

const AUTH_TOKEN = 'AUTH_TOKEN';
const LAST_LOC ='LAST_LOC';
const APP_CONFIG = 'APP_CONFIG';

let token;
let location;
let appConfigs;
export const getToken = async () => {
  if (token) {
    return token;
  }

  token = await AsyncStorage.getItem(AUTH_TOKEN);
  if(token)
  token =  JSON.parse(token);
  return token;
};

export const signIn = async (newToken) => {
  token = newToken;
  return  await AsyncStorage.setItem(AUTH_TOKEN, JSON.stringify(newToken));
};

export const signOut = async () => {
  token = undefined;
  return await AsyncStorage.removeItem(AUTH_TOKEN);
};

export const setLastLocation = async (loc) => {
  location =loc;
  return await AsyncStorage.setItem(LAST_LOC, JSON.stringify(loc));
}

export const getLastLocation = async () => {
  if (location) {
    return Promise.resolve(location);
  }
  let x =await AsyncStorage.getItem(LAST_LOC);
  if(x)
  location =  JSON.parse(x);
  return location;
}

export const setAppConfig = async (configs) => {
  appConfigs =configs;
  return await AsyncStorage.setItem(LAST_LOC, JSON.stringify(appConfigs));
}

export const getAppConfig = async () => {
  if (appConfigs) {
    return Promise.resolve(appConfigs);
  }
  let x =await AsyncStorage.getItem(APP_CONFIG);
  if(x)
  appConfigs =  JSON.parse(x);
  return appConfigs;
}
