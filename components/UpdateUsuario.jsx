import React from "react";
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions, TextInput } from "react-native";
import { FontAwesome, Entypo, MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons"
import { useFonts } from "expo-font";

export default ({navigation, route}) =>
{
    const [fontsLoaded] = useFonts({
        'popin': require('../assets/fonts/Poppins-SemiBold.ttf'),
    });
    console.log(route.params)
    const { id, logueado } = route.params || {id: '63824b1f09d53692f8f7ee68', logueado: true};
    const [datos, setDatos] = useState();//Aqui es donde guardamos los datos de la base de datos Mongo
    const [cargando, setCargando] = useState(true);//Este useState se utiliza para saber el estado de la carga de datos recibidas por el servidor
    const [nuevoUsuario, setNuevoUsuario] = useState("")//Creamos un useState para guardar el valor traido de la base de datos y mostrarlo como una información anterior
    const [nuevoNombre, setNuevoNombre] = useState("")//Creamos un useState para guardar el valor traido de la base de datos y mostrarlo como una información anterior
    const [nuevoCorreo, setNuevoCorreo] = useState("")//useState para tomar el valor del curso y si desea actualizarlo
    const [nuevaDireccion, setNuevaDireccion] = useState("");//useState para tomar el valor del curso y si desea actualizarlo
    const [nuevaData, setNuevaData] = useState({});//]
    
    /* En el useEffect se mete la petición fetch */
    console.log(logueado)
    useEffect(() => {
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
    }, [logueado])

    
    
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
            <View style={styles.nav}>
                <TouchableOpacity onPress={() => navigation.navigate("Inicio", {id: id, logueado: true})}>
                    <Entypo name="back" size={30} color="white" />
                </TouchableOpacity>

                <Text style={[styles.letter, styles.letra]}>Vico's</Text>
                <View style={styles.posicion}>
                    <TouchableOpacity>
                        <FontAwesome5 name="search" size={22} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome5 name="shopping-cart" size={22} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <View styles={[styles.contenedorNombre]}>
                <Text style={[styles.letra, styles.subTitle]}>  BIENVENIDO</Text>
                <Text style={[styles.letra, styles.title]}>{datos.usuario.toUpperCase()}</Text>
            </View>
            <View style={styles.contenedorInformacion}>
                <View styles={styles.contenedorInputs}>
                    <View style={styles.contenedorInput}>
                        <Text style={styles.letra}>Nombre:</Text>
                        <TextInput
                            onChangeText={setNuevoNombre}
                            value={nuevoNombre}
                            style={[styles.letra, styles.input]}
                        />
                        <Entypo name="user" size={24} color="black" style={styles.iconoInput}/>
                    </View>
                    <View style={styles.contenedorInput}>
                        <Text style={styles.letra}>Usuario:</Text>
                        <TextInput
                            onChangeText={setNuevoUsuario}
                            value={nuevoUsuario}
                            style={[styles.letra, styles.input]}
                        />
                        <FontAwesome name="user" size={24} color="black" style={styles.iconoInput}/>
                    </View>
                    <View style={styles.contenedorInput}>
                        <Text style={styles.letra}>Correo:</Text>
                        <TextInput
                            onChangeText={setNuevoCorreo}
                            value={nuevoCorreo}
                            style={[styles.letra, styles.input]}
                        />
                        <MaterialIcons name="email" size={24} color="black" style={styles.iconoInput}/>
                    </View>
                    <View style={styles.contenedorInput}>
                        <Text style={styles.letra}>Direccion:</Text>
                        <TextInput
                            onChangeText={setNuevaDireccion}
                            value={nuevaDireccion}
                            style={[styles.letra, styles.input]}
                        />
                        <Ionicons name="location-sharp" size={24} color="black" style={styles.iconoInput}/>
                    </View>
                    <TouchableOpacity onPress={actualizar}>
                        <Text style={styles.boton}>Actualizar datos</Text>
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
        paddingLeft: 38,
        paddingRight: 22,
        paddingBottom: 14,
        fontSize: 13,
        marginBottom: 20,
        color: '#18253b',
        borderRadius: 16,
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
    iconoInput:{
        position: 'absolute',
        bottom: 33,
        left: 10,
    },
    contenedorInformacion:{
        padding: 30,
    },
    contenedorNombre:{
        marginTop: 40,
    },
    contenedorInputs:{
        padding: 80,
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