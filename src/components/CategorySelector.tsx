import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../constants/colors';

const CategorySelector = ({selectorFunction, displayText, data}) => {
  const [showModal, setShowModal] = useState(false);
  const [icon, setIcon] = useState(undefined);
  const cancelationText = 'Cancel';

  let categories = data.map((item, index) => {
    let marginTop = index == 0 ? 50 : 15;
    let marginBottom = index == data.length - 1 ? 30 : 0;
    return (
      <TouchableOpacity
        key={item.name}
        onPress={() => {
          selectorFunction(item.name);
          setShowModal(false);
          setIcon(item.icon);
        }}>
        <View style={[styles.categoryStyle, {marginTop, marginBottom}]}>
          <Icon
            style={styles.categoryIconStyle}
            name={item.icon}
            size={25}
            color={colors.black}
          />
          <Text
            style={{
              color: 'blue',
              fontSize: 18,
              textAlign: 'center',
              flex: 1,
              marginRight: 45,
            }}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  });

  const getIcon = () => {
    if (icon == undefined) {
      return null;
    }
    return (
      <Icon
        style={styles.categoryIconStyle}
        name={icon}
        size={25}
        color={colors.black}
      />
    );
  };

  return (
    <View>
      <Modal
        transparent={true}
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        animationType={'slide'}>
        <TouchableWithoutFeedback
          onPress={() => {
            setShowModal(false);
          }}>
          <View style={styles.overlayStyle}>
            {categories}
            <View style={styles.cancelContainer}>
              <TouchableOpacity
                onPress={() => {
                  setShowModal(false);
                }}
                accessible={true}
                accessibilityLabel={'Cancel'}
                accessibilityHint={
                  'Closes the screen without picking the category'
                }>
                <View style={styles.cancelStyle}>
                  <Text style={styles.cancelTextStyle}>{cancelationText}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          setShowModal(true);
          Keyboard.dismiss();
        }}
        style={styles.buttonStyle}>
        {getIcon()}
        <Text style={styles.buttonTextStyle}>
          {displayText || 'Select a Category'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayStyle: {
    flex: 1,
    padding: '5%',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  optionContainer: {
    borderRadius: 5,
    flexShrink: 1,
    marginBottom: 8,
    padding: 8,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  cancelStyle: {
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,1)',
    padding: 8,
  },
  cancelContainer: {
    alignSelf: 'stretch',
  },
  cancelTextStyle: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
  },
  categoryStyle: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonStyle: {
    backgroundColor: 'rgba(255,255,255,1)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  buttonTextStyle: {
    fontSize: 18,
  },
  categoryIconStyle: {
    width: 45,
    paddingRight: 10,
    paddingLeft: 10,
  },
});

export default CategorySelector;
