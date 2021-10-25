import React, {useEffect, useCallback} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useQuery} from '@apollo/react-hooks';

import Loading from './Loading';

export interface Props {
  queryGql: import('graphql').DocumentNode;
  subscriptionGql: import('graphql').DocumentNode;
  dataKey: string;
  subscriptionKey: string;
  itemRender: (data: any) => React.ReactNode;
  emptyMessage?: () => React.ReactNode;
  sortFn?: Function;
  containerStyle?: any;
  scrollable?: boolean;
  updateType?: 'replace' | 'append';
}

const SubscribedList: React.FC<Props> = ({
  queryGql,
  subscriptionGql,
  dataKey,
  subscriptionKey,
  itemRender,
  emptyMessage,
  sortFn,
  containerStyle,
  scrollable = true,
  updateType = 'append',
}) => {
  const {data, loading, error, subscribeToMore} = useQuery(queryGql);
  const subscribeToMoreData = useCallback(() => {
    subscribeToMore({
      document: subscriptionGql,
      onError: console.log,
      updateQuery: (prev: any, {subscriptionData}: any) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const next = subscriptionData?.data[subscriptionKey];
        const prevData = prev[dataKey] || [];

        if (updateType === 'append') {
          return Object.assign({}, prev, {
            [dataKey]: [...prevData, next],
          });
        } else {
          return Object.assign({}, prev, {
            [dataKey]: next,
          });
        }
      },
    });
  }, [subscribeToMore, subscriptionGql, dataKey, subscriptionKey, updateType]);

  useEffect(() => {
    subscribeToMoreData();
  }, [subscribeToMoreData]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <View style={containerStyle}>
        <Text>Error: {error?.message}</Text>
      </View>
    );
  }

  let collection = data && data[dataKey] ? data[dataKey] : [];
  if (sortFn) {
    collection = collection.sort(sortFn);
  }

  if (!collection || collection.length === 0) {
    return emptyMessage ? (
      <View style={styles.emptyMsgWrapper}>{emptyMessage()}</View>
    ) : (
      <View />
    );
  }

  return (
    <ScrollView
      style={containerStyle}
      scrollEnabled={scrollable}
      bounces={false}>
      {React.Children.toArray(
        collection.map((item: unknown) => itemRender(item)),
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  emptyMsgWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SubscribedList;
