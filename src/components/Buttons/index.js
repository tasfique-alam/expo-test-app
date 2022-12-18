import React from "react";
import { TouchableOpacity, ActivityIndicator } from 'react-native'
import Text from '../Text'
import Block from '../Block'
import styles from './style'
import { colors } from '../../styles/theme'



export const PrimaryButton = ({ onPress, icon, count, disable, btnStyles, btnTextStyles, btnText, loading }) => {


  return (

    <TouchableOpacity onPress={onPress} disabled={disable} style={[styles.btnWrapper, btnStyles]}>
      <Block row center flex={false}>
        {loading ? <ActivityIndicator color={colors.white} /> :
          <Text style={[styles.btnText, btnTextStyles]}>{btnText}</Text>}
      </Block>
    </TouchableOpacity>

  );
}