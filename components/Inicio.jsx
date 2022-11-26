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
  MaterialIcons,
  Entypo
} from "@expo/vector-icons";


export default ({ navigation, route }) => {
  const defecto = {
    id: "0",
    logueado: false
  }
  const {id, logueado} = route.params || defecto;
  const [producto, setProducto] = useState([]);
  const [usuario, setUsuario] = useState({});
  const [cargando, setCargando] = useState(true);
  const [abrirModal, setAbrirModal] = useState(true);
  
  useEffect( () =>
  {
    fetch("http://localhost:5000/api/producto/all")
    .then(res => {return res.json()})
    .then(data => 
      {
        setProducto(data);
      })
    .catch(e => console.log("Error: " +e ))

    if(logueado)
    {
      fetch(`http://localhost:5000/api/usuario/${id}`)
      .then(res => {return res.json()})
      .then(data => 
        {
          setUsuario(data);
          setCargando(false);
        })
      .catch(e => console.log("Error: " +e ))
    }else{
      setTimeout(() => {
        setCargando(false);
      }, 1000);
    }

  }, [logueado])
  

  const [fontsloaded] = useFonts({
    popins: require("../assets/fonts/Poppins-BoldItalic.ttf"),
    popinstitle: require("../assets/fonts/Poppins-Bold.ttf"),
    popinsprice: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (cargando) {
    return (
      <View style={styles.horizontal}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.principal}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => setAbrirModal(true)}>
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
      <Modal
        visible={abrirModal}
        animationType="slide"
        onRequestClose={() => {
          setAbrirModal(!abrirModal);
        }}
      >
        <View style={styles.contenedorModal}>
          <View style={styles.contenedorSalida}>
            <TouchableOpacity onPress={()=> setAbrirModal(false)}>
              <MaterialIcons name="close" size={32} style={styles.iconoCerrar} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.contenedorAcciones}>
            <View style={styles.informacionUsuario}>
              <FontAwesome name="user-circle-o" size={35} color="black" style={styles.iconoAccion}/>
              <View style={styles.accionContenido}>
                  <TouchableOpacity onPress={() => {
                      setAbrirModal(false);
                      logueado ? navigation.navigate("Update", {id, logueado}) :
                      navigation.navigate("Login")
                    }}>
                    <Text style={[styles.letter2, styles.accionTextoPrimario]}>{usuario.usuario || "Registrate"}</Text>
                    <Text style={[styles.letter3, styles.accionTextoSecundario]}>Editar perfil <Ionicons name="ios-arrow-forward-circle" size={11} color="black" /></Text>
                  </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={() => {
                      setAbrirModal(false);
                      logueado ? navigation.navigate("Update", {id, logueado}) :
                      navigation.navigate("Login")
                    }}>
              <View style={styles.accion}>
                <Ionicons name="ios-location-sharp" size={35} color="black" style={styles.iconoAccion}/>
                <View style={styles.accionContenido}>
                  <Text style={[styles.letter2, styles.accionTextoPrimario]}>Direccción</Text>
                  <Text style={[styles.letter3, styles.accionTextoSecundario]}>Aquí puedes ver tu direccion asociada</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.accion}>
                <MaterialIcons name="category" size={31} color="black" style={styles.iconoAccion}/>
                <View style={styles.accionContenido}>
                  <TouchableOpacity onPress={()=>navigation.navigate('Categorias')}>
                  <Text style={[styles.letter2, styles.accionTextoPrimario]}>Listar por categorias</Text>
                  <Text style={[styles.letter3, styles.accionTextoSecundario]}>Aquí puedes ver los productos por categoría</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
            {logueado
              ?
              <TouchableOpacity onPress={()=>{
                setAbrirModal(false);
                setUsuario({});
                console.log(usuario)
                navigation.navigate("Inicio", {id: 0, logueado: false})
              }}>
                <View style={styles.accion}>
                  <Entypo name="log-out" size={31} color="black" style={styles.iconoAccion}/>
                  <View style={styles.accionContenido}>
                    <Text style={[styles.letter2, styles.accionTextoPrimario]}>Salir de la cuenta</Text>
                    <Text style={[styles.letter3, styles.accionTextoSecundario]}>Puedes cerrar tu sesión</Text>
                  </View>
                </View>
              </TouchableOpacity>
              : <></>
            }
          </View>
        </View>
      </Modal>

      {cargando
        ?<View style={styles.horizontal}>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
        :<ScrollView>
          <Text style ={[styles.letter, styles.textoPrincipal]}>Nuestros productos</Text>
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
      }
    </View>
  );
};

const styles = StyleSheet.create({
  principal: {
    backgroundColor: "#fffff",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  informacionUsuario: {
    alignItems: "center",
    flexDirection: "row",
    margin: "auto",
    marginTop: 40,
    marginBottom: 40
  },
  iconoAccion:{
    marginRight: 10
  },
  accionTextoPrimario: {
    fontSize: 22,
    color: "black"
  },
  accionTextoSecundario: {
    fontSize: 10
  },
  accion:{
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 20,
    alignItems: "center",
    marginBottom: 20
  },
  contenedorSalida: {
    borderBottomColor: "black",
  },
  contenedorModal:{
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    padding: 22,
    paddingTop: 40
  },
  textoPrincipal:{
    fontSize: 31,
    textAlign: "center",
    color: "black",
    marginTop: 20,
  },
  horizontal: {
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
    height: Dimensions.get('window').height
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
    margin: 'auto',
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
