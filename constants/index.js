import * as SecureStore from "expo-secure-store";

let theme = SecureStore.getItemAsync("Theme");

export const COLORS =
  theme === "dark"
    ? {
        PRIMARY: "#316181",
        SECONDARY: "#000",
        THIRD: "#000",
        LIGHT: "#fff",
      }
    : {
        PRIMARY: "#865DFF",
        SECONDARY: "#fff",
        THIRD: "#000",
        LIGHT: "#fff",
      };

// export const COLORS = {
//   PRIMARY: "#865DFF",
//   SECONDARY: "#fff",
//   THIRD: "#000",
//   LIGHT: "#fff",
// };

export const RGBA = {
  PRIMARY: "rgba(134, 93, 255, 0.5)",
  SECONDARY: "rgba(255, 255, 255, 0.2)",
  THIRD: "rgba(0, 0, 0, 0.2)",
};
