import { View, Text,TouchableOpacity,StyleSheet } from 'react-native'
import React,{useEffect,useState} from 'react'
import { useModal } from '../utils/Context'
import CategoryComponent from '../components/CategoryComponent'
import { FlatList } from 'react-native'
import {getDoc,doc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { updateDoc } from 'firebase/firestore'
import BottomTab from '../components/BottomTab'


const FavouriteScreen = () => {
    const {userID } = useModal()
    const [FavItems, setFavItems] = useState([])
    useEffect(() => {
         const  GetFavourites=async () =>{         
        try {
          await getDoc(doc(db, "users", userID)).then((doc) => {
            if (doc.exists()) {
                setFavItems(doc.data().favorites)
            } else {
              console.log("No such document!");
            }
          });
        } catch (error) {
            alert(error)
        }
    }
    GetFavourites()
    }, [])
    const removeFav = (name) => {
        try {
            const newFav = FavItems.filter((item) => item.itemname !== name);
            //search for the user and update the favourites array
            const userRef = doc(db, "users", userID);
            updateDoc(userRef, {
                favorites: newFav,
            });

            setFavItems(newFav);
        } catch (error) {
            alert(error)
        }
    }
  return (
    <>
    <View>
      {FavItems?.length>0?(
        <FlatList
        key={FavItems.id}
        data={FavItems}
        renderItem={({ item }) => (
            <TouchableOpacity
            onPress={() => removeFav(item.itemname)}>

            <CategoryComponent
            key={item.id}
            item={item}
            />
            </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        />
        ):(
            <Text style={styles.text}>No Favourites</Text>
            )}
    </View>
          <View style={styles.Bottom}> 
            <BottomTab/>
            </View>
    </>
  )
}

export default FavouriteScreen
const styles = StyleSheet.create({
    text:{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:20,
        color: '#f87171',
    },
    Bottom:{
        position:'absolute',
        bottom:0,
        width:'100%',
    }
})