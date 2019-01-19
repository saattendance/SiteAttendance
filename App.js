import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from "react-redux";
import { Root } from 'native-base';
import configureStore from "./configureStore";
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
//import { getRemoteConfig } from './lib/firebaseHelper';
import {setAppConfig} from './util';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    store:{}
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
           <Provider store={this.state.store}>
            <Root>
              <AppNavigator />
            </Root>
           </Provider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
   /* const config = await getRemoteConfig();
    config.on('value', (snapshot) => {
      console.log(snapshot.val());
      console.log('firebase');
      setAppConfig(snapshot.val());
    });*/
      const config = {
          "API_URL": "http://www.paysalaryday.com:7070/SASystem/",
          "APP_NAME": "SITE ATTENDANCE",
          "DESC_KEY": "Description",
          "GEO_API_ENABLED": true,
          "GEO_API_KEY": "AIzaSyC_wPzknaOx-vUEMGXZT_wPwApMw7-zryw",
          "GEO_API_URL": "https://maps.googleapis.com/maps/api/geocode/json?latlng=",
          "REPORT_PATH": "http://192.168.0.101/testpage1"
      };
      setAppConfig(config);
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({
      isLoadingComplete: true,
      store: configureStore(() => this.setState({ isLoadingComplete: true }))
     });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
  },
});
