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
import colors from '../constants/colors';
import InputWithLabel from './InputWithLabel';
import {currencySymbols} from '../constants/data';

const ModalField = ({buttonText, fieldLabel}) => {
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState('');
  const cancelationText = 'Cancel';
  const saveText = 'Save Budget';
  const currency = useSelector(state => state.currency.short);

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
          <View style={styles.inputContainerStyle}>
            <InputWithLabel
              label={fieldLabel}
              value={text}
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
                  setText(event.nativeEvent.text.replace(/\s/g, ''));
                }
              }}
              editable={true}
              maxLength={15}
              keyboardType={'decimal-pad'}
            />
          </View>
          <View style={styles.cancelContainer}>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
              }}
              accessible={true}
              accessibilityLabel={'Cancel'}
              accessibilityHint={
                'Closes the screen without picking any option'
              }>
              <View style={styles.saveStyle}>
                <Text style={styles.saveTextStyle}>{saveText}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
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
        style={[styles.buttonStyle]}>
        <Text style={styles.buttonTextStyle}>{buttonText}</Text>
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
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  inputContainerStyle: {
    marginBottom: 20,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 5,
  },
  cancelStyle: {
    borderRadius: 5,
    backgroundColor: colors.white,
    padding: 12,
  },
  cancelContainer: {
    alignSelf: 'stretch',
  },
  cancelTextStyle: {
    textAlign: 'center',
    color: colors.pureRed,
    fontSize: 16,
  },
  saveStyle: {
    borderRadius: 5,
    backgroundColor: colors.white,
    padding: 12,
    marginBottom: 10,
  },
  saveTextStyle: {
    textAlign: 'center',
    color: colors.dodgerBlue,
    fontSize: 16,
  },
  buttonStyle: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    flexDirection: 'row',
  },
  buttonTextStyle: {
    fontSize: 18,
    color: colors.dodgerBlue,
    textDecorationLine: 'underline',
  },
});

export default ModalField;
