import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';

const SaveButton = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.buttonContainerStyle} onPress={onPress}>
      <Text style={styles.buttonTextStyle}>Save</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainerStyle: {
    padding: 5,
    marginRight: 5,
    width: 60,
  },
  buttonTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default SaveButton;
