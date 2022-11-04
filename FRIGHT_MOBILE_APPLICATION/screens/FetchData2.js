import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import {firebase} from '../config'


const FetchData2 = () => {

    const [users,setUsers] = useState([]);
    const fetch = firebase.firestore().collection('1');

    useEffect(() =>{
        fetch.onSnapshot(querySnapShot => {
            const users = []
            querySnapShot.forEach((doc)=>{
                const heading = doc.data()
                users.push({
                    id:doc.id,
                    heading,
             
                })
            })
            setUsers(users)
        })
    }, [])


  return (
      <View style={{flex:1, marginTop:100}}>  
    <FlatList style={{height:'100%'}}
    data={users} numColumns={1} renderItem={(item)=>{
        <View style={styles.container}
      
        >
            <View style={styles.innerContainer}>
            <Text style={styles.itemHeading}>{item.heading}</Text>
            </View>

            </View>
        

    }}  keyExtractor={item => item.id} />
      
    </View>

  )
}

export default FetchData2


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