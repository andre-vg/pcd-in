import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  RefreshControl,
  ImageBackground,
  Pressable,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import { ThemeContext } from "../App";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import { getAuth } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { ProgressBar } from "react-native-paper";

export default function Profile({ setIsOpen, navigation }) {
  const { COLORS, user, setUser } = useContext(ThemeContext);
  const [refreshing, setRefreshing] = useState(false);
  const [image, setImage] = useState(null);
  const storage = getStorage();
  const storageRef = ref(storage, `users/${getAuth().currentUser.uid}`);
  const [loading, setLoading] = useState(false);
  const [isBanner, setIsBanner] = useState();

  const modalizeRef = useRef(null);

  const onOpen = () => {
    modalizeRef.current?.open();
    setIsOpen(true);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      gap: 16,
      padding: 16,
      marginTop: 12,
    },
    capaProfile: {
      width: "100%",
      height: 130,
      position: "relative",
      zIndex: 1,
    },

    fotoProfile: {
      bottom: 50,
      height: 120,
      width: 120,
      borderRadius: 120,
      marginLeft: 15,
      zIndex: 2,
    },

    info: {
      marginTop: -36,
      paddingHorizontal: 24,
    },

    card: {
      flex: 1,
      width: "100%",
      borderRadius: 20,
      borderStyle: "solid",
      borderColor: COLORS.SECONDARY,
      borderWidth: 2,
      paddingVertical: 8,
      paddingHorizontal: 8,
    },

    tituloContainer: {
      fontSize: 20,
      padding: 5,
      fontFamily: "Lexend_700Bold",
      color: COLORS.DARKWHITE,
    },
    titulo: {
      fontFamily: "Lexend_700Bold",
      color: COLORS.DARKWHITE,
      fontSize: 20,
    },
    texto: {
      fontFamily: "Lexend_400Regular",
      color: COLORS.DARKWHITE,
      fontSize: 16,
    },
    conteudoCard: {
      flex: 1,
      padding: 8,
      flexDirection: "row",
      gap: 16,
    },
    addIcon: {
      position: "absolute",
      bottom: 55,
      marginLeft: 100,
      backgroundColor: COLORS.SECONDARY,
      borderRadius: 20,
      padding: 5,
      zIndex: 3,
      borderColor: COLORS.LIGHT,
      borderWidth: 3,
    },
    containerPhoto: {
      flex: 1,
      padding: 16,
      marginTop: 20,
    },
    photoButtons: {
      flexDirection: "row",
      padding: 16,
      gap: 32,
      alignItems: "center",
      justifyContent: "flex-start",
      borderRadius: 20,
    },
    edit: {
      position: "absolute",
      top: 140,
      right: 20,
      backgroundColor: COLORS.GRAY,
      borderRadius: 20,
      padding: 10,
    },
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await getDoc(doc(db, "users", getAuth().currentUser.uid)).then((doc) => {
      if (doc.data()) {
        setUser(doc.data());
        AsyncStorage.setItem("user", JSON.stringify(doc.data()));
      } else {
        setUser([]);
      }
      setRefreshing(false);
    });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: isBanner ? [206,65] :[1, 1],
      quality: 0.4,
    });

    if (!isBanner) {
      if (!result.canceled) {
        modalizeRef.current?.close();
        setIsOpen(true);
        setLoading(true);
        await uploadImageAsync(result.assets[0].uri).then(async (url) => {
          await setDoc(
            doc(db, "users", getAuth().currentUser.uid),
            {
              photoURL: url,
            },
            { merge: true }
          );
          await onRefresh();
          setLoading(false);
          setIsOpen(false);
        });

        setImage(result.assets[0].uri);
      }
    } else {
      if (!result.canceled) {
        modalizeRef.current?.close();
        setIsOpen(true);
        setLoading(true);
        await uploadImageAsync(result.assets[0].uri).then(async (url) => {
          await setDoc(
            doc(db, "users", getAuth().currentUser.uid),
            {
              banner: url,
            },
            { merge: true }
          );
          await onRefresh();
          setLoading(false);
          setIsOpen(false);
        });

        setImage(result.assets[0].uri);
      }
    }
  };

  async function uploadImageAsync(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), `users/${getAuth().currentUser.uid}`);
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    return await getDownloadURL(fileRef);
  }

  return (
    <>
      {loading && (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#000000aa",
            zIndex: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color={COLORS.SECONDARY} />
        </View>
      )}
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.SECONDARY, COLORS.THIRD]}
            progressBackgroundColor={COLORS.GRAY}
          />
        }
        style={{ backgroundColor: COLORS.LIGHT }}
      >
        <View>
          <Pressable
            onPress={() => {
              setIsBanner(true);
              onOpen();
            }}
          >
            <Image
              style={styles.capaProfile}
              source={
                user?.banner
                  ? { uri: user.banner }
                  : require("../assets/capa.png")
              }
            />
          </Pressable>
        </View>

        <View>
          <Pressable
            onPress={() => {
              setIsBanner(false);
              onOpen();
            }}
            style={[styles.fotoProfile]}
          >
            <Image
              source={
                user?.photoURL
                  ? { uri: user.photoURL }
                  : require("../assets/user.png")
              }
              style={[styles.fotoProfile, { bottom: 0, marginLeft: 0 }]}
            />
          </Pressable>
          <Pressable onPress={onOpen} style={styles.addIcon}>
            <AntDesign name="plus" size={16} color={COLORS.LIGHT} />
          </Pressable>
        </View>
        <TouchableHighlight
          onPress={() => navigation.navigate("EditProfile")}
          style={styles.edit}
          underlayColor={COLORS.THIRD}
        >
          <AntDesign name="edit" size={24} suppressHighlighting color={COLORS.SECONDARY} />
        </TouchableHighlight>

        <View style={styles.info}>
          <Text style={[styles.titulo, { fontSize: 24 }]}>
            {user?.firstName + " " + user?.lastName}
          </Text>
          <Text
            style={[
              styles.titulo,
              {
                color: COLORS.SECONDARY,
                fontSize: 16,
                textDecorationColor: COLORS.SECONDARY,
              },
            ]}
          >
            {user?.titulo}
          </Text>
          <Text style={[styles.texto, { color: "#a2a2a2" }]}>
            {user.location}
          </Text>
        </View>

        <View style={styles.container}>
          {/* div do container sobre*/}
          {!user?.sobre ? null : (
            <View style={styles.card}>
              <Text style={styles.tituloContainer}>Sobre</Text>
              <View style={styles.conteudoCard}>
                <Text style={styles.texto}>{user?.sobre}</Text>
              </View>
            </View>
          )}

          {/* div do container Experiência*/}
          <View style={styles.card}>
            <Text style={styles.tituloContainer}>Experiência</Text>
            <View style={styles.conteudoCard}>
              <Image
                style={{ width: 70, height: 70, borderRadius: 70 }}
                source={require("../assets/icon.png")}
              />
              <View style={{ flex: 1 }}>
                <Text style={[styles.titulo, { fontSize: 20 }]}>
                  Desenvolvedora de software
                </Text>
                <Text
                  style={[
                    styles.texto,
                    { fontSize: 18, color: COLORS.SECONDARY },
                  ]}
                >
                  Pcd-in
                </Text>
                <Text style={[styles.texto, { color: "#a2a2a2" }]}>ago 2021 - set 2022</Text>
                <Text style={[styles.texto, { color: "#a2a2a2" }]}>
                  Brasília, Distrito Federal, Brasil
                </Text>
              </View>
            </View>
          </View>

          {/* div do container Formação*/}
          <View style={styles.card}>
            <Text style={styles.tituloContainer}>Formação Acadêmica</Text>
            <View style={styles.conteudoCard}>
              <Image
                style={{ width: 70, height: 70, borderRadius: 70 }}
                source={require("../assets/icon.png")}
              />
              <View style={{ flex: 1 }}>
                <Text style={[styles.titulo, { fontSize: 17 }]}>
                  Instituição
                </Text>
                <Text
                  style={[
                    styles.titulo,
                    { fontSize: 14, color: COLORS.SECONDARY },
                  ]}
                >
                  Ensino superior, Ciência da computação
                </Text>
                <Text
                  style={[styles.texto, { fontSize: 12, color: "#bbbbbb" }]}
                >
                  2017 - 2021
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ height: 100 }}></View>
      </ScrollView>
      <Modalize
        ref={modalizeRef}
        modalStyle={{
          backgroundColor: COLORS.GRAY,
        }}
        adjustToContentHeight
        handlePosition="inside"
        handleStyle={{
          backgroundColor: COLORS.SECONDARY,
          width: 52,
          height: 8,
          marginTop: 8,
        }}
        onClosed={() => {
          setIsOpen(false);
        }}
      >
        <View style={styles.containerPhoto}>
          <TouchableHighlight
            onPress={() => {
              ToastAndroid.show(
                "Funcionalidade em Desenvolvimento! 😅",
                ToastAndroid.LONG
              );
            }}
            underlayColor={COLORS.PRIMARY}
            style={styles.photoButtons}
          >
            <>
              <AntDesign name="camerao" size={32} color={COLORS.SECONDARY} />
              <Text style={[styles.titulo, { fontSize: 18 }]}>
                Abrir a camera do dispositivo
              </Text>
            </>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={pickImage}
            underlayColor={COLORS.PRIMARY}
            style={styles.photoButtons}
          >
            <>
              <AntDesign name="picture" size={32} color={COLORS.SECONDARY} />
              <Text style={[styles.titulo, { fontSize: 18 }]}>
                Escolher da galeria
              </Text>
            </>
          </TouchableHighlight>
        </View>
      </Modalize>
    </>
  );
}
