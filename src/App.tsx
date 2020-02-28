import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { setNavigator } from './utils/navigationRef';

import CalendarScreen from './screens/CalendarScreen';
import DayScreen from './screens/DayScreen';

const switchNavigator = createSwitchNavigator({
  internetFlow: createStackNavigator({
    Calendar: {
      screen: CalendarScreen,
      navigationOptions: {
        header: null
      }
    },
    Day: {
      screen: DayScreen,
      navigationOptions: {
        header: null
      }
    }
  })
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
