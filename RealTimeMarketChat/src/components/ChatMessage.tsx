import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export interface Props {
  chatMessage: ChatMessage;
  me: string;
}

const ChatMessage: React.FC<Props> = ({
  chatMessage: {message, author, when},
  me,
}) => {
  const wrapperStyle: any = {
    ...styles.wrapper,
    backgroundColor: author === me ? '#0074f3' : '#545454',
    alignSelf: author === me ? 'flex-end' : 'flex-start',
  };
  const whenStyle: any = {
    ...styles.when,
    textAlign: author === me ? 'right' : 'left',
  };
  const textStyle: any = {
    ...styles.text,
    textAlign: author === me ? 'right' : 'left',
  };
  const content =
    author === me ? message : `${author.toUpperCase()}: ${message}`;
  const date = new Date(Number(when));

  return (
    <View style={wrapperStyle}>
      <Text style={whenStyle} numberOfLines={5}>
        {date.getDate()}/{date.getMonth()}/{date.getFullYear()}{' '}
        {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
      </Text>
      <Text style={textStyle} numberOfLines={5}>
        {content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    marginHorizontal: 15,
  },
  when: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '300',
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default memo(ChatMessage);
