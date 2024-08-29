import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Settings from '../screens/Settings';
import TrakingResult from '../screens/TrakingResult';
import {StyleSheet} from 'react-native';
import colors from '../constants/colors';

const Tab = createMaterialTopTabNavigator();
function TopTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
        tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
        tabBarPressColor: 'rgba(0, 0, 0, 0.1)',
        tabBarIndicatorContainerStyle: styles.tabBarIndicatorContainerStyle,
      }}>
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Auto-tracking Settings',
        }}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Auto-tracking Data',
        }}
        name="TrakingResult"
        component={TrakingResult}
      />
    </Tab.Navigator>
  );
}
export default TopTabNavigator;

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'none',
    color: colors.black,
  },
  tabBarStyle: {
    backgroundColor: colors.gray,
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 10,
    height: 60,
  },
  tabBarItemStyle: {
    borderRadius: 25,
  },
  tabBarIndicatorStyle: {
    backgroundColor: colors.white,
    borderRadius: 25,
    height: '100%',
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  tabBarIndicatorContainerStyle: {
    marginHorizontal: 2,
    borderRadius: 25,
  },
});
