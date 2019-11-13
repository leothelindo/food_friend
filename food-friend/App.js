import React, {Component} from 'react';
import { StyleSheet, Text, View, PermissionsAndroid, SafeAreaView } from 'react-native';
import { createAppContainer } from 'react-navigation'
import { Navigator } from "./src/navigation/Navigators"






const AppContainer = createAppContainer(Navigator);
/* opens the login page when opening the app */
export default class App extends Component{
  /* for android devices asks for location permission */
  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Location Access Permission',
          'message': 'This App needs access to your location ' +                    'so you can use it.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
      } else {
        console.log("Location permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }
  render() {
    return (
        <AppContainer />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
