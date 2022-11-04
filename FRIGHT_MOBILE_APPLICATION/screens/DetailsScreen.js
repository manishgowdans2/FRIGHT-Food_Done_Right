import { View, Text, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity, Keyboard, ScrollViewBase } from 'react-native'
import React, { useState } from 'react'
import { ChevronDownIcon, ExclamationCircleIcon, EyeIcon, MagnifyingGlassIcon, PhoneArrowDownLeftIcon, UserIcon, UserPlusIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

import {firebase} from '../config';

const DetailsScreen = () => {

    const todoRef = firebase.firestore().collection('newData');
    const [addData, setAddData] = useState('');
    const [addEmail, setAddEmail] = useState('');
    const [addPhone, setAddPhone] = useState('');
    const [addLoc, setAddLoc] = useState('');

    //add a new field
    const addField = () => {
        if(addData && addData.length > 0){
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();

            const data = {
                heading: addData,
                createdAt: timestamp,
                phone: addPhone,
                email:addEmail,
               
                location:addLoc
            };



            todoRef.add(data).then(()=>{
                setAddData('');
                setAddPhone('');
                setAddEmail('');
                setAddLoc('');
                Keyboard.dismiss();
                navigation.navigate("Loading");
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
    <ScrollView>
    <SafeAreaView className="bg-white pt-8">
        
 
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
     

   <View className="flex-1">
     
  
       
       <Text className="font-bold p-2 text-xl">Enter your name
     </Text>
     
   </View>


       </View>


       




       <View className="flex-row items-center space-x-2 pb-2 mx-4">
           <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3" >
           <UserPlusIcon size={20} color="#3C4BA6"/>
 

           <TextInput placeholder="Please enter your full name" keyboardType="default" className="rounded-full"
           onChangeText={(heading) => setAddData(heading)}
           
           multiline={true}
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

       
       <Text className="font-bold p-2 text-xl">Enter your Phone Number
     </Text>
     
   </View>
  
  

  

   

       </View>




       <View className="flex-row items-center space-x-2 pb-2 mx-4">
           <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3" >
           <PhoneArrowDownLeftIcon size={20} color="#3C4BA6"/>


           <TextInput onChangeText={(phone) => setAddPhone(phone)} placeholder="Valid phone number" keyboardType="default" 
           
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

       
       <Text className="font-bold p-2 text-xl">Enter your Email Id
     </Text>
     
   </View>
  
  

  

   

       </View>




       <View className="flex-row items-center space-x-2 pb-2 mx-4">
           <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3" >
           <ExclamationCircleIcon size={20} color="#3C4BA6"/>


           <TextInput onChangeText={(email) => setAddEmail(email)} placeholder="Should be of format example@gmail.com" keyboardType="default"></TextInput>
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


           <TextInput onChangeText={(location) => setAddLoc(location)} placeholder="Complete Address" keyboardType="default"></TextInput>
           </View>

          
       </View>

 

 <ScrollView className="bg-gray-100" contentContainerStyle={
   {
       paddingBottom:100,
   }
 }>

 


 </ScrollView>






   </SafeAreaView>

   
 <View className="p-4 bg-white mt-10 space-y-4">
 <View className="flex-row justify-between">


 <TouchableOpacity onPress={addField} className="rounded-lg bg-[#3e82f6] ml-10 p-10 px-20">
    
     <Text className="text-center text-white text-lg font-bold">
         Enter Details
     </Text>
     
 </TouchableOpacity>
</View>
</View>
</ScrollView>
  )
}

export default DetailsScreen
