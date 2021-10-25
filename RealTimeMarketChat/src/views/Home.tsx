import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
} from 'react-native';

import Rates from '../components/Rates';
import Chat from '../components/Chat';

const Home = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView style={styles.keyboardAvoider} behavior="padding">
        <Text style={styles.title}>Your Live Rates</Text>
        <Rates />
        <Chat />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#000',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  keyboardAvoider: {
    flex: 1,
  },
  title: {
    color: '#fff',
    padding: 10,
    fontSize: 22,
    fontWeight: '100',
    textAlign: 'center',
  },
});

export default Home;
