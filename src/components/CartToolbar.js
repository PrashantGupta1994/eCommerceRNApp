import React, {PureComponent} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {Appbar} from 'react-native-paper';
const back = require('../../assets/ic_back.png');

class CartToolbar extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor={'#E8A035'} />
        <Appbar.Header mode="center-aligned" style={styles.toolbar}>
          <Appbar.Action
            icon={back}
            color={'#fff'}
            onPress={() => this.props.navigation.goBack()}
          />
          <Appbar.Content titleStyle={styles.title} title="My Basket" />
        </Appbar.Header>
      </>
    );
  }
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#E8A035',
  },
  title: {
    textAlign: 'center',
    color: '#fff',
  },
});

export {CartToolbar};
