import axios from "axios";


const BASE_URL = "https://foodbackend-xlax.onrender.com";

export const addFood = (data) =>
  axios.post(`${BASE_URL}/add`, data);

export const getFood = () =>
  axios.get(`${BASE_URL}/all`);