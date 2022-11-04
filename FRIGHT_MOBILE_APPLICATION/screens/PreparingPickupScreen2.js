import { View, Text, SafeAreaView, } from 'react-native'
import React, { useEffect } from 'react'

import * as Animatable from "react-native-animatable";

import * as Progress from "react-native-progress";
import { useNavigation } from '@react-navigation/native';

const PreparingPickupScreen2 = () => {

    const navigation = useNavigation();

    useEffect(()=> {
        setTimeout(()=>{
            navigation.navigate("DeliveryScreen2");

        }, 4000);
    },[]);



  return (
   <SafeAreaView className="bg-[#f2f2f2] flex-1 justify-center items-center">

<Animatable.Text animation="slideInUp" iterationCount={1} className="text-lg my-10 text-blue-900 font-bold text-center">Preparing Pickup</Animatable.Text>


<Animatable.Image source={require("../assets/t.gif")}  animation="slideInUp" iterationCount={1} className="h-96 w-96"/>

<Animatable.Text animation="slideInUp" iterationCount={1} className="text-lg my-10 text-blue-900 font-bold text-center">Please Wait</Animatable.Text>

{/* <Progress.Circle size={60} indeterminate={true} color="white"/>*/}
</SafeAreaView> 
  )
}

export default PreparingPickupScreen2