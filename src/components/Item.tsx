import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../constants/colors';

const Item = ({
  name,
  price,
  category,
  currency,
  deleteAction,
  quantity,
  tax,
}) => (
  <View style={styles.containerStyle}>
    <Icon
      style={styles.iconStyle}
      name={category}
      size={25}
      color={colors.black}
    />
    <View style={styles.itemWrapperStyle}>
      <Text style={styles.nameStyle} adjustsFontSizeToFit numberOfLines={2}>
        {name} x {quantity}
      </Text>
      <Text style={styles.priceStyle}>
        {price} {currency} {tax ? `(+ ${tax}% tax)` : ''}
      </Text>
    </View>
    <Icon
      style={[styles.iconStyle, {marginLeft: 15}]}
      hitSlop={{top: 15, left: 15, bottom: 15, right: 15}}
      name={'trash'}
      size={25}
      color={colors.pureRed}
      onPress={deleteAction}
    />
  </View>
);

const styles = StyleSheet.create({
  containerStyle: {
    padding: 15,
    flex: 1,
    flexDirection: 'row',
    borderColor: colors.black,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  iconStyle: {
    width: 30,
  },
  nameStyle: {
    fontSize: 22,
    color: 'black',
  },
  priceStyle: {
    fontSize: 16,
    color: 'gray',
  },
  itemWrapperStyle: {
    flex: 1,
    marginLeft: 25,
  },
});

export default Item;
