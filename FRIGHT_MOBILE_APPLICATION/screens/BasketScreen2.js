import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';

import { selectInfo } from '../features/infoSlice';

import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { XCircleIcon } from 'react-native-heroicons/outline';
import { ScrollView } from 'react-native';
import { removeFromBasket } from '../features/basketSlice';

import { urlFor } from '../sanity';


const BasketScreen2 = () => {
    const navigation = useNavigation();
    const info = useSelector(selectInfo);
    const items = useSelector(selectBasketItems);
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    const dispatch = useDispatch();
    const basketTotal = useSelector(selectBasketTotal);

    
    
    useEffect(()=>
    {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        },{});

        setGroupedItemsInBasket(groupedItems);

    },[items])


   



  return (
   <SafeAreaView className="flex-1 bg-white">
    <View className="flex-1 bg-gray-100">
        <View className="p-6 border-b border-[#00CCBB] bg-white shadow-xs">
            <View>
                <Text className="text-lg font-bold text-center">List</Text>
                <Text className="text-center text-gray-400">
                    {info.title}
                </Text>
            </View>

            <TouchableOpacity
                onPress={()=> navigation.navigate("Home")} className="p-3 rounded-full absolute top-3 right-5">
                    <XCircleIcon color="#1f3ae9" height={50} width={50}/>
            </TouchableOpacity>
        </View>

        {/* <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
            <Image source={
                require("../assets/user.png")
            }
            className="h-7 w-7 bg-amber-100 p-4 rounded-full"/>

            <Text className="flex-1">Please enter your details</Text>

            <TouchableOpacity onPress={()=> navigation.navigate("Details")}>
                <Text className="text-[#1f3ae9]">Change</Text>
            </TouchableOpacity>
        </View> */}

        <ScrollView className="divide-y px-4 py-3 divide-gray-200">
            {Object.entries(groupedItemsInBasket).map(([key,items])=>(
                <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
                    <Text className="text-[#1f3ae9]">{items.length}x</Text>
                    <Image source={{uri:urlFor(items[0]?.image).url()}} className="h-12 w-12 rounded-full"/>

                    <Text className="flex-1">{items[0]?.name}</Text>

                    <Text className="text-gray-600">
                        Rs. {items[0]?.price}
                    </Text>


                    <TouchableOpacity>
                        <Text className="text-[#1f3ae9] text-xs" onPress={()=> dispatch(removeFromBasket({id: key}))}>Remove</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>




        <View className="p-5 bg-white mt-5 space-y-4">
            <View className="flex-row justify-between">
                <Text className="text-gray-400">Container Boxes</Text>
                <Text className="text-gray-400">
                    10
                </Text>


            </View>

            <View className="flex-row justify-between">
                <Text className="text-gray-400">Delivery By</Text>
                <Text className="text-gray-400">
                    trusted authority
                </Text>
            </View>



            {/* <View className="flex-row justify-between">
                <Text>Order Total</Text>
                <Text className="font=extrabold">
                    Rs.{basketTotal + 100}
                </Text>
            </View> */}


            <TouchableOpacity onPress={()=>navigation.navigate("PreparingPickupScreen2")} className="rounded-lg bg-[#1266f7] p-4">
                <Text className="text-center text-white text-lg font-bold">
                    Ready Pickup
                </Text>
            </TouchableOpacity>
        </View>
    </View>
   </SafeAreaView>
  )
}

export default BasketScreen2