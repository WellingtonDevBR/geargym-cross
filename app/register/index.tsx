import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import styles from './styles';
import { validateForm } from '@/app/utils/validation';
import { useAuth } from '../utils/context/authContext';

type RootStackParamList = {
  login: undefined;
  [key: string]: undefined; // Allow additional routes
};

export default function SignUpScreen() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { register } = useAuth();

  useEffect(() => {
    setIsFormValid(validateForm(name, email, password, repeatPassword, isChecked));
  }, [name, email, password, repeatPassword, isChecked]);

  const handleSignUp = async () => {
    if (!isFormValid) {
      Alert.alert('Validation Error', 'Please fill in all fields correctly.');
      return;
    }

    try {
      await register(name, email, password);
      Alert.alert('Success', 'User registered successfully');
      navigation.navigate('login');
    } catch (error: any) {
      let errorMessage = 'Failed to register user';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak.';
      }
      Alert.alert('Registration Error', errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <HeaderSection navigation={navigation} />
        <SignUpForm
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          repeatPassword={repeatPassword}
          setRepeatPassword={setRepeatPassword}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          isFormValid={isFormValid}
          handleSignUp={handleSignUp}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// Header Section Component
const HeaderSection: React.FC<{ navigation: NavigationProp<RootStackParamList> }> = ({ navigation }) => (
  <>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Image source={require('./../../assets/images/ic_up_button.png')} style={styles.backIcon} />
    </TouchableOpacity>
    <Image style={styles.logo} source={require('./../../assets/images/logo.png')} />
    <Text style={styles.signUpText}>SIGN UP NOW</Text>
    <Text style={styles.subText}>Please sign up to continue to GearGym!</Text>
  </>
);

interface SignUpFormProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  repeatPassword: string;
  setRepeatPassword: React.Dispatch<React.SetStateAction<string>>;
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  isFormValid: boolean;
  handleSignUp: () => void;
}

// SignUp Form Component
const SignUpForm: React.FC<SignUpFormProps> = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  repeatPassword,
  setRepeatPassword,
  isChecked,
  setIsChecked,
  isFormValid,
  handleSignUp,
}) => (
  <>
    <InputField
      icon={require('./../../assets/images/ic_user.png')}
      placeholder="Enter name"
      value={name}
      onChangeText={setName}
    />
    <InputField
      icon={require('./../../assets/images/ic_email.png')}
      placeholder="Enter email"
      keyboardType="email-address"
      value={email}
      onChangeText={setEmail}
    />
    <InputField
      icon={require('./../../assets/images/ic_password.png')}
      placeholder="Enter password"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
    />
    <InputField
      icon={require('./../../assets/images/ic_password.png')}
      placeholder="Repeat password"
      secureTextEntry
      value={repeatPassword}
      onChangeText={setRepeatPassword}
    />
    <TermsCheckbox isChecked={isChecked} setIsChecked={setIsChecked} />
    <TouchableOpacity
      style={[styles.signUpButton, !isFormValid && { backgroundColor: '#cccccc' }]}
      disabled={!isFormValid}
      onPress={handleSignUp}
    >
      <Text style={styles.signUpButtonText}>Sign Up</Text>
    </TouchableOpacity>
  </>
);

interface InputFieldProps {
  icon: any;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address';
  secureTextEntry?: boolean;
}

// Input Field Component
const InputField: React.FC<InputFieldProps> = ({
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
}) => (
  <View style={styles.inputContainer}>
    <Image source={icon} style={styles.inputIcon} />
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

interface TermsCheckboxProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

// Terms & Conditions Checkbox Component
const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ isChecked, setIsChecked }) => (
  <View style={styles.checkboxContainer}>
    <TouchableOpacity onPress={() => setIsChecked(!isChecked)} style={styles.checkboxWrapper}>
      <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]} />
    </TouchableOpacity>
    <Text style={styles.checkboxText}>I agree to</Text>
    <TouchableOpacity>
      <Text style={styles.termsText}>Terms & Conditions</Text>
    </TouchableOpacity>
  </View>
);
