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
import {SafeAreaView} from 'react-navigation';
import InputWithLabel from '../components/InputWithLabel';
import colors from '../constants/colors';
import icons from '../constants/icons';
import CategorySelector from '../components/CategorySelector';
import SaveButton from '../components/SaveButton';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome5';
import QuantityButton from '../components/QuantityButton';

const FormScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(undefined);
  const [quantity, setQuantity] = useState(1);
  const [addTax, setAddTax] = useState(false);
  const [tax, setTax] = useState('');
  const [isValid, setValid] = useState(true);

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
    <SafeAreaView style={styles.backgroundStyle} forceInset={{bottom: 'never'}}>
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
              }
            }}
          />
        }
      />
      <ScrollView
        style={styles.formContainerStyle}
        contentContainerStyle={{
          justifyContent: 'space-between',
          flexGrow: 1,
          marginVertical: 50,
          marginHorizontal: 30,
        }}>
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
        <CategorySelector
          selectorFunction={setCategory}
          displayText={category}
          data={[
            {icon: icons.meal, name: 'Meals'},
            {icon: icons.clothes, name: 'Clothes & Accessories'},
            {icon: icons.tickets, name: 'Tickets & Fares'},
            {icon: icons.drinks, name: 'Drinks'},
            {icon: icons.snacks, name: 'Snacks'},
            {icon: icons.school, name: 'Education'},
            {icon: icons.healthcare, name: 'Healthcare'},
            {icon: icons.lifestyle, name: 'Lifestyle'},
            {icon: icons.technology, name: 'Technology'},
            {icon: icons.bills, name: 'Bills'},
            {icon: icons.gifts, name: 'Gifts'},
            {icon: icons.miscellaneous, name: 'Other'},
          ]}
        />
        <View style={styles.textContainerStyle}>
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
        <View style={{flexDirection: 'row'}}>
          <View style={styles.textTitleContainerStyle}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.textTitleStyle}>
              Has additional tax:
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Switch
              value={addTax}
              onValueChange={() => setAddTax(!addTax)}
              trackColor={{true: colors.dollarBill, false: 'grey'}}
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

        <View style={styles.textContainerStyle}>
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
          <Text style={{textAlign: 'center', color: 'red', fontSize: 15}}>
            {warningText}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: colors.dollarBill,
  },
  formContainerStyle: {
    backgroundColor: colors.white,
  },
  textContainerStyle: {
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
});

export default FormScreen;
