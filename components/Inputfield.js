import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome";

export default function Inputfield ({placeholder, secureTextEntry, onChangeText, value,iconname}) {

  return (
    <View className="flex-row">
      <Text className="pt-4">
        <Icon name={iconname} size={20} color="grey" />
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
      />
    </View>
  );
}
const styles = StyleSheet.create({
    input: {
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 250,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        fontSize: 15,
        color: '#333',
        padding: 5,      
    }
})
