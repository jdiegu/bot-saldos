const axios = require('axios');
const { API_URL } = require('../config/env');

async function sendMessageToServer(number, message) {
  try {
    const response = await axios.post(API_URL, {
      number,
      message
    });

    return response.data.response;

  } catch (error) {
    console.error('Error conectando al server:', error.message);
    return 'Error al conectar con el servidor';
  }
}

module.exports = { sendMessageToServer };