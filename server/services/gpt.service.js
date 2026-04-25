const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function getGPTResponse(messages) {
  try {
    const response = await client.responses.create({
      model: "gpt-5.4",
      input: [
        {
          role: "system",
          content: "Eres un asistente útil, breve, claro y amigable para WhatsApp. Responde en pocas líneas."
        },
        ...messages
      ]
    });

    return response.output_text?.trim() || "Sin respuesta";

  } catch (error) {
    console.error("OpenAI error:", error.response?.data || error.message);
    return "Error con IA";
  }
}

module.exports = { getGPTResponse };