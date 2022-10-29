import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SectionList} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import * as KEYS from '../helpers/keys';
import {onApplySort} from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';

const tick = require('../../assets/ic_tick.png');

export const SortDataComponent = ({bSheetRef}) => {
  const dispatch = useDispatch();
  const {appliedFilters} = useSelector(state => state);

  const staticSortOptions = [
    {
      title: 'Price',
      data: ['Lowest First', 'Highest First'],
    },
    {
      title: 'Name',
      data: ['Ascending', 'Descending'],
    },
  ];

  const applyFilter = async item => {
    let ft = null;

    switch (item) {
      case 'Lowest First':
        ft = KEYS.SORT_BY_LOWEST_PRICE;
        break;

      case 'Highest First':
        ft = KEYS.SORT_BY_HIGHEST_PRICE;
        break;

      case 'Ascending':
        ft = KEYS.SORT_BY_ASCENDING_NAME;
        break;

      case 'Descending':
        ft = KEYS.SORT_BY_DESCENDING_NAME;
        break;
    }

    dispatch(onApplySort({ft, label: item}));
    bSheetRef.current.close();
  };

  return (
    <>
      <View style={styles.sheet}>
        <SectionList
          sections={staticSortOptions}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, index}) => {
            const isActive =
              appliedFilters.get(KEYS.APPLIED_FILTER_TYPE.SORT) === item;
            return (
              <View style={isActive ? styles.activeBg : styles.inActiveBg}>
                <Text
                  onPress={() => applyFilter(item)}
                  style={
                    isActive ? [styles.item, {color: '#E8A035'}] : styles.item
                  }
                  variant="labelLarge">
                  {item}
                </Text>
                {isActive ? (
                  <IconButton
                    icon={tick}
                    size={24}
                    iconColor={'#E8A035'}
                    onPress={() => {}}
                  />
                ) : null}
              </View>
            );
          }}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.sectionTitle} variant="titleLarge">
              {title}
            </Text>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sheet: {
    flex: 1,
  },
  item: {
    color: 'black',
    marginTop: 16,
  },
  sectionTitle: {
    color: 'lightgrey',
    marginTop: 16,
  },
  activeBg: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fbdeb2',
  },
  inActiveBg: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
});
