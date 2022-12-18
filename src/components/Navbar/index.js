import React, { useEffect, useState } from "react"
import Block from '../../components/Block'
import Text from '../../components/Text'
import styles from './style'
import { AntDesign } from '@expo/vector-icons'; 
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";










export const Navbar = ({back}) => {

  const navigation = useNavigation()
 
  return (

      <Block row spaceBetween center style={styles.wrapper}>
        {back &&
        <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>}
      </Block>
  );
}