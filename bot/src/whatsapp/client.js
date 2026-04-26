const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const messageRouter = require("./messageRouter");
const puppeteer = require("puppeteer");

const client = new Client({
  authStrategy: new LocalAuth(),

  puppeteer: {
    executablePath: puppeteer.executablePath(),

    headless: true,

    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

client.on("qr", (qr) => {
  console.log("Escanea QR");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Bot listo");
});

client.on("message", async (msg) => {
  try {
    await messageRouter(msg, client);
  } catch (e) {
    console.error(e);
    msg.reply("Error procesando comando");
  }
});

module.exports = client;
