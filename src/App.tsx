import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {setNavigator} from './utils/navigationRef';

import CalendarScreen from './screens/CalendarScreen';
import DayScreen from './screens/DayScreen';
import FormScreen from './screens/FormScreen';

const switchNavigator = createStackNavigator({
  Calendar: {
    screen: CalendarScreen,
    navigationOptions: {
      header: null,
    },
  },
  ListFlow: createStackNavigator(
    {
      Day: {
        screen: DayScreen,
        navigationOptions: {
          header: null,
        },
      },
      Form: {
        screen: FormScreen,
        navigationOptions: {
          header: null,
        },
      },
    },
    {
      mode: 'modal',
      headerMode: 'none',
      navigationOptions: {
        header: null,
      },
    },
  ),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <App
      ref={navigator => {
        setNavigator(navigator);
      }}
    />
  );
};
