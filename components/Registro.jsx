import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions, TextInput, Alert, ActivityIndicator } from 'react-native'; 
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useFonts } from "expo-font";



const App = ({navigation})=>
{
    const [fontsLoaded] = useFonts({
        'popin': require('../assets/fonts/Poppins-SemiBold.ttf'),
      });
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
    const[replica, setReplica] = useState(false);//
    const[data, setData] = useState();//

    const [usuarios, setUsuarios] = useState();//Aqui es donde guardamos los datos de la base de datos Mongo
    const [cargando, setCargando] = useState(true);//Este useState se utiliza para saber el estado de la carga de datos recibidas por el servidor
  
    /* En el useEffect se mete laa petición fetch */
    useEffect(() => {
      const url = "http://localhost:5000/api/usuario/all"; //Url del servidor
      fetch(url)
        .then((response) => {
          return response.json();//Respuesta con un JSON
        }).then((data) => {
          console.log(data)//Visualizamos los datos por consola
          setUsuarios(data);//Enviamos los datos ya renderizados al useState creado
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

    const agregarUsuario = () =>
    {
        console.log(data);
        fetch('http://localhost:5000/api/usuario/add',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => console.log(response))
        /* Reseteo los valores */
        setNombre('');
        setUsuario('');
        setPassword('');
        setPasswordVerifica('');
        setListoVerificar(false);
        navigation.navigate('Login')
    }

    const repetido = () =>
    {
        setReplica(true);
    }
    
    const verificacion = ()=>
    {
        const patronPassword = /\w{8,}/ //Comprueba que la contrasña tenga como mínimo 8 caracteres y que sean alfanumericos
        setListoVerificar(true);//Cambiamos el estado para que pueda mostrar los mensajes según correspondan
        setVerificacionNom(nombre.length > 0);//comprobamos la cantidad de caracteres sea mayor a 0
        setVerificacionUsu(usuario.length > 0);//comprobamos la cantidad de caracteres sea mayor a 0
        setVerificacionPas(patronPassword.test(password));//Verificacion de la contraseña cumpla con el patron
        setVerificacionIgu(password === passwordVerifica);//Verificacion para que las dos contraseñas sean iguales
        
        /* Agregamos los datos a un objeto para enviarlo a la base de datos  */
        setData({
            "usuario": usuario,
            "password": password,
            "nombre": nombre,
        })

        fetch('http://localhost:5000/api/usuario/all')
        .then(response => {return response.json()})
        .then();
        

        usuarios.forEach(element=>{
            
            if(element.usuario.toUpperCase() === usuario.toUpperCase()) repetido();
        })
        
        if(verificacionNom && verificacionPas && verificacionIgu && verificacionUsu && !replica)
        {
            agregarUsuario();
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
                    <TouchableOpacity onPress={()=> navigation.navigate("Login")} style={styles.botonTexto}>
                        <Text style={styles.texto}>Ya estás registrado? Inicia sesión aquí</Text>
                    </TouchableOpacity>
                    {/* Espacios para los input */}
                    {/* Input del nombre */}
                    <View>
                        <TextInput
                            onChangeText={setNombre}
                            placeholder="Nombre Completo"
                            style={[styles.inputText, styles.letra]}
                            value={nombre}
                        />
                        {listoVerificar? verificacionNom ? <Text style={[{color:'green'}, styles.letra]}>Campo Correcto!</Text> : <Text style={[{color:'red'}, styles.letra]}>El campo no puede quedar vacio</Text>:<></>}
                    </View>
                    {/* Input del usuario */}
                    <View>
                        <TextInput
                            onChangeText={setUsuario}
                            placeholder="Usuario"
                            style={[styles.inputText, styles.letra]}
                            value={usuario}
                        />
                        {listoVerificar? verificacionUsu ? <Text style={[{color:'green'}, styles.letra]}>Campo Correcto!</Text> : <Text style={[{color:'red'}, styles.letra]}>El campo no puede quedar vacio</Text>:<></>}
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
                            style={[styles.inputText, styles.letra]}
                            value={password}
                        />
                        {listoVerificar? verificacionPas ? <Text style={[{color:'green'}, styles.letra]}>Campo Correcto!</Text> : <Text style={[{color:'red'}, styles.letra]}>Debe tener mínimo 8 caracteres</Text>:<></>}
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
                            style={[styles.inputText, styles.letra]}
                            value={passwordVerifica}
                        />
                        {listoVerificar? (verificacionIgu && verificacionPas) ? <Text style={[{color:'green'}, styles.letra]}>Campo Correcto!</Text> : <Text style={[{color:'red'}, styles.letra]}>Deben ser iguales</Text>:<></>}
                    </View>
                    <TouchableOpacity onPress={verificacion} style={{height: 0}}>
                        <Text style={[styles.boton, styles.letra]}>Registrarse</Text>
                    </TouchableOpacity>
                    {replica ? <Text style={[{color:'red', marginTop: 10}, styles.letra]}>El nombre de usuario ya existe</Text> : <></>}
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
    letra:{
        fontFamily: 'popin'
    },
    botonTexto:{
        height: 0,
        marginBottom: 70
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
    horizontal: {
        alignItems: "center",
        padding: 10,
        justifyContent: "center",
        height: Dimensions.get('window').height
    }
})

export default App