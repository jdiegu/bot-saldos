const Message = require("../models/messages.model");

const { getGPTResponse } = require('../services/gpt.service');

exports.processMessage = async (req, res, next) => {
  try {
    const { number, message } = req.body;

    // 1. Guardar mensaje del usuario
    await Message.create({
      number,
      message
    });

    // 2. Obtener historial (ordenado)
    const historyDB = await Message.find({ number })
      .sort({ createdAt: 1 })
      .limit(20);

    // 3. Construir contexto REAL (user + assistant)
    const history = [];

    for (const msg of historyDB) {
      // mensaje del usuario
      if (msg.message) {
        history.push({
          role: "user",
          content: msg.message
        });
      }

      // respuesta del bot
      if (msg.response) {
        history.push({
          role: "assistant",
          content: msg.response
        });
      }
    }

    // 4. Obtener respuesta IA
    const response = await getGPTResponse(history);

    // 5. Guardar respuesta en el MISMO documento del usuario
    await Message.findOneAndUpdate(
      { number, message },
      { response },
      { sort: { createdAt: -1 } }
    );

    // 6. Responder al bot
    res.json({ response });

  } catch (err) {
    console.error("Error en processMessage:", err.message);
    next(err);
  }
};

exports.getMessages = async (_req, res, next) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    next(err);
  }
};

exports.getMessagesByNumber = async (req, res, next) => {
  try {
    const msgs = await Message.find({'number' : req.params.number});
    if (!msgs) {
      return res.status(404).json({ error: "Msgs not found" });
    }

    res.json(msgs);
  } catch (err) {
    next(err);
  }
};

exports.updateMsg = async (req, res, next) => {
  try {
    const msg = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!msg) {
      return res.status(404).json({ error: "Msg not found" });
    }

    res.json(msg);
  } catch (err) {
    next(err);
  }
};

exports.deleteMsg = async (req, res, next) => {
  try {
    const msg = await Item.findByIdAndDelete(req.params.id);
    if (!msg) {
      return res.status(404).json({ error: "Msg not found" });
    }
    res.json({ message: "Msg deleted" });
  } catch (err) {
    next(err);
  }
};
