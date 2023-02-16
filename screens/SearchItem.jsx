import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import BottomTab from "../components/BottomTab";
import { useState, useEffect } from "react";
import { collection, onSnapshot, where, query } from "firebase/firestore";
import CategoryComponent from "../components/CategoryComponent";
import { FlatList } from "react-native";
import CustomModal from "../components/CustomModal";
import { useModal } from "../utils/Context";

export default function SearchItem() {
  const { setModalVisible, selectedItem, setSelectedItem } = useModal();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    setError(false);
    setErrorMessage("");
    setLoading(false);
    setSearchResults([]);
    setSearched(false);
  }, []);
  const handleModal = (item, passedid) => {
    setSelectedItem({
      itemname: item.itemname,
      price: item.rentperhour,
      owner: item.owner,
      description: item.description,
      id: passedid,
      status: item.status,
      timestamp: item.timestamp,
      condition: item.condition,
      color: item.color,
      reviews: item.reviews,
      imageuri: item.imageuri,
    });
    setModalVisible(true);
  };
  const handleRejection=(msg)=>{
    setModalVisible(false);
    setError(true);
    setLoading(false);
    setErrorMessage(msg);


  }
  const handleSuccess=()=>{
     setSearched(true);
        setLoading(false);
  }

  const searchItem = async () => {
    setSearchResults([]);
    try {
      setLoading(true);
      //search for the item where the itemname is equal to the search
      const filterbyname = query(
        collection(db, "items"),
        where("itemname", "==", search)
      );
      //get the snapshot of the query
      onSnapshot(filterbyname, (snapshot) => {
        setSearchResults(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
      searchResults==0?handleRejection("No items found "+ search):handleSuccess()
      console.log(searchResults)
    } catch (error) {
      setErrorMessage(error);
      setError(true);
      setLoading(false);
    }
  };
  const searchbyOwner = async () => {
    setSearchResults([]);
    try {
      setLoading(true);
      //search for the item where the owner is equal to the search
      const filterbyowner = query(
        collection(db, "items"),
        where("owner", "==", search)
      );
    
      //get the snapshot of the query
       onSnapshot(filterbyowner, (snapshot) => {
        setSearchResults(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
     searchResults==0?handleRejection("No items found against "+ search):handleSuccess()
    } catch (error) {
      setErrorMessage(error);
      setError(true);
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
        <FontAwesome
          style={styles.icon}
          name="search"
          size={20}
          color="#f87171"
        />
      </View>
      <View style={styles.buttonView}>
      <TouchableOpacity style={styles.button} onPress={searchItem}>
        <Text style={styles.buttonText}>Search by Item</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={searchbyOwner}>
        <Text style={styles.buttonText}>Search by Owner</Text>
      </TouchableOpacity>
      </View>
      {searchResults ? (
        <View style={styles.Flatlistsection}>          
        <Text style={styles.text}>Search Results</Text>
            <FlatList
            horizontal={false}
            vertical={true}
              style={{ width: "100%" }}
              data={searchResults}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleModal(item.data, item.id)}
                >
                  <CategoryComponent item={item.data} />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />

            <CustomModal />
          </View>
      ) : null}
      {error ? (
        <View>
          <Text style={styles.text}>{errorMessage}</Text>
        </View>
      ) : null}
      {loading ? (
        <View>
          <Text style={styles.text}>Loading...</Text>
        </View>
      ) : null}

      <View style={styles.Bottom}>
        <BottomTab />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inputSection: {
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "#f87171",
    borderWidth: 3,
    margin: 10,
  },
  buttonView:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    color: "#424242",
  },
  icon: {
    padding: 10,
    backgroundColor: "#fff",
    color: "#424242",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#f87171",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    width: "40%",
    justifyContent: "center",
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#f87171",
  },
  Bottom: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  Flatlistsection: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
