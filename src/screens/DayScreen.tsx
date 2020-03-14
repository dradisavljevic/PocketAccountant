import React from 'react';
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
  return (
    <SafeAreaView style={styles.backgroundStyle} forceInset={{bottom: 'never'}}>
      <Header
        title={`${_month} ${_day}, ${_year}`}
        onPress={() => navigation.goBack(null)}
        icon={'arrow-left'}
      />
      <FlatList
        data={[
          {category: icons.clothes, name: 'Devin', price: 50},
          {category: icons.meal, name: 'Dan', price: 50},
          {category: icons.tickets, name: 'Dominic', price: 50},
          {category: icons.drinks, name: 'Jackson', price: 50},
          {category: icons.snacks, name: 'James', price: 50},
          {category: icons.school, name: 'Joel', price: 50},
          {category: icons.healthcare, name: 'John', price: 50},
          {category: icons.lifestyle, name: 'Jillian', price: 50},
          {category: icons.technology, name: 'Jimmy', price: 50},
          {category: icons.gifts, name: 'Julie', price: 50},
          {category: icons.clothes, name: 'Devin', price: 50},
          {category: icons.meal, name: 'Dan', price: 50},
          {category: icons.tickets, name: 'Dominic', price: 50},
          {category: icons.drinks, name: 'Jackson', price: 50},
          {category: icons.snacks, name: 'James', price: 50},
          {category: icons.school, name: 'Joel', price: 50},
          {category: icons.healthcare, name: 'John', price: 50},
          {category: icons.lifestyle, name: 'Jillian', price: 50},
          {category: icons.technology, name: 'Jimmy', price: 50},
          {category: icons.gifts, name: 'Julie', price: 50},
          {category: icons.clothes, name: 'Devin', price: 50},
          {category: icons.meal, name: 'Dan', price: 50},
          {category: icons.tickets, name: 'Dominic', price: 50},
          {category: icons.drinks, name: 'Jackson', price: 50},
          {category: icons.snacks, name: 'James', price: 50},
          {category: icons.school, name: 'Joel', price: 50},
          {category: icons.healthcare, name: 'John', price: 50},
          {category: icons.lifestyle, name: 'Jillian', price: 50},
          {category: icons.technology, name: 'Jimmy', price: 50},
          {category: icons.gifts, name: 'Julie', price: 50},
        ]}
        style={styles.listContainerStyle}
        renderItem={({item, index}) => (
          <Item name={item.name} price={item.price} category={item.category} />
        )}
        keyExtractor={(item, index) => `${index}`}
      />
      <View style={styles.priceTotalContainerStyle}>
        <Text style={styles.priceTotalTextStyle}>Day's total: 6666¥</Text>
      </View>
      <View style={styles.floatingButtonStyle}>
        <Icon
          style={styles.floatingButtonIconStyle}
          name={'plus-circle'}
          size={60}
          color={colors.dollarBill}
          onPress={() => navigation.navigate('Form')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: colors.dollarBill,
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
    height: 120,
    backgroundColor: colors.white,
    paddingBottom: 50,
    alignItems: 'flex-end',
  },
  floatingButtonIconStyle: {
    width: 60,
  },
});

export default DayScreen;
