import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import CardComponent from '../components/CardComponent'
import BottomTab from '../components/BottomTab'

const Categories = ({ route }) => {
  const navigation = useNavigation()

  const categories = [
    {
      categoryname: 'Electronics',
      custombg: '#24c2ce',
      icon: 'devices',
    },
    {
      categoryname: 'Vehicles',
      custombg: '#0284c7',
      icon: 'emoji-transportation',
    },
    {
      categoryname: 'Furniture',
      custombg: '#0284c7',
      icon: 'wheelchair-pickup',
    },
    {
      categoryname: 'Real-Estate',
      custombg: '#f87171',
      icon: 'home',
    },
    {
      categoryname: 'Clothing',
      custombg: '#f87171',
      icon: 'dry-cleaning',
    },
    {
      categoryname: 'Books',
      custombg: '#24c2ce',
      icon: 'book',
    },
  ]
  return (
    <View style={styles.container}>
      <Text style={styles.PageHeading}>What are you looking</Text>
      <Text style={styles.subheading}>to Rent?</Text>

      <View style={styles.cardlist}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate('SingleCategory', {
                Title: category.categoryname,
              })
            }}
          >
            {<CardComponent category={category} />}
          </TouchableOpacity>
        ))}
      </View>
      <BottomTab />
    </View>
  )
}
const styles = StyleSheet.create({
  cardlist: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    justifyContent: 'space-between',

  },
  safeView: {
    flex: 1,
    marginTop: 20,
    backgroundColor: 'black',
  },
  PageHeading: {
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 5,
  },
  subheading: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#f87171',
  },
})

export default Categories
