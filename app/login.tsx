import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckBox from '@react-native-community/checkbox';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [isSelected, setSelection] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('./../assets/images/logo.png')} // Adjust the path to your logo image
        />
        <Text style={styles.welcomeText}>Welcome back, John!</Text>
        <Text style={styles.subText}>Please sign in to continue to GearGym</Text>

        <View style={styles.inputContainer}>
          <Image source={require('./../assets/images/ic_email.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Image source={require('./../assets/images/ic_password.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            secureTextEntry={true}
          />
        </View>

        <View style={styles.rememberMeContainer}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
          />
          <Text style={styles.rememberMeText}>Remember Me</Text>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don’t have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.signUpLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    paddingHorizontal: 10,
  },
  inputIcon: {
    width: 24,
    height: 24,
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
  checkbox: {
    marginRight: 10,
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
