import React, {useState} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import InputWithLabel from '../components/InputWithLabel';
import colors from '../constants/colors';
import RNPickerSelect from 'react-native-picker-select';
import icons from '../constants/icons';

const FormScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  return (
    <SafeAreaView style={styles.backgroundStyle} forceInset={{bottom: 'never'}}>
      <View>
        <Text>Wacky Modal Action</Text>
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
      <View
        style={{
          height: 40,
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'black',
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>PROBA</Text>
      </View>
      <View
        style={{
          height: 40,
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'black',
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>PROBA</Text>
      </View>
      <View
        style={{
          height: 40,
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'black',
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>PROBA</Text>
      </View>
      <View
        style={{
          height: 40,
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'black',
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>PROBA</Text>
      </View>
      <View
        style={{
          height: 40,
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'black',
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>PROBA</Text>
      </View>
      <View
        style={{
          height: 40,
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'black',
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>PROBA</Text>
      </View>
      <View
        style={{
          height: 40,
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'black',
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>PROBA</Text>
      </View>
      <View
        style={{
          height: 40,
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'black',
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>PROBA</Text>
      </View>
      <View
        style={{
          height: 40,
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'black',
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>PROBA</Text>
      </View>
      <View
        style={{
          height: 40,
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'black',
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>PROBA</Text>
      </View>
      <View
        style={{
          height: 40,
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'black',
          justifyContent: 'center',
        }}>
        <Text style={{textAlign: 'center'}}>PROBA</Text>
      </View>
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
