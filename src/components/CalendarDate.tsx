import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import colors from '../constants/colors';

const CalendarDate = ({onPress, rowIndex, colIndex, day, isTodaysDate}) => {
  const isOtherMonth = (rowIndex, date) => {
    if ((rowIndex == 1 && date > 20) || (rowIndex >= 5 && date < 15))
      return true;
    else return false;
  };

  const daysOfWeekStyle = {
    height: rowIndex == 0 ? 30 : 60,
    backgroundColor: rowIndex == 0 ? colors.dollarBill : colors.white,
  };

  const daySelectedCircleStyle = {
    backgroundColor:
      (isTodaysDate(day) && !isOtherMonth(rowIndex, day)) || rowIndex == 0
        ? colors.dollarBill
        : colors.white,
  };

  const dayTextStyle = {
    color:
      (isTodaysDate(day) && !isOtherMonth(rowIndex, day)) || rowIndex == 0
        ? colors.white
        : isOtherMonth(rowIndex, day)
        ? colors.lightGray
        : colors.black,
    fontWeight: isOtherMonth(rowIndex, day) ? 'normal' : 'bold',
  };

  return (
    <TouchableOpacity
      disabled={rowIndex == 0 || isOtherMonth(rowIndex, day)}
      style={[styles.dateContainerStyle, daysOfWeekStyle]}
      onPress={onPress}>
      <View style={[styles.dateCircleStyle, daySelectedCircleStyle]}>
        <Text style={dayTextStyle}>{day != -1 ? day : ''}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dateContainerStyle: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateCircleStyle: {
    height: 30,
    width: 30,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CalendarDate;
