import React, {useState, useEffect} from 'react';
import {View, TextInput, Animated, StyleSheet} from 'react-native';
import colors from '../constants/colors';

var animatedIsFocused = new Animated.Value(0);

const InputWithLabel: FC<Props> = ({label, ...props}) => {
  const [focused, setFocued] = useState(false);

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: focused || props.value !== '' ? 1 : 0,
      duration: 200,
    }).start();
  }, [focused]);

  const animationStyle = {
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [26, 8],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 14],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#000'],
    }),
  };

  return (
    <View style={styles.containerStyle}>
      <Animated.Text style={[styles.textStyle, animationStyle]}>
        {label}
      </Animated.Text>
      <TextInput
        style={styles.inputStyle}
        {...props}
        onFocus={() => setFocued(true)}
        onBlur={() => setFocued(false)}
        blurOnSubmit
        autoCapitalize={'none'}
        autoCorrect={false}
        autoCompleteType={'off'}
        selectionColor={colors.dollarBill}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    height: 26,
    fontSize: 20,
    color: '#000',
    paddingLeft: 10,
  },
  textStyle: {
    position: 'absolute',
    left: 0,
    paddingLeft: 10,
  },
  containerStyle: {
    paddingTop: 26,
    paddingBottom: 15,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
  },
});

export default InputWithLabel;
