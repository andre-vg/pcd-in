import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../App";
import VagaCard from "../components/VagaCard";

export default function Home({ navigation }) {
  const { COLORS } = useContext(ThemeContext);
  let a = [
    "Google",
    "Facebook",
    "Apple",
    "Microsoft",
    "Amazon",
    "Spotify",
    "Twitter",
    "TikTok",
    "Instagram",
    "YouTube",
    "LinkedIn",
    "Pinterest",
    "Reddit",
    "Snapchat",
    "Tumblr",
    "WhatsApp",
    "Discord",
    "Telegram",
    "Twitch",
  ];

  let cargos = [
    "Desenvolvedor",
    "Analista de Sistemas",
    "Analista de Dados",
    "Analista de Segurança",
    "Analista de Redes",
    "Analista de Software Engineering Specialist (Java - Authorization)",
    "Analista de Suporte",
    "Analista de Testes",
    "Analista de Qualidade",
    "Analista de Negócios",
    "Analista de Processos",
    "Analista de Requisitos",
    "Analista de Projetos",
    "Analista de Banco de Dados",
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      gap: 10,
      padding: 12,
      backgroundColor: COLORS.LIGHT,
    },
  });

  return (
    <ScrollView style={styles.container}>
      {a.map((item) => (
        <VagaCard key={item} nome={item} cargo={cargos[Math.floor(Math.random()*cargos.length)]} navigation={navigation} />
      ))}
      <View style={{ height: 100 }}></View>
    </ScrollView>
  );
}
