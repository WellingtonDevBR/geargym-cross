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

export const editStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#8A2BE2',
  },
  backButton: {
    paddingLeft: 16,
    paddingTop: 16,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: -20,
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    width: 100,
    height: 100,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
  },
  addIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingLeft: 12,
    backgroundColor: '#F7F7F7',
    width: '100%',
  },
  disabledInputContainer: {
    backgroundColor: '#E0E0E0',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  disabledInput: {
    color: '#888888',
  },
  eyeIcon: {
    paddingRight: 12,
  },
  updateButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});