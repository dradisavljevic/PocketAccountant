import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-navigation';

const FormScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#85BB65'}}
      forceInset={{bottom: 'never'}}>
      <View>
        <Text>Wacky Modal Action</Text>
      </View>
    </SafeAreaView>
  );
};

export default FormScreen;
