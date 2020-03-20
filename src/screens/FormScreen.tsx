import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-navigation';
import InputWithLabel from '../components/InputWithLabel';
import colors from '../constants/colors';
import Selector from '../components/Selector';
import SaveButton from '../components/SaveButton';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import QuantityButton from '../components/QuantityButton';
import uuid from 'react-native-uuid';
import {categoryList} from '../constants/data';

const FormScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(undefined);
  const [quantity, setQuantity] = useState(1);
  const [addTax, setAddTax] = useState(false);
  const [tax, setTax] = useState('');
  const [isValid, setValid] = useState(true);
  const id = uuid.v1();
  const theme = useSelector(state => state.theme.color);

  const themeColorStyle = {
    backgroundColor: theme,
  };

  var warningText = isValid ? ' ' : 'Please fill in all of the fields';

  const getTotal = () => {
    var taxAmout = parseFloat(tax);
    var priceAmount = parseFloat(price);

    if (Number.isNaN(taxAmout) || !addTax) {
      taxAmout = 0;
    } else {
      taxAmout = taxAmout / 100;
    }

    if (Number.isNaN(priceAmount)) {
      priceAmount = 0;
    }

    total = (priceAmount + priceAmount * taxAmout) * quantity;

    total = total % 1 == 0 ? total.toFixed(0) : total.toFixed(2);

    return total;
  };

  return (
    <SafeAreaView
      style={[styles.backgroundStyle, themeColorStyle]}
      forceInset={{bottom: 'never'}}>
      <Header
        title={'Add New Item'}
        onPress={() => navigation.goBack(null)}
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
              } else {
                setValid(true);
              }
            }}
          />
        }
      />
      <ScrollView
        style={styles.formContainerStyle}
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
          label={'Item Price (¥)'}
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
          maxLength={12}
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
              trackColor={{true: colors.dollarBill, false: colors.middleGrey}}
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
            <Text>{getTotal()}¥</Text>
          </View>
        </View>
        <View>
          <Text style={styles.warningStyle}>{warningText}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  },
  formContainerStyle: {
    backgroundColor: colors.white,
  },
  rowContainerStyle: {
    flexDirection: 'row',
  },
  textTitleContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textTitleStyle: {
    fontSize: 20,
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
    flexGrow: 1,
    marginVertical: 50,
    marginHorizontal: 30,
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
});

export default FormScreen;
