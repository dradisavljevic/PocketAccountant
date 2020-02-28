import React, { useState } from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';

const CalendarScreen = ({ navigation }) => {
  const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [activeDate, setActiveDate] = useState(new Date());

  const generateMatrix = () => {
      var matrix = [];
      matrix[0] = weekDays;

      let year = activeDate.getFullYear();
      let month = activeDate.getMonth();

      let firstDay = new Date(year, month, 1).getDay();

      let maxDays = nDays[month];
      if (month == 1) {
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
          maxDays += 1;
        }
      }

      let counter = 1;
      for (let row = 1; row < 7; row++) {
        matrix[row] = [];
        for (let col = 0; col < 7; col++) {
          matrix[row][col] = -1;
          if (row == 1 && col >= firstDay) {
            matrix[row][col] = counter++;
          } else if (row > 1 && counter <= maxDays) {
            matrix[row][col] = counter++;
          }
        }
      }

      return matrix;
  }

  _onPress = (item) => {
      if (!item.match && item != -1)
          setActiveDate(new Date(activeDate.getFullYear(), activeDate.getMonth(), item));
  };

  changeMonth = (n) => {
      setActiveDate(new Date(activeDate.getFullYear(), activeDate.getMonth()+n, activeDate.getDate()));
  }

  var matrix = generateMatrix();

  var rows = [];
  rows = matrix.map((row, rowIndex) => {
    var rowItems = row.map((item, colIndex) => {
      return (
        <TouchableOpacity
        disabled={rowIndex == 0}
        style={{
          flex: 1,
          height: rowIndex != 0 ? 60 : 30,
          textAlign: 'center',
          backgroundColor: rowIndex == 0 ? '#ddd' : '#fff',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        key={rowIndex + " " + colIndex}
        onPress={() => {
                    navigation.navigate('Day', { _year: activeDate.getFullYear(), _month: months[activeDate.getMonth()], _day: item });
                  }}>
        <View style={{
          height: 30,
          width: 30,
          borderRadius: 60,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: item == activeDate.getDate() ? '#000': rowIndex == 0 ? '#ddd' : '#fff'
        }} >
            <Text style={{
              color: item == activeDate.getDate() ? '#fff' : '#000',
              fontWeight: item == activeDate.getDate() ? 'bold': 'normal'
            }}>
              {item != -1 ? item : ''}
            </Text>
            </View>
        </TouchableOpacity>
      );
    });
    return (
      <View
        key={rowIndex}
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 15,
          margin: 15,
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
        {rowItems}
      </View>
    );
  });

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
        <Text style={{
            fontWeight: 'bold',
            fontSize: 18,
            textAlign: 'center',
            marginTop: 10,
            marginBottom: 10
            }}>
            {months[activeDate.getMonth()]} &nbsp;
            {activeDate.getFullYear()}
        </Text>
        { rows }
        <Button title="Previous" onPress={() => changeMonth(-1)}/>
        <Button title="Next" onPress={() => changeMonth(+1)}/>
    </SafeAreaView>
  );
};

export default CalendarScreen;
