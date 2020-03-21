import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Text, View, Button, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../constants/colors';
import CalendarDate from '../components/CalendarDate';
import Header from '../components/Header';
import {currencySymbols} from '../constants/data';
import exchangeApi from '../api/api';
import ModalField from '../components/ModalField';

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
  const [budget, setBudget] = useState(100000);
  const {theme, currency} = useSelector(state => ({
    theme: state.theme.color,
    currency: state.currency.short,
  }));

  const getList = async () => {
    const response = await exchangeApi
      .get()
      .then(response => {
        const data = response.data;
        console.log(data);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getList();
  }, []);

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

  const themeColorStyle = {
    backgroundColor: theme,
  };

  return (
    <SafeAreaView forceInset={{top: 'always'}} style={themeColorStyle}>
      <Header title={'Pocket Accountant'} />
      <ScrollView
        style={styles.scrollContainerStyle}
        contentContainerStyle={styles.scrollContainerItemsStyle}>
        <View style={styles.monthContainerStyle}>
          <Icon
            style={styles.iconStyle}
            name={'angle-left'}
            size={25}
            color={theme}
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
            color={theme}
            onPress={() => changeMonth(1)}
          />
        </View>
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Text style={{textDecorationLine: 'underline', fontSize: 16}}>
            Month's Budget: {budget} {currencySymbols[currency]}
          </Text>
        </View>
        {rows}
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Button title={"Today's Date"} onPress={() => goToToday()} />
          <ModalField buttonText={"Edit Month's Budget"} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  monthContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  scrollContainerStyle: {
    backgroundColor: colors.white,
  },
  scrollContainerItemsStyle: {
    justifyContent: 'center',
    paddingBottom: 90,
    paddingHorizontal: 20,
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
  calendarRowsStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default CalendarScreen;
