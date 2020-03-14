import React, {useState, useEffect} from 'react';
import {View, TextInput, Animated, StyleSheet} from 'react-native';
import colors from '../constants/colors';
import TextInputMask from 'react-native-text-input-mask';
import If from '../utils/conditional';

const InputWithLabel: FC<Props> = ({label, ...props}) => {
  const [focused, setFocued] = useState(false);
  const [animationStart, setAnimationStart] = useState(
    props.value == '' ? new Animated.Value(1) : new Animated.Value(0),
  );

  useEffect(() => {
    Animated.timing(animationStart, {
      toValue: focused || props.value !== '' ? 1 : 0,
      duration: 200,
    }).start();
  }, [focused]);

  const animationStyle = {
    top: animationStart.interpolate({
      inputRange: [0, 1],
      outputRange: [15, -10],
    }),
    fontSize: animationStart.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 14],
    }),
    color: animationStart.interpolate({
      inputRange: [0, 1],
      outputRange: [
        props.editable ? '#aaa' : colors.lightGray,
        props.editable
          ? focused
            ? colors.dollarBill
            : '#000'
          : colors.lightGray,
      ],
    }),
  };

  const borderStyle = {
    borderColor: focused
      ? colors.dollarBill
      : props.editable
      ? '#555'
      : colors.lightGray,
  };

  const textColorStyle = {
    color: props.editable ? '#000' : colors.lightGray,
  };

  return (
    <View style={[styles.containerStyle, borderStyle]}>
      <Animated.Text style={[styles.textStyle, animationStyle]}>
        {label}
      </Animated.Text>
      <If
        condition={props.mask == undefined}
        then={
          <TextInput
            style={[styles.inputStyle, textColorStyle]}
            {...props}
            onFocus={() => setFocued(true)}
            onBlur={() => {
              setFocued(false);
              if (props.value == '') {
                setAnimationStart(new Animated.Value(1));
              }
            }}
            blurOnSubmit
            autoCapitalize={'none'}
            autoCorrect={false}
            autoCompleteType={'off'}
            selectionColor={colors.dollarBill}
          />
        }
        else={
          <TextInputMask
            style={[styles.inputStyle, textColorStyle]}
            {...props}
            onFocus={() => setFocued(true)}
            onBlur={() => {
              setFocued(false);
              if (props.value == '') {
                setAnimationStart(new Animated.Value(1));
                this.textInput.input.clear();
              }
            }}
            blurOnSubmit
            ref={input => {
              this.textInput = input;
            }}
            autoCapitalize={'none'}
            autoCorrect={false}
            autoCompleteType={'off'}
            selectionColor={colors.dollarBill}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    height: 26,
    fontSize: 20,
    paddingLeft: 10,
  },
  textStyle: {
    position: 'absolute',
    left: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 5,
    marginLeft: 10,
  },
  containerStyle: {
    paddingVertical: 15,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#555',
  },
});

export default InputWithLabel;
