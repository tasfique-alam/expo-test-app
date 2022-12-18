import { StyleSheet } from 'react-native'
import { colors } from '../../styles/theme'

const styles = StyleSheet.create({
    input:{
        backgroundColor:colors.white,
        height:40,
        width:'80%',
        paddingHorizontal:20,
        fontSize:12,
        color:'black',
        borderColor:colors.primary,
        borderWidth:1,
        borderRadius:5,
        marginBottom:16
    },
});

export default styles;
