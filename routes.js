import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
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
        tabBarStyle: {
          position: "absolute",
          display: isOpen ? "none" : "flex",
          flexDirection: "row",
          bottom: 25,
          marginHorizontal: width / 4,
          elevation: 3,
          backgroundColor: COLORS.GRAY,
          borderRadius: 500,
          height: 70,
          borderTopWidth: 0,
          zIndex: 100,
        },
      }}
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.icon}>
              <View
                style={{
                  display: focused ? "flex" : "none",
                  backgroundColor: COLORS.SECONDARY,
                  position: "absolute",
                  width: 60,
                  height: 60,
                  borderRadius: 60,
                }}
              />
              <AntDesign
                name="user"
                size={32}
                color={focused ? COLORS.THIRD : `${COLORS.DARKWHITE + '50'}`}
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
                style={{
                  display: focused ? "flex" : "none",
                  backgroundColor: COLORS.SECONDARY,
                  position: "absolute",
                  width: 60,
                  height: 60,
                  borderRadius: 60,
                }}
              />
              <AntDesign
                name="home"
                size={32}
                color={focused ? COLORS.THIRD : `${COLORS.DARKWHITE + '50'}`}
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
                style={{
                  display: focused ? "flex" : "none",
                  backgroundColor: COLORS.SECONDARY,
                  position: "absolute",
                  width: 60,
                  height: 60,
                  borderRadius: 60,
                }}
              />
              <AntDesign
                name="search1"
                size={32}
                color={focused ? COLORS.THIRD : `${COLORS.DARKWHITE + '50'}`}
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
  },
});
