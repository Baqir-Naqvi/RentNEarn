import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'

export default function PersonalInformation({name,CNIC,rating,image}) {
  return (
    <View className="m-3 flex-row justify-evenly">
      <View className="flex-1 justify-space-evenly w-100 ml-4 mt-4 flex-row ">
        <View className="flex-column ">
          <Text className="text-xl font-bold">{name}</Text>
          <Text className="text-sm">{CNIC}</Text>
          <Text className="text-sm mb-2">{rating}</Text>
        </View>
        <View className="flex-1 flex-row justify-end pr-4">
          {image ? (
            <Image source={{ uri: image }} className="h-20 w-20 rounded-xl" />
          ) : (
            <Image
              source={require("../assets/download.jpg")}
              className="h-20 w-20 rounded-xl"
            />
          )}
        </View>
      </View>
    </View>
  );
}
