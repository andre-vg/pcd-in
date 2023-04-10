import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./pages/Home";
import Search from "./pages/Search";
import { AntDesign } from "@expo/vector-icons";
import Header from "./components/Header";

export default function BottomTabs({navigation}) {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        header: () => <Header navigation={navigation} />,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 100,
          right: 100,
          elevation: 6,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 60,
          borderTopWidth: 0,
        },
      }}
    >
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
                size={24}
                color={focused ? "#865DFF" : "#748c94"}
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
            <View
              style={[
                styles.icon,
                // { backgroundColor: focused ? "#865DFF" : "transparent" },
              ]}
            >
              <AntDesign
                name="search1"
                size={24}
                color={focused ? "#865DFF" : "#748c94"}
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
