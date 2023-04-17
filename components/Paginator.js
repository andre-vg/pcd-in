import {
  Animated,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../constants";

export default function Paginator({ data, scrollX, keyboard }) {
  const { width } = useWindowDimensions();
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

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.PRIMARY,
    marginHorizontal: 8,
  },
});
