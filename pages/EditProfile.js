import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Constants from "expo-constants";
import { ThemeContext } from "../App";
import { Button, Divider, Searchbar, TextInput } from "react-native-paper";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import Input from "../components/Input";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import { getAuth } from "firebase/auth/react-native";

export default function EditProfile({ navigation, setIsOpen }) {
  const { user, setUser, COLORS } = useContext(ThemeContext);
  const [editedUser, setEditedUser] = useState(user);
  const [Search, setSearch] = useState();
  const [location, setLocation] = useState([]);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      axios
        .get(
          `https://us1.locationiq.com/v1/search?key=pk.8ec2c16aae3303be00ed21248120b7a3&q=${Search}&format=json&addressdetails=1&accept-language=pt-br&normalizeaddress=1&limit=3`
        )
        .then((res) => {
          setLocation(res.data.filter((item) => item.class === "boundary"));
        })
        .catch((err) => {
          console.log(err);
        });
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [Search]);

  const onSubmit = async () => {
    await setDoc(doc(db, "users", getAuth().currentUser.uid), {
        ...editedUser,
    }).then(() => {
        navigation.navigate("Profile");
    });
  };

  return (
    <View
      contentContainerStyle={{ gap: 8, padding: 8 }}
      style={{
        paddingTop: Constants.statusBarHeight + 30,
        flex: 1,
        backgroundColor: COLORS.LIGHT,
        gap: 8,
        padding: 8,
      }}
    >
      <View>
        <Text style={[styles.title, { color: COLORS.DARKWHITE }]}>
          Informações{" "}
          <Text style={[styles.title, { color: COLORS.SECONDARY }]}>
            Pessoais
          </Text>
        </Text>
      </View>
      <TextInput
        label={
          <Text
            style={{
              color: COLORS.SECONDARY,
              fontFamily: "Lexend_400Regular",
              fontSize: 20,
            }}
          >
            Nome
          </Text>
        }
        defaultValue={user.firstName}
        onChangeText={(text) => {
          setEditedUser({ ...editedUser, firstName: text });
        }}
        contentStyle={[styles.contentInput, { color: COLORS.DARKWHITE }]}
        style={[
          styles.input,
          {
            backgroundColor: COLORS.GRAY,
          },
        ]}
      />
      <TextInput
        label={
          <Text
            style={{
              color: COLORS.SECONDARY,
              fontFamily: "Lexend_400Regular",
              fontSize: 20,
            }}
          >
            Sobrenome
          </Text>
        }
        defaultValue={user.lastName}
        onChangeText={(text) => {
          setEditedUser({ ...editedUser, lastName: text });
        }}
        contentStyle={[styles.contentInput, { color: COLORS.DARKWHITE }]}
        style={[
          styles.input,
          {
            backgroundColor: COLORS.GRAY,
          },
        ]}
        placeholderTextColor={COLORS.DARKWHITE}
      />
      <TextInput
        label={
          <Text
            style={{
              color: COLORS.SECONDARY,
              fontFamily: "Lexend_400Regular",
              fontSize: 20,
            }}
          >
            Titulo
          </Text>
        }
        defaultValue={user.titulo}
        onChangeText={(text) => {
          setEditedUser({ ...editedUser, titulo: text });
        }}
        contentStyle={[styles.contentInput, { color: COLORS.DARKWHITE }]}
        style={[
          styles.input,
          {
            backgroundColor: COLORS.GRAY,
          },
        ]}
      />
      <DropDownPicker
        open={open}
        value={Search}
        items={location.map((item) => {
          return {
            label: `${item.address.city}, ${item.address.state}, ${item.address.country}`,
            value: item.place_id,
          };
        })}
        setOpen={setOpen}
        setValue={setSearch}
        language="PT"
        searchable={true}
        onChangeSearchText={(text) => setSearch(text)}
        onSelectItem={(item) => {
          setEditedUser({ ...editedUser, location: item.label });
        }}
        textStyle={{
          color: COLORS.DARKWHITE,
          fontFamily: "Lexend_400Regular",
          fontSize: 16,
        }}
        placeholder="Localidade"
        style={{
          backgroundColor: COLORS.SECONDARY,
          borderRadius: 8,
          borderColor: COLORS.GRAY,
          borderWidth: 1,
          padding: 8,
          fontFamily: "Lexend_400Regular",
          fontSize: 16,
          color: COLORS.DARKWHITE,
        }}
        containerStyle={{
          backgroundColor: COLORS.GRAY,
          borderRadius: 8,
          borderColor: COLORS.GRAY,
          borderWidth: 0,
          fontFamily: "Lexend_400Regular",
          fontSize: 16,
          color: COLORS.DARKWHITE,
        }}
        arrowIconStyle={{
          tintColor: COLORS.DARKWHITE,
        }}
        dropDownContainerStyle={{
          backgroundColor: COLORS.GRAY,
          borderRadius: 8,
          borderColor: COLORS.GRAY,
          borderWidth: 0,
        }}
        searchTextInputStyle={{
          borderColor: COLORS.SECONDARY,
          color: COLORS.DARKWHITE,
        }}
        selectedItemLabelStyle={{
          color: COLORS.DARKWHITE,
        }}
        modalAnimationType="slide"
        modalContentContainerStyle={{
            backgroundColor: COLORS.GRAY,
        }}
        closeIconStyle={{
            tintColor: COLORS.DARKWHITE,
        }}
        listMode="MODAL"
      />
      <TextInput
        label={
          <Text
            style={{
              color: COLORS.SECONDARY,
              fontFamily: "Lexend_400Regular",
              fontSize: 20,
            }}
          >
            Sobre
          </Text>
        }
        multiline={true}
        numberOfLines={4}
        defaultValue={user.sobre}
        onChangeText={(text) => {
          setEditedUser({ ...editedUser, sobre: text });
        }}
        maxLength={400}
        contentStyle={[styles.contentInput, { color: COLORS.DARKWHITE }]}
        style={[
          styles.input,
          {
            backgroundColor: COLORS.GRAY,
          },
        ]}
      />
      <Button
        mode="elevated"
        style={{
          backgroundColor: COLORS.SECONDARY,
          fontFamily: "Lexend_400Regular",
        }}
        textColor={COLORS.DARKWHITE}
        labelStyle={{ fontFamily: "Lexend_400Regular", fontSize: 18 }}
        onPress={onSubmit}
      >
        Salvar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contentInput: {
    backgroundColor: "transparent",
    fontFamily: "Lexend_400Regular",
  },
  input: {
    marginLeft: 0,
  },
  result: {
    maxHeight: 220,
    flex: 1,
  },
  listResult: {
    fontFamily: "Lexend_400Regular",
    fontSize: 16,
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontFamily: "Lexend_700Bold",
    fontSize: 24,
  },
});
