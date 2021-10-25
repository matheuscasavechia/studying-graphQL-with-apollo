import React, {memo} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {ratesSub, fetchAllRates} from '../graphql';
import SubscribedList from './SubscribedList';
import RateItem from './RateItem';

export interface Props {
  containerStyle?: any;
}

const Rates: React.FC<Props> = ({containerStyle}) => {
  return (
    <View style={containerStyle}>
      <SubscribedList
        scrollable={false}
        containerStyle={styles.wrapper}
        queryGql={fetchAllRates}
        subscriptionGql={ratesSub}
        dataKey="rates"
        subscriptionKey="ratesUpdated"
        updateType="replace"
        itemRender={(rate: Rate) => <RateItem rate={rate} />}
        emptyMessage={() => (
          <View style={styles.emptyMsgWrapper}>
            <Text style={styles.emptyMsg}>no data do display</Text>
          </View>
        )}
        sortFn={(a: Rate, b: Rate) => {
          if (a.symbol < b.symbol) {
            return -1;
          }
          if (a.symbol > b.symbol) {
            return 1;
          }
          return 0;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 0,
    flexShrink: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  emptyMsgWrapper: {},
  emptyMsg: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default memo(Rates);
