import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './pages/home';
import Details from './pages/details';

const Routes = createAppContainer(
  createSwitchNavigator({
    App: createSwitchNavigator({
      Home,
    }),
    App2: createStackNavigator(
      {
        Details,
      },
      {
        defaultNavigationOptions: {
          headerTransparent: true,
          headerTintColor: 'transparent',
          headerLeftContainerStyle: {
            marginLeft: 0,
            top: 19,
          },
        },
      },
    ),
  }),
);

export default Routes;
