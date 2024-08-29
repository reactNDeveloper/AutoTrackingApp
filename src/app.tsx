import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import TopTabNavigator from './navigation/TopTabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {ResultProvider} from './context/ResultContextProvider';
import colors from './constants/colors';

function app(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.area}>
      <StatusBar backgroundColor={colors.white} barStyle="light-content" />
      <NavigationContainer>
        <ResultProvider>
          <TopTabNavigator />
        </ResultProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default app;
