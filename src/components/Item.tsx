import React from 'react';
import {View, Text, StyleSheet, GestureResponderEvent} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../constants/colors';
import {getProductTotal} from '../utils/helperFunctions';
import {currencySymbols} from '../constants/data';
import If from '../utils/conditional';

type ItemProps = {name: string, price: number, category: string, currency: string, deleteAction: (event: GestureResponderEvent) => void, editAction: (event: GestureResponderEvent) => void, quantity: number, tax: number}

const Item = ({
  name,
  price,
  category,
  currency,
  deleteAction,
  editAction,
  quantity,
  tax,
} : ItemProps) => (
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
        {price} {currencySymbols[currency]} {tax ? `(+ ${tax}% tax)` : ''}
      </Text>
      <If
        condition={tax != 0 || quantity > 1}
        then={
          <Text style={styles.priceTotalStyle}>
            Total:{' '}
            {getProductTotal(
              tax,
              price,
              quantity,
              currency,
              tax ? true : false,
            )}{' '}
            {currencySymbols[currency]}
          </Text>
        }
      />
    </View>
    <Icon
      style={[styles.iconStyle, {marginLeft: 15}]}
      name={'pen'}
      size={25}
      color={colors.pastelBlue}
      onPress={editAction}
    />
    <Icon
      style={[styles.iconStyle, {marginLeft: 15}]}
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
    color: colors.black,
  },
  priceStyle: {
    fontSize: 16,
    color: colors.gray,
  },
  priceTotalStyle: {
    fontSize: 15,
    color: colors.gray,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  itemWrapperStyle: {
    flex: 1,
    marginLeft: 25,
  },
});

export default Item;
