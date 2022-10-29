import React, {useMemo, useRef} from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import {Appbar} from 'react-native-paper';
import {BottomSheetComponent} from './BottomSheetComponent';
import {SortDataComponent} from './SortDataComponent';

const icSort = require('../../assets/ic_sort.png');
const icCart = require('../../assets/ic_cart.png');

export const ProductListToolbar = ({navigation, allProducts}) => {
  const _bSheetRef = useRef();

  // get all products with qty > 0 to show in cart
  const cart = allProducts.filter(item => item.qty > 0);

  return (
    <>
      <StatusBar backgroundColor={'#fff'} />
      <Appbar.Header style={styles.toolbar}>
        <Appbar.Action
          icon={icSort}
          onPress={() => _bSheetRef.current.open()}
        />
        <Appbar.Action
          icon={icCart}
          onPress={() => navigation.navigate('Cart')}
        />
        <View style={styles.cartValueContainer}>
          <Text style={styles.valueText}>{cart?.length || 0}</Text>
        </View>
      </Appbar.Header>
      <BottomSheetComponent ref={_bSheetRef}>
        <SortDataComponent bSheetRef={_bSheetRef} />
      </BottomSheetComponent>
    </>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  cartValueContainer: {
    position: 'absolute',
    height: 16,
    width: 16,
    right: 14,
    top: 14,
    backgroundColor: '#E8A035',
    borderRadius: 24 / 2,
  },
  valueText: {color: '#fff', fontSize: 11, textAlign: 'center'},
});
