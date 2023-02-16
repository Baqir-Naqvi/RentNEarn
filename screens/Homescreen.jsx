import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import PersonalInformation from "../components/PersonalInformation";
import { useModal } from "../utils/Context";
import Icon from "react-native-vector-icons/AntDesign";
import FeatherIcon from "react-native-vector-icons/Feather";
import BottomTab from "../components/BottomTab";
import FIcon from "react-native-vector-icons/FontAwesome5";

export default function Homescreen() {
  const { userData } = useModal();
  const navigation = useNavigation();
  //color code 24c2ce
  //bg-[#24c2ce]
  return (
    <SafeAreaView className="bg-black pt-5 flex-1 ">
      <View className="bg-[#ffff] flex-1 items-center justify-center">
        <PersonalInformation
          name={userData.username}
          CNIC={userData.CNIC}
          rating={userData.email}
          image={userData.image}
        />

        <View style={styles.optionsContainer} className="bg-[#ffff]">
          <View style={styles.leftContainer}>
            <TouchableOpacity
              style={styles.leftUpper}
              onPress={() => {
                navigation.navigate("Categories", { Props: { userData } });
              }}
            >
              <FIcon name="handshake" size={80} color="white" />
              <Text style={styles.Text}>Rent</Text>
              <Icon
                style={styles.activeIndicator}
                name="arrowright"
                size={40}
                color="white"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.rightContainer}>
            <TouchableOpacity
              style={styles.rightUpper}
              onPress={() => {
                navigation.navigate("LeasePage", { Props: { userData } });
              }}
            >
              <FIcon name="hand-holding-usd" size={80} color="white" />
              <Text style={styles.Text}>Lease</Text>
              <FeatherIcon
                style={styles.leaseIndicator}
                name="arrow-down-left"
                size={40}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.HistoryText}>My Favorites</Text>
        <TouchableOpacity
          style={styles.Lower}
          onPress={() => {
            navigation.navigate("HistoryScreen");
          }}
        >
          <FIcon name="bookmark" size={40} color="white" />
          <Text style={styles.Text}>My Items</Text>
          <FIcon name="bookmark" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <BottomTab />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  optionsContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  leftContainer: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  activeIndicator: {
    alignSelf: "baseline",
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  leaseIndicator: {
    alignSelf: "baseline",
    position: "absolute",
    top: 10,
    right: 10,
  },
  historyIndicator: {
    alignSelf: "baseline",
    position: "absolute",
    top: 10,
    left: 10,
  },
  rightContainer: {
    width: "50%",
    alignItems: "center",
  },
  leftUpper: {
    width: "90%",
    flex: 1,
    backgroundColor: "#0284c7",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  rightUpper: {
    backgroundColor: "#f87171",
    width: "90%",
    flex: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  Lower: {
    // flex: 1,
    height: 80,
    width: "94%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#24c2ce",
    display: "flex",
    flexDirection: "row",
  },
  Text: {
    fontSize: 22,
    fontWeight: "medium",
    color: "white",
    marginHorizontal: 10,
  },

  footer: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "orange",
  },
  ScrollViewSection: {
    flex: 1,
    width: "100%",
    marginTop: 20,
  },
  horizantalitem: {
    width: "100%",
    height: 100,
    display: "flex",
    flexDirection: "column",
    padding: 10,
    borderTopWidth: 2,
    borderColor: "grey",
  },
  uppersection: {
    width: "100%",
    height: "50%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
  },
  lowersection: {
    width: "100%",
    height: "50%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  HistoryText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    alignSelf: "center",
  },
  category: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    paddingHorizontal: 10,
  },
  lowerText: {
    fontSize: 16,
    color: "darkgrey",
  },
});
