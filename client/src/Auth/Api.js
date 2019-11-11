import axios from 'axios';
import LOCAL_STORAGE_KEY from '../constants/constant';

export const axiosWithAuth = () => {
  return axios.create({
     baseURL: `http://localhost:5000/`,
     headers: {
        Authorization: localStorage.getItem(LOCAL_STORAGE_KEY)
     }
  })
}