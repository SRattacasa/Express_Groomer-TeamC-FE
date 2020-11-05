import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import {
    GET_CUSTOMER_INFO_START,
    GET_CUSTOMER_INFO_SUCCESS,
    GET_CUSTOMER_INFO_FAILURE,
    REGISTER_CUSTOMER_INFO_START,
    REGISTER_CUSTOMER_INFO_SUCCESS,
    REGISTER_CUSTOMER_INFO_FAILURE,
    GET_GROOMER_INFO_START,
    GET_GROOMER_INFO_SUCCESS,
    GET_GROOMER_INFO_FAILURE,
    REGISTER_GROOMER_INFO_START,
    REGISTER_GROOMER_INFO_SUCCESS,
    REGISTER_GROOMER_INFO_FAILURE
} from './types';

let groomersReq = `${process.env.REACT_APP_API_URI}/groomers`;
let customersReq = `${process.env.REACT_APP_API_URI}/customers`;

// we will define a bunch of API calls here.
const apiUrl = `${process.env.REACT_APP_API_URI}/profiles`;
const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });
const getExampleData = () => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/photos?albumId=1`)
    .then(response => response.data);
};


const getGroomerData = () => {
  return axios.get(groomersReq).then(response => {
    let groomers = response.data;
    return groomers;
  });
};


const requestUserGroomers = axios.get(groomersReq);
const requestUserCustomers = axios.get(customersReq);

const getUserData = () => {
  return axios
    .all([requestUserGroomers, requestUserCustomers])
    .then(
      axios.spread((...responses) => {
        let users = [...responses[0].data, ...responses[1].data];
        return users;
      })
    )

    .catch(errors => {
      return errors;
    });
};

// original function
const getGUserData = () => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/photos?albumId=1`)
    .then(response => response.data);
};


const getAuthHeader = authState => {
  if (!authState.isAuthenticated) {
    throw new Error('Not authenticated');
  }
  return { Authorization: `Bearer ${authState.idToken}` };
};
const getDSData = (url, authState) => {
  // here's another way you can compose together your API calls.
  // Note the use of GetAuthHeader here is a little different than in the getProfileData call.
  const headers = getAuthHeader(authState);
  if (!url) {
    throw new Error('No URL provided');
  }
  return axios
    .get(url, { headers })
    .then(res => JSON.parse(res.data))
    .catch(err => err);
};
const apiAuthGet = authHeader => {
  return axios.get(apiUrl, { headers: authHeader });
};
const getProfileData = authState => {
  try {
    return apiAuthGet(getAuthHeader(authState)).then(response => response.data);
  } catch (error) {
    return new Promise(() => {
      console.log(error);
      return [];
    });
  }
};

const getCustomerInfo = id => dispatch => {
  dispatch({ type: GET_CUSTOMER_INFO_START });

  axios
    .get(`${process.env.REACT_APP_API_URI}customers/${id}`)
    .then(res => {
      dispatch({ type: GET_CUSTOMER_INFO_SUCCESS, payload: res.body });
    })
    .catch(err => {
      dispatch({ type: GET_CUSTOMER_INFO_FAILURE, payload: err.message });
    });
};

const getGroomerInfo = id => dispatch => {
  dispatch({ type: GET_GROOMER_INFO_START });

  axios
    .get(`${process.env.REACT_APP_API_URI}groomers/${id}`)
    .then(res => {
      dispatch({ type: GET_GROOMER_INFO_SUCCESS, payload: res.body });
    })
    .catch(err => {
      dispatch({ type: GET_GROOMER_INFO_FAILURE, payload: err.message });
    });
};

const registerCustomer = data => dispatch => {
    dispatch({type: REGISTER_CUSTOMER_INFO_START})
    
    axios
    .post('https://labspt12-express-groomer-a-api.herokuapp.com/customers', {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        zipcode: data.zip,
        description: data.description,
        photo_url: data.photo_url,
    })
        .then(res => {
            dispatch({ type: REGISTER_CUSTOMER_INFO_SUCCESS, payload: res.body });
        })
        .catch(res => {
            dispatch({ type: REGISTER_CUSTOMER_INFO_FAILURE, payload: err.message });
        })
        
}

const registerGroomer = data => dispatch => {
    dispatch({type: REGISTER_GROOMER_INFO_START})

    axios
       .post('https://labspt12-express-groomer-a-api.herokuapp.com/groomers', {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        zipcode: data.zip,
        description: data.description,
        photo_url: data.photo_url,
        walk_rate: data.walk_rate,
        day_care_rate: data.day_care_rate,
        vet_visit_rate: data.vet_visit_rate,
      })
        .then(res => {
            dispatch({ type: REGISTER_GROOMER_INFO_SUCCESS, payload: res.body });
            <Route to="/groomer-dashboard" />
        })
        .catch(res => {
            dispatch({ type: REGISTER_GROOMER_INFO_FAILURE, payload: err.message });
        })
    
}
 
export {
  sleep,
  getExampleData,
  getProfileData,
  getDSData,
  getCustomerInfo,
  getGroomerInfo,
  getGroomerData,
  getUserData,
  registerCustomer,
  registerGroomer,

};
