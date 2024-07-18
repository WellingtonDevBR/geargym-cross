import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function DrawerScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          style={styles.backgroundImage}
          source={require('./../../../assets/images/profile_promo.png')} // Adjust the path to your app image
        />
        <View style={styles.content}>
          <View style={styles.profileContainer}>
            <Image
              style={styles.profileImage}
              source={require('./../../../assets/images/ic_user_profile.png')} // Adjust the path to your asset
            />
            <View style={styles.profileTextContainer}>
              <Text style={styles.welcomeLabel}>Hey, 👋</Text>
              <Text style={styles.username}>John Smith</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
            <Image
              style={styles.closeIcon}
              source={require('./../../../assets/images/ic_close.png')} // Adjust the path to your close icon
            />
          </TouchableOpacity>
          <View style={styles.menuItemsContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('EditProfile')}>
              <Image style={styles.menuItemIcon} source={require('./../../../assets/images/ic_profile.png')} />
              <Text style={styles.menuItemText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Equipment')}>
              <Image style={styles.menuItemIcon} source={require('./../../../assets/images/ic_equipment.png')} />
              <Text style={styles.menuItemText}>Equipment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Subscriptions')}>
              <Image style={styles.menuItemIcon} source={require('./../../../assets/images/ic_subscription.png')} />
              <Text style={styles.menuItemText}>Subscriptions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Appointments')}>
              <Image style={styles.menuItemIcon} source={require('./../../../assets/images/ic_appointment.png')} />
              <Text style={styles.menuItemText}>My Appointments</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
              <Image style={styles.menuItemIcon} source={require('./../../../assets/images/ic_settings.png')} />
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Logout')}>
              <Image style={styles.menuItemIcon} source={require('./../../../assets/images/ic_logout.png')} />
              <Text style={styles.menuItemText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#9747FF', // Purple color
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: width * 1.5, // Ensure the image covers more width for visibility
    height: height,
    resizeMode: 'contain',
    right: -width * 0.50, // Shift the image to the right
    opacity: 0.8, // Make the background image more visible
  },
  content: {
    flex: 1,
    backgroundColor: 'rgba(151, 71, 255, 0.4)', // Adjusted opacity to make background image more visible
  },
  profileContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 10,
  },
  profileTextContainer: {
    flexDirection: 'column',
  },
  welcomeLabel: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  username: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  menuItemsContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuItemIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  menuItemText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});
