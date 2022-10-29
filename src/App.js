import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {configureStore} from './redux/store';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProductsList} from './screens/ProductsList';
import {Cart} from './screens/Cart';

const Stack = createNativeStackNavigator();
const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="ProductList" component={ProductsList} />
            <Stack.Screen name="Cart" component={Cart} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
