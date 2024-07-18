import { View, Text, StyleSheet } from 'react-native';

export default function ScanNowScreen() {

    return (
        <View style={styles.container}>
            <Text>Camera</Text>
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
  