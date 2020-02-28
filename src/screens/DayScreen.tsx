import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Item from '../components/Item';
import icons from '../constants/icons';
import Icon from 'react-native-vector-icons/FontAwesome5';

const DayScreen = ({navigation}) => {
  const _year = navigation.getParam('_year');
  const _month = navigation.getParam('_month');
  const _day = navigation.getParam('_day');
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#85BB65'}}
      forceInset={{bottom: 'never'}}>
      <View
        style={{
          height: 60,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#85BB65',
        }}>
        <Icon
          style={{width: 25, marginRight: 25}}
          name={'arrow-left'}
          size={25}
          color={'white'}
          onPress={() => navigation.goBack(null)}
        />
        <Text style={{fontSize: 32, textAlign: 'center', color: 'white'}}>
          {_month} {_day}, {_year}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          marginTop: 10,
          borderBottomColor: 'black',
          borderBottomWidth: 3,
          height: 30,
          flexDirection: 'row',
          backgroundColor: '#85BB65',
        }}>
        <View
          style={{
            flex: 1,
            borderRightColor: 'black',
            borderRightWidth: 2,
            padding: 5,
          }}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={{textAlign: 'center'}}>
            Cat.
          </Text>
        </View>
        <View
          style={{
            flex: 8,
            borderRightColor: 'black',
            borderRightWidth: 2,
            padding: 5,
          }}>
          <Text style={{textAlign: 'center'}}>Item Name</Text>
        </View>
        <View style={{flex: 2, padding: 5}}>
          <Text style={{textAlign: 'center'}}>Price</Text>
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
        style={{backgroundColor: 'white'}}
        renderItem={({item, index}) => (
          <Item
            name={item.name}
            price={item.price}
            category={item.category}></Item>
        )}
        keyExtractor={(item, index) => `${index}`}
      />
      <View
        style={{
          paddingRight: 20,
          height: 80,
          backgroundColor: 'white',
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'right', fontSize: 18}}>
          Day's total: 6666¥
        </Text>
      </View>
      <View
        style={{
          paddingRight: 40,
          height: 150,
          backgroundColor: 'white',
          paddingBottom: 50,
          alignItems: 'flex-end',
        }}>
        <Icon
          style={{width: 60}}
          name={'plus-circle'}
          size={60}
          color={'#85BB65'}
          onPress={() => navigation.navigate('Form')}
        />
      </View>
    </SafeAreaView>
  );
};

export default DayScreen;
