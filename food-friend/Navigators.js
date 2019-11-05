import Login from './src/pages/login/Login';
import Homepage from './src/pages/homepage/Homepage';
import Signup from './src/pages/login/Signup';
import RestaurantDetails from './src/pages/homepage/RestaurantDetails';

import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation'
import Logo from './src/pages/login/Logo';

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
      Main: Logo,
      Login: Login,
      Signup: Signup
    },
    {
      initialRouteName: 'Signup',
      headerMode: 'none'
    }
  );
  
 export const Navigator = createSwitchNavigator(
     {
         Auth: AuthNavigator,
         App: AppNavigator
     },
     {
         initialRouteName: 'Auth'
     }
  )