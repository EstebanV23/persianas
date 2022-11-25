import React from "react";
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions, TextInput } from "react-native";
import { useFonts } from "expo-font";

export default ({navigation, route}) =>
{
    const [fontsLoaded] = useFonts({
        'popin': require('../assets/fonts/Poppins-SemiBold.ttf'),
    });
    console.log(route.params)
    const { id, logueado } = route.params || {id: '63778ef65e7e92d81d3bf29a', logueado: true};
    const [datos, setDatos] = useState();//Aqui es donde guardamos los datos de la base de datos Mongo
    const [cargando, setCargando] = useState(true);//Este useState se utiliza para saber el estado de la carga de datos recibidas por el servidor
    const [nuevoUsuario, setNuevoUsuario] = useState("")//Creamos un useState para guardar el valor traido de la base de datos y mostrarlo como una información anterior
    const [nuevoNombre, setNuevoNombre] = useState("")//Creamos un useState para guardar el valor traido de la base de datos y mostrarlo como una información anterior
    const [nuevoCorreo, setNuevoCorreo] = useState("")//useState para tomar el valor del curso y si desea actualizarlo
    const [nuevaDireccion, setNuevaDireccion] = useState("");//useState para tomar el valor del curso y si desea actualizarlo

    
    /* En el useEffect se mete laa petición fetch */
    console.log(logueado)
    useEffect(() => {
        if (logueado) {
            const url = `http://localhost:5000/api/usuario/${id}`; //Url del servidor

            fetch(url)
            .then((response) => {
                return response.json();//Respuesta con un JSON
            }).then((data) => {
                console.log(data);//Visualizamos los datos por consola
                setDatos(data);//Enviamos los datos ya renderizados al useState creado
                setCargando(false)
            })
            .catch(e => console.log("Error: " + e.message));
        }
        else 
        setTimeout(() => {
            setCargando(false)
        }, 2000);
    }, [logueado])
    
    
    /* Aquí validamos si la cargas se está haciendo, ya que cambia cuando el fetch se completa */
    if (cargando) {
        return (
            <View style={styles.horizontal}>
                <ActivityIndicator size="small" color="#0000ff" />
            </View>
        );
    }
    
    console.log(datos)
    setNuevoCorreo(datos.nombre)
    console.log(nuevaDireccion)
    console.log(nuevoCorreo)
    console.log(nuevoUsuario)
    console.log(nuevoNombre)
    if(!logueado)
    {
        return (
            <View style={styles.noValidado}>
                <TouchableOpacity onPress={()=> navigation.navigate('Registro')}>
                    <Text style={[styles.boton, styles.letra]}>Crear una cuenta</Text>
                </TouchableOpacity>
                <Text style={[styles.letra, {textAlign:"center"}]}>Aún no tienes una cuenta creada, crea una presionando el botón</Text>
            </View>
        )
    }
    return (
        <View>
            <View styles={[styles.contenedorNombre]}>
                <Text style={[styles.letra, styles.subTitle]}>  BIENVENIDO</Text>
                <Text style={[styles.letra, styles.title]}>{datos.usuario.toUpperCase()}</Text>
            </View>
            <View style={styles.contenedorInformacion}>
                <View styles={styles.contenedorInputs}>
                    <TextInput
                        onChangeText={setNuevoNombre}
                        value={nuevoNombre}
                        style={[styles.letra, styles.input]}
                        placeholder="Nombre"
                    />
                    <TextInput
                        onChangeText={setNuevoNombre}
                        value={nuevoNombre}
                        style={[styles.letra, styles.input]}
                        placeholder="Usuario"
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    input: {
        backgroundColor: '#dddcdc',
        paddingTop: 14,
        paddingLeft: 22,
        paddingRight: 22,
        paddingBottom: 14,
        fontSize: 13,
        marginTop: 20,
        color: '#18253b',
        borderRadius: 16,
    },
    contenedorInformacion:{
        backgroundColor: 'aqua'
    },
    contenedorInputs:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    contenedorNombre:{
        marginTop: 40,
    },
    subTitle:{
        fontSize: 20,
        marginTop: 40,
        textAlign: 'center',
        fontWeight: 'light'
    },
    title:{
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'darkblue'
    },
    letra:{
        fontFamily: 'popin'
    },
    boton: {
        backgroundColor: '#18253b',
        paddingTop: 9,
        color: '#fff',
        paddingLeft: 17,
        paddingRight: 17,
        paddingBottom: 9,
        marginTop: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14,
        borderRadius: 9,
        border: 'none',
        width: '80%',
        alignSelf: 'center',
    },
    horizontal: {
        alignItems: "center",
        padding: 10,
        justifyContent: "center",
        height: Dimensions.get('window').height
    }
});