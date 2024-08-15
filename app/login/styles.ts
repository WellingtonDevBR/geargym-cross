import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 160,
    height: 160,
    marginTop: 25,
  },
  welcomeText: {
    fontSize: 24,
    color: '#333333',
    fontWeight: 'bold',
    marginTop: 25,
  },
  subText: {
    fontSize: 16,
    color: '#80333333',
    marginTop: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    marginTop: 20,
    width: width - 40,
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
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: width - 40,
    justifyContent: 'space-between',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#434343',
    borderRadius: 3,
    marginRight: 10,
  },
  checkboxSelected: {
    backgroundColor: '#9747FF',
  },
  rememberMeText: {
    fontSize: 14,
    color: '#434343',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#434343',
    fontWeight: 'bold',
  },
  signInButton: {
    backgroundColor: '#9747FF',
    borderRadius: 8,
    width: width - 40,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  signUpText: {
    fontSize: 14,
    color: '#434343',
  },
  signUpLink: {
    fontSize: 14,
    color: '#434343',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
