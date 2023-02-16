import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
export default function BottomTab() {
    const navigation = useNavigation();
    const handleLogout = () => {
        navigation.navigate("Login");
    }
  return (
    <View className="position-sticky bg-[#EEEEEE] w-100">
      <View className="flex-row w-100 px-2 justify-between border-2 border-slate-500">
        <TouchableOpacity
          className="flex-column"
          onPress={() => navigation.navigate("Home")}
        >
          <View className="ml-2">
            <Icon name="home" size={24} color="gray" />
          </View>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-column"
          onPress={() => navigation.navigate("SearchItem")}
        >
          <View className="ml-2">
            <Icon name="search" size={24} color="gray" />
          </View>
          <Text>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-column"
          onPress={() => navigation.navigate("FavouriteScreen")}
        >
          <View className="ml-4">
            <Icon name="star-o" size={24} color="gray" />
          </View>
          <Text>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-column" onPress={handleLogout}>
          <View className="ml-2">
            <Icon name="user" size={24} color="gray" />
          </View>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
