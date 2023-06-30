import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { Entypo, FontAwesome5, AntDesign } from "@expo/vector-icons";
import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../App";

export default function VagaCard({ info, onOpen }) {
  const { COLORS } = useContext(ThemeContext);

  return (
    <TouchableHighlight
      onPress={() => {
        onOpen(info);
      }}
      style={[
        styles.card,
        {
          backgroundColor: COLORS.GRAY,
        },
      ]}
      underlayColor={COLORS.PRIMARY}
    >
      <>
        <Image source={{ uri: info.logo_empresa }} style={styles.image} />
        {/* <FontAwesome5 name={nome.toLowerCase()} size={56} color={COLORS.THIRD} style={styles.image} /> */}
        <View
          style={{
            flex: 1,
            gap: 2,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.DARKWHITE,
              fontSize: 18,
              fontFamily: "Lexend_400Regular",
            }}
          >
            {info.titulo}
          </Text>
          <Text
            style={{
              color: COLORS.SECONDARY,
              fontSize: 16,
              fontFamily: "Lexend_400Regular",
            }}
          >
            {info.empresa}
          </Text>
          <Text
            style={{
              color: "#a2a2a2",
              fontSize: 14,
              fontFamily: "Lexend_400Regular",
            }}
          >
            {info.cidade}
          </Text>
        </View>
      </>

      {/* <Pressable style={styles.button}>
        <AntDesign name="form" size={36} color={COLORS.SECONDARY} />
      </Pressable> */}
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    padding: 16,
    width: "100%",
    marginVertical: 8,
    borderRadius: 12,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    alignSelf: "center",
    resizeMode: "contain",
  },
  button: {
    alignSelf: "center",
  },
});
