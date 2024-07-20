import { Dimensions, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#9747FF',
    },
    container: {
      flex: 1,
      position: 'relative',
    },
    backgroundImage: {
      position: 'absolute',
      width: width * 1.5,
      height: height,
      resizeMode: 'contain',
      right: -width * 0.50,
      opacity: 0.8,
    },
    content: {
      flex: 1,
      backgroundColor: 'rgba(151, 71, 255, 0.4)',
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