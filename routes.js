import { StyleSheet, Text, ToastAndroid, View, useWindowDimensions } from "react-native";
import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./pages/Home";
import Search from "./pages/Search";
import { AntDesign } from "@expo/vector-icons";
import Header from "./components/Header";
import { ThemeContext } from "./App";
import Profile from "./pages/Profile";
import Camera from "./pages/Camera";
import EditProfile from "./pages/EditProfile";

export default function BottomTabs({ navigation }) {
  const Tab = createBottomTabNavigator();
  const { COLORS } = useContext(ThemeContext);
  const { width } = useWindowDimensions();

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      id="Home"
      screenOptions={{
        headerShown: true,
        header: () => <Header navigation={navigation} />,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          display: isOpen ? "none" : "flex",
          flexDirection: "row",
          bottom: 25,
          marginHorizontal: width / 4,
          elevation: 3,
          backgroundColor: COLORS.GRAY,
          borderRadius: 500,
          height: 60,
          borderTopWidth: 0,
          zIndex: 100,
        },
      }}
    >
      <Tab.Screen
        name="Profile"
        children={() => (
          <Profile navigation={navigation} setIsOpen={setIsOpen} />
        )}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.icon}>
              <View
                style={[
                  styles.focus,
                  {
                    backgroundColor: COLORS.SECONDARY,
                    display: focused ? "flex" : "none",
                  },
                ]}
              />
              <AntDesign
                name="user"
                size={32}
                color={focused ? COLORS.THIRD : `${COLORS.DARKWHITE + "50"}`}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        children={() => <Home setIsOpen={setIsOpen} />}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.icon}>
              <View
                style={[
                  styles.focus,
                  {
                    backgroundColor: COLORS.SECONDARY,

                    display: focused ? "flex" : "none",
                  },
                ]}
              />
              <AntDesign
                name="home"
                size={32}
                color={focused ? COLORS.THIRD : `${COLORS.DARKWHITE + "50"}`}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.icon]}>
              <View
                style={[
                  styles.focus,
                  {
                    backgroundColor: COLORS.SECONDARY,
                    display: focused ? "flex" : "none",
                  },
                ]}
              />
              <AntDesign
                name="search1"
                size={32}
                color={focused ? COLORS.THIRD : `${COLORS.DARKWHITE + "50"}`}
              />
            </View>
          ),
        }}
        listeners={{
          tabPress: e => {
            // Prevent default action
            e.preventDefault();
            ToastAndroid.show("Em desenvolvimento! 🚧", ToastAndroid.SHORT);
          },
        }}
      />
      <Tab.Screen
        name="Camera"
        children={
          () => <EditProfile navigation={navigation} setIsOpen={setIsOpen} />
        }
        options={{
          headerShown: false,
          tabBarButton: () => <View style={{ display: "none" }} />,
        }}
      />
      <Tab.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: false,
          tabBarButton: () => <View style={{ display: "none" }} />,
        }}
       />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
    justifyContent: "center",
  },
  focus: {
    position: "absolute",
    width: 60,
    height: 53,
    borderRadius: 60,
  },
});
