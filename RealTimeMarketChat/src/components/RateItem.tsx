import React, {memo, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export interface Props {
  rate: Rate;
}

const transformPercentage = (value: number) => {
  return `${Number(value).toFixed(2)}%`;
};

const RateItem: React.FC<Props> = ({rate}) => {
  const [highlighted, setHighlighted] = useState(false);
  const {symbol, value, diff} = rate;
  const wrapperStyle = {
    ...styles.item,
    backgroundColor: highlighted ? '#fff' : '#121212',
    borderColor: highlighted ? '#ddd' : '#212121',
  };
  const diffWrapperStyle = {
    ...styles.diffWrapper,
    backgroundColor: diff >= 0 ? '#43db5c' : '#ff3724',
  };
  const symbolStyle = {
    ...styles.symbol,
    color: highlighted ? '#121212' : '#fff',
  };
  const valueStyle = {...styles.value, color: highlighted ? '#121212' : '#fff'};
  const diffPrefix = diff > 0 ? '+' : '';

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={wrapperStyle}
      onPress={() => setHighlighted(!highlighted)}>
      <Text style={symbolStyle} numberOfLines={1}>
        {symbol}
      </Text>
      <View style={styles.info}>
        <Text style={valueStyle} numberOfLines={1}>
          {value}
        </Text>
        <View style={diffWrapperStyle}>
          <Text style={styles.diff} numberOfLines={1}>
            {diffPrefix}
            {transformPercentage(diff)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  symbol: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'right',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '300',
    textAlign: 'right',
  },
  diffWrapper: {
    borderRadius: 5,
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 0,
    width: 60,
  },
  diff: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default memo(RateItem);
