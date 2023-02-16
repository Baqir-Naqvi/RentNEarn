import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { useModal } from "../utils/Context";

export default function ConfirmModal({ ReleaseItem, itemid }) {
  const { modalVisible, setModalVisible } = useModal();
  const handleModal = () => {
    ReleaseItem(itemid);
    setModalVisible(!modalVisible);
  };
  const handleDecline = () => {
   setModalVisible(!modalVisible);
    }
    return (
      <View style={styles.centeredView}>
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
              <Text style={styles.modalText}>
                Are you sure you want to Release this Item
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleModal}
                >
                  <Text style={styles.textStyle}>Yes</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleDecline}
                >
                  <Text style={styles.textStyle}>No</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});