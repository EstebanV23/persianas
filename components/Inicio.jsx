import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { useFonts } from "expo-font";
import { FontAwesome5 } from '@expo/vector-icons';


const producto = [{}];

export default ({ navigation }) => {
    const [fontsloaded] = useFonts ({
        "popins": require("../assets/fonts/Poppins-BoldItalic.ttf")
    })

  return (
    <View style={styles.principal}>
      <View style={styles.nav}>
        <Text style={styles.letter}>
            Vico's
        </Text>
        <TouchableOpacity>
        <FontAwesome5 name="search" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
        <FontAwesome5 name="shopping-cart" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  principal: {
    backgroundColor: "#131e2f",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  letter: {
    color: 'white',
    fontFamily: 'popins',
    


  },
});
