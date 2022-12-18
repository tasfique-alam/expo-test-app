import React from "react"
import { TextInput } from 'react-native'
import styles from './style'
import { colors } from '../../styles/theme'


export const PrimaryTextInput = ({style, ...rest }) => {

  return (

    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={'black'}
      {...rest}
    />

  );
}