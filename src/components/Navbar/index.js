import React, { useEffect, useState } from "react"
import Block from '../../components/Block'
import Text from '../../components/Text'
import styles from './style'
import { AntDesign } from '@expo/vector-icons'; 










export const Navbar = ({back}) => {

 
  return (

      <Block row spaceBetween center style={styles.wrapper}>
        {back &&
        <AntDesign name="arrowleft" size={24} color="white" />}
      </Block>
  );
}