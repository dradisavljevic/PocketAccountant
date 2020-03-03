import React, {useState} from 'react';
import {View, Text, StyleSheet, Animated, TextInput} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import InputWithLabel from '../components/InputWithLabel';
import colors from '../constants/colors';
import icons from '../constants/icons';
import CategorySelector from '../components/CategorySelector';

const FormScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(undefined);
  return (
    <SafeAreaView style={styles.backgroundStyle} forceInset={{bottom: 'never'}}>
      <View>
        <InputWithLabel
          label={'Item Name'}
          value={name}
          onChangeText={text => {
            setName(text);
          }}
        />
        <InputWithLabel
          label={'Item Price'}
          value={price}
          onChangeText={(formatted, extracted) => {
            setPrice(extracted);
          }}
          mask={'¥[00000000]'}
          keyboardType={'decimal-pad'}
        />
      </View>
      <CategorySelector
        selectorFunction={setCategory}
        displayText={category}
        data={[
          {icon: icons.meal, name: 'Meals'},
          {icon: icons.clothes, name: 'Clothes & Accessories'},
          {icon: icons.tickets, name: 'Tickets & Fares'},
          {icon: icons.drinks, name: 'Drinks'},
          {icon: icons.snacks, name: 'Snacks'},
          {icon: icons.school, name: 'Education'},
          {icon: icons.healthcare, name: 'Healthcare'},
          {icon: icons.lifestyle, name: 'Lifestyle'},
          {icon: icons.technology, name: 'Technology'},
          {icon: icons.gifts, name: 'Gifts'},
          {icon: icons.miscellaneous, name: 'Other'},
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: colors.dollarBill,
  },
});

export default FormScreen;
