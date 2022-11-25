import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";

import { useFonts } from "expo-font";
import {
  FontAwesome5,
  Ionicons,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";

const producto = [
  {
    nombre: "Persiana Sheer Elegance Linen ",
    descripcion:
      "Su uso no sólo se limita a dormitorios, también puedes utilizarla en espacios comunes como sala, star, comedor y estudio. El color neutro de esta persiana te permitirá combinarla fácilmente con cualquier mueble y tono de pared. Incluye un tubo enrollable con un sistema de deslizamiento que permite subir y bajar las telas, según tu necesidad y así escoger cuánta luz ingresará al espacio donde se encuentre instalada. Los componentes de fabricación hacen que sea un producto durable y resistente. Además, solo necesitarás un paño húmedo para limpiarla. Se puede instalar tanto en muros como en techo. ",

    precio: "$164.900 Und",
    imageurl: "https://persianasardila.com/media/uploads/sheer_1608173295.jpeg",

    color1: "orange",
    color2: "black",
    color3: "aqua",
  },

  {
    nombre: "Persiana Sheer Elegance Linen ",
    descripcion:
      "Su uso no sólo se limita a dormitorios, también puedes utilizarla en espacios comunes como sala, star, comedor y estudio. El color neutro de esta persiana te permitirá combinarla fácilmente con cualquier mueble y tono de pared. Incluye un tubo enrollable con un sistema de deslizamiento que permite subir y bajar las telas, según tu necesidad y así escoger cuánta luz ingresará al espacio donde se encuentre instalada. Los componentes de fabricación hacen que sea un producto durable y resistente. Además, solo necesitarás un paño húmedo para limpiarla. Se puede instalar tanto en muros como en techo. ",

    precio: "$164.900 Und",
    imageurl: "https://persianasardila.com/media/uploads/sheer_1608173295.jpeg",
    color1: "orange",
    color2: "black",
    color3: "aqua",
  },

  {
    nombre: "Persiana Sheer Elegance Linen ",
    descripcion:
      "Su uso no sólo se limita a dormitorios, también puedes utilizarla en espacios comunes como sala, star, comedor y estudio. El color neutro de esta persiana te permitirá combinarla fácilmente con cualquier mueble y tono de pared. Incluye un tubo enrollable con un sistema de deslizamiento que permite subir y bajar las telas, según tu necesidad y así escoger cuánta luz ingresará al espacio donde se encuentre instalada. Los componentes de fabricación hacen que sea un producto durable y resistente. Además, solo necesitarás un paño húmedo para limpiarla. Se puede instalar tanto en muros como en techo. ",

    precio: "$164.900 Und",
    imageurl: "https://persianasardila.com/media/uploads/sheer_1608173295.jpeg",
    color1: "orange",
    color2: "black",
    color3: "aqua",
  },
];

export default ({ navigation }) => {
  const [fontsloaded] = useFonts({
    popins: require("../assets/fonts/Poppins-BoldItalic.ttf"),
    popinstitle: require("../assets/fonts/Poppins-Bold.ttf"),
    popinsprice: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  return (
    <View style={styles.principal}>
      <View style={styles.nav}>
        <TouchableOpacity>
          <Ionicons name="ios-menu" size={30} color="white" />
        </TouchableOpacity>

        <Text style={styles.letter}>Vico's</Text>
        <View style={styles.posicion}>
          <TouchableOpacity>
            <FontAwesome5 name="search" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome5 name="shopping-cart" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <FlatList
          data={producto}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image style={styles.image} source={{ uri: item.imageurl }} />
              <View style={styles.card2}>
                <Text style={styles.letter2}>{item.nombre}</Text>
                <View style={styles.paletacors}>
                  <View style={styles.colorr}>
                    <FontAwesome name="circle" size={20} color={item.color1} />
                    <FontAwesome name="circle" size={20} color={item.color2} />
                    <FontAwesome name="circle" size={20} color={item.color3} />
                  </View>
                  <View style={styles.precioicon}>
                    <Text style={styles.letter3}>{item.precio}</Text>
                    <TouchableOpacity>
                    <Feather name="plus-square" size={30} color="#131e2f" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  principal: {
    backgroundColor: "#fffff",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  nav: {
    paddingTop: 42,
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#131e2f",
    paddingBottom: 15,
  },
  posicion: {
    flexDirection: "row",
    gap: 15,
  },

  letter: {
    color: "white",
    fontFamily: "popins",
    fontSize: 25,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopStartRadius: 13,
    borderTopEndRadius: 13,
  },
  letter2: {
    fontFamily: "popinstitle",
    fontSize: 20,
  },

  card: {
    marginTop: 20,
    alignItems: "center",
    width: Dimensions.get("window").width - 50,
    margin: 20,

    borderRadius: 13,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,

    backgroundColor: "white",
  },

  precioicon: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  card2: {
    padding: 20,
  },
  letter3: {
    fontSize: 19,
    fontFamily: "popinsprice",
  },
  paletacors: {
    marginTop: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  colorr: {
  
    flexDirection: "row",
    gap: 5,
  },
});
