import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'

import * as Animatable from "react-native-animatable";

import * as Progress from "react-native-progress";
import { useNavigation } from '@react-navigation/native';
import { ArrowDownIcon } from 'react-native-heroicons/outline';

const Loading2 = () => {

    const navigation = useNavigation();

    useEffect(()=> {
        setTimeout(()=>{
            navigation.navigate("Fetch");

        },4000);
    },[]);
  return (
    <SafeAreaView className="bg-white flex-1 justify-center items-center">

    

    <Animatable.Text animation="slideInUp" iterationCount={1} className="text-lg my-10 text-blue font-bold text-center">Thank You For Entering The Details</Animatable.Text>

   
    <Animatable.Image source={require("../assets/d.gif")}  animation="slideInUp" iterationCount={1} className="h-96 w-96"/>


    <Animatable.Text animation="slideInUp" iterationCount={1} className="text-lg my-10 text-blue font-bold text-center">We will contact you</Animatable.Text>

   <ArrowDownIcon size={20} animation="slideInUp" color="#00CCBB"/>
    </SafeAreaView> 
  )
}

export default Loading2