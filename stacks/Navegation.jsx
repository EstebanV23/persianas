
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Login from '../components/Login';
import Registro from '../components/Registro';
import UpdateUsuario from '../components/UpdateUsuario';
import Inicio from '../components/Inicio';

const Stack = createNativeStackNavigator();

const Navegation = () =>
{
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name = 'Login'
                    component={Login}
                />
                <Stack.Screen
                    name = 'Inicio'
                    component={Inicio}
                />
                <Stack.Screen
                    name = 'Registro'
                    component={Registro}
                />
                <Stack.Screen
                    name = 'Update'
                    component={UpdateUsuario}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default Navegation;
