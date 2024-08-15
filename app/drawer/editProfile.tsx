import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { doc, updateDoc } from "firebase/firestore";
import { updatePassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, auth, storage } from '../firebaseConfig';
import { useAuth } from '../utils/context/authContext';
import { editStyles } from './styles';

export default function EditProfile() {
    const { user } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [address, setAddress] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);
    const [avatar, setAvatar] = useState<any>(null);
    const navigation = useNavigation<any>();

    useEffect(() => {
        if (user) {
            setName(user.name); // Assuming these fields are stored this way in Firestore
            setEmail(user.email);
            setAddress(user.address);
            if (user.avatar) {
                setAvatar(user.avatar); // Preload the avatar if the URL is already available
            }
        }
    }, [user]);

    const handleUpdate = async () => {
        try {
            let avatarUrl = avatar;

            // Check if a new image was selected
            if (avatar && avatar.startsWith('file://')) {
                const response = await fetch(avatar);
                const blob = await response.blob();
                const storageRef = ref(storage, `avatars/${user.uid}.jpg`); // Use uid instead of Id
                await uploadBytes(storageRef, blob);
                avatarUrl = await getDownloadURL(storageRef);
            }

            // Prepare data to be updated
            const updatedData: any = {};

            if (name && name !== user.name) {
                updatedData.name = name;
            }
            if (address && address !== user.address) {
                updatedData.address = address;
            }
            if (avatarUrl && avatarUrl !== user.avatar) {
                updatedData.avatar = avatarUrl;
            }

            // Update user information in Firestore if there's any data to update
            if (Object.keys(updatedData).length > 0) {
                const userRef = doc(db, "User", user.uid); // Ensure consistency in collection name capitalization
                await updateDoc(userRef, updatedData);
            }

            // Update password in Firebase Auth if provided
            if (password && password === repeatPassword) {
                const currentUser = auth.currentUser;
                if (currentUser) {
                    await updatePassword(currentUser, password);
                }
            } else if (password !== repeatPassword) {
                Alert.alert('Error', 'Passwords do not match!');
                return;
            }

            Alert.alert('Success', 'Profile updated successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error', 'Failed to update profile. Please try again.');
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!result.granted) {
            alert('Permission to access the gallery is required!');
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!pickerResult.canceled) {
            setAvatar(pickerResult.assets[0].uri);
        }
    };

    console.log(avatar)

    return (
        <SafeAreaView style={editStyles.safeArea}>
            <TouchableOpacity style={editStyles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={editStyles.headerText}>Edit Profile</Text>
            <View style={editStyles.container}>
                <View style={editStyles.avatarContainer}>
                    <Image
                        style={editStyles.avatar}
                        source={avatar ? { uri: avatar } : require('./../../assets/images/avatar-placeholder.png')}
                    />
                    <TouchableOpacity style={editStyles.addIconContainer} onPress={pickImage}>
                        <Ionicons name="add-circle" size={24} color="#8A2BE2" />
                    </TouchableOpacity>
                </View>

                <View style={editStyles.inputContainer}>
                    <Ionicons name="person-outline" size={20} color="#8A2BE2" style={editStyles.inputIcon} />
                    <TextInput
                        style={editStyles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={[editStyles.inputContainer, editStyles.disabledInputContainer]}>
                    <Ionicons name="mail-outline" size={20} color="#8A2BE2" style={editStyles.inputIcon} />
                    <TextInput
                        style={[editStyles.input, editStyles.disabledInput]}
                        placeholder="Email"
                        value={email}
                        editable={false} // Make the email field non-editable
                        selectTextOnFocus={false} // Disable text selection on focus
                    />
                </View>

                <View style={editStyles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="#8A2BE2" style={editStyles.inputIcon} />
                    <TextInput
                        style={editStyles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!passwordVisible}
                    />
                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={editStyles.eyeIcon}>
                        <Ionicons name={passwordVisible ? 'eye-off-outline' : 'eye-outline'} size={20} color="#8A2BE2" />
                    </TouchableOpacity>
                </View>

                <View style={editStyles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="#8A2BE2" style={editStyles.inputIcon} />
                    <TextInput
                        style={editStyles.input}
                        placeholder="Repeat Password"
                        value={repeatPassword}
                        onChangeText={setRepeatPassword}
                        secureTextEntry={!repeatPasswordVisible}
                    />
                    <TouchableOpacity onPress={() => setRepeatPasswordVisible(!repeatPasswordVisible)} style={editStyles.eyeIcon}>
                        <Ionicons name={repeatPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={20} color="#8A2BE2" />
                    </TouchableOpacity>
                </View>

                <View style={editStyles.inputContainer}>
                    <Ionicons name="location-outline" size={20} color="#8A2BE2" style={editStyles.inputIcon} />
                    <TextInput
                        style={editStyles.input}
                        placeholder="Address"
                        value={address}
                        onChangeText={setAddress}
                    />
                </View>

                <TouchableOpacity style={editStyles.updateButton} onPress={handleUpdate}>
                    <Text style={editStyles.updateButtonText}>Update</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
