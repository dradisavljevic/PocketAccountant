import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import icons from '../constants/icons';
import colors from '../constants/colors';
import CalendarDate from '../components/CalendarDate';
import Header from '../components/Header';
import {currencySymbols, monthAbbrev, months} from '../constants/data';
import AsyncStorage from '@react-native-community/async-storage';
import {THEME} from '../state/ThemeReducer';
import {CURRENCY} from '../state/CurrencyReducer';
import {ITEMS} from '../state/ItemsReducer';

const CalendarScreen = ({navigation}) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const [activeDate, setActiveDate] = useState(new Date());
  const [calendarDate, setCalendarDate] = useState(new Date());
  const {theme, currency, items} = useSelector(state => ({
    theme: state.theme.color,
    currency: state.currency.short,
    items: state.items,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    getStoredInformation();
  }, []);

  const getStoredInformation = async () => {
    try {
      storedTheme = await AsyncStorage.getItem('theme');
      storedCurrency = await AsyncStorage.getItem('currency');
      data = await AsyncStorage.getItem('items', (error, result) => {
        if (result != null) {
          dispatch({type: ITEMS, payload: JSON.parse(result)});
        }
      });
      if (storedTheme) {
        dispatch({type: THEME, payload: storedTheme});
      }
      if (storedCurrency) {
        dispatch({type: CURRENCY, payload: storedCurrency});
      }
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

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
          <TouchableOpacity
            onPress={() => changeMonth(-1)}
            disabled={
              calendarDate.getFullYear() == 2000 && calendarDate.getMonth() == 0
            }>
            <Icon
              style={styles.iconStyle}
              name={'angle-left'}
              size={25}
              color={
                calendarDate.getFullYear() == 2000 &&
                calendarDate.getMonth() == 0
                  ? colors.lightGray
                  : theme
              }
            />
          </TouchableOpacity>
          <View style={styles.monthNameContainerStyle}>
            <Text style={styles.monthNameTextStyle}>
              {months[calendarDate.getMonth()]} &nbsp;
              {calendarDate.getFullYear()}
            </Text>
          </View>
          <TouchableOpacity onPress={() => changeMonth(1)}>
            <Icon
              style={styles.iconStyle}
              name={'angle-right'}
              size={25}
              color={theme}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('FormDate', {
              _year: activeDate.getFullYear(),
              _month: months[activeDate.getMonth()],
              _day: activeDate.getDate(),
              _pickDate: true,
            });
          }}
          style={[styles.buttonStyle]}>
          <Text style={styles.buttonTextStyle}>Add New Item</Text>
        </TouchableOpacity>
        {rows}
        <View style={styles.rowStyle}>
          <TouchableOpacity
            onPress={() => goToToday()}
            style={[styles.buttonStyle]}>
            <Text style={styles.buttonTextStyle}>Go To Today</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Report', {
                _year: calendarDate.getFullYear(),
                _month: months[calendarDate.getMonth()],
              });
            }}
            style={[styles.buttonStyle]}>
            <Text style={styles.buttonTextStyle}>View Month's Report</Text>
          </TouchableOpacity>
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
  buttonStyle: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    flexDirection: 'row',
  },
  buttonTextStyle: {
    fontSize: 18,
    color: colors.dodgerBlue,
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default CalendarScreen;
