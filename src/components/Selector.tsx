import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../constants/colors';
import If from '../utils/conditional';

const Selector = ({
  data,
  defaultText,
  displayText,
  selectorType,
  selectorFunction,
  cleanupFunction,
}) => {
  const [showModal, setShowModal] = useState(false);
  const {theme, currency} = useSelector(state => ({
    theme: state.theme.color,
    currency: state.currency.short,
  }));
  const [icon, setIcon] = useState(undefined);
  const [color, setColor] = useState(theme);
  const [abbrev, setAbbrev] = useState(currency);
  const cancelationText = 'Cancel';

  const getIcon = () => {
    if (icon == undefined) {
      return null;
    }
    return (
      <Icon
        style={styles.selectedCategoryIconStyle}
        name={icon}
        size={25}
        color={colors.black}
      />
    );
  };

  const getAbbreviation = () => {
    if (abbrev == undefined) {
      return null;
    }
    return (
      <View style={styles.currencyDisplayStyle}>
        <Text style={styles.currencyTextStyle}>{abbrev}</Text>
      </View>
    );
  };

  const getColor = () => {
    if (color == undefined) {
      return null;
    }
    return (
      <View style={[{backgroundColor: color}, styles.themeDisplayStyle]} />
    );
  };

  const typeSpecificStyle =
    selectorType == 'category'
      ? {
          borderWidth: 1,
          borderColor: colors.black,
          borderRadius: 10,
        }
      : {
          width: 200,
        };

  let options = data.map((item, index) => {
    let marginTop = index == 0 ? 50 : 15;
    let marginBottom = index == data.length - 1 ? 30 : 0;

    const onPress = item => {
      setShowModal(false);
      if (selectorType == 'category') {
        selectorFunction(item.name);
        setIcon(item.icon);
      } else if (selectorType == 'theme') {
        selectorFunction(item.color);
        setColor(item.color);
      } else {
        selectorFunction(item.short);
        setAbbrev(item.short);
      }
      cleanupFunction && cleanupFunction();
    };

    return (
      <TouchableOpacity key={item.name} onPress={() => onPress(item)}>
        <View style={[styles.optionStyle, {marginTop, marginBottom}]}>
          <If
            condition={selectorType == 'category'}
            then={
              <Icon
                style={styles.selectedCategoryIconStyle}
                name={item.icon}
                size={25}
                color={colors.black}
              />
            }
            else={
              <If
                condition={selectorType == 'theme'}
                then={
                  <View
                    style={[
                      {backgroundColor: item.color},
                      styles.selectedThemeStyle,
                    ]}
                  />
                }
                else={
                  <View style={styles.selectedCurrencyStyle}>
                    <Text style={styles.currencyTextStyle}>{item.short}</Text>
                  </View>
                }
              />
            }
          />
          <Text style={styles.optionTextStyle}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  });

  return (
    <View>
      <Modal
        transparent={true}
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        animationType={'slide'}>
        <ScrollView
          style={styles.overlayStyle}
          contentContainerStyle={styles.overlayItemsStyle}>
          {options}
          <View style={styles.cancelContainer}>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
                cleanupFunction && cleanupFunction();
              }}
              accessible={true}
              accessibilityLabel={'Cancel'}
              accessibilityHint={
                'Closes the screen without picking any option'
              }>
              <View style={styles.cancelStyle}>
                <Text style={styles.cancelTextStyle}>{cancelationText}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          setShowModal(true);
          Keyboard.dismiss();
        }}
        style={[styles.buttonStyle, typeSpecificStyle]}>
        <If
          condition={selectorType == 'category'}
          then={getIcon()}
          else={
            <If
              condition={selectorType == 'theme'}
              then={getColor()}
              else={getAbbreviation()}
            />
          }
        />
        <Text style={styles.buttonTextStyle}>{displayText || defaultText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayStyle: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.transparentBlack,
  },
  overlayItemsStyle: {
    justifyContent: 'center',
    paddingBottom: 90,
    paddingHorizontal: 10,
  },
  optionContainer: {
    borderRadius: 5,
    flexShrink: 1,
    marginBottom: 8,
    padding: 8,
    backgroundColor: colors.white,
  },
  cancelStyle: {
    borderRadius: 5,
    backgroundColor: colors.white,
    padding: 8,
  },
  cancelContainer: {
    alignSelf: 'stretch',
  },
  cancelTextStyle: {
    textAlign: 'center',
    color: colors.pureRed,
    fontSize: 16,
  },
  optionStyle: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonStyle: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonTextStyle: {
    fontSize: 18,
  },
  selectedCategoryIconStyle: {
    width: 45,
    paddingRight: 10,
    paddingLeft: 10,
  },
  optionTextStyle: {
    color: colors.dodgerBlue,
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    marginRight: 45,
  },
  currencyDisplayStyle: {
    width: 35,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  currencyTextStyle: {
    fontWeight: 'bold',
  },
  themeDisplayStyle: {
    width: 25,
    height: 25,
    marginRight: 25,
  },
  selectedThemeStyle: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  selectedCurrencyStyle: {
    width: 35,
    height: 25,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Selector;
