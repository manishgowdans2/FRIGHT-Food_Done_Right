import { View, Text, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, Keyboard, ScrollViewBase } from 'react-native'
import React, { useState } from 'react'
import { ArrowLeftIcon, ChevronDownIcon, EyeIcon, MagnifyingGlassIcon, PhoneArrowDownLeftIcon, UserIcon, UserPlusIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

import * as Animatable from "react-native-animatable";

import * as Progress from "react-native-progress";

import { ArrowDownIcon } from 'react-native-heroicons/outline';

import {firebase} from '../config';
const AdminDetails = () => {
  const todoRef = firebase.firestore().collection('SOS');
    const [addData, setAddData] = useState('');
    const [addEmail, setAddEmail] = useState('');

    //add a new field
    const addField = () => {
        if(addData && addData.length > 0){
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();

            const data = {
               
                createdAt: timestamp,
                phone: addData,
              
               
                location:addEmail
            };



            todoRef.add(data).then(()=>{
                setAddData('');
                setAddEmail('');
                Keyboard.dismiss();
            }).catch((err)=>{
                alert(err);
            })
        }

        
        // if(addEmail && addEmail.length > 0){
               
    
        //     const data = {
               
        //         email:addEmail,
               
        //     };

            
        //     todoRef.add(data).then(()=>{
        //         setAddEmail('');
        //         Keyboard.dismiss();
        //     }).catch((err)=>{
        //         alert(err);
        //     })
        // }
    }



    const navigation = useNavigation();
  return (
    <ScrollView className="bg-white">
    <SafeAreaView className=" pt-8">
        
 
    <View className="flex-row pb-3 items-center mx-4 space-x-2 px-2">
       <Image source={
           require("../assets/user.png")
       }

       className="h-10 p-4 rounded-full"/>
       

   <View className="flex-1">
     
   <Text className='font-bold text-blue-800 text-xl'>Please fill the below details</Text>
       
     
     
   </View>


       </View>



     





       <View className="flex-row pb-3 items-center mx-4 space-x-2 px-2">
       {/* <Image source={
           {
               uri: "https://links.papareact.com/wru",
           }
       }

       className="h-7 w-7 bg-gray-300 p-4 rounded-full"/> */}

   <View className="flex-1">
       {/* <Text className='font-bold text-gray-400 text-xs'>FRIGHT</Text> */}

       
       <Text className="font-bold p-2 text-xl">Enter your Phone Number
     </Text>
     
   </View>
  
  

  

   

       </View>




       <View className="flex-row items-center space-x-2 pb-2 mx-4">
           <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3" >
           <PhoneArrowDownLeftIcon size={20} color="#3C4BA6"/>


           <TextInput keyboardType="number-pad" onChangeText={(phone) => {if(phone.length>10){ alert("Invalid Phone Number")
           }
           else{
           setAddData(phone)}}} onBlur={(phone)=>{
            if(phone<10){
              alert("Invalid Phone Number")
            }
           }} placeholder="Valid phone number" 
           
           ></TextInput>
          
           </View>

          
       </View>











       <View className="flex-row pb-3 items-center mx-4 space-x-2 px-2">
       {/* <Image source={
           {
               uri: "https://links.papareact.com/wru",
           }
       }

       className="h-7 w-7 bg-gray-300 p-4 rounded-full"/> */}

   <View className="flex-1">
       {/* <Text className='font-bold text-gray-400 text-xs'>FRIGHT</Text> */}

       
       <Text className="font-bold p-2 text-xl">Enter your Location
     </Text>
     
   </View>
  
  

  

   

       </View>




       <View className="flex-row items-center space-x-2 pb-2 mx-4">
           <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3" >
           <MagnifyingGlassIcon size={20} color="#3C4BA6"/>


           <TextInput onChangeText={(location) => setAddEmail(location)} placeholder="Complete Address" keyboardType="default"></TextInput>
           </View>

          
       </View>

 

 <ScrollView className="" contentContainerStyle={
   {
       paddingBottom:10,
   }
 }>

 


 </ScrollView>






   </SafeAreaView>

   
 <View className="p-1 mt-1 space-y-4">
 <View className="flex-row justify-between">

 
 <TouchableOpacity onPress={addField} onPr className="rounded-full bg-[#f24d0b] ml-4 p-8 px-8">
     <Text className="text-center text-white text-lg font-bold">
        Submit
     </Text>
 </TouchableOpacity>
</View>
<Animatable.Text animation="slideInUp" iterationCount={1} className="text-lg my-10 text-blue-900 font-bold text-center">Thank You For Bearing Patience With Us</Animatable.Text>
</View>
<Animatable.Text animation="slideInUp" iterationCount={1} className="text-lg my-10 text-blue-900 font-bold text-center">Someone near your location will pick you up</Animatable.Text>

<Animatable.Text animation="slideInUp" iterationCount={1} className="text-lg my-10 text-blue-900 font-bold text-center">Please Don't Panic</Animatable.Text>

<TouchableOpacity onPress={()=>navigation.navigate("Loading2")}>
<ArrowLeftIcon size={70} animation="slideInUp" color="#00CCBB"/></TouchableOpacity>
</ScrollView>
  )
}

export default AdminDetails