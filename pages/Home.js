import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../App";
import VagaCard from "../components/VagaCard";
import axios from "axios";

export default function Home({ navigation }) {
  const { COLORS } = useContext(ThemeContext);
  const [vagas, setVagas] = React.useState([]);
  let a = ["Google", "Facebook", "Apple", "Microsoft"];
  let cargos = ["Desenvolvedor", "Analista de Sistemas", "Analista de Dados"];

  const baseURL = "https://xz4kdcpix4.execute-api.sa-east-1.amazonaws.com/usuario/";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      gap: 10,
      padding: 12,
      backgroundColor: COLORS.LIGHT,
    },
  });

const getvagas = async () => {
  await axios.get(baseURL + "vagas").then((response) => {
    setVagas(response.data.Items);
  });
};

useEffect(() => {
  getvagas();
}, []);

  return (
    <ScrollView style={styles.container}>
      {vagas.map((item) => (
        <VagaCard
          key={item.id}
          nome={item.empresa}
          cargo={item.titulo}
          logo_empresa={item.logo_empresa}
          navigation={navigation}
        />
      ))}
      <View style={{ height: 100 }}></View>
    </ScrollView>
  );
}
