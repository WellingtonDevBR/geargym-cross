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
import { useNavigation, NavigationProp } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import styles from './styles';
import { validateEmail, validatePassword } from '@/app/utils/validation';
import { auth } from '../firebaseConfig';  // Import Firebase Auth
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase Auth function for sign in

// Define navigation type
type RootStackParamList = {
  register: undefined;
  '(tabs)': undefined;
};

export default function LoginScreen() {
  // State management for form inputs and button state
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isButtonEnabled, setButtonEnabled] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  // Access the navigation
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Load remembered email when the component mounts
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

  // Enable or disable the login button based on field validation
  useEffect(() => {
    setButtonEnabled(validateFields());
  }, [email, password]);

  // Validate email and password fields
  const validateFields = (): boolean => {
    return validateEmail(email) && validatePassword(password);
  };

  // Handle the login process using Firebase Authentication
  const handleLogin = async () => {
    if (!validateFields()) {
      Alert.alert('Validation Error', 'Both fields are required.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        handleRememberMe();
        navigation.reset({
          index: 0,
          routes: [{ name: '(tabs)' }], // Ensure it navigates to the root of the tab navigator
        });
      } else {
        console.log('Authentication failed, no user object returned.');
      }
    } catch (error: any) {
      let errorMessage = 'Login Error. Please try again.';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      }
      Alert.alert('Login Error', errorMessage);
    }
  };

  // Handle the "Remember Me" functionality
  const handleRememberMe = async () => {
    if (rememberMe) {
      await SecureStore.setItemAsync('rememberedEmail', email);
    } else {
      await SecureStore.deleteItemAsync('rememberedEmail');
    }
  };

  // Main render function
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <LogoSection />
          <Text style={styles.welcomeText}>Welcome to GearGym!</Text>
          <Text style={styles.subText}>Please sign in to continue to GearGym</Text>
          <InputFields
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            validateFields={validateFields}
            setButtonEnabled={setButtonEnabled}
          />
          <RememberMeSection
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
            navigation={navigation}
          />
          <SignInButton
            isButtonEnabled={isButtonEnabled}
            handleLogin={handleLogin}
          />
          <SignUpLink navigation={navigation} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

// Components for each section
const LogoSection = () => (
  <Image
    style={styles.logo}
    source={require('./../../assets/images/logo.png')}
  />
);

interface InputFieldsProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  validateFields: () => boolean;
  setButtonEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputFields: React.FC<InputFieldsProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  validateFields,
  setButtonEnabled,
}) => (
  <>
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
  </>
);

interface RememberMeSectionProps {
  rememberMe: boolean;
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: NavigationProp<RootStackParamList>;
}

const RememberMeSection: React.FC<RememberMeSectionProps> = ({ rememberMe, setRememberMe, navigation }) => (
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
);

interface SignInButtonProps {
  isButtonEnabled: boolean;
  handleLogin: () => void;
}

const SignInButton: React.FC<SignInButtonProps> = ({ isButtonEnabled, handleLogin }) => (
  <TouchableOpacity
    style={[styles.signInButton, !isButtonEnabled && styles.disabledButton]}
    onPress={handleLogin}
    disabled={!isButtonEnabled}
  >
    <Text style={styles.signInButtonText}>Sign In</Text>
  </TouchableOpacity>
);

interface SignUpLinkProps {
  navigation: NavigationProp<RootStackParamList>;
}

const SignUpLink: React.FC<SignUpLinkProps> = ({ navigation }) => (
  <View style={styles.signUpContainer}>
    <Text style={styles.signUpText}>Don’t have an account?</Text>
    <TouchableOpacity onPress={() => navigation.navigate('register')}>
      <Text style={styles.signUpLink}>Sign Up</Text>
    </TouchableOpacity>
  </View>
);
