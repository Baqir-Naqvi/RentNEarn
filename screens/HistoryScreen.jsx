import { View, StyleSheet, Text,TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useModal } from '../utils/Context'
import { collection, onSnapshot, where, query,updateDoc,doc } from 'firebase/firestore'
import { db } from '../firebase/config'
import CategoryComponent from '../components/CategoryComponent'
import ConfirmModal from '../components/ConfirmModal'
import BottomTab from '../components/BottomTab'

const HistoryScreen = () => {
  const { userData,modalVisible, setModalVisible } = useModal()
  const [historyItem, setHistoryItem] = useState([])
  const [id, setId] = useState('')
  useEffect(() => {
    try {
      const filterbycategory = query(
        collection(db, 'items'),
        where('rentedto', '==', userData.username),
      )
      onSnapshot(filterbycategory, (snapshot) => {
        setHistoryItem(
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
    const ReleaseItem = (id) => {
         setModalVisible(true)
    try {
        updateDoc(doc(db, 'items', id), {
            available: true,
            rentedto: '',
            timestamp: null,
        })
    } catch (error) {
        alert(error)
    }
}
    const handleModal = (passedid) => {
        setId(passedid)
        setModalVisible(true)
    }
        
  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Rented Items</Text>
      {historyItem.map((item) => {
      //  return console.log(item.data.imageuri)
        return <TouchableOpacity 
        className='px-3'
          key={item.id}
        onPress={() => handleModal(item.id)}>
        <CategoryComponent
        key={item.id}
        item={item.data}
        />

        </TouchableOpacity>
      })}
        <ConfirmModal 
        itemid={id}
        ReleaseItem={ReleaseItem}
        />
 
<BottomTab />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  Title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#f87171',
    alignSelf: 'center',
  },
})

export default HistoryScreen
