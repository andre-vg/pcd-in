import {
  Animated,
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import slides from "../slides";
import OnBoardingItem from "./OnBoardingItem";
import Paginator from "./Paginator";
import { Modalize } from "react-native-modalize";
import LoginEmpresa from "./LoginEmpresa";
import { ThemeContext } from "../App";
import { Entypo } from "@expo/vector-icons";

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const { COLORS } = useContext(ThemeContext);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const slidesRef = useRef(null);

  const modalizeLogin = useRef(null);

  const onOpen = () => {
    modalizeLogin.current?.open();
  };

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={slides}
            renderItem={({ item }) => (
              <OnBoardingItem item={item} onOpen={onOpen} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { x: scrollX },
                  },
                },
              ],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slidesRef}
          />
        </View>
        <Paginator
          data={slides}
          scrollX={scrollX}
          keyboard={isKeyboardVisible}
        />
      </View>
      <Modalize
        ref={modalizeLogin}
        handlePosition="inside"
        modalTopOffset={0}
        withHandle={false}
        HeaderComponent={
          <Pressable
            onPress={() => {
              modalizeLogin.current?.close();
            }}
            style={[styles.header, { borderBottomColor: COLORS.SECONDARY }]}
          >
            <Text
              style={{
                fontFamily: "Lexend_700Bold",
                fontSize: 28,
              }}
            >
              Login Empresa
            </Text>
            <Entypo style={{alignSelf:"center"}} name="cross" size={32} color={COLORS.SECONDARY} />
          </Pressable>
        }
        modalStyle={{
          borderTopRightRadius: 32,
          borderTopLeftRadius: 32,
          zIndex: 10,
        }}
        disableScrollIfPossible={false}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoginEmpresa />
        </View>
      </Modalize>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    marginTop: 24,
    marginHorizontal: 16,
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderBottomWidth: 0.3,
    paddingBottom: 8,
  },
});
