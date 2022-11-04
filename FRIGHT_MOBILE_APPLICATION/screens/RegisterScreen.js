import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// import DatePicker from 'react-native-date-picker';

import InputField from '../components/InputField';

// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import Ionicons from 'react-native-vector-icons/Ionicons';

// import RegistrationSVG from '../assets/images/misc/registration.svg';
// import GoogleSVG from '../assets/images/misc/google.svg';
// import FacebookSVG from '../assets/images/misc/facebook.svg';
// import TwitterSVG from '../assets/images/misc/twitter.svg';
import CustomButton from '../components/CustomButton';

import {firebase} from "../config"
import { useNavigation } from '@react-navigation/native';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline';

const RegisterScreen = ({navigation}) => {

  const navigate = useNavigation();

  const [fullName,setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [cpassword,setCPassword] = useState('');
 
  const [phone,setPhone] = useState('');

  const [hide, setHide] = useState(true)

  const registerUser = async (fullName,email,password,phone) => {
    await firebase.auth().createUserWithEmailAndPassword(email,password).then(()=>{
      firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url:'https://fright-aa234.firebaseapp.com'
      }).catch((error) =>{
        alert(error.message)
      }).then(()=>{
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
          fullName,email,password,phone
        })
      }).catch((err)=>{
        alert(err.message)
      })
    }).catch((err)=>{
      alert(err.message)
    })
  }

  return (


   

    <SafeAreaView style={{flex: 1, justifyContent: 'center',paddingTop:150}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
        
        </View>

        <Text
          style={{
           
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Register
        </Text>

       

        <InputField
          label={'Full Name'}
          onChange={(fullName) => setFullName(fullName)}
         
        />

        <InputField
          label={'Email ID'}
         
          keyboardType="email-address"
          onChange={(email) => setEmail(email)}
        />

        <InputField
         fieldButtonLabel={
       
          <TouchableOpacity class="absolute inset-y-0 right-0" onPress={()=>{
            setHide((e) => !e);
          }}> 
        <Text>{hide?"Show":"Hide"}</Text>
      </TouchableOpacity> }


          label={'Password'}
         onChange={(password) =>setPassword(password)}

        
        
         secure={hide}
         
        />

       


        <InputField

        fieldButtonLabel={
       
          <TouchableOpacity class="absolute inset-y-0 right-0" onPress={()=>{
            setHide((e) => !e);
          }}> 
        <Text>{hide?"Show":"Hide"}</Text>
      </TouchableOpacity> }
          label={'Confirm Password'}
         
         secure={hide}

         onChange={(cpassword) =>setCPassword(cpassword)}
        

          

         
        />

                
<InputField
          label={'Enter Contact'}
         
          inputType="number"

          onChange={(phone) => setPhone(phone)}
        />

      

        <CustomButton label={'Register'} onPress={() => 
        {if(password.length < 8)
           {alert("Password must be atleast 8 characters long")
        }
        var count =0;
        var count2 = 0;
for(let i=0;i<password.length;i++){
        //  if(password.charAt(i) == "A"){
        

         var a = password.charAt(i)
        
         
          if(a === "A"){
            
            count ++;
          }

          if(a === "@")
          {
            count2++;
          }
          

        
         }

        

         if(count == 0){
          alert("password must contain atleast one capital letter ");
         }
          if(count2 == 0){

            alert("password must contain atleast one special symbol");
          }


        

        if(password != cpassword)
        {
          alert("Password does not match");
        }
       
      
     if(phone.length != 10 )
        {
          alert("invalid phone number")
        }

        else{
          registerUser(fullName,email,password,phone)
  {
navigation.navigate("Login")
  }

        }
        

        } } />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: '#1b1bb8', fontWeight: '700'}}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;


// onPress={() => {if(registerUser(fullName,email,password,phone))
//   {
// navigation.navigate("Login");
//   }}}
// onChange={(pass) => {
//   if(pass == password)
//   {
//     alert("Yes")
//   }
//   else{
//     alert("no")
//   }
// }}