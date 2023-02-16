import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native'
import Inputfield from '../components/Inputfield'
import { TouchableOpacity } from 'react-native'
import Custombutton from '../components/Custombutton'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'
import { useModal } from '../utils/Context'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

export default function Loginscreen() {
  const { setEmail, setPassword, email, password, setUserData,setUserID } = useModal()
  const handleLogin = async () => {
    //navigate to home screen if login is successful

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      )
      const user = userCredential.user
      setUserID(user.uid)
      await getDoc(doc(db, 'users', user.uid))
        .then((doc) => {
          if (doc.exists()) {
            setUserData(doc.data())
            navigation.navigate('Home')
          } else {
            alert('No such document!')
          }
        })
        .catch((error) => {
          alert('Error getting document:', error)
        })
    } catch (error) {
      const errorMessage = error.message
      alert(errorMessage)
    }
  }

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    //take user to new window to login with google
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      if (user) {
        navigation.navigate('Home')
      }
    } catch (error) {
      const errorMessage = error.message
      alert(errorMessage)
    }
  }

  const navigation = useNavigation()
  return (
    <SafeAreaView className="bg-[#f9fdfd] items-center justify-center flex-none">
      {/* Upper section for image */}
      <View
        className="flex-1 h-50 items-center justify-center"
        style={styles.imagesection}
      >
        <Image source={require('../assets/img1.png')} />
      </View>
      {/* Lower section for input fields */}
      <View
        className="flex-2 items-center justify-center"
        style={styles.inputsection}
      >
        <View className="m-4">
          <Text style={styles.ScreenText}>Login</Text>
        </View>
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
        <View className="text-center justify-center flex-1">
          {/* Login button */}
          <TouchableOpacity onPress={handleLogin}>
            <Custombutton title="Login" custombackgroundColor="#24c2ce" />
          </TouchableOpacity>
          <View>
            <Text className="text-center">OR</Text>
          </View>
          <TouchableOpacity onPress={handleGoogleLogin}>
            <Custombutton
              title="Login with Google"
              iconname="google"
              custombackgroundColor="#f87171"
              iconcolor="#24c2ce"
            />
          </TouchableOpacity>
          <View className="flex-row justify-center mt-4">
            <Text className="text-gray-500">Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text className="text-cyan-400 font-bold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  imagesection: {
    height: '35%',
    width: '100%',
  },
  inputsection: {
    height: '70%',
    width: '100%',
    position: 'relative',
    backgroundColor: '#f9fdfd',
  },
  forgetpassword: {
    top: 10,
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    paddingRight: 20,
  },
  ScreenText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#24c2ce',
  },
})
