import Login from '../pages/login/Login';
import Homepage from '../pages/homepage/Homepage';
import Signup from '../pages/login/Signup';
import RestaurantDetails from '../pages/homepage/RestaurantDetails';

import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation'
import Logo from '../pages/login/Logo';


// Navigate along main app
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

// Navigate along sign in and auth screens
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

// TODO: Create App Drawer by updating DrawerNavigatorConfig
  
// The main navigator that switches been auth and main stacks
// This ensures that once you switch from log in to main you can switch back without data transfering 
export const Navigator = createSwitchNavigator(
    {
        Auth: AuthNavigator,
        App: AppNavigator
    },
    {
        initialRouteName: 'Auth'
    }
)