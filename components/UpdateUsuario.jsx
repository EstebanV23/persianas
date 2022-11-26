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
    const { id, logueado } = route.params || {id: '0', logueado: false};
    const [datos, setDatos] = useState();//Aqui es donde guardamos los datos de la base de datos Mongo
    const [cargando, setCargando] = useState(true);//Este useState se utiliza para saber el estado de la carga de datos recibidas por el servidor
    const [nuevoUsuario, setNuevoUsuario] = useState("")//Creamos un useState para guardar el valor traido de la base de datos y mostrarlo como una información anterior
    const [nuevoNombre, setNuevoNombre] = useState("")//Creamos un useState para guardar el valor traido de la base de datos y mostrarlo como una información anterior
    const [nuevoCorreo, setNuevoCorreo] = useState("")//useState para tomar el valor del curso y si desea actualizarlo
    const [nuevaDireccion, setNuevaDireccion] = useState("");//useState para tomar el valor del curso y si desea actualizarlo
    const [nuevaData, setNuevaData] = useState({});//]
    
    /* En el useEffect se mete la petición fetch */
    console.log(logueado)
    /* useEffect(() => {
        if (logueado) {
            let url = `http://localhost:5000/api/usuario/${id}`; //Url del servidor

            fetch(url)
            .then((response) => {
                return response.json();//Respuesta con un JSON
            }).then((data) => {
                console.log(data);//Visualizamos los datos por consola
                setDatos(data);//Enviamos los datos ya renderizados al useState creado
                setNuevoUsuario(data.usuario)
                setNuevoNombre(data.nombre)
                setNuevoCorreo(data.correo || "")
                setNuevaDireccion(data.direccion || "")
                setCargando(false)
            })
            .catch(e => console.log("Error: " + e.message));
        }
        else 
        setTimeout(() => {
            setCargando(false)
        }, 2000);
    }, [logueado]) */

    if (logueado) {
        let url = `http://localhost:5000/api/usuario/${id}`; //Url del servidor

        fetch(url)
        .then(async(response) => {
            return response.json();//Respuesta con un JSON
        }).then(async data => {
            console.log(data);//Visualizamos los datos por consola
            setDatos(data);//Enviamos los datos ya renderizados al useState creado
            setNuevoUsuario(data.usuario)
            setNuevoNombre(data.nombre)
            setNuevoCorreo(data.correo || "")
            setNuevaDireccion(data.direccion || "")
            setCargando(false)
        })
        .catch(e => console.log("Error: " + e.message));
    }
    else 
    setTimeout(() => {
        setCargando(false)
    }, 2000);
    
    
    /* Aquí validamos si la cargas se está haciendo, ya que cambia cuando el fetch se completa */
    if (cargando) {
        return (
            <View style={styles.horizontal}>
                <ActivityIndicator size="small" color="#0000ff" />
            </View>
        );
    }
    
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

    const actualizar = async() =>
    {
        setNuevaData({
            nombre: nuevoNombre,
            usuario: nuevoUsuario,
            correo: nuevoCorreo,
            direccion: nuevaDireccion
        })
        await fetch(`http://localhost:5000/api/usuario/update/${id}`,{
            method: "PUT",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify(nuevaData)
        })
        .then(response =>
        {
            return response.json()
        })
        .then(data=>{
            console.log(data)
        })
        navigation.navigate("Update", {id: id, logueado: true})
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
                        onChangeText={setNuevoUsuario}
                        value={nuevoUsuario}
                        style={[styles.letra, styles.input]}
                        placeholder="Usuario"
                    />
                    <TextInput
                        onChangeText={setNuevoCorreo}
                        value={nuevoCorreo}
                        style={[styles.letra, styles.input]}
                        placeholder="Correo"
                    />
                    <TextInput
                        onChangeText={setNuevaDireccion}
                        value={nuevaDireccion}
                        style={[styles.letra, styles.input]}
                        placeholder="Direccion"
                    />
                    <TouchableOpacity onPress={actualizar}>
                        <Text>Actualizar datos</Text>
                    </TouchableOpacity>
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