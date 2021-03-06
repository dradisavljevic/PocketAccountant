import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

const QuantityButton = ({disabled, icon, onPress}) => {
  const borderStyle = {
    borderColor: disabled ? colors.lightGray : colors.black,
  };

  return (
    <TouchableOpacity
      style={[styles.buttonStyle, borderStyle]}
      onPress={onPress}
      disabled={disabled}>
      <Icon
        name={icon}
        size={15}
        color={disabled ? colors.lightGray : colors.black}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderWidth: 1,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuantityButton;
