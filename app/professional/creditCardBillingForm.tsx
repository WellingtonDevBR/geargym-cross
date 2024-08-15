import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { creditCardBillingFormStyles } from './styles';

export default function CreditCardBillingForm() {
    const { cardholderName, cardNumber, expiryDate, cvv, price } = useLocalSearchParams<any>();
    const [address, setAddress] = useState('');
    const [unit, setUnit] = useState('');
    const [state, setState] = useState('');
    const [postCode, setPostCode] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<any>();

    const handlePayment = () => {
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setTimeout(() => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'index' }],
                })
            );
        }, 100); // Adding a slight delay to ensure smooth transition
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={creditCardBillingFormStyles.safeArea}>
                <View style={creditCardBillingFormStyles.topContainer}>
                    <TouchableOpacity style={creditCardBillingFormStyles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={creditCardBillingFormStyles.header}>Personal Details</Text>
                </View>
                <View style={creditCardBillingFormStyles.whiteContainer}>
                    <View style={creditCardBillingFormStyles.card}>
                        <Text style={creditCardBillingFormStyles.cardText}>Visa</Text>
                        <Text style={creditCardBillingFormStyles.cardNumber}>
                            {cardNumber?.replace(/(.{4})/g, '$1 ')}
                        </Text>
                        <View style={creditCardBillingFormStyles.cardFooter}>
                            <View>
                                <Text style={creditCardBillingFormStyles.cardLabel}>Card Holder Name</Text>
                                <Text style={creditCardBillingFormStyles.cardHolderName}>{cardholderName}</Text>
                            </View>
                            <View>
                                <Text style={creditCardBillingFormStyles.cardLabel}>CVV</Text>
                                <Text style={creditCardBillingFormStyles.cardCvv}>{cvv}</Text>
                            </View>
                            <View>
                                <Text style={creditCardBillingFormStyles.cardLabel}>Expiry Date</Text>
                                <Text style={creditCardBillingFormStyles.cardExpiry}>{expiryDate}</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={creditCardBillingFormStyles.label}>Address</Text>
                    <TextInput
                        style={creditCardBillingFormStyles.input}
                        placeholder="Enter your address"
                        value={address}
                        onChangeText={setAddress}
                    />

                    <Text style={creditCardBillingFormStyles.label}>Unit</Text>
                    <TextInput
                        style={creditCardBillingFormStyles.input}
                        placeholder="Enter unit"
                        value={unit}
                        onChangeText={setUnit}
                    />

                    <View style={creditCardBillingFormStyles.row}>
                        <View style={creditCardBillingFormStyles.halfInputContainer}>
                            <Text style={creditCardBillingFormStyles.label}>State</Text>
                            <TextInput
                                style={creditCardBillingFormStyles.input}
                                placeholder="Enter state"
                                value={state}
                                onChangeText={setState}
                            />
                        </View>
                        <View style={creditCardBillingFormStyles.halfInputContainer}>
                            <Text style={creditCardBillingFormStyles.label}>Post Code</Text>
                            <TextInput
                                style={creditCardBillingFormStyles.input}
                                placeholder="xxxxx"
                                value={postCode}
                                onChangeText={setPostCode}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={creditCardBillingFormStyles.button} onPress={handlePayment}>
                        <Text style={creditCardBillingFormStyles.buttonText}>Pay Now | ${price}</Text>
                    </TouchableOpacity>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={creditCardBillingFormStyles.modalBackground}>
                            <View style={creditCardBillingFormStyles.modalContainer}>
                                <Image
                                    source={{ uri: 'https://img.icons8.com/color/96/000000/credit-card.png' }}
                                    style={creditCardBillingFormStyles.modalImage}
                                />
                                <Text style={creditCardBillingFormStyles.modalTitle}>Payment Completed!</Text>
                                <Text style={creditCardBillingFormStyles.modalMessage}>
                                    Your payment was completed successfully!
                                </Text>
                                <TouchableOpacity
                                    style={creditCardBillingFormStyles.modalButton}
                                    onPress={handleModalClose}
                                >
                                    <Text style={creditCardBillingFormStyles.modalButtonText}>Thank You!</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

