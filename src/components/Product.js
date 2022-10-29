import React, {PureComponent} from 'react';
import {Card, Divider, IconButton} from 'react-native-paper';
import {Text, View, StyleSheet, Pressable, Image} from 'react-native';

const add = require('../../assets/ic_add.png');
const minus = require('../../assets/ic_minus.png');

class Product extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderModifiedText = (text, toBold) => {
    const parts = text.split(new RegExp(`(${toBold})`, 'gi'));
    return (
      <Text numberOfLines={2} style={styles.name}>
        {parts.map((part, index) =>
          part.toLowerCase() === toBold.toLowerCase() ? (
            <Text key={index} style={{fontWeight: 'bold'}}>
              {part}
            </Text>
          ) : (
            part
          ),
        )}
      </Text>
    );
  };

  renderCartView = item => {
    return (
      <View>
        <View style={styles.hCard}>
          <Image
            style={styles.hThumb}
            resizeMode={'contain'}
            source={{uri: item.image}}
          />
          <View style={styles.hTitle}>
            <Text numberOfLines={2} style={styles.name}>
              {item.title}
            </Text>
            <Text style={styles.price}>₹ {item.price}</Text>
          </View>
          <View>
            {this.renderCounterButton(item)}
            <Text style={styles.totalPrice}>
              ₹ {parseFloat(item.totalPrice).toFixed(2)}
            </Text>
          </View>
        </View>
        <Divider />
      </View>
    );
  };

  renderListView = item => {
    return (
      <Card style={styles.card}>
        <Image
          style={styles.thumb}
          resizeMode={'contain'}
          source={{uri: item.image}}
        />
        {this.renderModifiedText(item.title, this.props.searchText)}
        {/* <Text numberOfLines={2} style={styles.name}>
          {item.title}
        </Text> */}
        <Text style={styles.rate}>★ {item.rating?.rate}</Text>
        <View style={styles.infoSubContainer}>
          <Text style={styles.price}>₹ {item.price}</Text>
          {this.renderCounterButton(item)}
        </View>
      </Card>
    );
  };

  renderCounterButton = item => {
    return (
      <View>
        {item.qty > 0 ? (
          <View style={styles.buttonContainer}>
            <IconButton
              icon={minus}
              size={14}
              iconColor={'#fff'}
              onPress={() => this.props.removeProductFromCart(item)}
            />
            <Text style={styles.buttonText}>{item.qty || 0}</Text>
            <IconButton
              icon={add}
              size={14}
              iconColor={'#fff'}
              onPress={() => this.props.addProductToCart(item)}
            />
          </View>
        ) : (
          <Pressable
            style={styles.displayButton}
            onPress={() => this.props.addProductToCart(item)}>
            <Text style={styles.buttonTextLarge}>+</Text>
          </Pressable>
        )}
      </View>
    );
  };

  render() {
    const item = this.props.item;
    return this.props.mode === 'HORIZONTAL'
      ? this.renderCartView(item)
      : this.renderListView(item);
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
    padding: 12,
    borderRadius: 16,
  },
  hCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  thumb: {
    height: 100,
    backgroundColor: '#fff',
  },
  hThumb: {
    flex: 1,
    height: 100,
  },
  hTitle: {
    flex: 2,
    padding: 8,
  },
  infoSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    marginTop: 12,
  },
  rate: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 12,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    height: 25,
    width: 60,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#E8A035',
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
  },
  buttonTextLarge: {
    fontSize: 24,
    textAlign: 'center',
    color: '#E8A035',
  },
  displayButton: {
    height: 32,
    width: 32,
    borderRadius: 32 / 2,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#f7f8f9',
  },
});

export {Product};
