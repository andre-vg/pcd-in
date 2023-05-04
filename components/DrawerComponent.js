import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useContext, useRef } from "react";
import { auth } from "../config/FirebaseConfig";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";
import Config from "./Config";
import { ThemeContext } from "../App";

export default function DrawerComponent({ navigation }) {
  const { width } = useWindowDimensions();
  const { COLORS, setCOLORS } = useContext(ThemeContext);

  const modalizeRef = useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 64,
      backgroundColor: COLORS.PRIMARY,
      borderTopRightRadius: 32,
      borderBottomRightRadius: 32,
    },
    title: {
      fontFamily: "Lexend_700Bold",
    },
    text: {
      fontFamily: "Lexend_400Regular",
    },
    config: {
      position: "absolute",
      bottom: 30,
      left: 30,
    },
    logOut: {
      position: "absolute",
      bottom: 30,
      right: 30,
    },
  });

  return (
    <>
      <View style={styles.container}>
        <Image
          source={{ uri: auth.currentUser.photoURL }}
          style={{
            width: 64,
            height: 64,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: COLORS.DARKWHITE,
          }}
        />
        <Text
          style={[
            { color: COLORS.DARKWHITE, fontSize: 24, marginTop: 8 },
            styles.title,
          ]}
        >
          {auth.currentUser.displayName}
        </Text>
        <Text
          style={[
            { color: COLORS.DARKWHITE, fontSize: 16, marginTop: 4 },
            styles.text,
          ]}
          onPress={() => navigation.goBack()}
        >
          {auth.currentUser.email}
        </Text>

        {/* <AntDesign
          style={styles.config}
          name="setting"
          size={32}
          color={COLORS.DARKWHITE}
          onPress={() => onOpen()}
        /> */}

        <MaterialIcons
          name="accessibility-new"
          size={36}
          style={styles.config}
          color={COLORS.DARKWHITE}
          onPress={() => onOpen()}
        />

        <AntDesign
          name="logout"
          style={styles.logOut}
          size={28}
          color={COLORS.DARKWHITE}
          onPress={() => auth.signOut()}
        />
      </View>
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        handlePosition="inside"
        modalStyle={{
          backgroundColor: COLORS.PRIMARY,
          borderTopRightRadius: 32,
          borderTopLeftRadius: 32,
        }}
        rootStyle={{
          width,
        }}
        handleStyle={{
          backgroundColor: "#fff",
          width: 64,
          height: 4,
          borderRadius: 4,
          alignSelf: "center",
        }}
      >
        <Config />
      </Modalize>
    </>
  );
}
