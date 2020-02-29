import React, {useState} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../constants/colors';
import CalendarDate from '../components/CalendarDate';

const CalendarScreen = ({navigation}) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const [activeDate, setActiveDate] = useState(new Date());
  const [calendarDate, setCalendarDate] = useState(new Date());

  const generateMatrix = () => {
    var matrix = [];
    matrix[0] = weekDays;

    let year = calendarDate.getFullYear();
    let month = calendarDate.getMonth();

    let firstDay = new Date(year, month, 1).getDay();
    let maxDaysFormer = 0;
    if (month != 0) {
      maxDaysFormer = nDays[month - 1];
    } else {
      maxDaysFormer = nDays[11];
    }

    let maxDays = nDays[month];
    if (month == 1) {
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }

    let counter = 1;
    let nextCounter = 1;
    for (let row = 1; row < 7; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row == 1 && col >= firstDay) {
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          matrix[row][col] = counter++;
        } else if (row == 1 && col <= firstDay) {
          matrix[row][col] = maxDaysFormer - (firstDay - col - 1);
        } else if (row > 1 && counter > maxDays) {
          matrix[row][col] = nextCounter++;
        }
      }
    }

    return matrix;
  };

  const changeMonth = n => {
    setCalendarDate(
      new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth() + n,
        calendarDate.getDate(),
      ),
    );
  };

  const goToToday = () => {
    setCalendarDate(activeDate);
  };

  const isTodaysDate = day => {
    if (
      day == activeDate.getDate() &&
      calendarDate.getFullYear() == activeDate.getFullYear() &&
      calendarDate.getMonth() == activeDate.getMonth()
    )
      return true;
    else return false;
  };

  var matrix = generateMatrix();

  var rows = [];
  rows = matrix.map((row, rowIndex) => {
    var rowItems = row.map((item, colIndex) => {
      return (
        <CalendarDate
          rowIndex={rowIndex}
          colIndex={colIndex}
          day={item}
          onPress={() => {
            navigation.navigate('Day', {
              _year: calendarDate.getFullYear(),
              _month: months[calendarDate.getMonth()],
              _day: item,
            });
          }}
          isTodaysDate={isTodaysDate}
          key={rowIndex + ' ' + colIndex}
        />
      );
    });
    return (
      <View key={rowIndex} style={styles.calendarRowsStyle}>
        {rowItems}
      </View>
    );
  });

  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <View style={styles.monthContainerStyle}>
        <Icon
          style={styles.iconStyle}
          name={'angle-left'}
          size={25}
          color={colors.dollarBill}
          onPress={() => changeMonth(-1)}
        />
        <View style={styles.monthNameContainerStyle}>
          <Text style={styles.monthNameTextStyle}>
            {months[calendarDate.getMonth()]} &nbsp;
            {calendarDate.getFullYear()}
          </Text>
        </View>
        <Icon
          style={styles.iconStyle}
          name={'angle-right'}
          size={25}
          color={colors.dollarBill}
          onPress={() => changeMonth(1)}
        />
      </View>
      {rows}
      <Button
        title={'Go to Today'}
        onPress={() => goToToday()}
        style={styles.todayButtonStyle}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  monthContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 10,
  },
  iconStyle: {
    width: 25,
  },
  monthNameContainerStyle: {
    width: 200,
  },
  monthNameTextStyle: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
  todayButtonStyle: {
    marginTop: 40,
  },
  calendarRowsStyle: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    margin: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default CalendarScreen;
