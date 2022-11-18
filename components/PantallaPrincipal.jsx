import React from "react";
import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";

export default ({navigation}) =>
{
    return (
        <View>
            <Text>HOLAAAAAAAAA</Text>
            <TouchableOpacity 
                style={styles.boton} 
                onPress={() =>{
                    navigation.navigate('Login')
                }}
            >
                <Text style={styles.color}>
                    Ir al login
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    centrar: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'centet',
    },
    elimin:{
        display: 'none'
    },
    boton: {
        backgroundColor: '#18253b',
        paddingTop: 9,
        paddingLeft: 17,
        paddingRight: 17,
        paddingBottom: 9,
        marginBottom: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14,
        borderRadius: 9,
        border: 'none'
    },
    color:{
        color: 'white',
    },
});