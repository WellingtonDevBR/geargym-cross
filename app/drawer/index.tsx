import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { useAuth } from '../utils/context/authContext';

export default function DrawerScreen() {
  const navigation = useNavigation<any>();
  const { logout } = useAuth();

  const handleLogout = async () => {
    logout();
    navigation.navigate('login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          style={styles.backgroundImage}
          source={require('./../../assets/images/profile_promo.png')}
        />
        <View style={styles.content}>
          <View style={styles.profileContainer}>
            <Image
              style={styles.profileImage}
              source={require('./../../assets/images/ic_user_profile.png')}
            />
            <View style={styles.profileTextContainer}>
              <Text style={styles.welcomeLabel}>Hey, 👋</Text>
              <Text style={styles.username}>John Smith</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
            <Image
              style={styles.closeIcon}
              source={require('./../../assets/images/ic_close.png')}
            />
          </TouchableOpacity>
          <View style={styles.menuItemsContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('EditProfile')}>
              <Image style={styles.menuItemIcon} source={require('./../../assets/images/ic_profile.png')} />
              <Text style={styles.menuItemText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Equipment')}>
              <Image style={styles.menuItemIcon} source={require('./../../assets/images/ic_equipment.png')} />
              <Text style={styles.menuItemText}>Equipment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Subscriptions')}>
              <Image style={styles.menuItemIcon} source={require('./../../assets/images/ic_subscription.png')} />
              <Text style={styles.menuItemText}>Subscriptions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Appointments')}>
              <Image style={styles.menuItemIcon} source={require('./../../assets/images/ic_appointment.png')} />
              <Text style={styles.menuItemText}>My Appointments</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
              <Image style={styles.menuItemIcon} source={require('./../../assets/images/ic_settings.png')} />
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Image style={styles.menuItemIcon} source={require('./../../assets/images/ic_logout.png')} />
              <Text style={styles.menuItemText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
