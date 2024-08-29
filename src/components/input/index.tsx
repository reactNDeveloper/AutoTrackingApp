import {
  TextInput as RNTextInput,
  StyleSheet,
  StyleProp,
  TextStyle,
  View,
} from 'react-native';
import Text from '../text';
import colors from '../../constants/colors';

type InputProps = {
  value: string;
  label: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  inputStyle?: StyleProp<TextStyle>;
};

export enum Type {
  LABEL = 'label',
  SUBLABEL = 'subLabel',
}

const Input = ({
  value,
  label,
  onChangeText,
  placeholder,
  inputStyle = [],
}: InputProps) => {
  return (
    <View>
      <Text type={Type.LABEL}>{label}</Text>
      <RNTextInput
        keyboardType="numeric"
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor="#A9A9A9"
        style={[styles.inputCustomText, inputStyle]}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputCustomText: {
    height: 40,
    borderColor: colors.solitude,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  subLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.mediumDarkBlue,
    marginTop: 20,
    marginBottom: 8,
  },
});
