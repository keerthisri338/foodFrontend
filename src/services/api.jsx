import axios from "axios";

const BASE_URL = "https://food-backend-pb6h.onrender.com/food";

export const addFood = (data) => {
  return axios.post(`${BASE_URL}/add`, data);
};

export const getFood = () => {
  return axios.get(`${BASE_URL}/all`);
};
