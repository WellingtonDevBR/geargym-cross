import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    scrollViewContent: {
      alignItems: 'center',
      padding: 16,
    },
    backButton: {
      alignSelf: 'flex-start',
      marginTop: 40,
      marginLeft: 20,
    },
    backIcon: {
      width: 24,
      height: 24,
      tintColor: '#000000',
    },
    logo: {
      width: 122,
      height: 122,
    },
    signUpText: {
      fontSize: 24,
      color: '#333333',
      fontWeight: 'bold',
      marginTop: 26,
    },
    subText: {
      fontSize: 16,
      color: '#80333333',
      marginTop: 16,
      textAlign: 'center',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#CCCCCC',
      borderRadius: 8,
      marginTop: 10,
      width: width - 72,
      height: 50,
      paddingHorizontal: 10,
    },
    inputIcon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: '#333333',
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      width: width - 72,
    },
    checkboxWrapper: {
      marginRight: 10,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: '#434343',
      borderRadius: 3,
    },
    checkedCheckbox: {
      backgroundColor: '#9747FF',
    },
    checkboxText: {
      fontSize: 14,
      color: '#434343',
    },
    termsText: {
      fontSize: 14,
      color: '#434343',
      fontWeight: 'bold',
    },
    signUpButton: {
      backgroundColor: '#9747FF',
      borderRadius: 8,
      width: width - 72,
      height: 52,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
    signUpButtonText: {
      fontSize: 16,
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
});
  