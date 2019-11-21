import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://hangman-420d0.firebaseio.com/'
})

export default instance;