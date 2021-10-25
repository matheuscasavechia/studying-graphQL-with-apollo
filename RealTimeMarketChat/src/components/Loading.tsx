import React, {memo} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

const Loading: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    margin: 30,
  },
});

export default memo(Loading);
