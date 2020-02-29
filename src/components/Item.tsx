import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../constants/colors';

const Item: FC<Props> = ({name, price, category}) => (
  <View style={styles.containerStyle}>
    <View style={styles.categoryContainerStyle}>
      <Icon
        style={styles.iconStyle}
        name={category}
        size={25}
        color={'black'}
      />
    </View>
    <View style={styles.nameContainerStyle}>
      <Text style={styles.textStyle}>{name}</Text>
    </View>
    <View style={styles.priceContainerStyle}>
      <Text style={styles.textStyle}>{price}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    borderColor: colors.black,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  categoryContainerStyle: {
    flex: 1,
    borderColor: colors.black,
    padding: 5,
    borderRightWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: 30,
  },
  nameContainerStyle: {
    flex: 8,
    borderColor: colors.black,
    borderRightWidth: 2,
    padding: 5,
    justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
  },
  priceContainerStyle: {
    flex: 2,
    padding: 5,
    justifyContent: 'center',
  },
});

export default Item;
