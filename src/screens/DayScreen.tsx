import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Item from '../components/Item';
import Header from '../components/Header';
import icons from '../constants/icons';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {currencySymbols, months} from '../constants/data';
import {ITEMS} from '../state/ItemsReducer';
import AsyncStorage from '@react-native-community/async-storage';
import {getSpendingByCurrency} from '../utils/helperFunctions';

const DayScreen = ({navigation}) => {
  const _year = navigation.getParam('_year');
  const _month = navigation.getParam('_month');
  const _day = navigation.getParam('_day');
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const {theme, currency, items} = useSelector(state => ({
    theme: state.theme.color,
    currency: state.currency.short,
    items: state.items,
  }));

  useEffect(() => {
    var month = months.indexOf(_month) + 1;
    daystring = _day.toString();
    if (_day < 10) {
      daystring = '0' + _day.toString();
    }
    monthstring = month.toString();
    if (month < 10) {
      monthstring = '0' + month.toString();
    }
    date = daystring + '-' + monthstring + '-' + _year.toString();
    if (items.items) {
      setData(items.items[date]);
    }
  }, [items]);

  const getCumulativePrice = () => {
    let sums = getSpendingByCurrency(data);

    sum = "Day's total: ";

    elements = Object.keys(sums).length;

    if (elements > 0) {
      var i = 0;
      for (var key in sums) {
        i = i + 1;
        sum += sums[key] + currencySymbols[key];
        if (i == elements - 1) {
          sum += ' and ';
        } else if (i == elements) {
        } else {
          sum += ', ';
        }
      }
    } else {
      sum += '0' + currencySymbols[currency];
    }

    return sum;
  };

  const deleteItemById = async id => {
    displayData = items.items;
    var months = [
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
    var month = months.indexOf(_month) + 1;
    daystring = _day.toString();
    if (_day < 10) {
      daystring = '0' + _day.toString();
    }
    monthstring = month.toString();
    if (month < 10) {
      monthstring = '0' + month.toString();
    }
    date = daystring + '-' + monthstring + '-' + _year.toString();
    const filteredData = data.filter(item => item.id !== id);

    displayData[date] = filteredData;
    if (filteredData.length == 0) {
      delete displayData[date];
    }
    dispatch({type: ITEMS, payload: displayData});
    await AsyncStorage.setItem('items', JSON.stringify(displayData));
    setData(filteredData);
  };

  // const editItem = id => {
  //   const filteredData = data.filter(item => item.id !== id);
  //   setData(filteredData);
  // };

  const themeColorStyle = {
    backgroundColor: theme,
  };

  return (
    <SafeAreaView
      style={[styles.backgroundStyle, themeColorStyle]}
      forceInset={{top: 'always'}}>
      <Header
        title={`${_month} ${_day}, ${_year}`}
        onPress={() => navigation.goBack(null)}
        icon={'arrow-left'}
        showBackButton={true}
      />
      <FlatList
        data={data}
        style={styles.listContainerStyle}
        renderItem={({item, index}) => (
          <Item
            name={item.name}
            price={item.price}
            category={item.category}
            currency={currencySymbols[item.currency]}
            quantity={item.quantity}
            tax={item.tax}
            deleteAction={() => deleteItemById(item.id)}
          />
        )}
        keyExtractor={(item, index) => `${index}`}
      />
      <View style={styles.priceTotalContainerStyle}>
        <Text
          style={styles.priceTotalTextStyle}
          adjustsFontSizeToFit
          numberOfLines={1}>
          {getCumulativePrice()}
        </Text>
      </View>
      <View style={styles.floatingButtonStyle}>
        <Icon
          style={styles.floatingButtonIconStyle}
          name={'plus-circle'}
          size={60}
          color={theme}
          onPress={() =>
            navigation.navigate('Form', {
              _year: _year,
              _month: _month,
              _day: _day,
              _pickDate: false,
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  },
  listContainerStyle: {
    backgroundColor: colors.white,
    paddingHorizontal: 5,
  },
  priceTotalContainerStyle: {
    paddingHorizontal: 20,
    height: 50,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  priceTotalTextStyle: {
    textAlign: 'right',
    fontSize: 18,
  },
  floatingButtonStyle: {
    paddingRight: 40,
    height: 100,
    backgroundColor: colors.white,
    paddingBottom: 30,
    alignItems: 'flex-end',
  },
  floatingButtonIconStyle: {
    width: 60,
  },
});

export default DayScreen;
