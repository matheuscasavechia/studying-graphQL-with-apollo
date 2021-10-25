import React, {memo, useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

export interface Props {
  onSubmit: Function;
}

const ChatInput: React.FC<Props> = ({onSubmit}) => {
  const [value, setValue] = useState<string>('');

  const handleSubmit = () => {
    if (!onSubmit || !value || value.length === 0) {
      return;
    }

    setValue('');
    onSubmit(value);
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        returnKeyType="send"
        autoCapitalize="none"
        placeholder="type your message here..."
        autoCorrect={false}
        value={value}
        onChangeText={setValue}
        onSubmitEditing={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#121212',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#666',
    fontSize: 14,
    padding: 10,

    shadowColor: '#0074f3',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default memo(ChatInput);
