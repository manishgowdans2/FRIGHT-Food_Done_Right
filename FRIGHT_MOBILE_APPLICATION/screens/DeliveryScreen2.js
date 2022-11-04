import { View, Text, SafeAreaView, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { XMarkIcon } from 'react-native-heroicons/outline';

import * as Progress from "react-native-progress"
import { selectInfo } from '../features/infoSlice';

import MapView,{Marker} from "react-native-maps";

const DeliveryScreen2 = () => {

    const navigation  = useNavigation();
    const info = useSelector(selectInfo);


  return (
    <View className="bg-orange-200 flex-1">
        <SafeAreaView className="z-50">
            <View className="flex-row justify-between items-center p-5">
                <TouchableOpacity onPress={()=> navigation.navigate("Home")}>

                    
                <XMarkIcon color="white" size={30}/></TouchableOpacity>
                {/* <Text className="font-light text-white text-lg">Order Help</Text> */}
                </View>

                <Text className="text-4xl mx-6 font-bold">Thank You User 🎉</Text>

                <View className="bg-white mx-5 my-10 rounded-md p-6 z-50 shadow-md">
                    <View className="flex-row justify-between">
                    <View>
                        <Text className="text-lg text-gray-400">Estimated Arrival</Text>
                        <Text className="text-4xl font-bold">40-45 minutes</Text>
                    </View>

                   

                    <Image source={{
                        uri: "https://links.papareact.com/fls",
                    }}

                    className="h-20 w-20" />
                </View>
                <Progress.Bar size={30} color="#7b47f4" indeterminate={true}/>

                <Text className="mt-3 text-gray-500">
                    Thank you for helping the people in Need. Our VVolunteer will pick up the food at your door
                </Text>


                </View>

        </SafeAreaView>
     

     <MapView initialRegion = {
        {
            latitude: info.lat,
            longitude: info.long,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }
     }

     className="flex-1 -mt-10 z-0" mapType='mutedStandard' >
        {/* <Marker coordinate={{
            latitude: info.lat,
            longitude:info.long,
        }}

        title={info.title} 
        description={info.short_description} identifier="origin" pinColor="#00CCBB"/> */}
     </MapView>


     <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
        <Image source={require("../assets/city.png")}

        className="h-12 w-12 p-4 rounded-full ml-5"/>

        <View className="flex-1">
            <Text className="text-lg">Check Out</Text>
            <Text className="text-gray-400">Other Places for people in need</Text>
        </View>

        <Text className="text-[#7b47f4] text-lg mr-5 font-bold">View</Text>
     </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen2