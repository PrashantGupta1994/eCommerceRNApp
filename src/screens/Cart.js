import React from 'react';
import {View, Text, FlatList, StyleSheet, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CartToolbar} from '../components/CartToolbar';
import {Product} from '../components/Product';
import {removeProductFromCart, addProductToCart} from '../redux/actions';

export const Cart = props => {
  const {allProducts} = useSelector(state => state);
  const dispatch = useDispatch();

  // calc UI values
  const products = allProducts.filter(item => item.qty > 0);
  const total = products.reduce((acc, item) => (acc += item.totalPrice), 0);

  return (
    <>
      <CartToolbar navigation={props.navigation} />
      <View style={styles.container}>
        <FlatList
          style={styles.itemsList}
          data={products}
          renderItem={({item, index}) => {
            return (
              <Product
                key={index}
                item={item}
                mode={'HORIZONTAL'}
                removeProductFromCart={product =>
                  dispatch(removeProductFromCart(product))
                }
                addProductToCart={product =>
                  dispatch(addProductToCart(product))
                }
              />
            );
          }}
          keyExtractor={item => item.id.toString()}
        />
        <View style={styles.cartLineTotal}>
          <View>
            <Text style={[{fontSize: 14}, styles.lineTotal]}>Total</Text>
            <Text style={[{fontSize: 20}, styles.lineTotal]}>
              ₹ {parseFloat(total).toFixed(2)}
            </Text>
          </View>
          <Pressable style={styles.checkoutButton}>
            <Text style={styles.lineRight}>Checkout</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cartLineTotal: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    justifyContent: 'space-between',
  },
  lineTotal: {
    fontWeight: 'bold',
    color: '#333333',
  },
  lineRight: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  itemsList: {
    padding: 8,
    backgroundColor: '#fff',
  },
  checkoutButton: {
    borderRadius: 8,
    backgroundColor: '#E8A035',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 40,
    paddingLeft: 40,
    paddingTop: 12,
    paddingBottom: 12,
  },
});
