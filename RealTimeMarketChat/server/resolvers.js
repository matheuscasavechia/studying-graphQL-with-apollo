const {PubSub} = require('apollo-server-express');
const finnhub = require('finnhub');

const pubsub = new PubSub();
const api_key = finnhub.ApiClient.instance.authentications.api_key;
api_key.apiKey = 'brqbrdfrh5rc4v2pk2ng'; // Replace with your API KEY (https://finnhub.io/register)
const finnhubClient = new finnhub.DefaultApi();

const RATES_UPDATED = 'RATES_UPDATED';
const CHAT_UPDATED = 'CHAT_UPDATED';

let symbols = ['GOOG', 'FB', 'TSLA'];
let rates = [];
let chat = [
  {message: 'mock message 1', author: 'Server', when: Date.now()},
  {message: 'mock message 2', author: 'Server', when: Date.now()},
];

const getSymbolData = (symbol) => {
  return new Promise((resolve) => {
    finnhubClient.quote(symbol, (error, data, response) => {
      if (response.error || !data) {
        return rates[symbol];
      }

      if (!data.c || !data.pc) {
        resolve({symbol, value: 0, diff: 0});
      } else {
        const diff = ((data.c - data.pc) / data.pc) * 100 * Math.random();
        const value = data.c ? Number(data.c).toFixed(2) : 0;
        resolve({symbol, value, diff});
      }
    });
  });
};

let mockRefetchStarted = false;
const updateMemoryDb = async () => {
  try {
    const data = symbols.map((symbol) => {
      return getSymbolData(symbol);
    });
    rates = await Promise.all(data);
    pubsub.publish(RATES_UPDATED, {ratesUpdated: rates});
  } catch (error) {
    console.log(`updateMemoryDb: ${error}`);
  }
  setTimeout(updateMemoryDb, 5000);
};

if (!mockRefetchStarted) {
  updateMemoryDb();
  mockRefetchStarted = true;
}

module.exports = {
  Query: {
    rates: () => {
      return rates;
    },
    chat: () => {
      return chat;
    },
  },
  Mutation: {
    async addSymbol(root, {symbol = ''}, context) {
      if (symbols.includes(symbol)) {
        return null;
      }

      symbols = [...symbols, symbol];
      const rate = await getSymbolData(symbol);
      rates = [...rates, rate];
      pubsub.publish(RATES_UPDATED, {ratesUpdated: rates});

      return rate;
    },
    async addChatMessage(root, args, context) {
      const addedChat = {...args, when: Date.now()};
      chat.push(addedChat);
      pubsub.publish(CHAT_UPDATED, {chatUpdated: addedChat});

      return addedChat;
    },
  },
  Subscription: {
    ratesUpdated: {
      subscribe: () => pubsub.asyncIterator([RATES_UPDATED]),
    },
    chatUpdated: {
      subscribe: () => pubsub.asyncIterator([CHAT_UPDATED]),
    },
  },
};
