import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import icons from '../constants/icons';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

const DateHeader = ({day, month, year, onPress}) => {
  return (
    <View style={styles.headerStyle}>
      <Icon
        style={styles.backIconStyle}
        name={'arrow-left'}
        size={25}
        color={colors.white}
        onPress={onPress}
      />
      <Text style={styles.headerTitleStyle}>
        {month} {day}, {year}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  backIconStyle: {
    width: 25,
    marginRight: 25,
  },
  headerStyle: {
    height: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dollarBill,
  },
  headerTitleStyle: {
    fontSize: 32,
    textAlign: 'center',
    color: colors.white,
  },
});

export default DateHeader;
