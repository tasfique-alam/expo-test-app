import { StyleSheet } from 'react-native'
import { colors } from '../../styles/theme'

const styles = StyleSheet.create({
    btnWrapper: {
        backgroundColor: colors.primary,
        height: 50,
        borderRadius:5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText:{
        fontSize:14,
        color:colors.white,
        fontFamily:'Gilroy-Bold',
        textTransform:'uppercase'
    },
});

export default styles;
