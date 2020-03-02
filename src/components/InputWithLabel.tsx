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
      outputRange: [26, 8],
    }),
    fontSize: animationStart.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 14],
    }),
    color: animationStart.interpolate({
      inputRange: [0, 1],
      outputRange: ['#aaa', '#000'],
    }),
  };

  return (
    <View style={styles.containerStyle}>
      <Animated.Text style={[styles.textStyle, animationStyle]}>
        {label}
      </Animated.Text>
      <If
        condition={props.mask == undefined}
        then={
          <TextInput
            style={styles.inputStyle}
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
            style={styles.inputStyle}
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
