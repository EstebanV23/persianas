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
  SectionList,
} from "react-native";

import { useFonts } from "expo-font";

import {
  FontAwesome5,
  Ionicons,
  Fontisto,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";

const plisadas = [
  {
    nombre: "Persiana Sheer Elegance Linen ",
    descripcion:
      "Su uso no sólo se limita a dormitorios, también puedes utilizarla en espacios comunes como sala, star, comedor y estudio. El color neutro de esta persiana te permitirá combinarla fácilmente con cualquier mueble y tono de pared. Incluye un tubo enrollable con un sistema de deslizamiento que permite subir y bajar las telas, según tu necesidad y así escoger cuánta luz ingresará al espacio donde se encuentre instalada. Los componentes de fabricación hacen que sea un producto durable y resistente. Además, solo necesitarás un paño húmedo para limpiarla. Se puede instalar tanto en muros como en techo. ",

    precio: "$164.900 Und",
    imageurl: "https://persianasardila.com/media/uploads/sheer_1608173295.jpeg",

    color1: "orange",
    color2: "black",
    color3: "aqua",

    categoria: "Plisadas",
  },

  {
    nombre: "Persiana Plisadas aislantes al ruido ",
    descripcion:
      "Fabricadas por medio de pliegues uniformes en toda la cortina por medio de la opción de plisado perfecto, son muy decorativas, aislantes al ruido además tienen buena protección térmica ideales para espacios reducidos",

    precio: "$125.200 Und",
    imageurl: "https://espacioflex.com/wp-content/uploads/2015/09/plisadas.jpg",
    color2: "green",
    color1: "brown",
    color3: "black",
    categoria: "Plisadas",
  },
  {
    nombre: "Persiana Plisadas protección térmica ",
    descripcion:
      "Fabricadas por medio de pliegues uniformes en toda la cortina por medio de la opción de plisado perfecto, son muy decorativas, aislantes al ruido además tienen buena protección térmica ideales para espacios reducidos",

    precio: "$110.900 Und",
    imageurl:
      "https://persianasypisospp.com/wp-content/uploads/2018/06/Untitled-design-1.png",
    color2: "green",
    color1: "gold",
    color3: "aqua",
    categoria: "Plisadas",
  },
];

const Vertical = [
  {
    nombre: "Persiana Vertical En Tela Blackout Mate ",
    descripcion:
      "Lamas de 89 milímetros en telas decorativas compuesta por fibras de vidrio y PVC que penden de un elegante riel de aluminio las cuales se desplazan a través del riel, así mismo, permiten giros de 180 grados logrando con ello una mayor privacidad a sus espacios y un máximo control del ingreso de la luz.",

    precio: "$190.500 Und",
    imageurl:
      "https://bogotana.co/wp-content/uploads/2021/07/persiana-vertical-min.jpg",
    color1: "#f0f0ff",
    color2: "gray",
    color3: "black",
    categoria: "Vertical",
  },

  {
    nombre: "Persiana Vertical Cenefa ",
    descripcion:
      "Están compuestas por lamas con una suave caída vertical, traslapadas y suspendidas de un elegante riel de aluminio para brindar opciones de adaptación al tamaño de la ventana, y proporcionar una apariencia sofisticada y uniforme. ",

    precio: "$200.700 Und",
    imageurl:
      "https://mobiliariodeoficinas.co/wp-content/uploads/2014/11/vertical4.jpg",
    color2: "gray",
    color1: "#f0f0ff",
    color3: "black",
    categoria: "Vertical",
  },
];

const Alicantinas = [
    {
        "nombre": "Persiana Alicantinas para exteriores de madera ",
        "descripcion":
          "Tanto por su atractivo aspecto natural, orgánico y decididamente artesanal, como por su gran funcionalidad y capacidad de aislamiento, las persianas alicantinas están de plena actualidad y son una clara tendencia en decoración.",
    
        "precio": "$300.000 Und",
        "imageurl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVSh1S_uDaNH_28Rv6XTv4PHbC3pTw_wRD-KG6lMBX4t4MbOsJvKqZH5LxO9oXQuy6gOo&usqp=CAU",
        "color1": "#704E3E",
        "color2": "#A0847D",
        "color3": "#794638",
        "categoria": "Alicantinas"
      },
    
      {
        "nombre": "Persiana Alicantinas para exteriores de PVC ",
        "descripcion":
          "Tanto por su atractivo aspecto natural, orgánico y decididamente artesanal, como por su gran funcionalidad y capacidad de aislamiento, las persianas alicantinas están de plena actualidad y son una clara tendencia en decoración.",
    
        "precio": "$275.990 Und",
        "imageurl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqMdhywMGU1bGa6I-hQMgscZlsQibQbwjKmw&usqp=CAU",
        "color1": "green",
        "color2": "aqua",
        "color3": "#F1EFDE",
        "categoria": "Alicantinas"
      },
]

const Enrollables = [
    {
        "nombre": "Persiana Enrollables Roller Screen o Solarview ",
        "descripcion":
          "Por otro lado, si quieres privacidad y oscuridad total, un tejido de bloqueo lumínico es la elección perfecta: modelo Blackout.  Para una cobertura intermedia, un tejido estándar es ideal.",
    
        "precio": "$159.990 Und",
        "imageurl": "https://www.hunterdouglas.com.co/cortinas/img/co/novedades/1446x785-1/Cortinas-y-persianas-para-casa-Hunter-Douglas.jpg",
        "color1": "#e2debe",
        "color2": "#dbcdc2",
        "color3": "#c88770",
        "categoria": "Enrollables"
      },
    
      {
        "nombre": "Persiana Enrollables Blackout ",
        "descripcion":
          "Una cosa que deseas de tus cortinas es durabilidad y las cortinas enrollables son duraderas por excelencia.",
    
        "precio": "$90.990 Und",
        "imageurl": "https://dvalen.com/wp-content/uploads/2019/08/Enrollable_blackout_2.jpg",
        "color1": "#dbcdc2",
        "color2": "#e2debe",
        "color3": "#c88770",
        "categoria": "Enrollables"
      },
];

export default ({ navigation }) => {
  const [fontsloaded] = useFonts({
    popins: require("../assets/fonts/Poppins-BoldItalic.ttf"),
    popinstitle: require("../assets/fonts/Poppins-Bold.ttf"),
    popinsprice: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  return (
    <View style={styles.containner}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={()=>navigation.navigate('Inicio')}>
          <Fontisto name="arrow-return-left" size={22} color="white" />
        </TouchableOpacity>

        <Text style={styles.letter}>Categorias</Text>
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
        <View style={styles.ss}>
          <View style={styles.title}>
            <Text style={styles.lettessr}>Persianas Plisadas</Text>
          </View>
        </View>

        <View>
          <FlatList
            data={plisadas}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image style={styles.image} source={{ uri: item.imageurl }} />
                <View style={styles.card2}>
                  <Text style={styles.letter2}>{item.nombre}</Text>
                  <View style={styles.paletacors}>
                    <View style={styles.colorr}>
                      <FontAwesome
                        name="circle"
                        size={20}
                        color={item.color1}
                      />
                      <FontAwesome
                        name="circle"
                        size={20}
                        color={item.color2}
                      />
                      <FontAwesome
                        name="circle"
                        size={20}
                        color={item.color3}
                      />
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

          <View style={styles.ss}>
            <View style={styles.title}>
              <Text style={styles.lettessr}>Persianas Verticales</Text>
            </View>
          </View>

          <FlatList
            data={Vertical}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image style={styles.image} source={{ uri: item.imageurl }} />
                <View style={styles.card2}>
                  <Text style={styles.letter2}>{item.nombre}</Text>
                  <View style={styles.paletacors}>
                    <View style={styles.colorr}>
                      <FontAwesome
                        name="circle"
                        size={20}
                        color={item.color1}
                      />
                      <FontAwesome
                        name="circle"
                        size={20}
                        color={item.color2}
                      />
                      <FontAwesome
                        name="circle"
                        size={20}
                        color={item.color3}
                      />
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

          <View style={styles.ss}>
            <View style={styles.title}>
              <Text style={styles.lettessrs}>Persianas Alicantinas</Text>
            </View>
          </View>
                
          <FlatList
            data={Alicantinas}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image style={styles.image} source={{ uri: item.imageurl }} />
                <View style={styles.card2}>
                  <Text style={styles.letter2}>{item.nombre}</Text>
                  <View style={styles.paletacors}>
                    <View style={styles.colorr}>
                      <FontAwesome
                        name="circle"
                        size={20}
                        color={item.color1}
                      />
                      <FontAwesome
                        name="circle"
                        size={20}
                        color={item.color2}
                      />
                      <FontAwesome
                        name="circle"
                        size={20}
                        color={item.color3}
                      />
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

                    <View style={styles.ss}>
            <View style={styles.title}>
              <Text style={styles.lettessr}>Persianas Enrollables</Text>
            </View>
          </View>

          <FlatList
            data={Enrollables}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image style={styles.image} source={{ uri: item.imageurl }} />
                <View style={styles.card2}>
                  <Text style={styles.letter2}>{item.nombre}</Text>
                  <View style={styles.paletacors}>
                    <View style={styles.colorr}>
                      <FontAwesome
                        name="circle"
                        size={20}
                        color={item.color1}
                      />
                      <FontAwesome
                        name="circle"
                        size={20}
                        color={item.color2}
                      />
                      <FontAwesome
                        name="circle"
                        size={20}
                        color={item.color3}
                      />
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
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containner: {
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

  title: {
    width: 300,
    height: "auto",
    alignItems: "center",
    borderRadius: 60,
    backgroundColor: "#020F4A",
    marginTop: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  ss: {
    alignItems: "center",
  },

  lettessr: {
    color: "white",
    fontFamily: "popins",
    fontSize: 25,
    padding: 12,
  },
  lettessrs: {
    color: "white",
    fontFamily: "popins",
    fontSize: 22,
    padding: 12,
  },

  card: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
    width: Dimensions.get("window").width - 50,
    height: "auto",
    margin: "auto",
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

});
