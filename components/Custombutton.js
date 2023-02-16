import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
export default function Custombutton({
  title,
  iconname,
  custombackgroundColor,
  iconcolor,
  
}) {
  return (
    <View
      style={{
        backgroundColor: custombackgroundColor,
        padding: 15,
        borderRadius: 10,
        margin: 10,
        width: 250,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <Text className="mr-3 p-0">
        <Icon name={iconname} size={20} color={iconcolor} />
      </Text>
      <Text className="text-white text-md font-bold">{title}</Text>
    </View>
  );
}