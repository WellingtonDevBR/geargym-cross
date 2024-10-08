import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { FAB } from 'react-native-paper';
import { Tabs, useNavigation } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/components/navigation/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import CustomBottomTabBar from '@/components/navigation/CustomBottomTabBar';
import { AuthProvider } from '../utils/context/authContext';

const { width } = Dimensions.get('window');
const tabBarHeight = 60;

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function TabLayout() {
  const colorScheme = useColorScheme() || 'light';
  const navigation = useNavigation<NavigationProp>();

  return (
    <AuthProvider>
      <ProtectedRoute>
        <View style={{ flex: 1 }}>
          <Tabs
            tabBar={(props) => <CustomBottomTabBar {...props} />}
            screenOptions={{
              tabBarActiveTintColor: Colors[colorScheme].tint,
              headerShown: false,
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                tabBarIcon: ({ color, focused, size }) => (
                  <TabBarIcon name={focused ? 'home' : 'home-outline'} color={focused ? '#9747FF' : 'black'} size={size} />
                ),
              }}
            />
            <Tabs.Screen
              name="void"
              options={{
                tabBarLabel: 'Scan Now',
                tabBarIcon: () => null,
              }}
              listeners={({ navigation }) => ({
                tabPress: (e) => {
                  e.preventDefault();
                  navigation.navigate('scannow');
                },
              })}
            />
            <Tabs.Screen
              name="support"
              options={{
                title: 'Support',
                tabBarIcon: ({ color, focused, size }) => (
                  <TabBarIcon name={focused ? 'information-circle' : 'information-circle-outline'} color={focused ? '#9747FF' : 'black'} size={size} />
                ),
              }}
            />
          </Tabs>
          <View style={styles.fabContainer}>
            <FAB
              style={styles.fab}
              small={false}
              icon="camera"
              color="white"
              onPress={() => navigation.navigate('scannow')}
            />
          </View>
        </View>
      </ProtectedRoute>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    left: (width / 2) - 28,
    bottom: tabBarHeight / 1.5,
    zIndex: 10,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9747FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
