import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./pages/Home";
import Search from "./pages/Search";
import { AntDesign } from "@expo/vector-icons";
import Header from "./components/Header";
import { ThemeContext } from "./App";
import Profile from "./pages/Profile";

export default function BottomTabs({ navigation }) {
  const Tab = createBottomTabNavigator();
  const { COLORS } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      id="Home"
      screenOptions={{
        headerShown: true,
        header: () => <Header navigation={navigation} />,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 120,
          right: 120,
          elevation: 3,
          backgroundColor: COLORS.PRIMARY,
          borderRadius: 15,
          height: 60,
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign
                name="user"
                size={32}
                color={focused ? COLORS.SECONDARY : "#ffffff9f"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign
                name="home"
                size={32}
                color={focused ? COLORS.SECONDARY : "#ffffff9f"}
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
              <AntDesign
                name="search1"
                size={32}
                color={focused ? COLORS.SECONDARY : "#ffffff9f"}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 999,
  },
});
