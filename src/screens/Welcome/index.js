import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native";
import Block from "../../components/Block";
import Text from "../../components/Text"
import { colors } from "../../styles/theme";





export default Welcome = ({ navigation }) => {



  return (

    <Block block center padding={[20]}>
      <Text color={colors.primary} size={20} bold>User Analyzer</Text>
      <Text style={styles.decs}>Select filters to generate report</Text>

      <Block style={styles.inputArea}>
        <Text>Date</Text>
      </Block>
    </Block>

  );
}

const styles = StyleSheet.create({
  decs: {
    marginTop: 10,
    color: colors.inputTextColor
  },
  inputArea:{
    borderWidth:1,
    borderColor:colors.primary,
    width:'100%'
  },
});