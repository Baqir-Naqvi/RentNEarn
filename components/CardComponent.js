import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function CardComponent({ category }) {
  return (
    <View style={styles.outercard}>
      <View
        style={{
          backgroundColor: category.custombg,
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <MaterialIcons  name={category.icon} size={50} color="white" />

        <Text style={styles.imagetext}>{category.categoryname}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  outercard: {
    width: 140,
    height: 140,
    borderRadius: 10,
    shadowColor: "#000",
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderColor: "orange",
    borderWidth: 3,
    marginHorizontal: 8,
    marginVertical: 10,
  },
  imagetext: {
    bottom: 10,
    color: "white",
    fontSize: 20,
    fontWeight: "medium",
    alignSelf: "center",
  },
});
