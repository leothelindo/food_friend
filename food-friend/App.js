import React, {Component} from 'react';
import { StyleSheet, Text, View, PermissionsAndroid } from 'react-native';

import Login from './src/pages/login/Login';
import Homepage from './src/pages/homepage/Homepage';
import Signup from './src/pages/signup/Signup';
import RestaurantDetails from './src/pages/homepage/RestaurantDetails';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation'



const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Login
    }, 
    Homepage:{
      screen: Homepage
    },
    Signup:{
      screen: Signup
    },
    Restaurants:{
      screen: RestaurantDetails
    }
  },
  
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);
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
