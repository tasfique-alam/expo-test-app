import React from "react"
import { TextInput } from 'react-native'
import styles from './style'
import { colors } from '../../styles/theme'


export const PrimaryTextInput = ({style, ...rest }) => {

  return (

    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={'rgba(0,0,0,0.4)'}
      {...rest}
    />

  );
}