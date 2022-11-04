import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// import {MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
// import {Ionicons} from 'react-native-vector-icons/Ionicons';

// import {LoginSVG} from '../assets/images/misc/login.svg';
// import {GoogleSVG} from '../assets/images/misc/google.svg';
// import {FacebookSVG} from '../assets/images/misc/facebook.svg';
// import {TwitterSVG} from '../assets/images/misc/twitter.svg';

import CustomButton from "../components/CustomButton";
import InputField from '../components/InputField';

import {firebase} from '../config';

const LoginScreen = ({navigation}) => {

  const [email, setEmail ] = useState('');

  const [password, setPassword] = useState('');

  const [hide, setHide] = useState(true)

  const loginUser = async(email, password) =>{
    try{
      await firebase.auth().signInWithEmailAndPassword(email,password);
      navigation.navigate("Home2");
     
    }catch(err)
    {
      alert("Password or Email Id is Incorrect");
    }
  }

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
        
        </View>

        <Text
          style={{
           
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
        </Text>

        <InputField
          label={'Please Enter Email ID'}
        
          keyboardType="email-address"
          onChange={(email) => setEmail(email)}
        />

<InputField
label={"Please Enter Password"}
        
         
          fieldButtonLabel={
       
            <TouchableOpacity class="absolute inset-y-0 right-0" onPress={()=>{
              setHide((e) => !e);
            }}> 
          <Text>{hide?"Show":"Hide"}</Text>
        </TouchableOpacity> }
          fieldButtonFunction={() => {}}
          secure={hide}
          onChange={(password) => setPassword(password)}
        />
        
        <CustomButton label={"Login"} onPress={() => {if( email == "admin@gmail.com" && password == "admin123")
        {
          navigation.navigate("Fetch");
        }

        if( email == "admin2@gmail.com" && password == "admin2")
        {
          navigation.navigate("Fetch2");
        }

        else 
        {
          loginUser(email,password)
        }
        }} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() =>{ 
            
         
            navigation.navigate('Register')}}>
            <Text style={{color: '#1b1bb8', fontWeight: '700'}}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </SafeAreaView>
  );
};

export default LoginScreen;
