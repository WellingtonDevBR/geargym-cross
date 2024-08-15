import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');
const cardWidth = (width - 72) / 2;
const cardHeight = cardWidth * 1.2;

export const indexStyles = StyleSheet.create({
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
        top: 20,
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
        borderRadius: 16,
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
    disabledCard: {
        backgroundColor: '#444444',  // Darker gray to emphasize non-clickable status
        borderColor: '#333333',
    },
    disabledCardImage: {
        opacity: 0.5,  // Desaturate the image to make it look inactive
    },
    disabledLabel: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: '#CCCCCC',  // Lighter text to match the inactive look
    },
});
