import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React,{useEffect} from "react";
import { useModal } from "../utils/Context";
import Icon from "react-native-vector-icons/FontAwesome";
import DetailSection from "./DetailSection";
import BuyerInfo from "./BuyerInfo";

export default function CustomModal() {
  const { modalVisible, setModalVisible, selectedItem, userData } = useModal();
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <TouchableOpacity
                style={styles.close}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Icon name="close" size={28} color="black" />
              </TouchableOpacity>
              <Image
                style={styles.imageview}
                {...selectedItem.imageuri?{source:{uri:selectedItem.imageuri}}:{source:require('../assets/download.jpg')}}
              />
            </View>

            <View style={styles.iconslist}>
              <Icon name="calendar-o" size={26} color="gray" />
              <Icon name="star-o" size={26} color="gray" />
              <Icon name="heart-o" size={26} color="gray" />
              <Icon name="bookmark-o" size={26} color="gray" />
            </View>

            <View className={styles.DescPrice}>
              <Text style={styles.Description}>{selectedItem.description}</Text>
              <Text style={styles.price}>$ {selectedItem.price}</Text>
            </View>
            <DetailSection />
            <BuyerInfo />
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  imageview: {
    width: 300,
    height:200,
    borderRadius: 20,
  },
  close: {
    position: "absolute",
    top: 0,
    right: -20,
    zIndex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    width: 350,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconslist: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginTop: 10,
  },
  DescPrice: {
    justifyContent: "left",
    alignItems: "left",
  },
  button1: {
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
    width: 100,
    height: 50,
    justifyContent: "center",
  },
  button2: {
    borderRadius: 10,
    height: 50,
    elevation: 2,
    backgroundColor: "#f87171",
    width: 100,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  Description: {
    marginTop: 10,
    fontSize: 20,
    color: "slategray",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
