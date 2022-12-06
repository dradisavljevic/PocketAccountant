import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Item from '../components/Item';
import Header from '../components/Header';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {currencySymbols, months} from '../constants/data';
import {ITEMS} from '../state/ItemsReducer';
import {getSpendingByCurrency} from '../utils/helperFunctions';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {StackParamList} from '../utils/navigationTypes';
import { RootState } from 'state/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DayScreen = ({navigation, route}: NativeStackScreenProps<StackParamList, 'Day'>) => {
  const _year = route.params._year;
  const _month = route.params._month;
  const _day = route.params._day;
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const {theme, currency, items} = useSelector((state: RootState) => ({
    theme: state.theme.color,
    currency: state.currency.short,
    items: state.items,
  }));

  useEffect(() => {
    let month = months.indexOf(_month) + 1;
    let daystring = _day.toString();
    if (_day < 10) {
      daystring = '0' + _day.toString();
    }
    let monthstring = month.toString();
    if (month < 10) {
      monthstring = '0' + month.toString();
    }
    let date = daystring + '-' + monthstring + '-' + _year.toString();
    if (items.items) {
      setData(items.items[date as keyof typeof items.items]);
    }
  }, [items]);

  const getCumulativePrice = () => {
    let sums = getSpendingByCurrency(data);

    let sum = "Day's total: ";

    let elements = Object.keys(sums).length;

    if (elements > 0) {
      let i = 0;
      for (let key in sums) {
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

  const deleteItemById = async (id: string) => {
    let displayData: any = items.items;
    let months = [
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
    let month = months.indexOf(_month) + 1;
    let daystring = _day.toString();
    if (_day < 10) {
      daystring = '0' + _day.toString();
    }
    let monthstring = month.toString();
    if (month < 10) {
      monthstring = '0' + month.toString();
    }
    let date = daystring + '-' + monthstring + '-' + _year.toString();
    const filteredData = data.filter((item: {id: string}) => item.id !== id);

    displayData[date] = filteredData;
    if (filteredData.length == 0) {
      delete displayData[date];
    }
    dispatch({type: ITEMS, payload: displayData});
    await AsyncStorage.setItem('items', JSON.stringify(displayData));
    setData(filteredData);
  };

  const editItem = (id: string) => {
    const filteredData = data.filter((item: {id: string}) => item.id !== id);
    setData(filteredData);
  };

  const themeColorStyle = {
    backgroundColor: theme,
  };

  type ItemType = {name: string, price: number, category: string, currency: string, quantity: number, tax: number, id: string}

  return (
    <SafeAreaView
      style={[styles.backgroundStyle, themeColorStyle]}
      >
      <Header
        title={`${_month} ${_day}, ${_year}`}
        onPress={() => navigation.goBack()}
        icon={'arrow-left'}
        showBackButton={true}
      />
      <FlatList
        data={data}
        style={styles.listContainerStyle}
        renderItem={({item, index}: {item: ItemType, index: number}) => (
          <Item
            name={item.name}
            price={item.price}
            category={item.category}
            currency={item.currency}
            quantity={item.quantity}
            tax={item.tax}
            deleteAction={() => deleteItemById(item.id)}
            editAction={() => editItem(item.id)}
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
              _day: +_day,
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
