// api.js

import axios from 'axios';
const backend = process.env.VUE_APP_API;

const instance = axios.create({
  baseURL: backend, // Set your API base URL here
  timeout: 5000, // Set a timeout for requests (optional)
});

export const countryInstance = axios.create({
baseURL: 'https://restcountries.com/v3.1/', // Set your API base URL here
timeout: 5000, // Set a timeout for requests (optional)})
})

export default instance;