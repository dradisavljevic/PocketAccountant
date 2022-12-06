import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, StyleSheet, GestureResponderEvent} from 'react-native';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Menu, MenuDivider} from 'react-native-material-menu';
import Selector from './Selector';
import {THEME} from '../state/ThemeReducer';
import {CURRENCY} from '../state/CurrencyReducer';
import {currencyList, themeList} from '../constants/data';
import If from '../utils/conditional';
import {RootState} from '../state/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HeaderProps = { title: string, onPress?: ((event: GestureResponderEvent) => void), icon?: string, rightButton?: JSX.Element|JSX.Element[], showBackButton?: boolean }

const Header = ({title, onPress, icon, rightButton, showBackButton}: HeaderProps) => {

  const [visible, setVisible] = useState(false);
  const {theme, currency} = useSelector((state: RootState) => ({
    theme: state.theme.color,
    currency: state.currency.short,
  }));
  const dispatch = useDispatch();


  const dispatchTheme = async (color: string) => {
    dispatch({type: THEME, payload: color});
    await AsyncStorage.setItem('theme', color);
  };

  const dispatchCurrency = async (short: string) => {
    dispatch({type: CURRENCY, payload: short});
    await AsyncStorage.setItem('currency', short);
  };


  const themeColorStyle = {
    backgroundColor: theme,
  };

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  return (
    <View style={[styles.headerStyle, themeColorStyle]}>
      <View style={styles.backContainerStyle}>
        <If
          condition={showBackButton}
          then={
            <Icon
              style={styles.backIconStyle}
              name={icon!}
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
          visible={visible}
          onRequestClose={hideMenu}
          anchor={
            <Icon
              style={styles.backIconStyle}
              name={'ellipsis-v'}
              size={25}
              color={colors.white}
              onPress={showMenu}
            />
          }>
          <Selector
            selectorFunction={dispatchTheme}
            defaultText={'Change Theme'}
            selectorType={'theme'}
            data={themeList}
            cleanupFunction={hideMenu}
          />
          <MenuDivider />
          <Selector
            selectorFunction={dispatchCurrency}
            defaultText={'Change Currency'}
            selectorType={'currency'}
            data={currencyList}
            cleanupFunction={hideMenu}
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
