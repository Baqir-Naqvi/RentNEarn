import {SafeAreaView,StyleSheet,Text } from 'react-native'
import React,{useEffect} from 'react'
import * as Animateable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
export default function PreLoadscreen() {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login')
        }, 1000);
    }, [])
  return (
    <SafeAreaView className='flex-1 bg-[#24c2ce] items-center justify-center'>
        <Animateable.Image
        source={require('../assets/img1.png')}
         animation="slideInUp"
        iterationCount={1}
        className="h-100 w-90"/>
        <Animateable.Text animation="slideInUp" iterationCount={1} className="text-white" style={styles.welcomeText}>
           Rent {'\n'}  <Text style={{color:"orange"}}>N {'\n'}
           </Text>
           Earn 
        </Animateable.Text>
    </SafeAreaView>
  )
}
const styles=StyleSheet.create({
    //Welcome Text
    welcomeText:{
        fontSize:25,
        fontWeight:'bold',
        color:'white',
        textAlign:'center',
    },
})