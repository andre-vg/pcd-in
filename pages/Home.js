import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableHighlight,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../App";
import VagaCard from "../components/VagaCard";
import axios from "axios";
import { Modalize } from "react-native-modalize";
import VagaDetails from "./VagaDetails";

export default function Home({ navigation, setIsOpen }) {
  const { COLORS } = useContext(ThemeContext);
  const [vagas, setVagas] = useState([]);
  const [dados, setDados] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const refModalVagas = useRef(null);

  const baseURL =
    "https://xz4kdcpix4.execute-api.sa-east-1.amazonaws.com/usuario/";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      gap: 10,
      padding: 12,
      backgroundColor: COLORS.LIGHT,
    },
  });

  const getVagas = async () => {
    setRefreshing(true);
    await axios.get(baseURL + "vagas").then((response) => {
      setVagas(response.data.Items);
      setRefreshing(false);
    });
  };

  const onOpen = (info) => {
    setDados(info);
    refModalVagas.current?.open();
    setIsOpen(true);
  };

  useEffect(() => {
    getVagas();
  }, []);

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getVagas}
            colors={[COLORS.SECONDARY, COLORS.THIRD]}
            progressBackgroundColor={COLORS.GRAY}
          />
        }
        style={styles.container}
      >
        {vagas.map((item) => (
          <VagaCard
            key={item.id}
            info={item}
            navigation={navigation}
            onOpen={onOpen}
            setDados={setDados}
          />
        ))}
        <View style={{ height: 100 }}></View>
      </ScrollView>

      <Modalize
        ref={refModalVagas}
        modalStyle={{
          backgroundColor: COLORS.GRAY,
        }}
        modalTopOffset={50}
        handlePosition="inside"
        handleStyle={{
          backgroundColor: COLORS.SECONDARY,
          width: 60,
          height: 5,
          marginVertical: 2,
        }}
        HeaderComponent={
          <View
            style={{
              backgroundColor: COLORS.GRAY,
              height: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
        }
        FooterComponent={
          <View
            style={{
              backgroundColor: COLORS.GRAY,
              height: 70,
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TouchableHighlight
              style={{
                backgroundColor: COLORS.LIGHT,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                height: "90%",
                width: "48%",
              }}
              onPress={() => {
                refModalVagas.current?.close();
                setIsOpen(false);
              }}
              underlayColor={COLORS.PRIMARY}
            >
              <Text
                style={{
                  color: COLORS.DARKWHITE,
                  fontFamily: "Lexend_400Regular",
                  fontSize: 16,
                }}
              >
                Fechar
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{
                backgroundColor: COLORS.SECONDARY,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                height: "90%",
                width: "48%",
              }}
              onPress={() => {
                ToastAndroid.show("Você foi cadastrado na vaga!", ToastAndroid.SHORT);
              }}
              underlayColor={COLORS.PRIMARY}
            >
              <Text
                style={{
                  color: COLORS.DARKWHITE,
                  fontFamily: "Lexend_400Regular",
                  fontSize: 16,
                }}
              >
                Candidatar-se
              </Text>
            </TouchableHighlight>
          </View>
        }
        onClose={() => setIsOpen(false)}
      >
        <VagaDetails info={dados} />
      </Modalize>
    </>
  );
}
