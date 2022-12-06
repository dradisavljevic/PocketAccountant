import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputWithLabel from '../components/InputWithLabel';
import colors from '../constants/colors';
import Selector from '../components/Selector';
import SaveButton from '../components/SaveButton';
import Header from '../components/Header';
import QuantityButton from '../components/QuantityButton';
import uuid from 'react-native-uuid';
import {
  categoryList,
  currencySymbols,
  months,
} from '../constants/data';
import {ITEMS} from '../state/ItemsReducer';
import {getProductTotal} from '../utils/helperFunctions';
import { DatePicker } from 'react-native-wheel-pick';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {StackParamList} from '../utils/navigationTypes';
import { RootState } from 'state/Store';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormScreen = ({navigation, route}: NativeStackScreenProps<StackParamList, 'Form'>) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(undefined);
  const [quantity, setQuantity] = useState(1);
  const [addTax, setAddTax] = useState(false);
  const [tax, setTax] = useState('');
  const [isValid, setValid] = useState(true);
  const id = uuid.v1();
  const _pickDate = route.params._pickDate;
  const _year = route.params._year;
  const _month = route.params._month;
  const _day = route.params._day;
  const dispatch = useDispatch();
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [purchaseDateString, setPurchaseDateString] = useState('');
  let scrollRef: any = useRef<HTMLDivElement>(null);

  const {theme, currency, items} = useSelector((state: RootState) => ({
    theme: state.theme.color,
    currency: state.currency.short,
    items: state.items,
  }));

  const themeColorStyle = {
    backgroundColor: theme,
  };

  let warningText = isValid
    ? ' '
    : 'Please fill in the name, price and category!';

  const getCategory = (cat: string | undefined) => {
    for (const [key, value] of Object.entries(categoryList)) {
      if (value.name == cat) {
        return value.icon;
      }
    }
  };

  const addItem = async () => {
    if (!_pickDate || purchaseDateString == '') {
      let month = months.indexOf(_month) + 1;
      let daystring = _day.toString();
      if (_day < 10) {
        daystring = '0' + _day.toString();
      }
      let monthstring = month.toString();
      if (month < 10) {
        monthstring = '0' + month.toString();
      }
      var date = daystring + '-' + monthstring + '-' + _year.toString();
    } else {
      date = purchaseDateString;
    }
    let data: any = items.items;
    let taxAmount = '0';
    if (addTax) {
      taxAmount = tax;
    }
    if (data && data[date as keyof typeof data]) {
      data[date as keyof typeof data].push({
        id: id,
        category: getCategory(category),
        name: name,
        price: parseFloat(price),
        quantity: quantity,
        tax: parseFloat(taxAmount),
        currency: currency,
      });
    } else {
      data[date] = [
        {
          id: id,
          category: getCategory(category),
          name: name,
          price: parseFloat(price),
          quantity: quantity,
          tax: parseFloat(taxAmount),
          currency: currency,
        },
      ];
    }
    dispatch({type: ITEMS, payload: data});
    await AsyncStorage.setItem('items', JSON.stringify(data));
    navigation.goBack();
  };

  const getDateFromPicker = (pickedDate: Date) => {
    let year = pickedDate.getFullYear();
    let month = pickedDate.getMonth() + 1;
    let day = pickedDate.getDate();
    let daystring = day.toString();
    if (_day < 10) {
      daystring = '0' + _day.toString();
    }
    let monthstring = month.toString();
    if (month < 10) {
      monthstring = '0' + month.toString();
    }
    let datestring = daystring + '-' + monthstring + '-' + year.toString();
    setPurchaseDateString(datestring);
    setPurchaseDate(pickedDate);
  };

  return (
    <SafeAreaView
      style={[styles.backgroundStyle, themeColorStyle]}
      >
      <Header
        title={'Add New Item'}
        onPress={() => navigation.goBack()}
        icon={'times'}
        rightButton={
          <SaveButton
            onPress={() => {
              if (
                price == '' ||
                price == undefined ||
                name == '' ||
                name == undefined ||
                category == undefined
              ) {
                setValid(false);
                scrollRef.scrollToEnd();
              } else {
                setValid(true);
                addItem();
              }
            }}
          />
        }
        showBackButton={true}
      />
      <KeyboardAwareScrollView
        style={styles.formContainerStyle}
        automaticallyAdjustContentInsets={false}
        ref={ref => {
          scrollRef = ref;
        }}
        contentContainerStyle={styles.listContentStyle}>
        <InputWithLabel
          label={'Item Name'}
          value={name}
          onChangeText={text => {
            setName(text);
          }}
          editable={true}
        />
        <InputWithLabel
          label={`Item Price (${currencySymbols[currency]})`}
          value={price}
          onKeyPress={event => {
            if (Number.isNaN(Number(event.nativeEvent.key))) {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
          onChange={event => {
            if (Number.isNaN(Number(event.nativeEvent.text))) {
              event.preventDefault();
              event.stopPropagation();
            } else {
              setPrice(event.nativeEvent.text.replace(/\s/g, ''));
            }
          }}
          maxLength={15}
          keyboardType={'decimal-pad'}
          editable={true}
        />
        <Selector
          selectorFunction={setCategory}
          displayText={category}
          defaultText={'Select a Category'}
          selectorType={'category'}
          data={categoryList}
        />
        <View style={styles.rowContainerStyle}>
          <View style={styles.textTitleContainerStyle}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.textTitleStyle}>
              Quantity:
            </Text>
          </View>
          <View style={styles.quantityButtonsContainerStyle}>
            <QuantityButton
              icon={'minus'}
              onPress={() => setQuantity(quantity - 1)}
              disabled={quantity == 1}
            />
            <View style={styles.textStyle}>
              <Text>{quantity}</Text>
            </View>
            <QuantityButton
              icon={'plus'}
              onPress={() => setQuantity(quantity + 1)}
              disabled={quantity == 100}
            />
          </View>
        </View>
        <View style={styles.rowContainerStyle}>
          <View style={styles.textTitleContainerStyle}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.textTitleStyle}>
              Has additional tax:
            </Text>
          </View>
          <View style={styles.switchStyle}>
            <Switch
              value={addTax}
              onValueChange={() => setAddTax(!addTax)}
              trackColor={{true: theme, false: colors.middleGrey}}
            />
          </View>
        </View>

        <InputWithLabel
          label={'Tax Percentage (%)'}
          value={tax}
          onKeyPress={event => {
            if (Number.isNaN(Number(event.nativeEvent.key))) {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
          onChange={event => {
            if (
              parseFloat(event.nativeEvent.text) > 100 ||
              Number.isNaN(Number(event.nativeEvent.text))
            ) {
              event.preventDefault();
              event.stopPropagation();
            } else {
              setTax(event.nativeEvent.text.replace(/\s/g, ''));
            }
          }}
          maxLength={5}
          keyboardType={'decimal-pad'}
          editable={addTax}
        />

        {_pickDate && (
          <View style={styles.datePickerContainerStyle}>
            <View style={styles.textTitleContainerStyle}>
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={styles.textTitleStyle}>
                Date Purchased:
              </Text>
            </View>
            <DatePicker
              mode="date"
              textColor={colors.black}
              style={styles.datePickerStyle}
              onDateChange={pickedDate => {
                getDateFromPicker(pickedDate);
              }}
              date={purchaseDate}
            />
          </View>
        )}

        <View style={styles.rowContainerStyle}>
          <View style={styles.textTitleContainerStyle}>
            <Text
              style={styles.textTitleStyle}
              adjustsFontSizeToFit
              numberOfLines={1}>
              Total:
            </Text>
          </View>
          <View>
            <Text>
              {getProductTotal(+tax, +price, quantity, currency, addTax)}{' '}
              {currencySymbols[currency]}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.warningStyle}>{warningText}</Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  },
  formContainerStyle: {
    backgroundColor: colors.white,
    flex: 1,
  },
  rowContainerStyle: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  textTitleContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textTitleStyle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  quantityButtonsContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textStyle: {
    marginHorizontal: 15,
    alignItems: 'center',
    width: 30,
    justifyContent: 'center',
  },
  listContentStyle: {
    justifyContent: 'space-between',
    marginVertical: 50,
    marginHorizontal: 30,
    paddingBottom: 100,
    flexGrow: 1,
  },
  switchStyle: {
    flex: 1,
    alignItems: 'flex-end',
  },
  warningStyle: {
    textAlign: 'center',
    color: colors.pureRed,
    fontSize: 15,
  },
  datePickerContainerStyle: {
    backgroundColor: colors.white,
    marginBottom: 20,
  },
  datePickerStyle: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default FormScreen;
