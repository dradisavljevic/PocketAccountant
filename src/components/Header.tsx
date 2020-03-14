import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import icons from '../constants/icons';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Header = ({title, onPress, icon, rightButton}) => {
  return (
    <View style={styles.headerStyle}>
      <View style={styles.backContainerStyle}>
        <Icon
          style={styles.backIconStyle}
          name={icon}
          size={25}
          color={colors.white}
          onPress={onPress}
        />
      </View>
      <View style={styles.headerTitleContainerStyle}>
        <Text
          style={styles.headerTitleStyle}
          adjustsFontSizeToFit
          numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={styles.rightContainerStyle}>
        {rightButton}
        <Icon
          style={styles.backIconStyle}
          name={'ellipsis-v'}
          size={25}
          color={colors.white}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backContainerStyle: {
    flex: 1,
  },
  backIconStyle: {
    width: 25,
    textAlign: 'center',
  },
  headerStyle: {
    height: 60,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dollarBill,
  },
  headerTitleContainerStyle: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleStyle: {
    fontSize: 32,
    color: colors.white,
  },
  rightContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default Header;
