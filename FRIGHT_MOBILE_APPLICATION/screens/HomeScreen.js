import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import { useNavigation } from '@react-navigation/native'

import sanityClient from "../sanity";
import { ArrowSmallRightIcon, ChevronDoubleRightIcon, CloudArrowDownIcon, TrashIcon, UserIcon } from 'react-native-heroicons/outline'

import {firebase} from '../config'




const HomeScreen = () => {

    const navigation = useNavigation();

    const [featuredCategories, setFeaturedCategories] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions(
            {
                headerShown: false,
            }
        )
    }, []);


    useEffect(()=>
    {
        sanityClient.fetch(`*[_type == "featured"]
        {
            ...,
            app[]->{
                ...,
                dishes[]->
            }
        }`).then((data)=>
        {
            setFeaturedCategories(data);
        })


    },[])


    // const [name,setName] = useState('');

    // useEffect(()=>{
    //     firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then((snapshot)=>{
    //         if(snapshot.exists){
    //             setName(snapshot.data())
    //         }
    //         else{
    //             alert("User does not exist")
    //         }
    //     })
    // })


  return (
    <SafeAreaView className="bg-white pt-10">

    <View className="flex-row pb-5 items-center mx-5 space-x-2 px-2">
       <Image source={
        
            require('../assets/fdr.jpeg')
           
       }

       className="h-16 w-16 bg-gray-300 p-4 rounded-full"/>

   <View className="flex-1">
       <Text className='font-bold text-black-400 text-xl'>FRIGHT</Text>
       <Text className="font-bold text-gray-500 text-xl">Food Done Right
      </Text>
   </View>

<TouchableOpacity onPress={()=> navigation.navigate("Login")}>
   
   <UserIcon size={35} color="#0b0f3b"/>  
  
 
   
   </TouchableOpacity>

  
  

   

   

       </View>


       <ScrollView className="bg-gray-100" contentContainerStyle={
    {
        paddingBottom:100,
    }
  }>



{featuredCategories?.map(category=>
    (
        <FeaturedRow key={category._id} id={category._id} title={category.name} description={category.short_description}/>
    ))}

    <Text className="font-bold text-lg mt-2 px-4">Categories</Text>
    <Categories/>   

 {/* <FeaturedRow
    id="1" title="Featured" description="Hi hello" />

    <FeaturedRow  
     id="2"
     title="Featured" description="Hi hello" />

    <FeaturedRow  
    id="3"
    title="Featured" description="Hi hello" /> 
   */}

    </ScrollView>
       </SafeAreaView>
  )
}

export default HomeScreen