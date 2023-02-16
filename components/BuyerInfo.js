import { View, Text,StyleSheet,Image,TouchableOpacity } from 'react-native'
import React,{useEffect} from 'react'
import { useModal } from '../utils/Context'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function BuyerInfo() {
    const { userData, selectedItem, setModalVisible } = useModal();
     const updateItem = async () => {
       const docRef = doc(db, "items", selectedItem.id);
       const docSnap = await getDoc(docRef);
       if (docSnap.exists()) {
         const data = docSnap.data();
         const newdata = {
           ...data,
           status: "borrowed",
           rentedto: userData.username,
           available: false,
           timestamp: new Date().getTime(),
         };
         await setDoc(docRef, newdata);
         alert("Borrow Request Sent");
          setModalVisible(false);

       } else {
         alert("No such document!");
       }
     };

  return (
    <View className='flex-row justify-between w-full rounded-[10px] bg-sky-800'>
      <View className='w-65 pl-3 flex-row'>
        <Image className='w-[70px] h-[70px] rounded-[35px] ' source={require('../assets/download.jpg')}/>
        <View className='pl-3 flex-col justify-center'>
        <Text className='color-white font-medium'>
            {userData.username}{'\n'}
          {userData.CNIC}
        </Text>
        </View>
      </View>
      <View className='w-[35%] justify-center items-center'>
        <TouchableOpacity className='bg-[#FFC700] w-[80%] h-[40] rounded-[10px] justify-center items-center'
        onPress={()=>updateItem()}
        >
            <Text className='font-medium text-black'>Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
