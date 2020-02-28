import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Item from '../components/Item';
import icons from '../constants/icons';

const DayScreen = ({ navigation }) => {
  const _year = navigation.getParam('_year');
  const _month = navigation.getParam('_month');
  const _day = navigation.getParam('_day');
  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={{height: 60, padding: 10}}>
      <Text style={{fontSize: 32, textAlign: 'center', textDecorationLine: 'underline'}}>{_month} {_day} {_year}</Text>
    </View>
    <View style={{paddingLeft: 10, paddingRight: 10, borderBottomColor: 'black', borderBottomWidth: 3, height: 30, flexDirection: 'row'}}>
      <View style={{flex: 1, borderRightColor: 'black', borderRightWidth: 2, padding: 5}}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={{textAlign: 'left'}}>Cat.</Text>
      </View>
      <View style={{flex: 8, borderRightColor: 'black', borderRightWidth: 2, padding: 5}}>
          <Text style={{textAlign: 'left'}}>Item Name</Text>
      </View>
      <View style={{flex: 2, padding: 5}}>
          <Text style={{textAlign: 'left'}}>Price</Text>
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
          {category: icons.gifts, name: 'Julie', price: 50}
        ]}
        renderItem={({item, index}) =><Item name={item.name} price={item.price} category={item.category}></Item>}
        keyExtractor={(item, index) => `${index}`} />
        <View style={{paddingRight: 40, height: 50}}>
          <Text style={{textAlign: 'right', fontSize: 18}}>Day's total:</Text>
        </View>
    </SafeAreaView>
  );
};


export default DayScreen;
