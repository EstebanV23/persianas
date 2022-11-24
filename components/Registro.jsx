import React, {useState} from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions, TextInput, Alert } from 'react-native'; 
import { FontAwesome, AntDesign } from '@expo/vector-icons';



const app = ({navigation})=>
{
    /* Imagen de fondo */
    const image = require('../images/Correo.jpg');
    
    const [nombre, setNombre] = useState("");//Nomrbe del usuario
    const [usuario, setUsuario] = useState("");//nombre de usuario del usuario
    const [password, setPassword] = useState("");//contraseña del usuario
    const [passwordVerifica, setPasswordVerifica] = useState("");//rectificacion de la contraseña del usuario
    const [listoVerificar, setListoVerificar] = useState(false);//Este boolean se utiliza para cuando presionemso el boton de registrar, se muestren mensajes debajo de los inputs comprobando si están bien o mal
    const [visibilidad, setVisibilidad] = useState(true);//rectificacion de la contraseña del usuario
    const[verificacionNom, setVerificacionNom] = useState(false);//Verificacion para el input nombre del usuario
    const[verificacionUsu, setVerificacionUsu] = useState(false);//Verificacion para el input nombre de usuario del usuario
    const[verificacionPas, setVerificacionPas] = useState(false);//Verificacion para que la contraseña no esté vacía
    const[verificacionIgu, setVerificacionIgu] = useState(false);//Verificacion para que sean iguales
    const[data, setData] = useState();//

    const verificacion = ()=>
    {
        const patronPassword = /\w{8,}/ //Comprueba que la contrasña tenga como mínimo 8 caracteres y que sean alfanumericos
        setListoVerificar(true);//Cambiamos el estado para que pueda mostrar los mensajes según correspondan
        setVerificacionNom(nombre.length > 0);//comprobamos la cantidad de caracteres sea mayor a 0
        setVerificacionUsu(usuario.length > 0);//comprobamos la cantidad de caracteres sea mayor a 0
        setVerificacionPas(patronPassword.test(password));//Verificacion de la contraseña cumpla con el patron
        setVerificacionIgu(password === passwordVerifica);//Verificacion para que las dos contraseñas sean iguales
        setData({
            "usuario": usuario,
            "password": password,
            "nombre": nombre,
            "correo": null
        })
        
        if(verificacionNom && verificacionPas && verificacionIgu && verificacionUsu){
            console.log(data);
            fetch('http://localhost:5000/api/usuario/add',{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
            }).then(response => console.log(response))
        }
    }
    
    return(
        <View style={styles.contenedorPrincipal}>
            {/* Imagen de fondo */}
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                {/* Espacio del boton para volver */}
                <View style={styles.contenedorVolver}>
                    {/* Boton de volver */}
                    <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={styles.botonVolver}>
                        {/* Icono para volver */}
                        <AntDesign name="arrowleft" size={32} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.contenedorInputs}>
                    <Text style={styles.titulo}>Registro</Text>
                    {/* Boton de volver al logeado */}
                    <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
                        <Text style={styles.texto}>Ya estás registrado? Inicia sesión aquí</Text>
                    </TouchableOpacity>
                    {/* Espacios para los input */}
                    {/* Input del nombre */}
                    <View>
                        <TextInput
                            onChangeText={setNombre}
                            placeholder="Nombre Completo"
                            style={styles.inputText}
                        />
                        {listoVerificar? verificacionNom ? <Text style={{color:'green'}}>Campo Correcto!</Text> : <Text style={{color:'red'}}>El campo no puede quedar vacio</Text>:<></>}
                    </View>
                    {/* Input del usuario */}
                    <View>
                        <TextInput
                            onChangeText={setUsuario}
                            placeholder="Nombre Completo"
                            style={styles.inputText}
                        />
                        {listoVerificar? verificacionUsu ? <Text style={{color:'green'}}>Campo Correcto!</Text> : <Text style={{color:'red'}}>El campo no puede quedar vacio</Text>:<></>}
                    </View>
                    {/* Input y boton de la password */}
                    <View>
                        <TouchableOpacity
                            style={styles.visualizar}
                            onPress={() => setVisibilidad(!visibilidad)}
                        >
                            {visibilidad ? <FontAwesome name="eye-slash" size={19} /> : <FontAwesome name="eye" size={19} />}
                        </TouchableOpacity>
                        <TextInput
                            secureTextEntry={visibilidad}
                            onChangeText={setPassword}
                            placeholder="Contraseña"
                            style={styles.inputText}
                        />
                        {listoVerificar? verificacionPas ? <Text style={{color:'green'}}>Campo Correcto!</Text> : <Text style={{color:'red'}}>Debe tener mínimo 8 caracteres</Text>:<></>}
                    </View>
                    {/* Input para la repeteicion dela contraseña */}
                    <View>
                        <TouchableOpacity
                            style={styles.visualizar}
                            onPress={() => setVisibilidad(!visibilidad)}
                        >
                            {visibilidad ? <FontAwesome name="eye-slash" size={19} /> : <FontAwesome name="eye" size={19} />}
                        </TouchableOpacity>
                        <TextInput
                            secureTextEntry={visibilidad}
                            onChangeText={setPasswordVerifica}
                            placeholder="Confirmar contraseña"
                            style={styles.inputText}
                        />
                        {listoVerificar? (verificacionIgu && verificacionPas) ? <Text style={{color:'green'}}>Campo Correcto!</Text> : <Text style={{color:'red'}}>Deben ser iguales</Text>:<></>}
                    </View>
                    <TouchableOpacity onPress={verificacion} style={{height: 0}}>
                        <Text style={styles.boton}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    image:{
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    boton: {
        backgroundColor: '#18253b',
        paddingTop: 9,
        paddingLeft: 17,
        paddingRight: 17,
        paddingBottom: 9,
        marginTop: 40,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
        borderRadius: 9,
        border: 'none',
        width: Dimensions.get('window').width - 90
    },
    visualizar: {
        border: 'none',
        position: 'absolute',
        top: 33,
        right: 20,
    },
    titulo:{
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20
    },
    texto:{
        fontWeight: '600',
        marginBottom: 70
    },
    botonVolver:{
        width: 0
    },
    contenedorVolver:{
        paddingTop: 30,
        paddingLeft: 20
    },
    contenedorInputs:{
        backgroundColor: 'white',
        marginTop: 30,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        borderTopStartRadius: 78,
        paddingTop: 80,
        alignItems: 'center',
    },
    inputText: {
        backgroundColor: '#dddcdc',
        paddingTop: 14,
        paddingLeft: 22,
        paddingRight: 22,
        paddingBottom: 14,
        fontSize: 13,
        marginTop: 20,
        color: '#18253b',
        borderRadius: 16,
        width: Dimensions.get('window').width - 90
    },
})

export default app