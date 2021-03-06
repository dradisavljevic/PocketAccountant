import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Store from './state/Store';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {setNavigator} from './utils/navigationRef';

import CalendarScreen from './screens/CalendarScreen';
import DayScreen from './screens/DayScreen';
import FormScreen from './screens/FormScreen';
import ReportScreen from './screens/ReportScreen';

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
  FormDate: {
    screen: FormScreen,
    navigationOptions: {
      header: null,
    },
  },
  Report: {
    screen: ReportScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const App = createAppContainer(switchNavigator);

if (__DEV__) {
  import('./config/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

export default () => {
  return (
    <Provider store={Store}>
      <App
        ref={navigator => {
          setNavigator(navigator);
        }}
      />
    </Provider>
  );
};
