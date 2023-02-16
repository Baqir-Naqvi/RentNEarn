import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native'
import { FlatList } from 'react-native'
import {
  collection,
  onSnapshot,
  where,
  query,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import CategoryComponent from '../components/CategoryComponent'
import { useModal } from '../utils/Context'
import CustomModal from '../components/CustomModal'
import BottomTab from '../components/BottomTab'
export default function SingleCategory({ route }) {
  const { Title } = route.params
  const [category, setCategory] = useState([])
  const { setModalVisible,    selectedItem,
        setSelectedItem, } = useModal()

  useEffect(() => {
    try {
      const filterbycategory = query(
        collection(db, 'items'),  
        where('category', '==', Title),
        where('available','==',true),
      )
      onSnapshot(filterbycategory, (snapshot) => {
        setCategory(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        )
      })
    } catch (error) {
      alert(error)
    }
  }, [])
  const handleModal = (item,passedid) => {
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
    })
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <Text style={styles.Title}>{Title}</Text>
        <View style={styles.Flatlistsection}>
          <FlatList
            style={{ width: '100%' }}
            data={category}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleModal(item.data,item.id)}>
                <CategoryComponent
                  item={item.data}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />

          <CustomModal/>
        </View>
      </View>
      <BottomTab />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#f87171',
  },
  Flatlistsection: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
})
