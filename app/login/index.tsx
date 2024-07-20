import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import styles from './styles';
import { validateEmail, validatePassword } from '@/app/utils/validation';
import { useAuth } from '../utils/context/authContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation<any>();
  const { login } = useAuth();

  useEffect(() => {
    const loadRememberedEmail = async () => {
      const rememberedEmail = await SecureStore.getItemAsync('rememberedEmail');
      if (rememberedEmail) {
        setEmail(rememberedEmail);
        setRememberMe(true);
      }
    };

    loadRememberedEmail();
  }, []);

  useEffect(() => {
    setButtonEnabled(validateFields());
  }, [email, password]);

  const validateFields = () => {
    return validateEmail(email) && validatePassword(password);
  };

  const handleLogin = async () => {
    if (!validateFields()) {
      Alert.alert('Validation Error', 'Both fields are required.');
      return;
    }

    try {
      await login(email, password);
      if (rememberMe) {
        await SecureStore.setItemAsync('rememberedEmail', email);
      } else {
        await SecureStore.deleteItemAsync('rememberedEmail');
      }
      navigation.navigate('(tabs)');
    } catch (error) {
      Alert.alert('Login Error', 'Invalid email or password');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require('./../../assets/images/logo.png')}
          />
          <Text style={styles.welcomeText}>Welcome to GearGym!</Text>
          <Text style={styles.subText}>Please sign in to continue to GearGym</Text>

          <View style={styles.inputContainer}>
            <Image source={require('./../../assets/images/ic_email.png')} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              onBlur={() => setButtonEnabled(validateFields())}
            />
          </View>

          <View style={styles.inputContainer}>
            <Image source={require('./../../assets/images/ic_password.png')} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              onBlur={() => setButtonEnabled(validateFields())}
            />
          </View>

          <View style={styles.rememberMeContainer}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxSelected]} />
              <Text style={styles.rememberMeText}>Remember Me</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.signInButton, !isButtonEnabled && styles.disabledButton]}
            onPress={handleLogin}
            disabled={!isButtonEnabled}
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don’t have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('register')}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
