import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TailwindProvider } from 'tailwindcss-react-native';
import HomeScreen from './screens/HomeScreen';
import InfoScreen from './screens/InfoScreen';
import { Provider } from 'react-redux';
import { store } from './store';
import BasketScreen from './screens/BasketScreen';
import PreparingPickupScreen from './screens/PreparingPickupScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import DetailsScreen from './screens/DetailsScreen';
import Loading from './screens/Loading';
import BasketScreen2 from './screens/BasketScreen2';
import PreparingPickupScreen2 from './screens/PreparingPickupScreen2';
import DeliveryScreen2 from './screens/DeliveryScreen2';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { useEffect, useState } from 'react';

import {firebase} from './config'
import FetchData from './screens/FetchData';
import FetchData2 from './screens/FetchData2';
import AdminDetails from './screens/AdminDetails';
import Loading2 from './screens/Loading2';
import HomeScreen2 from './screens/HomeScreen2';
import FetchSOS from './screens/FetchSOS';





const Stack = createNativeStackNavigator();

export default function App() {

  const [initialization, setInitilization] = useState(true);
  const [user,setUser] =  useState();

  function onAuthStateChanged(user){
    setUser(user);
    if(initialization) setInitilization(false);
  }

  useEffect(()=>{
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  },[]);

  if(initialization) return null

  
  return (
    <NavigationContainer>
      <Provider store={store}>
      <TailwindProvider>
        <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>

    <Stack.Screen name="Info" component={InfoScreen} options={{headerShown: false}}/>

    <Stack.Screen name="Basket" component={BasketScreen} options={{presentation:"modal", headerShown: false, }}/>

    <Stack.Screen name="PreparingPickupScreen" component={PreparingPickupScreen} options={{presentation:"fullScreenModal", headerShown: false}}/>

    <Stack.Screen name="PreparingPickupScreen2" component={PreparingPickupScreen2} options={{presentation:"fullScreenModal", headerShown: false}}/>

    <Stack.Screen name="DeliveryScreen" component={DeliveryScreen} options={{presentation:"fullScreenModal", headerShown: false}}/>

    <Stack.Screen name="DeliveryScreen2" component={DeliveryScreen2} options={{presentation:"fullScreenModal", headerShown: false}}/>

    <Stack.Screen name="Details" component={DetailsScreen} options={{presentation:"fullScreenModal", headerShown: false}}/>

    <Stack.Screen name="Loading" component={Loading} options={{presentation:"fullScreenModal", headerShown: false}}/>

    <Stack.Screen name="Basket2" component={BasketScreen2} options={{presentation:"modal", headerShown: false, }}/>

    <Stack.Screen name="Login" component={LoginScreen} options={{presentation:"modal", headerShown: false, }}/>

    <Stack.Screen name="Register" component={RegisterScreen} options={{presentation:"modal", headerShown: false, }}/>

    <Stack.Screen name="Fetch" component={FetchData} options={{presentation:"modal", headerShown: false, }}/>

    <Stack.Screen name="Fetch2" component={FetchSOS} options={{presentation:"modal", headerShown: false, }}/>

    <Stack.Screen name="AdminD" component={AdminDetails} options={{presentation:"modal", headerShown: false, }}/>

    <Stack.Screen name="Loading2" component={Loading2} options={{presentation:"modal", headerShown: false, }}/>

    <Stack.Screen name="Home2" component={HomeScreen2} options={{presentation:"modal", headerShown: false, }}/>



    </Stack.Navigator>
    </TailwindProvider>
    </Provider>
    </NavigationContainer>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
