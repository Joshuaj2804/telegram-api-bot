const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const telegramToken = "6370128072:AAEm5rKsJMwzn5y6_IkXWwKnhJV7IIbrhYw";
const chatId = "-1002235029470";
const username = '479dfc9dbe26dc72315f';
const password = '73ad5849b066f1d8';
//const apiUrl = process.env.API_URL;

const bot = new TelegramBot(telegramToken, { polling: false });

async function fetchAndSend() {
  try {

        let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://gw.dataimpulse.com:777/api/stats',
        auth: {
            username: username,
            password: password
        }
        // headers: { 
        //     'Authorization': '••••••'
        // }
        };

        axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            bot.sendMessage(chatId, JSON.stringify(response.data));
            console.log('Message sent!');
        })
        .catch((error) => {
        console.log(error);
        });
    // const response = await axios.get(apiUrl);
    // const data = response.data;

    // const message = `API result:\n${JSON.stringify(data)}`;

    
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchAndSend();
