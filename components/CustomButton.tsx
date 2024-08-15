import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Appearance, useColorScheme } from 'react-native';

type ButtonParams = {
    title: string,
    onPress: () => void,
    backgroundColor?: string,
    textColor?: string,
    style?: ViewStyle,
    textStyle?: TextStyle
};

export default function CustomButton({
    title,
    onPress,
    backgroundColor = '#8A2BE2',
    textColor = '#fff',
    style = {},
    textStyle = {}
}: ButtonParams) {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor }, style]}
            onPress={onPress}
        >
            <Text style={[styles.buttonText, { color: textColor }, textStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
