/**
 * @format
 * @flow strict-local
 */

import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes'

const App = () => {

  const MyStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );

  return (
    <>
      <NavigationContainer>
        <MyStatusBar backgroundColor="white" barStyle="dark-content" />
        <SafeAreaView style={styles.safeAreaView}>
          <Routes />
        </SafeAreaView>
      </NavigationContainer>
    </>
  );
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

export default App;
