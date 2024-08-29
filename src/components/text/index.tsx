import {ReactNode} from 'react';
import {Text as RNText, StyleSheet, StyleProp, TextStyle} from 'react-native';
import colors from '../../constants/colors';

type TextProps = {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
  type?: Type;
};

export enum Type {
  LABEL = 'label',
  SUBLABEL = 'subLabel',
}

const Text = ({type = Type.SUBLABEL, children, style = []}: TextProps) => {
  return <RNText style={[styles[type], style]}>{children} </RNText>;
};

export default Text;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.blue,
    marginBottom: 8,
  },
  subLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.mediumDarkBlue,
    marginTop: 20,
    marginBottom: 8,
  },
});
