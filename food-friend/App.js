import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
