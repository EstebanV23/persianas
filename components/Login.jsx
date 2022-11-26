/* Importaciones de reac y sus componentes */
import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, Dimensions, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import {FontAwesome} from '@expo/vector-icons';
import { useFonts } from "expo-font";

/* Traemos las imagenes que necesitamos utilizar */
const image = require('../images/Correo.jpg')
const logo = require('../images/Logo.jpg')

/* Funcion principal donde devuelve la vista */
export default ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'popin': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });
  const [usuarioPro, setUsuarioPro] = useState(""); //usuario provicional, que se obtiene del input
  const [passwordPro, setPasswordPro] = useState("");//password provicional, que se obtiene del input
  const [visibilidad, setVisibilidad] = useState(true);//Esta visivilidad se utiliza para cambiar el modo de contraseña oculta o a la vista
  const [data, setData] = useState();//Aqui es donde guardamos los datos de la base de datos Mongo
  const [cargando, setCargando] = useState(true);//Este useState se utiliza para saber el estado de la carga de datos recibidas por el servidor

  /* En el useEffect se mete laa petición fetch */
  useEffect(() => {
    const url = "http://localhost:5000/api/usuario/all"; //Url del servidor
    fetch(url)
      .then((response) => {
        return response.json();//Respuesta con un JSON
      }).then((data) => {
        console.log(data)//Visualizamos los datos por consola
        setData(data);//Enviamos los datos ya renderizados al useState creado
        setCargando(false);//Cambiamos el estado de la carga para seguir con la vista principal
      })
  }, []);

  /* Aquí validamos si la cargas se está haciendo, ya que cambia cuando el fetch se completa */
  if (cargando) {
    return (
      <View style={styles.horizontal}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }

  /* Funcion de loguearse, donde se comprueba los datos provisionales con los datos de la base de datos */
  const Loguearse = () => {
    for (const element of data) {
      console.log(element)
      const { _id, usuario, password } = element;
      if (usuario === usuarioPro && password === passwordPro) navigation.navigate('Inicio', {id:_id, logueado: true})
    }

  }


  /* Aquí comprobamos que la carga ya se haya hecho */
  if (!cargando) {
    return (
      <View style={styles.container}>
        {/* Contenedor con una imagen de fdondo */}
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.contenedorImagen}>
            {/* Logo flotante  */}
            <Image
              source={logo}
              style={styles.imagenPrincipal}
            />
          </View>
          <View style={styles.contenedorPrincipal}>
            <Text style={styles.textoPrincipal}>Login</Text>
            <View style={styles.contenedorInputs}>
              {/* Text input para el obtener el usuario provisional */}
              <TextInput
                style={[styles.inputText, styles.letra]}
                onChangeText={setUsuarioPro}
                value={usuarioPro}
                placeholder='Usuario'

              />
              {/* Text input para el obtener la contraseña provisional */}
              <TextInput
                secureTextEntry={visibilidad}
                textContentType='newPassword'
                style={[styles.inputText, styles.letra]}
                onChangeText={setPasswordPro}
                value={passwordPro}
                placeholder='Contraseña'
              />
              {/* Boton con un ojo para cambiar el modo de ver la contraseña */}
              <TouchableOpacity
                style={styles.visualizar}
                onPress={() => setVisibilidad(!visibilidad)}
              >
                {visibilidad ? <FontAwesome name="eye-slash" size={19}/> : <FontAwesome name="eye" size={19}/>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Loguearse()}>
                <Text style={[styles.boton, styles.letra]}>Iniciar Sesion</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Inicio", {id: 0, logueado: false})}>
                <Text style={[styles.boton, styles.letra]}>Cancelar</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contenedorTextos}>
              <TouchableOpacity><Text style={[styles.texto, styles.letra]}>Olvidó su contraseña?</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Registro')}><Text style={[styles.texto, styles.letra]}>Registrarse</Text></TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

/* Estilos de css para los componentes */
const styles = StyleSheet.create({

  container: {
    backgroundColor: '#23421cd',
    height: Dimensions.get('window').height,
  },
  letra:{
    fontFamily: 'popin'
  },  
  botone:{
    width: 0
  },
  image: {
    flex: 1,
    justifyContent: "end",
  },
  contenedorPrincipal: {
    alignItems: 'center',
    height: Dimensions.get('window').height - 200,
    backgroundColor: '#fff',
    borderTopEndRadius: 60,
    paddingTop: 50

  },
  contenedorInputs: {
    padding: 10,
    width: Dimensions.get('window').width - 80,
  },
  inputText: {
    backgroundColor: '#dddcdc',
    paddingTop: 9,
    paddingLeft: 17,
    paddingRight: 17,
    paddingBottom: 9,
    fontSize: 13,
    marginBottom: 20,
    color: '#18253b',
    borderRadius: 9,

  },
  contenedorImagen: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagenPrincipal: {
    height: 90,
    width: 90,
    borderRadius: 9,
  },
  textoPrincipal: {
    color: '#18253b',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  visualizar: {
    border: 'none',
    position: 'absolute',
    top: 78,
    right: 20,
  },
  ojo:{
    fontSize: 18,
  },
  boton: {
    backgroundColor: '#18253b',
    paddingTop: 9,
    paddingLeft: 17,
    paddingRight: 17,
    paddingBottom: 9,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    borderRadius: 9,
    border: 'none'
  },
  contenedorTextos: {
    alignItems: 'center',
  },
  texto: {
    color: '#666565',
    marginBottom: 10,
    textAlign: 'center',
    textDecorationColor: '#666565',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    padding: 0,
  },
  contenedorMensaje: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mensaje: {
    fontSize: 30
  },
  horizontal: {
    alignItems: "center",
    padding: 10,
    justifyContent: "center",
    height: Dimensions.get('window').height
  }

});
