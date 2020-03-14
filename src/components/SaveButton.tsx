import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';

const SaveButton = ({title, onPress}) => {
  return (
    <TouchableOpacity style={{padding: 5}} onPress={onPress}>
      <Text style={{fontSize: 18, color: 'blue'}}>Save</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default SaveButton;
