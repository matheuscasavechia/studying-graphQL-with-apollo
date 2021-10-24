const {gql} = require('apollo-server-express');

module.exports = gql`
  type Rate {
    symbol: String!
    value: Float!
    diff: Float!
  }

  type ChatMessage {
    message: String!
    author: String!
    when: String!
  }

  type Query {
    rates: [Rate]
    chat: [ChatMessage]
  }

  type Mutation {
    addSymbol(symbol: String!): Rate
    addChatMessage(message: String!, author: String!): ChatMessage
  }

  type Subscription {
    ratesUpdated: [Rate]!
    chatUpdated: ChatMessage!
  }
`;
