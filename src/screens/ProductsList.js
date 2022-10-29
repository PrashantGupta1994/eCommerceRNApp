import React, {useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Product} from '../components/Product';
import {
  getProducts,
  removeProductFromCart,
  addProductToCart,
} from '../redux/actions';
import {ProductListToolbar} from '../components/ProductListToolbar';
import {ProductSearchbar} from '../components/ProductSearchbar';
import {SafeAreaView} from 'react-native-safe-area-context';

export const ProductsList = props => {
  const dispatch = useDispatch();

  // listen to state
  const {allProducts, filteredProducts, appliedFilters, searchText} =
    useSelector(state => state);

  // get all products at first
  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ProductListToolbar
        navigation={props.navigation}
        allProducts={allProducts}
      />
      <FlatList
        style={styles.productsList}
        keyExtractor={item => item.id.toString()}
        data={appliedFilters.size > 0 ? filteredProducts : allProducts}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<ProductSearchbar />}
        numColumns={2}
        renderItem={({item, index}) => {
          return (
            <Product
              key={index}
              item={item}
              searchText={searchText}
              removeProductFromCart={product =>
                dispatch(removeProductFromCart(product))
              }
              addProductToCart={product => dispatch(addProductToCart(product))}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productsList: {
    backgroundColor: '#fff',
    padding: 8,
  },
});
