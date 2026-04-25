const axios = require("axios");
const { API_URL } = require("../config/env");

const api = axios.create({
  baseURL: API_URL,
});

exports.getBalance = async (phone) => {
  const res = await api.get(`/saldo/${phone}`);

  return res.data;
};

exports.addBalance = async (data) => {
  try {
    const res = await api.post("/saldo/agregar", data);

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error servidor");
  }
};

exports.removeBalance = async (data) => {
  try {
    const res = await api.post("/saldo/quitar", data);

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error servidor");
  }
};
