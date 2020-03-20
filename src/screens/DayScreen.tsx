import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Item from '../components/Item';
import Header from '../components/Header';
import icons from '../constants/icons';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

const DayScreen = ({navigation}) => {
  const _year = navigation.getParam('_year');
  const _month = navigation.getParam('_month');
  const _day = navigation.getParam('_day');
  const dataset = [
    {id: 0, category: icons.clothes, name: 'Devin', price: 50},
    {id: 1, category: icons.meal, name: 'Dan', price: 50},
    {id: 2, category: icons.tickets, name: 'Dominic', price: 50},
    {id: 3, category: icons.drinks, name: 'Jackson', price: 50},
    {id: 4, category: icons.snacks, name: 'James', price: 50},
    {id: 5, category: icons.school, name: 'Joel', price: 50},
    {id: 6, category: icons.healthcare, name: 'John', price: 50},
    {id: 7, category: icons.lifestyle, name: 'Jillian', price: 50},
    {id: 8, category: icons.technology, name: 'Jimmy', price: 50},
    {id: 9, category: icons.gifts, name: 'Julie', price: 50},
    {id: 10, category: icons.clothes, name: 'Devin', price: 50},
    {id: 11, category: icons.meal, name: 'Dan', price: 50},
    {id: 12, category: icons.tickets, name: 'Dominic', price: 50},
    {id: 13, category: icons.drinks, name: 'Jackson', price: 50},
    {id: 14, category: icons.snacks, name: 'James', price: 50},
    {id: 15, category: icons.school, name: 'Joel', price: 50},
    {id: 16, category: icons.healthcare, name: 'John', price: 50},
    {id: 17, category: icons.lifestyle, name: 'Jillian', price: 50},
    {id: 18, category: icons.technology, name: 'Jimmy', price: 50},
    {id: 19, category: icons.gifts, name: 'Julie', price: 50},
    {id: 20, category: icons.clothes, name: 'Devin', price: 50},
    {id: 21, category: icons.meal, name: 'Dan', price: 50},
    {id: 22, category: icons.tickets, name: 'Dominic', price: 50},
    {id: 23, category: icons.drinks, name: 'Jackson', price: 50},
    {id: 24, category: icons.snacks, name: 'James', price: 50},
    {id: 25, category: icons.school, name: 'Joel', price: 50},
    {id: 26, category: icons.healthcare, name: 'John', price: 50},
    {id: 27, category: icons.lifestyle, name: 'Jillian', price: 50},
    {id: 28, category: icons.technology, name: 'Jimmy', price: 50},
    {id: 29, category: icons.gifts, name: 'Julie', price: 50},
  ];

  const [data, setData] = useState(dataset);
  const theme = useSelector(state => state.theme.color);

  const getCumulativePrice = () => {
    let sum = 0;
    for (var itemIndex in data) {
      sum += data[itemIndex].price;
    }

    return sum;
  };

  const deleteItemById = id => {
    const filteredData = data.filter(item => item.id !== id);
    setData(filteredData);
  };

  const themeColorStyle = {
    backgroundColor: theme,
  };

  return (
    <SafeAreaView
      style={[styles.backgroundStyle, themeColorStyle]}
      forceInset={{bottom: 'never'}}>
      <Header
        title={`${_month} ${_day}, ${_year}`}
        onPress={() => navigation.goBack(null)}
        icon={'arrow-left'}
      />
      <FlatList
        data={data}
        style={styles.listContainerStyle}
        renderItem={({item, index}) => (
          <Item
            name={item.name}
            price={item.price}
            category={item.category}
            deleteAction={() => deleteItemById(item.id)}
          />
        )}
        keyExtractor={(item, index) => `${index}`}
      />
      <View style={styles.priceTotalContainerStyle}>
        <Text style={styles.priceTotalTextStyle}>
          Day's total: {getCumulativePrice()}¥
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
  },
  priceTotalContainerStyle: {
    paddingRight: 20,
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
