import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, SectionList, Pressable} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import * as KEYS from '../helpers/keys';
import {onApplyFilter, onClearFilter} from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';

const tick = require('../../assets/ic_tick.png');

export const FilterDataComponent = ({bSheetRef}) => {
  const dispatch = useDispatch();
  const [localFilters, setLocalFilters] = useState(new Map());
  const {appliedFilters, allProducts} = useSelector(state => state);

  // memoize categories
  const allCategories = useMemo(() => {
    return allProducts.reduce((acc, item) => acc.add(item.category), new Set());
  }, [allProducts]);

  const staticFilterOptions = [
    {
      title: 'Category',
      data: [...allCategories],
    },
    {
      title: 'Ratings',
      data: ['Ratings > 3', 'Ratings > 4'],
    },
  ];

  // ft = filter type
  // st = search text (condition value to use in sort, filter)
  const applyFilter = (item, title) => {
    let ft = null;
    let st = null;

    switch (item) {
      case 'Ratings > 3':
        st = 3;
        ft = KEYS.FILTER_BY_RATING_VALUE;
        break;

      case 'Ratings > 4':
        st = 4;
        ft = KEYS.FILTER_BY_RATING_VALUE;
        break;

      default:
        st = item;
        ft = KEYS.FILTER_BY_CATEGORY_NAME;
        localFilters.clear();
        break;
    }

    // accumulate all filters from UI and run later on button click
    localFilters.set(title, {ft, st, label: item});
    setLocalFilters(new Map(localFilters));
  };

  const getActiveStatus = (item, title) => {
    // Check from global filters to set active filter status in UI,
    // If user starts choosing other filters (BEFORE CLICKING SHOW) then move to localFilters to update
    // selected filter item in UI
    if (localFilters.size === 0) {
      return appliedFilters?.get(KEYS.APPLIED_FILTER_TYPE.FILTER)?.has(item);
    }

    // if user is trying to select filters from UI BEFORE CLICKING ON SHOW, use local state to
    // show SELECTED filter item
    return localFilters?.get(title)?.label === item;
  };

  return (
    <>
      <View style={styles.sheet}>
        <SectionList
          sections={staticFilterOptions}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, index, section: {title}}) => {
            const isActive = getActiveStatus(item, title);
            return (
              <View style={isActive ? styles.activeBg : styles.inActiveBg}>
                <Text
                  onPress={() => applyFilter(item, title)}
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
        <View style={styles.buttonsContainer}>
          <Pressable
            style={styles.clearAllContainer}
            onPress={() => {
              dispatch(onClearFilter());
              setLocalFilters(new Map());
              bSheetRef.current.close();
            }}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </Pressable>
          <Pressable
            style={styles.showContainer}
            onPress={() => {
              dispatch(onApplyFilter(localFilters));
              bSheetRef.current.close();
            }}>
            <Text style={styles.showText}>Show</Text>
          </Pressable>
        </View>
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  clearAllContainer: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E8A035',
    backgroundColor: '#fff',
    margin: 8,
  },
  clearAllText: {
    color: '#E8A035',
    fontSize: 16,
    textAlign: 'center',
  },
  showContainer: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#E8A035',
    margin: 8,
  },
  showText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
