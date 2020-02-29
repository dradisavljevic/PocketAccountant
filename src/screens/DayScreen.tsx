import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Item from '../components/Item';
import DateHeader from '../components/DateHeader';
import icons from '../constants/icons';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

const DayScreen = ({navigation}) => {
  const _year = navigation.getParam('_year');
  const _month = navigation.getParam('_month');
  const _day = navigation.getParam('_day');
  return (
    <SafeAreaView style={styles.backgroundStyle} forceInset={{bottom: 'never'}}>
      <DateHeader
        day={_day}
        month={_month}
        year={_year}
        onPress={() => navigation.goBack(null)}
      />
      <View style={styles.listTitleStyle}>
        <View style={styles.categoryTitleContainerStyle}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.textStyle}>
            Cat.
          </Text>
        </View>
        <View style={styles.nameTitleContainerStyle}>
          <Text style={styles.textStyle}>Item Name</Text>
        </View>
        <View style={styles.priceTitleContainerStyle}>
          <Text style={styles.textStyle}>Price</Text>
        </View>
      </View>
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
  listTitleStyle: {
    paddingHorizontal: 10,
    marginTop: 10,
    borderBottomColor: colors.black,
    borderBottomWidth: 3,
    height: 30,
    flexDirection: 'row',
    backgroundColor: colors.dollarBill,
  },
  categoryTitleContainerStyle: {
    flex: 1,
    borderRightColor: colors.black,
    borderRightWidth: 2,
    padding: 5,
  },
  textStyle: {
    textAlign: 'center',
  },
  nameTitleContainerStyle: {
    flex: 8,
    borderRightColor: colors.black,
    borderRightWidth: 2,
    padding: 5,
  },
  priceTitleContainerStyle: {
    flex: 2,
    padding: 5,
  },
  listContainerStyle: {
    backgroundColor: colors.white,
  },
  priceTotalContainerStyle: {
    paddingRight: 20,
    height: 80,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  priceTotalTextStyle: {
    textAlign: 'right',
    fontSize: 18,
  },
  floatingButtonStyle: {
    paddingRight: 40,
    height: 150,
    backgroundColor: colors.white,
    paddingBottom: 50,
    alignItems: 'flex-end',
  },
  floatingButtonIconStyle: {
    width: 60,
  },
});

export default DayScreen;
