import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function SignUpScreen() {
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('./../assets/images/ic_up_button.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Image style={styles.logo} source={require('./../assets/images/logo.png')} />
        <Text style={styles.signUpText}>SIGN UP NOW</Text>
        <Text style={styles.subText}>Please sign up to continue to GearGym!</Text>

        <View style={styles.inputContainer}>
          <Image source={require('./../assets/images/ic_user.png')} style={styles.inputIcon} />
          <TextInput style={styles.input} placeholder="Enter user name" />
        </View>

        <View style={styles.inputContainer}>
          <Image source={require('./../assets/images/ic_email.png')} style={styles.inputIcon} />
          <TextInput style={styles.input} placeholder="Enter email" keyboardType="email-address" />
        </View>

        <View style={styles.inputContainer}>
          <Image source={require('./../assets/images/ic_password.png')} style={styles.inputIcon} />
          <TextInput style={styles.input} placeholder="Enter password" secureTextEntry={true} />
        </View>

        <View style={styles.inputContainer}>
          <Image source={require('./../assets/images/ic_password.png')} style={styles.inputIcon} />
          <TextInput style={styles.input} placeholder="Repeat password" secureTextEntry={true} />
        </View>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => setIsChecked(!isChecked)} style={styles.checkboxWrapper}>
            <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]} />
          </TouchableOpacity>
          <Text style={styles.checkboxText}>I agree to</Text>
          <TouchableOpacity>
            <Text style={styles.termsText}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
