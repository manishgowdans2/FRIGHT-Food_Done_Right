import { View, Text, FlatList, Pressable, StyleSheet, TouchableOpacity,SafeAreaView, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {firebase} from '../config'
import { ArrowRightIcon, TrashIcon, UserIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';




const FetchData = () => {

    const navigation = useNavigation();

    const [users,setUsers] = useState([]);
    const fetch = firebase.firestore().collection("newData");

    

    useEffect(() =>{
        fetch.onSnapshot(querySnapShot => {
            const users = []

            querySnapShot.forEach((doc)=>{
                const {heading,email,location,phone} = doc.data()
                users.push({
                    id:doc.id,
                    heading,
                    email,
                    location,
               
                    phone
             
                })
            })
            setUsers(users)
        })
    }, [])




    const handleDelete = (doc) => {
        fetch.doc(doc.id).delete().then(()=>{
            alert("Delivered")
        }).catch(err => {
            alert(err);
        })

    }


  
  return (
    <SafeAreaView className="bg-white pt-10">

    <View className="flex-row pb-5 items-center mx-5 space-x-2 px-2">
       <Image source={
        
            require('../assets/fdr.jpeg')
           
       }

       className="h-16 w-16 bg-gray-300 p-4 rounded-full"/>

   <View className="flex-1">
       <Text className='font-bold text-black-400 text-xl'>Welcome Admin</Text>
       <Text className="font-bold text-gray-500 text-xl">FRIGHT
      </Text>
   </View>
   </View>

   <ScrollView className="bg-gray-100 pt-2" contentContainerStyle={
    {
        paddingBottom:200
    }
  } 
  >
  <View className="mt-4 flex-row items-center justify-between px-4">
  

     <ScrollView className="divide-y divide-blue-800  py-1">
        
       
     {users?.map(item=>(
        
    <View className="flex-row items-center bg-white py-5 px-3">

        
          
    <Text className="text-lg text-blue-900" >Customer Name :  {'\n'}
    
    <Text className="text-sm text-black">{item.heading}</Text> 
    {'\n'}
    {'\n'}
    <Text className="text-lg text-blue-900" >Customer Email : {'\n'}<Text className="text-sm text-black">{item.email}</Text> 
    {'\n'}
    {'\n'}
    <Text className="text-lg " >Customer Phone : {'\n'}<Text className="text-sm text-black">{item.phone}</Text> 
    </Text>
    {'\n'}
    {'\n'}
    <Text className="text-lg text-blue-900" >Customer Location : {'\n'}<Text className="text-sm text-black">{item.location}</Text> 
    </Text>



    </Text>
    </Text>
    <View className="px-3 mb-60">
    
    <TouchableOpacity onPress={()=>handleDelete(item)}>

<TrashIcon  size={50} color="#7b47f4"/> 

 </TouchableOpacity>
 </View>
    



 </View>

   ))}
   
        </ScrollView>
        </View>

        <View className="p-4 mt-3 space-y-4">
 <View className="flex-row justify-between">

 
 <TouchableOpacity onPress={()=>navigation.navigate("AdminD")}  className="rounded-full bg-[#f50b0b] ml-1 p-4 px-4">
     <Text className="text-center text-white text-lg font-bold">
         SOS
     </Text>
 </TouchableOpacity>
</View>
</View>


     </ScrollView>




   

  
    </SafeAreaView>

  )
}

export default FetchData


const styles = StyleSheet.create({
    container:{
        backgroundColor:"gray",
        padding:15,
        borderRadius:15,
        margin:5,
        marginHorizontal:10
    },
    innerContainer:{
        alignItems:'center',
        flexDirection:'column',
    },
    itemHeading:{
        fontWeight:'bold'
    }
})