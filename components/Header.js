import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../App";
import Constants from "expo-constants";
import P from "../assets/P.svg";
import { Avatar } from "react-native-paper";

export default function Header({ navigation }) {
  const { COLORS, user } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 15,
      height: 70,
      backgroundColor: COLORS.PRIMARY,
      marginTop: Constants.statusBarHeight - 3,
    },
    title: {
      fontSize: 20,
      fontFamily: "Lexend_700Bold",
      color: COLORS.DARKWHITE,
    },
  });

  return (
    <View style={styles.header}>
      <Pressable onPress={() => navigation.openDrawer()}>
        {user.photoURL ? (
          <Image
            source={{ uri: user?.photoURL }}
            style={{ width: 50, height: 50, borderRadius: 50 }}
          />
        ) : (
          <Avatar.Text
            size={50}
            label={user?.firstName[0].toUpperCase()}
            style={{ backgroundColor: COLORS.SECONDARY }}
          />
        )}
      </Pressable>
      <P width={30} height={30} />
      <View style={{ width: 50 }} />
    </View>
  );
}
