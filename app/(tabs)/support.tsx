import { View, Text, StyleSheet } from 'react-native';

export default function SupportScreen() {
    return (
    <View style={styles.container}>
        <Text>Support</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  