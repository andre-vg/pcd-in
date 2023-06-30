import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Pressable,
  BackHandler,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../App";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/FirebaseConfig";
import { getAuth } from "firebase/auth/react-native";
import Input from "../components/Input";
import Constants from "expo-constants";
import { Picker } from "@react-native-picker/picker";

export default function SignUp() {
  const { COLORS, user, setUser } = useContext(ThemeContext);

  //if user click return button, it will go back to login page
  useEffect(() => {
    const backAction = () => {
      getAuth().signOut();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: auth.currentUser.displayName?.split(" ")[0] ?? "",
      lastName: auth.currentUser.displayName?.split(" ")[1] ?? "",
      deficiency: null,
      grau: null,
      sobre: null,
      titulo: null,
      email: auth.currentUser.email ?? "",
    },
  });
  const onSubmit = async (data) => {
    await setDoc(doc(db, "users", getAuth().currentUser.uid), {
      ...data,
    });
    setUser(data);
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          paddingTop: Constants.statusBarHeight + 24,
          backgroundColor: COLORS.GRAY,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: COLORS.DARKWHITE, paddingHorizontal: 20 },
        ]}
      >
        Cadastro
      </Text>
      <Text
        style={[
          styles.text,
          { color: COLORS.SECONDARY, paddingHorizontal: 32, marginTop: 12 },
        ]}
      >
        Preencha os campos abaixo para que possamos te conhecer melhor!
      </Text>
      <Text
        style={[
          styles.title,
          {
            fontSize: 22,
            paddingHorizontal: 32,
            marginTop: 12,
            color: COLORS.DARKWHITE,
          },
        ]}
      >
        Dados Pessoais
      </Text>
      <View style={styles.divInputs}>
        <Controller
          name="firstName"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Nome"
              underlineColor={"transparent"}
              activeUnderlineColor={COLORS.SECONDARY}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.firstName}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Sobrenome"
              underlineColor={"transparent"}
              activeUnderlineColor={COLORS.SECONDARY}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.lastName}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email"
              underlineColor={"transparent"}
              activeUnderlineColor={COLORS.SECONDARY}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email}
            />
          )}
        />

        <Controller
          name="deficiency"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              style={{
                width: "80%",
                fontSize: 20,
                fontFamily: "Lexend_400Regular",
                borderRadius: 10,
                backgroundColor: COLORS.SECONDARY,
              }}
              itemStyle={{
                fontSize: 20,
                fontFamily: "Lexend_400Regular",
              }}
              selectedValue={value}
              onValueChange={(itemValue, itemIndex) =>
                onChange(itemValue, itemIndex)
              }
            >
              <Picker.Item label="Auditiva" value="auditiva" />
              <Picker.Item label="Visual" value="visual" />
              <Picker.Item label="Motora" value="motora" />
              <Picker.Item label="Intelectual" value="intelectual" />
            </Picker>
          )}
        />

        <Controller
          name="grau"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              style={{
                width: "80%",
                fontSize: 20,
                fontFamily: "Lexend_400Regular",
                borderRadius: 10,
                backgroundColor: COLORS.SECONDARY,
              }}
              itemStyle={{
                fontSize: 20,
                fontFamily: "Lexend_400Regular",
              }}
              selectedValue={value}
              onValueChange={(itemValue, itemIndex) =>
                onChange(itemValue, itemIndex)
              }
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
            </Picker>
          )}
        />

        <Controller
          name="titulo"
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Cargo"
              underlineColor={"transparent"}
              activeUnderlineColor={COLORS.SECONDARY}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.titulo}
            />
          )}
        />
      </View>
      <Text
        style={[
          styles.title,
          {
            fontSize: 22,
            paddingHorizontal: 32,
            marginTop: 10,
            color: COLORS.DARKWHITE,
          },
        ]}
      >
        Sobre (opcional)
      </Text>
      <View style={styles.divInputs}>
        <Controller
          name="sobre"
          control={control}
          rules={{
            maxLength: 400,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Conte um pouco sobre você!"
              underlineColor={"transparent"}
              activeUnderlineColor={COLORS.SECONDARY}
              multiline={true}
              numberOfLines={4}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.sobre}
              maxLength={400}
            />
          )}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.botao, { backgroundColor: COLORS.SECONDARY }]}
        onPress={handleSubmit(onSubmit)}
      >
        <Text
          style={{
            fontFamily: "Lexend_400Regular",
            color: COLORS.DARKWHITE,
            fontSize: 18,
          }}
        >
          Cadastrar
        </Text>
      </TouchableOpacity>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: "Lexend_700Bold",
    fontSize: 32,
  },
  text: {
    fontFamily: "Lexend_400Regular",
    fontSize: 18,
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    fontFamily: "Lexend_400Regular",
  },
  divInputs: {
    display: "flex",
    gap: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  botao: {
    display: "flex",
    width: "70%",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(134, 93, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "15%",
  },
});
