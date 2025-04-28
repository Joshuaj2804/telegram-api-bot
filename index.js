const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const telegramToken = "6370128072:AAEm5rKsJMwzn5y6_IkXWwKnhJV7IIbrhYw";
const chatId = "-1002235029470";
const username = '479dfc9dbe26dc72315f';
const password = '73ad5849b066f1d8';
//const apiUrl = process.env.API_URL;

const bot = new TelegramBot(telegramToken, { polling: false });

function bytesToGB(bytes) {
    return (bytes / (1024 ** 3)).toFixed(2); // 1 GB = 1024^3 bytes
  }

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
            const data = response.data;

            // Extract and convert values
            const totalTrafficGB = bytesToGB(data.total_traffic);
            const usedTrafficGB = bytesToGB(data.traffic_used);
            const leftTrafficGB = bytesToGB(data.traffic_left);
            const usedThreads = data.used_threads;
            const login = data.login;
            const status = data.status;

            // Create a nice message with Markdown formatting
            const message = `
        📊 *Traffic Report* 📊

        👤 *User*: \`${login}\`
        🟢 *Status*: *${status}*

        📈 *Total Traffic*: *${totalTrafficGB} GB*
        📉 *Used Traffic*: *${usedTrafficGB} GB*
        🛡️ *Remaining Traffic*: *${leftTrafficGB} GB*

        🧵 *Used Threads*: *${usedThreads}*

        ⏱️ _Data refreshed just now_
            `;
            bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
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
