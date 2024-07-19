// app/screens/SignUpScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { register } from './api/auth'; // Import the register function
import { validateForm } from './utils/validation'; 
import styles from './styles/register';

const { width, height } = Dimensions.get('window');

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const navigation = useNavigation<any>();

  useEffect(() => {
    setIsFormValid(validateForm(name, email, password, repeatPassword, isChecked));
  }, [name, email, password, repeatPassword, isChecked]);

  const handleSignUp = async () => {
    if (!isFormValid) {
      Alert.alert('Validation Error', 'Please fill in all fields correctly.');
      return;
    }

    try {
      const userData = await register(name, email, password);
      Alert.alert('Success', 'User registered successfully');
      navigation.navigate('login'); // Navigate to login screen or any other screen after successful registration
    } catch (error) {
      Alert.alert('Registration Error', 'Failed to register user');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/images/ic_up_button.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Image style={styles.logo} source={require('../assets/images/logo.png')} />
        <Text style={styles.signUpText}>SIGN UP NOW</Text>
        <Text style={styles.subText}>Please sign up to continue to GearGym!</Text>

        <View style={styles.inputContainer}>
          <Image source={require('../assets/images/ic_user.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image source={require('../assets/images/ic_email.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image source={require('../assets/images/ic_password.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image source={require('../assets/images/ic_password.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Repeat password"
            secureTextEntry={true}
            value={repeatPassword}
            onChangeText={setRepeatPassword}
          />
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

        <TouchableOpacity style={[styles.signUpButton, !isFormValid && { backgroundColor: '#cccccc' }]} disabled={!isFormValid} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
