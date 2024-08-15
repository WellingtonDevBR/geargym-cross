import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { bookFormStyles } from './styles';

export default function BookForm() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState<any>(null);
    const [description, setDescription] = useState('');
    const navigation = useNavigation<any>();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={bookFormStyles.safeArea}>
                <View style={bookFormStyles.topContainer}>
                    <TouchableOpacity style={bookFormStyles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={bookFormStyles.header}>Book a Session</Text>
                </View>
                <View style={bookFormStyles.whiteContainer}>
                    <Text style={bookFormStyles.label}>Name</Text>
                    <TextInput
                        style={bookFormStyles.input}
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={bookFormStyles.label}>Age</Text>
                    <TextInput
                        style={bookFormStyles.input}
                        placeholder="Enter your age"
                        value={age}
                        onChangeText={setAge}
                        keyboardType="numeric"
                    />

                    <View style={bookFormStyles.row}>
                        <View style={bookFormStyles.halfInputContainer}>
                            <Text style={bookFormStyles.label}>Height</Text>
                            <TextInput
                                style={bookFormStyles.input}
                                placeholder="Height"
                                value={height}
                                onChangeText={setHeight}
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={bookFormStyles.halfInputContainer}>
                            <Text style={bookFormStyles.label}>Weight</Text>
                            <TextInput
                                style={bookFormStyles.input}
                                placeholder="Weight"
                                value={weight}
                                onChangeText={setWeight}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    <View style={bookFormStyles.row}>
                        <TouchableOpacity
                            style={[bookFormStyles.radio, gender === 'male' && bookFormStyles.selectedRadio]}
                            onPress={() => setGender('male')}
                        >
                            <Text>Male</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[bookFormStyles.radio, gender === 'female' && bookFormStyles.selectedRadio]}
                            onPress={() => setGender('female')}
                        >
                            <Text>Female</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={bookFormStyles.label}>Description</Text>
                    <TextInput
                        style={[bookFormStyles.input, bookFormStyles.textArea]}
                        placeholder="Tell us what you want to talk about..."
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    />

                    <TouchableOpacity style={bookFormStyles.button} onPress={() => navigation.navigate('creditCardForm')}>
                        <Text style={bookFormStyles.buttonText}>Go To Payment</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

