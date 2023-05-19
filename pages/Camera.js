import { Camera, CameraType } from "expo-camera";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemeContext } from "../App";
import Constants from "expo-constants";

export default function CameraComponent({ navigation }) {
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { COLORS } = useContext(ThemeContext);
  const cameraRef = useRef(null);

  useEffect(() => {
    requestPermission();
  }, [permission]);

  const tirarFoto = async () => {
    const photo = await cameraRef.current.takePictureAsync();
    console.log(photo);
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View style={{ flex: 1, backgroundColor: "red" }} />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", color:COLORS.DARKWHITE }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          marginTop: Constants.statusBarHeight,
        },
      ]}
    >
      <View
        style={[
          styles.topButtons,
          {
            backgroundColor: COLORS.LIGHT,
          },
        ]}
      >
        <TouchableOpacity onPress={toggleCameraType}>
          <MaterialCommunityIcons
            name="camera-flip"
            size={32}
            color={COLORS.DARKWHITE}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation?.navigate("Profile");
          }}
        >
          <Entypo name="cross" size={36} color={COLORS.DARKWHITE} />
        </TouchableOpacity>
      </View>
      <Camera
        style={styles.camera}
        ref={cameraRef}
        type={type}
        useCamera2Api
        ratio="1:1"
      />
      <View
        style={[
          styles.topButtons,
          {
            justifyContent: "center",
            backgroundColor: COLORS.LIGHT,
            height: "20%",
          },
        ]}
      >
        <TouchableHighlight
          style={[
            styles.shot,
            {
              backgroundColor: COLORS.DARKWHITE,
            },
          ]}
          onPress={tirarFoto}
        >
          <MaterialCommunityIcons
            name="camera"
            size={32}
            color={COLORS.LIGHT}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
    height: "10%",
  },
  shot: {
    padding: 12,
    borderRadius: 50,
  },
});
