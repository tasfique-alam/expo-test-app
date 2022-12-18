import { StyleSheet } from 'react-native'
import { colors } from '../../styles/theme'

const styles = StyleSheet.create({
    input:{
        backgroundColor:colors.inputColor,
        height:40,
        width:'100%',
        paddingHorizontal:20,
        fontSize:12,
        color:'black',
        borderRadius:5,
        marginBottom:16
    },
});

export default styles;
