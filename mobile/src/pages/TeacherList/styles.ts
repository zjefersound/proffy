import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0F0F7',
        flex: 1,
    },
    teacherList: {
        marginTop: -40,
    },

    //search
    searchForm: {
        marginBottom: 16,
    },
    inputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputBlock: {
        width: "48%"
    },  
    submitButton: {
        backgroundColor: '#04d361',
        flexDirection: 'row',
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitButtonText: {
        color: '#FFF',
        fontFamily: 'Archivo_700Bold',
        marginLeft: 12
    },
    // end search
    
    //input
    label: {
        color: '#d4c2ff',
        fontFamily: 'Poppins_400Regular',
    },
    input: {
        height: 54,
        borderRadius: 8,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        paddingHorizontal: 16,
        marginTop: 4,
        marginBottom: 16,
    },
    //fim input

});

export default styles;