import {StyleSheet, View, Switch} from 'react-native';
import Text from '../text';
import colors from '../../constants/colors';

type ToggleProps = {
  isEnabled: boolean;
  subLabel: string;
  label: string;
  toggleSwitch: () => void;
};

export enum Type {
  LABEL = 'label',
  SUBLABEL = 'subLabel',
}

const Toggle = ({isEnabled, subLabel, label, toggleSwitch}: ToggleProps) => {
  return (
    <>
      <Text type={Type.SUBLABEL}>{subLabel}</Text>
      <View style={styles.switchContainer}>
        <Text type={Type.LABEL} style={styles.switchLabel}>
          {label}
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#1E293B'}}
          thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </>
  );
};
export default Toggle;

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.blue,
  },
});
