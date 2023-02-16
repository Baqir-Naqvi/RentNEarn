import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native'
import Inputfield from '../components/Inputfield'
import React, { useState,useEffect } from 'react'
import Custombutton from '../components/Custombutton'
import DropDownPicker from 'react-native-dropdown-picker'
import { doc, setDoc,collection } from "firebase/firestore"; 
import { db } from "../firebase/config";
import * as ImagePicker from 'expo-image-picker';




const LeasePage = ({ route }) => {
  const { Props } = route.params
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Vehicles', value: 'Vehicles' },
    { label: 'Furniture', value: 'Furniture' },
    { label: 'Clothing', value: 'Clothing' },
    { label: 'Books', value: 'Books' },
    { label: 'Real-Estate', value: 'Real-Estate' },
  ])
  const username = Props.userData.username
  const [value, setValue] = useState(null)
  const [ItemtoLease, setItemtoLease] = useState({
    available: true,
    category: null,
    description: '',
    itemname: '',
    owner: username,
    rentedto: [''],
    rentperhour: '',
    status: 'Available',
    timestamp: new Date().getTime(),
    reviews: [],
    condition: 'Used',
    color: '',
    imageuri: '',
  })
  const [image, setImage] = useState(null);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setItemtoLease({...ItemtoLease, imageuri: result.uri})
    } else {
      alert('You did not select any image.');
    }
  };



  const validFields = () => {
    if (
        ItemtoLease.itemname === '' ||
        ItemtoLease.description === '' ||
        ItemtoLease.category === null ||
        ItemtoLease.rentperhour === ''||
        image === null
    ) {
        alert('Please fill all the fields')
        return false
    }
    return true
}
  const addNewItem = async () => {
    if (!validFields()) {
        return
    }
    
   
    try {
        const docRef= doc(collection(db, "items"));
        await setDoc(docRef, ItemtoLease);
        console.log("Document written with ID: ", docRef.id);
         alert('Item Added')
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    }

//style={styles.container}
//style={styles.form}
//style={styles.titleText}
  return (
    <View className='flex-1 text-center justify-center bg-[#24c2ce] items-center'>
      <Text className='text-[30px] text-white font-bold text-center self-center mb-4' >
        Item to <Text style={{ color: '#f87171' }}>Lease</Text>
      </Text>

      <View className='bg-white rounded-[15px] w-[85%] h-[70%] p-5 justify-between items-center' > 
        <Inputfield
          placeholder="UserName"
          iconname="envelope-o"
          keyboardType="email-address"
          value={username}
        />
        <Inputfield
          placeholder="Item Name"
          iconname="laptop"
          value={ItemtoLease.itemname}
          onChangeText={(text) => {
            setItemtoLease({ ...ItemtoLease, itemname: text })
          }}
        />
        <Inputfield
          placeholder="Price per hour"
          iconname="dollar"
          keyboardType="email-address"
          value={ItemtoLease.rentperhour}
          onChangeText={(text) => {
            setItemtoLease({ ...ItemtoLease, rentperhour: text })
          }}
        />

        <Inputfield
          placeholder="Description"
          iconname="info"
          keyboardType="email-address"
          value={ItemtoLease.description}
          onChangeText={(text) => {
            setItemtoLease({ ...ItemtoLease, description: text })
          }}
        />
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select Category"
          onChangeValue={(value) => {
            setItemtoLease({ ...ItemtoLease, category: value })
          }}
          textStyle={{
            fontSize: 14,
            color: 'grey',
          }}
          containerStyle={{
            marginLeft: 10,
            width: '95%',
          }}
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
      </View>

      <TouchableOpacity onPress={addNewItem} style={styles.custom}>
        <Custombutton title="Submit" custombackgroundColor="#f87171"
        />
      </TouchableOpacity>
    </View>
  )
}

export default LeasePage
const styles = StyleSheet.create({
  custom: {
    zIndex:-1,
  }
})
