import axios from "axios";


const BASE_URL = "https://food-backend-pb6h.onrender.com";

export const addFood = (data) =>
  axios.post(`${BASE_URL}/add`, data);

export const getFood = () =>
  axios.get(`${BASE_URL}/all`);
