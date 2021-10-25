import React, {memo, useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useMutation} from '@apollo/react-hooks';

import {fetchChatMessages, submitChatMessage, chatSub} from '../graphql';
import SubscribedList from './SubscribedList';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const Chat: React.FC = () => {
  const [submit] = useMutation(submitChatMessage);
  const myId = useRef<string>(
    '_' + Math.random().toString(36).substr(2, 9) + '_',
  );

  const onSubmit = (newMessage: string) => {
    submit({
      variables: {
        message: newMessage,
        author: myId.current,
      },
    });
  };

  return (
    <View style={styles.wrapper}>
      <SubscribedList
        containerStyle={styles.scrollStyle}
        queryGql={fetchChatMessages}
        subscriptionGql={chatSub}
        dataKey="chat"
        subscriptionKey="chatUpdated"
        itemRender={(chatMessage: ChatMessage) => (
          <ChatMessage chatMessage={chatMessage} me={myId.current} />
        )}
        emptyMessage={() => (
          <Text style={styles.emptyMessage}>
            🙁no message so far, be the first...
          </Text>
        )}
        sortFn={(a: ChatMessage, b: ChatMessage) => {
          if (Number(a.when) < Number(b.when)) {
            return 1;
          }
          if (Number(a.when) > Number(b.when)) {
            return -1;
          }
          return 0;
        }}
      />
      <ChatInput onSubmit={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#202020',
    borderRadius: 5,
    flexGrow: 1,
    flex: 1,
    marginHorizontal: 15,
  },
  scrollStyle: {
    flex: 1,
  },
  emptyMessage: {
    color: '#fff',
  },
});

export default memo(Chat);
