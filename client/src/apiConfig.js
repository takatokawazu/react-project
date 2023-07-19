import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api', // Replace with your desired host and port
});

export default instance;
