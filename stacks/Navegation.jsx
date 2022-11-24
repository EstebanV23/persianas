import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Login from '../components/Login';
import Registro from '../components/Registro';
import PantallaPrincipal from '../components/PantallaPrincipal';
import Inicio from '../components/Inicio';

const Stack = createNativeStackNavigator();

const Navegation = () =>
{
    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen
                    name = 'Inicio'
                    component={Inicio}
                />
                <Stack.Screen
                    name = 'Registro'
                    component={Registro}
                />
                    <Stack.Screen
                        name = 'Pantalla Principal'
                        component={PantallaPrincipal}
                    />
                <Stack.Screen
                    name = 'Login'
                    component={Login}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navegation