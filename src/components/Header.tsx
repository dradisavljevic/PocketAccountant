import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import Selector from './Selector';
import {THEME} from '../state/ThemeReducer';
import {CURRENCY} from '../state/CurrencyReducer';
import {currencyList, themeList} from '../constants/data';
import If from '../utils/conditional';
import AsyncStorage from '@react-native-community/async-storage';

const Header = ({title, onPress, icon, rightButton, showBackButton}) => {
  let menuRef = useRef(null);
  const {theme, currency} = useSelector(state => ({
    theme: state.theme.color,
    currency: state.currency.short,
  }));
  const dispatch = useDispatch();

  const setMenuRef = ref => {
    menuRef = ref;
  };

  const dispatchTheme = async color => {
    dispatch({type: THEME, payload: color});
    await AsyncStorage.setItem('theme', color);
  };

  const dispatchCurrency = async short => {
    dispatch({type: CURRENCY, payload: short});
    await AsyncStorage.setItem('currency', short);
  };

  const closeMenu = () => {
    menuRef.hide();
  };

  const themeColorStyle = {
    backgroundColor: theme,
  };

  return (
    <View style={[styles.headerStyle, themeColorStyle]}>
      <View style={styles.backContainerStyle}>
        <If
          condition={showBackButton}
          then={
            <Icon
              style={styles.backIconStyle}
              name={icon}
              size={25}
              color={colors.white}
              onPress={onPress}
            />
          }
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
        <Menu
          ref={ref => setMenuRef(ref)}
          button={
            <Icon
              style={styles.backIconStyle}
              name={'ellipsis-v'}
              size={25}
              color={colors.white}
              onPress={() => menuRef.show()}
            />
          }>
          <Selector
            selectorFunction={dispatchTheme}
            defaultText={'Change Theme'}
            selectorType={'theme'}
            cleanupFunction={closeMenu}
            data={themeList}
          />
          <MenuDivider />
          <Selector
            selectorFunction={dispatchCurrency}
            defaultText={'Change Currency'}
            selectorType={'currency'}
            cleanupFunction={closeMenu}
            data={currencyList}
          />
        </Menu>
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
  },
  headerTitleContainerStyle: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
  },
  headerTitleStyle: {
    fontSize: 22,
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
