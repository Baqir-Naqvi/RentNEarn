import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Homescreen";
import Loginscreen from "./screens/Loginscreen";
import PreLoadscreen from "./screens/PreLoadscreen";
import { ContextProvider } from "./utils/Context";
import SignUpScreen from "./screens/SignUpScreen";
import SingleCategory from "./screens/SingleCategory";
import Categories from "./screens/Categories";
import LeasePage from "./screens/LeasePage";
import HistoryScreen from "./screens/HistoryScreen";
import FavouriteScreen from "./screens/FavouriteScreen";
import SearchItem from "./screens/SearchItem";


const Stack = createNativeStackNavigator();
function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="PreLoad"
            component={PreLoadscreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Loginscreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="SingleCategory" component={SingleCategory} />
          <Stack.Screen name="Categories" component={Categories} />
          <Stack.Screen name="LeasePage" component={LeasePage} />
          <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
          <Stack.Screen name="FavouriteScreen" component={FavouriteScreen} />
          <Stack.Screen name="SearchItem" component={SearchItem} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}

export default App;
