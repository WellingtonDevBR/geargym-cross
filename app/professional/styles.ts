import { StyleSheet } from "react-native";


export const indexStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#9747FF',
    },
    topContainer: {
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 30,
        backgroundColor: '#9747FF',
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 16,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    whiteContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#F7F7F7',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    filterButton: {
        marginLeft: 8,
        padding: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    categoriesContainer: {
        marginBottom: 20,
    },
    categoriesListContainer: {
        paddingBottom: 8,
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: 16,
        borderRadius: 8,
        padding: 8,
        width: 100,
        backgroundColor: '#fff',
        elevation: 2,
    },
    categoryImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    selectedCategoryItem: {
        borderColor: '#8A2BE2',
        borderWidth: 2,
    },
    categoryName: {
        marginTop: 8,
        fontSize: 14,
        textAlign: 'center',
        color: '#8A2BE2',
    },
    professionalsContainer: {
        flex: 1,
    },
    professionalItem: {
        flexDirection: 'row',
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
        padding: 10,
        elevation: 2,
    },
    professionalImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
    },
    professionalInfo: {
        flex: 1,
        justifyContent: 'space-between',
    },
    professionalName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    professionalSubtitle: {
        fontSize: 14,
        color: 'grey',
    },
    professionalDescription: {
        fontSize: 12,
        color: '#333',
        marginVertical: 4,
    },
    professionalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    professionalPrice: {
        fontSize: 16,
        color: '#8A2BE2',
    },
    bookButton: {
        backgroundColor: '#8A2BE2',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    bookButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    emptyText: {
        textAlign: 'center',
        color: 'grey',
        fontSize: 16,
        marginTop: 20,
    },
});

export const creditCardFormStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#9747FF',
    },
    topContainer: {
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 30,
        backgroundColor: '#9747FF',
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    whiteContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 16,
    },
    card: {
        backgroundColor: '#8A2BE2',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
    },
    cardText: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 20,
    },
    cardNumber: {
        color: '#fff',
        fontSize: 20,
        letterSpacing: 1.5,
        marginBottom: 20,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardHolderName: {
        color: '#fff',
        fontSize: 16,
    },
    cardExpiry: {
        color: '#fff',
        fontSize: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        backgroundColor: '#f2f2f2',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfInputContainer: {
        flex: 1,
        marginRight: 8,
    },
    button: {
        backgroundColor: '#8A2BE2',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


export const bookFormStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#9747FF',
    },
    topContainer: {
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 30,
        backgroundColor: '#9747FF',
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    whiteContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        backgroundColor: '#f2f2f2',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    halfInputContainer: {
        flex: 1,
        marginRight: 8,
    },
    radio: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        flex: 1,
        justifyContent: 'center',
        marginRight: 8,
        backgroundColor: '#f2f2f2',
    },
    selectedRadio: {
        borderColor: '#8A2BE2',
        backgroundColor: '#e0e0e0',
    },
    textArea: {
        height: 100,
    },
    button: {
        backgroundColor: '#8A2BE2',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


export const creditCardBillingFormStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#9747FF',
    },
    topContainer: {
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 30,
        backgroundColor: '#9747FF',
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    whiteContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 16,
    },
    card: {
        backgroundColor: '#8A2BE2',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
    },
    cardText: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 20,
    },
    cardNumber: {
        color: '#fff',
        fontSize: 20,
        letterSpacing: 1.5,
        marginBottom: 20,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardLabel: {
        color: '#fff',
        fontSize: 10,
        marginBottom: 4,
    },
    cardHolderName: {
        color: '#fff',
        fontSize: 16,
    },
    cardCvv: {
        color: '#fff',
        fontSize: 16,
    },
    cardExpiry: {
        color: '#fff',
        fontSize: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        backgroundColor: '#f2f2f2',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfInputContainer: {
        flex: 1,
        marginRight: 8,
    },
    button: {
        backgroundColor: '#8A2BE2',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
    },
    modalImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#8A2BE2',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
