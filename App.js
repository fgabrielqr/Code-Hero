import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/routes';

//console.disableYellowBox = true;

const App = () => {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};

export default App;
