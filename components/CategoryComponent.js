import { View, Text, StyleSheet, Image,TouchableOpacity } from "react-native";
import React,{useEffect} from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {useModal} from '../utils/Context'
import { doc, getDoc,setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function CategoryComponent(item)
 {
  const { userID } = useModal();
  const AddItemToFav = async () => {
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const newdata = {
        ...data,
        favorites: [...data.favorites, item.item],
      };
      await setDoc(docRef, newdata);
      alert("Item Added to Favorites");
    } else {
      alert("No such document!");

    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.ImageContainer}>
        {/* <Image style={styles.image} source={{ uri: imageuri }} /> */}
        {item.item.imageuri ? (
        <Image style={styles.image} source={{ uri: item.item.imageuri }} />)
        : (
          <Image
            style={styles.image}
            source={require("../assets/download.jpg")}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.circle}
        onPress={
          () => AddItemToFav()
        }
      >
        <View>
          <MaterialIcons name="favorite-border" size={25} color="black" />
        </View>
      </TouchableOpacity>

      <View>
        <Text style={styles.category}>{item.item.itemname}</Text>
        <Text style={styles.owner}>Owner:{item.item.owner}</Text>
        <Text style={styles.price}>$ {item.item.rentperhour}/ hour</Text>
        {item.item.timestamp ? (
          <Text style={styles.description}>Posted {item.item.timestamp}</Text>
        ) : null}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 20,
    margin: 5,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    height: 120,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 2.7,
    shadowRadius: 3.22,
  },
  image: {
    width: 120,
    height: 120,
     borderRadius: 10,
    // left: 20,

  },

  ImageContainer: {
    width: "40%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  category: {
    fontSize: 20,
    color: "gray",
    fontWeight: "bold",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f87171",
  },
  description: {
    fontSize: 15,
    color: "gray",
  },
  owner: {
    fontSize: 15,
    color: "gray",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    position: "absolute",
    right: 10,
    top: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: 2,
  },
});
