import { createContext, useContext } from "react";
import { useState } from "react";
const Context = createContext();
export const ContextProvider = ({ children }) => {
  const [email, setEmail] = useState("Test@gmail.com");
  const [password, setPassword] = useState("testtest");
  const [userData, setUserData] = useState({});
  const [userID, setUserID] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
   const [selectedItem, setSelectedItem] = useState({
     itemname: "",
     price: "",
     owner: "",
     description: "",
     id: "",
      status: "",
      rentedto: "",
      available: "",
      timestamp: "",
      condition: "",
      make: "",
      color: "",
   });

  return (
    <Context.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        userData,
        setUserData,
        modalVisible,
        setModalVisible,
        selectedItem,
        setSelectedItem,
        userID,
        setUserID,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const useModal = () => useContext(Context);
