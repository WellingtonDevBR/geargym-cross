import React, { useEffect } from 'react';
import { View, Text, Image, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../utils/context/authContext';
import { Link, useRouter } from 'expo-router';
import { indexStyles } from './styles';

export default function HomeScreen() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if the user is not authenticated and not loading
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading]);

  if (loading) {
    // Show a loading indicator while checking authentication
    return (
      <SafeAreaView style={indexStyles.safeArea}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (!user) {
    // If not authenticated, return null (or you can return the loading indicator)
    return null;
  }

  return (
    <SafeAreaView style={indexStyles.safeArea}>
      <View style={indexStyles.topContainer}>
        <TopSection userName={user.name || user.email.split('@')[0]} avatar={user.avatar} />
      </View>

      <View style={indexStyles.frameLayout}>
        <View style={indexStyles.homeContainer}>
          <CardGrid />
        </View>
      </View>
    </SafeAreaView>
  );
}


// Top section with user greeting and profile image
const TopSection: React.FC<{ userName: string; avatar: string }> = ({ userName, avatar }) => (
  <>
    <View style={indexStyles.topBackground} />
    <View style={indexStyles.profileContainer}>
      <Text style={indexStyles.welcomeLabel}>Welcome Back,</Text>
      <Text style={indexStyles.username}>{userName}</Text>
      <Link style={indexStyles.profileImage} href="/drawer" asChild>
        <Pressable>
          <Image
            source={avatar ? { uri: avatar } : require('./../../assets/images/avatar-placeholder.png')}
            style={indexStyles.profileImage}
          />
        </Pressable>
      </Link>
    </View>
  </>
);


// Grid layout for cards
const CardGrid = () => (
  <View style={indexStyles.gridLayout}>
    <NonClickableCard imageSource={require('./../../assets/images/ic_workout.png')} label="Workout" />
    <ClickableCard
      href="/professional"
      imageSource={require('./../../assets/images/ic_professionals.png')}
      label="Find Professionals"
    />
    <NonClickableCard imageSource={require('./../../assets/images/ic_calculator.png')} label="Fitness Calculator" />
    <NonClickableCard imageSource={require('./../../assets/images/ic_hub.png')} label="Member Hub" />
  </View>
);

// Component for non-clickable cards
const NonClickableCard: React.FC<{ imageSource: any; label: string }> = ({ imageSource, label }) => (
  <View style={[indexStyles.card, indexStyles.disabledCard]}>
    <Image style={[indexStyles.cardImage, indexStyles.disabledCardImage]} source={imageSource} />
    <Text style={[indexStyles.cardLabel, indexStyles.disabledLabel]}>{label}</Text>
  </View>
);

// Component for clickable cards
const ClickableCard: React.FC<{ href: string; imageSource: any; label: string }> = ({ href, imageSource, label }) => (
  <Link href={href} asChild>
    <Pressable>
      <View style={indexStyles.card}>
        <Image style={indexStyles.cardImage} source={imageSource} />
        <Text style={indexStyles.cardLabel}>{label}</Text>
      </View>
    </Pressable>
  </Link>
);
