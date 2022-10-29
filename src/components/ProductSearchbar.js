import React, {useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Searchbar, IconButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {onApplySearch} from '../redux/actions';
import * as KEYS from '../helpers/keys';
import {BottomSheetComponent} from './BottomSheetComponent';
import {FilterDataComponent} from './FilterDataComponent';

const search = require('../../assets/ic_search.png');
const clear = require('../../assets/ic_clear.png');
const filter = require('../../assets/ic_filter.png');

export const ProductSearchbar = props => {
  const _bSheetRef = useRef();
  // let _debounce = null;
  const dispatch = useDispatch();
  const {appliedFilters, searchText} = useSelector(state => state);

  const updateState = value => {
    const params = {
      st: value,
      ft: value === '' ? KEYS.CLEAR_SEARCH : KEYS.SEARCH,
    };

    /* Skipping debounce as data is locally sourced */
    // clearTimeout(_debounce);
    // _debounce = setTimeout(() => {
    // }, 500);

    dispatch(onApplySearch(params));
  };

  const isFilterApplied = appliedFilters.has(KEYS.APPLIED_FILTER_TYPE.FILTER);
  return (
    <>
      <View style={styles.container}>
        <Searchbar
          style={styles.input}
          inputStyle={{fontSize: 16}}
          elevation={0}
          placeholder="Search"
          value={searchText}
          icon={search}
          clearIcon={clear}
          iconColor={'lightgrey'}
          onChangeText={updateState}
        />
        <IconButton
          icon={filter}
          size={24}
          selected={isFilterApplied}
          containerColor={isFilterApplied ? '#f5bf6f' : '#fff'}
          onPress={() => _bSheetRef.current.open()}
        />
      </View>
      <BottomSheetComponent ref={_bSheetRef}>
        <FilterDataComponent bSheetRef={_bSheetRef} />
      </BottomSheetComponent>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingBottom: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#f7f8f9',
    borderRadius: 8,
  },
});
