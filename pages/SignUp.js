import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Pressable,
  BackHandler,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../App";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";
import { getAuth } from "firebase/auth/react-native";
import { UserContext } from "../DrawerNav";

export default function SignUp({ navigation, setLoading }) {
  const { COLORS } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);

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
      name: "",
      def: "",
    },
  });
  const onSubmit = async (data) => {
    await setDoc(doc(db, "users", getAuth().currentUser.uid), {
      name: data.name,
      def: data.def,
    });
    setUser(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.divInputs}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={
                errors.firstName
                  ? [styles.input, { borderColor: "red" }]
                  : [styles.input, { borderColor: COLORS.PRIMARY }]
              }
              placeholder="Nome Completo *"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
        />

        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, { borderColor: COLORS.PRIMARY }]}
              placeholder="Deficiência"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="def"
        />

        <Pressable
          style={[styles.botao, { backgroundColor: COLORS.PRIMARY }]}
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
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "70%",
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
    marginBottom: 20,
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
  },
});
