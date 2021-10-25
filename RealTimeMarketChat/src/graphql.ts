import {gql} from 'apollo-boost';

export const fetchAllRates = gql`
  query {
    rates {
      symbol
      value
      diff
    }
  }
`;

export const ratesSub = gql`
  subscription {
    ratesUpdated {
      symbol
      value
      diff
    }
  }
`;

export const fetchChatMessages = gql`
  query {
    chat {
      message
      author
      when
    }
  }
`;

export const submitChatMessage = gql`
  mutation addChatMessage($message: String!, $author: String!) {
    addChatMessage(message: $message, author: $author) {
      message
      author
      when
    }
  }
`;

export const chatSub = gql`
  subscription {
    chatUpdated {
      message
      author
      when
    }
  }
`;
