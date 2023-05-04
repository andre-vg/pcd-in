import {
  Animated,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../App";

export default function Paginator({ data, scrollX, keyboard }) {
  const { width } = useWindowDimensions();
  const { COLORS, setCOLORS } = useContext(ThemeContext);

  const styles = StyleSheet.create({
    dot: {
      height: 10,
      borderRadius: 5,
      backgroundColor: COLORS.SECONDARY,
      marginHorizontal: 8,
    },
  });

  return (
    <View style={{ flexDirection: "row", height: 60, display: !keyboard ? 'flex' : 'none' }}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 25, 10],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity: opacity }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}


