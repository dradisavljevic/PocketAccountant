import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../constants/colors';

const Item = ({name, price, category, deleteAction}) => (
  <View style={styles.containerStyle}>
    <Icon style={styles.iconStyle} name={category} size={25} color={'black'} />
    <View style={{flex: 1, marginLeft: 25}}>
      <Text style={styles.nameStyle}>{name}</Text>
      <Text style={styles.priceStyle}>¥{price}</Text>
    </View>
    <Icon
      style={{width: 30}}
      hitSlop={{top: 15, left: 15, bottom: 15, right: 15}}
      name={'trash'}
      size={25}
      color={'red'}
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
});

export default Item;
