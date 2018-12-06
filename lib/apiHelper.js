import * as React from "react";
//import config from "../appConfig/config";
import { getToken, getAppConfig } from "../util";

const makePostRequest = async (url, payLoad, token) => {
  /*  let formBody = [];
  for (const property in payLoad) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(payLoad[property]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }
  formBody = formBody.join('&');
*/
const config= await getAppConfig();
  console.log(config);
  let headers = {
    Accept: "application/json, application/xml, text/plain, text/html, *.*"
  };
  headers["content-type"] = "application/json";
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
console.log(config.API_URL + url);
  return fetch(config.API_URL + url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payLoad)
  }).then(response => {
    //  console.log(response);
    if (response.ok) {
      return response.json();
    }

    return new Promise((resolve, reject) => {
      response.text().then(message => {
        console.log(message);
        reject(message);
      });
    });
  })
  .catch(
    error =>
      new Promise((resolve, reject) => {
        console.log(error);
        reject(error.message ? error.message : error);
      })
  );
};

const makeGetRequest = async (token,url) => {
  const config= await getAppConfig();
  let headers = {
    Accept: "application/json, application/xml, text/plain, text/html, *.*"
  };
  headers["content-type"] = "application/json";
  headers["Authorization"] = `Bearer ${token}`;
  return fetch(config.API_URL + url, {
    method: "GET",
    headers: headers
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
    return new Promise((resolve, reject) => {
      response.text().then(message => {
        reject(message);
      });
    });
  })
  .catch(
    error =>
      new Promise((resolve, reject) => {
        reject(error.message ? error.message : error);
      })
  );
}

export const getEmployeeDashboard = (token, employeeId) => {
  console.log(`calling getEmployeeStatus =${employeeId}`);
    return makeGetRequest(token, `api/accounts/GetEmployeeDashboard?employeeId=${employeeId}`);
};

export const saveTimeTracking = (token, employeeData) =>
{
  console.log('calling SaveTimeTracking');
  return makePostRequest('api/accounts/TimeTrackingSave',employeeData, token );
}

export const getEmployeesAll = (token, employeeId, companyId) => {
  console.log('calling getJobCodesAll');
    return makeGetRequest(token, `api/accounts/GetAllEmployeeTimeTrackingStatus?companyId=${companyId}&employeeId=${employeeId}`);
};

export const getJobCodesAll = (token) => {
  console.log('calling getJobCodesAll');
    return makeGetRequest(token, "api/accounts/GetAllJobCode");
};

export const getSeverTime = (token) => {
    return makeGetRequest(token, "api/accounts/GetServerDateTime");
};

export const geoAddressApi = async (payLoad) =>{
    const config= await getAppConfig();
  return fetch(
      `${config.GEO_API_URL}${payLoad.latitute},${payLoad.longitude}&location_type=ROOFTOP&result_type=street_address&key=${
      config.GEO_API_KEY
    }`,
    {
      method: "GET",
      headers: {
        Accept: "application/json, application/xml, text/plain, text/html, *.*"
      }
    }
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return new Promise((resolve, reject) => {
        response.text().then(message => {
          reject(message);
        });
      });
    })
    .catch(
      error =>
        new Promise((resolve, reject) => {
          reject(error.message ? error.message : error);
        })
    );
}

export const userLogin = loginPayload => {
  return   makePostRequest("api/accounts/login", loginPayload);
};
