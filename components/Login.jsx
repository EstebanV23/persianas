import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, Dimensions, Image, TouchableOpacity, ActivityIndicator } from "react-native";


const image = require('../images/Correo.jpg')
const logo = require('../images/Logo.jpg')
const ver = require('../images/ver.png')


export default ({navigation}) =>
{
    const [usuarioo, setUsuario] = useState("");
    const [passwordd, setPassword] = useState("");
    const [visibilidad, setVisibilidad] = useState(true);
    const [data, setData] = useState();
    const [cargando, setCargando] = useState(true);


    useEffect(() =>{
        const url = "http://localhost:5000/api/usuarios";
        fetch(url)
        .then((response)=>{
            return response.json();
        }).then((data)=>
        {
            console.log(data)
            setData(data);
            setCargando(false);
        })
    },[]);

    if(cargando){
        return(
            <View style={styles.horizontal}>
                <ActivityIndicator size="small" color="#0000ff" />
            </View>
        );
    }

    const Loguearse = () =>
    {
        for (const element of data) 
        {
            console.log(element)
            const {usuario, password} = element;
            if(usuario  === usuarioo && password === passwordd) navigation.navigate('Pantalla Principal')
            
        }
        
    }

    

    if(!cargando)
    {
        return(
            <View style= {styles.container}>
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                    <View style={styles.contenedorImagen}>
                        <Image
                            source={logo}
                            style={styles.imagenPrincipal}
                        />
                    </View>
                    <View style={styles.contenedorPrincipal}>
                        <Text style={styles.textoPrincipal}>Login</Text>
                        <View style={styles.contenedorInputs}>
                            <TextInput
                                style={styles.inputText}
                                onChangeText={setUsuario}
                                value={usuarioo}
                                placeholder='Usuario'
                                
                                />
                            <TextInput
                                secureTextEntry={visibilidad}
                                textContentType='newPassword'
                                style={styles.inputText}
                                onChangeText={setPassword}
                                value={passwordd}
                                placeholder='Contraseña'
                            />
                            <TouchableOpacity 
                                style={styles.visualizar}
                                onPress={() => setVisibilidad(!visibilidad)}
                            >
                                <ImageBackground source={ver} resizeMode="cover" style={styles.image}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Loguearse()}>
                                <Text style={styles.boton}>Iniciar Sesion</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.contenedorTextos}>
                            <TouchableOpacity><Text style={styles.texto}>Olvidó su contraseña?</Text></TouchableOpacity>
                            <TouchableOpacity><Text style={styles.texto}>Registrarse</Text></TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    container :{
        backgroundColor: '#23421cd',
        height: Dimensions.get('window').height,
    },
    image :{
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
        bottom: 112,
        right: 20,
        width: 20,
        height: 20
    },
    boton: {
        backgroundColor: '#18253b',
        paddingTop: 9,
        paddingLeft: 17,
        paddingRight: 17,
        paddingBottom: 9,
        marginBottom: 40,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        borderRadius: 9,
        border: 'none'
    },
    contenedorTextos:{
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
