import { View, Text,StyleSheet } from 'react-native'
import React,{useState,useEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native'
import Inputfield from '../components/Inputfield'
import { TouchableOpacity } from 'react-native'
import Custombutton from '../components/Custombutton'
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase/config'
import { useModal} from '../utils/Context'
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '../firebase/config'
import * as ImagePicker from 'expo-image-picker';

 

export default function SignUpScreen() {
  const {setEmail,setPassword,email,password} = useModal()
  const [confirmPassword,setConfirmPassword] = useState('')
  const [username,setUsername] = useState('')
  const [CNIC,setCNIC] = useState('')
  const [image, setImage] = useState('');
  useEffect(() => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setUsername('')
    setCNIC('')
    setImage('')
  }, [])
    const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
   
    } else {
      alert('You did not select any image.');
    }
  };


  
  const handleSignup = async() => {

    if(password !== confirmPassword){
      alert('Passwords do not match')
      return
    }
    //Define CNIC regex
    const CNICregex = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/
    if(!CNICregex.test(CNIC)){
      alert('Invalid CNIC')
      return
    }
    //navigate to home screen if login is successful
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        CNIC,
        image,
        favorites: [],
      });
      
      if(user){
        navigation.navigate('Login')
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    }
  }


  const navigation = useNavigation()
  return (
    <SafeAreaView className="flex-1 bg-[#24c2ce] items-center justify-center">
      <View>
      <View className="mt-5  flex-1 items-center justify-center" style={styles.inputsection}>
        <View>
          <Text style={styles.ScreenText}>Sign Up</Text>
        </View>
         <Inputfield 
        placeholder="Username" 
        iconname="user" 
        value={username}
        onChangeText={(text) => setUsername(text)}
        />
        <Inputfield 
        placeholder="Email" 
        iconname="envelope-o"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
        />
        <Inputfield
          placeholder="Password"
          iconname="lock"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
        <Inputfield
          placeholder="Confirm Password"
          iconname="lock"
          secureTextEntry={true}
          onChangeText={(password) => setConfirmPassword(password)}
          value={confirmPassword}
        />
        <Inputfield
          placeholder="CNIC"
          iconname="id-card-o"
          keyboardType="numeric"
          onChangeText={(cnic) => setCNIC(cnic)}
          value={CNIC}
        />
         <TouchableOpacity
          onPress={pickImage}
        >
          <Custombutton title="Upload Image" custombackgroundColor="#24c2ce" />
          {
            image?
            <Text className='font-small text-gray-300 align-center self-center '>
            Image Uploaded Successfully
          </Text>
            :
             <Text className='font-small text-gray-300 align-center self-center '>
            No Image Selected
          </Text>
          }
          
        </TouchableOpacity>

       
        <View className="text-center justify-center mt-4">
          {/* Login button */}
          <TouchableOpacity
            onPress={handleSignup}
          >
          <Custombutton
            title="Create Account"
            custombackgroundColor='#FF6600' 

          />
          </TouchableOpacity>
          <View>
            <Text className="text-center mt-4">OR</Text>
          </View>
          <View className="flex-row justify-center mt-4">
            <Text className="text-gray-500"> 
              Already have an account?
            </Text>
            <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            >
              <Text className="text-cyan-400 font-bold">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({

  inputsection: {
    height: '100%',
    width: '100%',
    position: 'relative',
    backgroundColor: '#f9fdfd',
    borderRadius: 20,
    marginVertical: 40,
    paddingHorizontal: 20,
    paddingVertical:0,
    paddingTop:0,

    
  },

  ScreenText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#24c2ce',
    marginVertical: 20,
  }
})
