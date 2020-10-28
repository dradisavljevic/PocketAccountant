import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import Header from '../components/Header';
import colors from '../constants/colors';

const ReportScreen = ({navigation}) => {
  const _year = navigation.getParam('_year');
  const _month = navigation.getParam('_month');
  const {theme, currency} = useSelector(state => ({
    theme: state.theme.color,
    currency: state.currency.short,
  }));

  return (
    <SafeAreaView forceInset={{top: 'always'}} style={{backgroundColor: theme}}>
      <Header
        title={`Expense report for ${_month} ${_year}`}
        onPress={() => navigation.goBack(null)}
        icon={'arrow-left'}
        showBackButton={true}
      />
      <View style={{backgroundColor: colors.white}}>
        <Text>Uh</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ReportScreen;
