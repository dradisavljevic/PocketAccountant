import React, {useState} from 'react';
import {Text, View, Button, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';

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

  changeMonth = n => {
    setCalendarDate(
      new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth() + n,
        calendarDate.getDate(),
      ),
    );
  };

  goToToday = () => {
    setCalendarDate(activeDate);
  };

  isOtherMonth = (rowIndex, date) => {
    if ((rowIndex == 1 && date > 20) || (rowIndex >= 5 && date < 15))
      return true;
    else return false;
  };

  isTodaysDate = day => {
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
        <TouchableOpacity
          disabled={rowIndex == 0 || isOtherMonth(rowIndex, item)}
          style={{
            flex: 1,
            height: rowIndex == 0 ? 30 : 60,
            textAlign: 'center',
            backgroundColor: rowIndex == 0 ? '#85BB65' : '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key={rowIndex + ' ' + colIndex}
          onPress={() => {
            navigation.navigate('Day', {
              _year: calendarDate.getFullYear(),
              _month: months[calendarDate.getMonth()],
              _day: item,
            });
          }}>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 60,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                (isTodaysDate(item) && !isOtherMonth(rowIndex, item)) ||
                rowIndex == 0
                  ? '#85BB65'
                  : '#fff',
            }}>
            <Text
              style={{
                color:
                  (isTodaysDate(item) && !isOtherMonth(rowIndex, item)) ||
                  rowIndex == 0
                    ? '#fff'
                    : isOtherMonth(rowIndex, item)
                    ? '#D3D3D3'
                    : '#000',
                fontWeight: isOtherMonth(rowIndex, item) ? 'normal' : 'bold',
              }}>
              {item != -1 ? item : ''}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
    return (
      <View
        key={rowIndex}
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 15,
          margin: 15,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        {rowItems}
      </View>
    );
  });

  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 100,
          marginBottom: 10,
        }}>
        <Icon
          style={{width: 25}}
          name={'angle-left'}
          size={25}
          color={'#85BB65'}
          onPress={() => changeMonth(-1)}
        />
        <View style={{width: 200}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 22,
              textAlign: 'center',
            }}>
            {months[calendarDate.getMonth()]} &nbsp;
            {calendarDate.getFullYear()}
          </Text>
        </View>
        <Icon
          style={{width: 25}}
          name={'angle-right'}
          size={25}
          color={'#85BB65'}
          onPress={() => changeMonth(1)}
        />
      </View>
      {rows}
      <Button
        title={'Go to Today'}
        onPress={() => goToToday()}
        style={{marginTop: 40}}
      />
    </SafeAreaView>
  );
};

export default CalendarScreen;
