import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { creditCardFormStyles } from './styles';

export default function CreditCardForm() {
    const [cardholderName, setCardholderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const navigation = useNavigation<any>();

    const handleNext = () => {
        navigation.navigate('creditCardBillingForm', {
            cardholderName,
            cardNumber,
            expiryDate,
            cvv,
            price: 80.00 // Example price
        });
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={creditCardFormStyles.safeArea}>
                <View style={creditCardFormStyles.topContainer}>
                    <TouchableOpacity style={creditCardFormStyles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={creditCardFormStyles.header}>Card Details</Text>
                </View>
                <View style={creditCardFormStyles.whiteContainer}>
                    <View style={creditCardFormStyles.card}>
                        <Text style={creditCardFormStyles.cardText}>Visa</Text>
                        <Text style={creditCardFormStyles.cardNumber}>
                            {cardNumber ? cardNumber.replace(/(.{4})/g, '$1 ') : 'XXXX XXXX XXXX XXXX'}
                        </Text>
                        <View style={creditCardFormStyles.cardFooter}>
                            <Text style={creditCardFormStyles.cardHolderName}>{cardholderName || 'Your Name'}</Text>
                            <Text style={creditCardFormStyles.cardExpiry}>{expiryDate || 'MM/YY'}</Text>
                        </View>
                    </View>

                    <Text style={creditCardFormStyles.label}>Cardholder's Name</Text>
                    <TextInput
                        style={creditCardFormStyles.input}
                        placeholder="Enter name"
                        value={cardholderName}
                        onChangeText={setCardholderName}
                    />

                    <Text style={creditCardFormStyles.label}>Card Number</Text>
                    <TextInput
                        style={creditCardFormStyles.input}
                        placeholder="XXXX XXXX XXXX XXXX"
                        value={cardNumber}
                        onChangeText={setCardNumber}
                        keyboardType="numeric"
                        maxLength={16}
                    />

                    <View style={creditCardFormStyles.row}>
                        <View style={creditCardFormStyles.halfInputContainer}>
                            <Text style={creditCardFormStyles.label}>Expiry Date</Text>
                            <TextInput
                                style={creditCardFormStyles.input}
                                placeholder="MM/YY"
                                value={expiryDate}
                                onChangeText={setExpiryDate}
                                keyboardType="numeric"
                                maxLength={5}
                            />
                        </View>
                        <View style={creditCardFormStyles.halfInputContainer}>
                            <Text style={creditCardFormStyles.label}>CVV</Text>
                            <TextInput
                                style={creditCardFormStyles.input}
                                placeholder="XXXX"
                                value={cvv}
                                onChangeText={setCvv}
                                keyboardType="numeric"
                                maxLength={4}
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={creditCardFormStyles.button} onPress={handleNext}>
                        <Text style={creditCardFormStyles.buttonText}>Next | $80.00</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

