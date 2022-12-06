import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  TextInput,
  Animated,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextInputChangeEventData,
  KeyboardTypeOptions,
} from 'react-native';
import colors from '../constants/colors';
import {RootState} from '../state/Store';

type LabelProps = {
  label: string;
  value: string;
  editable: boolean;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions | undefined;
  onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
  onChangeText?: (text: string) => void;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
};

const InputWithLabel = ({label, ...props}: LabelProps) => {
  const [focused, setFocued] = useState(false);
  const [animationStart, setAnimationStart] = useState(
    props.value == '' ? new Animated.Value(1) : new Animated.Value(0),
  );
  const theme = useSelector((state: RootState) => state.theme.color);

  useEffect(() => {
    Animated.timing(animationStart, {
      toValue: focused || props.value !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
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
        props.editable ? colors.silver : colors.lightGray,
        props.editable ? (focused ? theme : colors.black) : colors.lightGray,
      ],
    }),
  };

  const borderStyle = {
    borderColor: focused
      ? theme
      : props.editable
      ? colors.davySGrey
      : colors.lightGray,
  };

  const textColorStyle = {
    color: props.editable ? colors.black : colors.lightGray,
  };

  return (
    <View style={[styles.containerStyle, borderStyle]}>
      <Animated.Text style={[styles.textStyle, animationStyle]}>
        {label}
      </Animated.Text>
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
        autoCapitalize={'sentences'}
        autoCorrect={false}
        autoComplete={'off'}
        selectionColor={theme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    height: 50,
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
    paddingVertical: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.davySGrey,
    marginTop: 5,
    marginBottom: 20,
  },
});

export default InputWithLabel;
