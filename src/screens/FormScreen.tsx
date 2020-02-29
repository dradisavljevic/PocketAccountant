import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import InputWithLabel from '../components/InputWithLabel';
import colors from '../constants/colors';

const FormScreen = ({navigation}) => {
  const [input, setInput] = useState('');
  return (
    <SafeAreaView style={styles.backgroundStyle} forceInset={{bottom: 'never'}}>
      <View>
        <Text>Wacky Modal Action</Text>
        <InputWithLabel
          label="Email"
          value={input}
          onChange={event => {
            setInput(event.nativeEvent.text);
          }}
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
});

export default FormScreen;
