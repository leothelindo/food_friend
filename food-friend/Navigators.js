import Login from './src/pages/login/Login';
import Homepage from './src/pages/homepage/Homepage';
import Signup from './src/pages/signup/Signup';
import RestaurantDetails from './src/pages/homepage/RestaurantDetails';

import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation'

const AppNavigator = createStackNavigator(
    {
      Homepage: Homepage,
      Restaurants: RestaurantDetails
    },
    {
      initialRouteName: 'Homepage',
      headerMode: 'none',
    }
  );
  
  const AuthNavigator = createStackNavigator(
    {
      Main: Login,
      Login: Login,
      Signup: Signup
    },
    {
      initialRouteName: 'Main',
      headerMode: 'none'
    }
  );
  
 export const Navigator = createSwitchNavigator(
     {
         Auth: AuthNavigator,
         App: AppNavigator
     },
     {
         initialRouteName: 'App'
     }
  )