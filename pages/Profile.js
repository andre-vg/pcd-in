import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../App";
import { UserContext } from "../DrawerNav";

export default function Profile() {
  const { COLORS } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

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
      borderColor: COLORS.PRIMARY,
      borderWidth: 2,
      padding: 8,
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
    },
    texto: {
      fontFamily: "Lexend_400Regular",
      color: COLORS.DARKWHITE,
      fontSize: 12,
    },
    conteudoCard: {
      padding: 12,
      flex: 1,
      flexDirection: "row",
      gap: 8,
    },
  });

  return (
    <ScrollView style={{ backgroundColor: COLORS.LIGHT }}>
      <View>
        <Image
          style={styles.capaProfile}
          source={require("../assets/capa.jpg")}
        />
      </View>

      <View>
        <Image
          style={styles.fotoProfile}
          source={require("../assets/fotoPerfil.jpg")}
        />
      </View>

      <View style={styles.info}>
        <Text style={[styles.titulo, { fontSize: 24 }]}>{user?.name}</Text>
        <Text style={[styles.titulo, { color: COLORS.SECONDARY, fontSize:16 }]}>
          CEO do PCD-in
        </Text>
        <Text style={[styles.texto, { color: '#bbbbbb' }]}>
          Taguatinga, Brasília, Brasil
        </Text>
      </View>

      <View style={styles.container}>
        {/* div do container sobre*/}
        <View style={styles.card}>
          <Text style={styles.tituloContainer}>Sobre</Text>
          <View style={styles.conteudoCard}>
            <Text style={styles.texto}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              sollicitudin condimentum est, non pharetra risus tempus vitae.
              Morbi tempus ac risus sit amet tempus. Duis eu quam a urna maximus
              condimentum. Pellentesque.
            </Text>
          </View>
        </View>

        {/* div do container Experiência*/}
        <View style={styles.card}>
          <Text style={styles.tituloContainer}>Experiência</Text>
          <View style={styles.conteudoCard}>
            <Image
              style={{ width: 70, height: 70, borderRadius: 70 }}
              source={require("../assets/icon.png")}
            />
            <View style={{ flex: 1 }}>
              <Text style={[styles.titulo, { fontSize: 17 }]}>
                Desenvolvedora de software
              </Text>
              <Text style={[styles.titulo, { fontSize: 14, color:COLORS.SECONDARY }]}>Pcd-in</Text>
              <Text style={styles.texto}>
                ago de 2021 - set de 2022 (1 ano 2 meses)
              </Text>
              <Text style={[styles.texto, {color:'#bbbbbb'}]}>
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
              <Text style={[styles.titulo, { fontSize: 17 }]}>Instituição</Text>
              <Text style={[styles.titulo, { fontSize: 14, color:COLORS.SECONDARY }]}>
                Ensino superior, Ciência da computação
              </Text>
              <Text style={[styles.texto, { fontSize: 12, color:'#bbbbbb' }]}>2017 - 2021</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ height: 100 }}></View>
    </ScrollView>
  );
}
