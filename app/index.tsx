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
import { getUser } from './database/userQueries'; // Adjust the path to your user queries file
import { validateEmail, validatePassword } from './utils/validation';
import styles from './styles/login';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const navigation = useNavigation<any>();

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
      const user = await getUser(email, password);
      if (user) {
        navigation.navigate('(tabs)');
      } else {
        Alert.alert('Login Error', 'Invalid email or password');
      }
    } catch (error) {
      Alert.alert('Login Error', 'An error occurred during login');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require('./../assets/images/logo.png')}
          />
          <Text style={styles.welcomeText}>Welcome to GearGym!</Text>
          <Text style={styles.subText}>Please sign in to continue to GearGym</Text>

          <View style={styles.inputContainer}>
            <Image source={require('./../assets/images/ic_email.png')} style={styles.inputIcon} />
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
            <Image source={require('./../assets/images/ic_password.png')} style={styles.inputIcon} />
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
              onPress={() => setSelection(!isSelected)}
            >
              <View style={[styles.checkbox, isSelected && styles.checkboxSelected]} />
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
