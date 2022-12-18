import { StyleSheet } from 'react-native'
import { colors } from '../../styles/theme'

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.white,
        height: 57,
        paddingHorizontal: 20,
        paddingBottom: 4,
        elevation:4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.11,
        shadowRadius: 2.22,
        position: 'relative',
    },

});

export default styles;
