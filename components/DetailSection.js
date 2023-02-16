import { View, Text, StyleSheet } from "react-native";
import React,{useEffect} from "react";
import { useModal } from "../utils/Context";

const DetailSection = () => {
    const { selectedItem } = useModal();
    useEffect(() => {
        console.log(selectedItem);
    }, [])

  const options = [
    {
      title: "Condition",
      value: selectedItem.condition,
    },
    {
      title: "Make",
      value: selectedItem.make,
    },
    {
      title: "Model",
      value: selectedItem.model,
    },
    {
      title: "Color",
      value: selectedItem.color,
    },
    {
      title: "Reviews",
      value: selectedItem.reviews,
    },
    {
      title: "Status",
      value: selectedItem.status,
    },
  ];
  return (
    <View style={styles.details}>
      <View style={styles.LeftSection}>
        {options.slice(0, 3).map((option,index) => (
            <View style={styles.SingleDesc} key={index}>
                <Text style={styles.TitleText}>{option.title}</Text>
                <Text>{option?.value
                    ? option.value
                    : "N/A"
                }</Text>
            </View>
        ))}
      </View>

      <View style={styles.RightSection}>
        {options.slice(3, 6).map((option,index) => (
            <View style={styles.SingleDesc} key={index}>
                <Text style={styles.TitleText}>{option.title}</Text>
                <Text>{option?.value
                ? option.value
                : "N/A"
                }</Text>
            </View>
        ))}
      </View>
    </View>
  );
};

export default DetailSection;
const styles = StyleSheet.create({
  details: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    borderRadius: 10,
    height: 150,
    backgroundColor: "#e0f2fe",
  },
  LeftSection: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    justifyContent: "space-evenly",
  },
  RightSection: {
    display: "flex",
    width: "50%",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  SingleDesc: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "left",
    paddingLeft: 25,
  },
  TitleText: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "steelblue",
  },
});
