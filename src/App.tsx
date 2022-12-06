import React from 'react';
import {Provider} from 'react-redux';
import Store from './state/Store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import CalendarScreen from './screens/CalendarScreen';
import DayScreen from './screens/DayScreen';
import FormScreen from './screens/FormScreen';
import ReportScreen from './screens/ReportScreen';
import {StackParamList} from './utils/navigationTypes';

const Stack = createNativeStackNavigator<StackParamList>();

export default () => {
  return (
    <Provider store={Store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Calendar"
              options={{headerShown: false}}
              component={CalendarScreen}
            />
            <Stack.Screen
              name="Day"
              options={{headerShown: false}}
              component={DayScreen}
            />
            <Stack.Screen
              name="Form"
              options={{headerShown: false}}
              component={FormScreen}
            />
            <Stack.Screen
              name="Report"
              options={{headerShown: false}}
              component={ReportScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};
