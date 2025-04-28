const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.CHAT_ID;
const apiUrl = process.env.API_URL;

const bot = new TelegramBot(telegramToken, { polling: false });

async function fetchAndSend() {
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    const message = `API result:\n${JSON.stringify(data)}`;

    await bot.sendMessage(chatId, message);
    console.log('Message sent!');
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchAndSend();
