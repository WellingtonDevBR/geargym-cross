import { Link } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const cardWidth = (width - 72) / 2;
const cardHeight = cardWidth * 1.2;

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topContainer}>
        <View style={styles.topBackground} />
        <View style={styles.profileContainer}>
          <Text style={styles.welcomeLabel}>Welcome Back,</Text>
          <Text style={styles.username}>John Smith</Text>
          <Link style={styles.profileImage} href="/drawer" asChild>
            <Pressable>
              <Image
                source={require('./../../assets/images/ic_user_profile.png')} 
              />
            </Pressable>
          </Link>
        </View>
      </View>
      <View style={styles.frameLayout}>
        <View style={styles.homeContainer}>
          <View style={styles.gridLayout}>
            <View style={styles.card}>
              <Image
                style={styles.cardImage}
                source={require('./../../assets/images/ic_workout.png')} 
              />
              <Text style={styles.cardLabel}>Workout</Text>
            </View>
            <View style={styles.card}>
              <Image
                style={styles.cardImage}
                source={require('./../../assets/images/ic_calculator.png')}
              />
              <Text style={styles.cardLabel}>Fitness Calculator</Text>
            </View>
            <View style={styles.card}>
              <Image
                style={styles.cardImage}
                source={require('./../../assets/images/ic_professionals.png')} 
              />
              <Text style={styles.cardLabel}>Find Professionals</Text>
            </View>
            <View style={styles.card}>
              <Image
                style={styles.cardImage}
                source={require('./../../assets/images/ic_hub.png')} />
              <Text style={styles.cardLabel}>Member Hub</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#9747FF', 
  },
  topContainer: {
    width: '100%',
    height: 130,
    backgroundColor: 'transparent',
  },
  topBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#9747FF', 
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileContainer: {
    padding: 18,
    paddingTop: 36, 
  },
  welcomeLabel: {
    color: '#FFFFFF', 
    fontSize: 15,
  },
  username: {
    color: '#FFFFFF', 
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 2,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    position: 'absolute',
    right: 18,
    top: 36,
  },
  frameLayout: {
    flex: 1,
    backgroundColor: '#f0f0f0', 
  },
  homeContainer: {
    flex: 1,
    marginTop: -20, 
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 26, 
    paddingHorizontal: 18, 
    alignItems: 'center',
  },
  gridLayout: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: cardWidth,
    height: cardHeight,
    backgroundColor: '#gray_400_color', 
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CCCCCC', 
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    resizeMode: 'cover',
  },
  cardLabel: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    fontSize: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});
