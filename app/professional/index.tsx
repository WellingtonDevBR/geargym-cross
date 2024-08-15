import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { indexStyles } from './styles';

export default function Index() {
  const [categories, setCategories] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState('');
  const navigation = useNavigation<any>();
  const db = getFirestore(app);
  const storage = getStorage(app);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Category"));
        const categoryList: any = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const imageURL = await getDownloadURL(ref(storage, data.imageURL));
            return { id: doc.id, ...data, imageURL };
          })
        );
        setCategories(categoryList);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchProfessionals = async () => {
      try {
        const professionalsSnapshot = await getDocs(collection(db, "Professional"));
        const professionalsList: any = await Promise.all(
          professionalsSnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const imageURL = await getDownloadURL(ref(storage, data.imageURL));
            return { id: doc.id, ...data, imageURL };
          })
        );
        setProfessionals(professionalsList);
      } catch (error) {
        console.error('Error fetching professionals:', error);
      }
    };

    fetchCategories();
    fetchProfessionals();
  }, [db, storage]);

  const filteredProfessionals = professionals.filter((professional: any) =>
    (selectedCategory ? professional.category === selectedCategory : true) &&
    professional.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={indexStyles.safeArea}>
        <View style={indexStyles.topContainer}>
          <TouchableOpacity style={indexStyles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={indexStyles.screenTitle}>Find Your Trainer</Text>
        </View>
        <View style={indexStyles.whiteContainer}>
          <View style={indexStyles.searchContainer}>
            <TextInput
              style={indexStyles.searchInput}
              placeholder="Search trainer / workout"
              value={search}
              onChangeText={setSearch}
            />
            <TouchableOpacity style={indexStyles.filterButton}>
              <Ionicons name="filter-outline" size={24} color="#8A2BE2" />
            </TouchableOpacity>
          </View>
          <View style={indexStyles.categoriesContainer}>
            <Text style={indexStyles.sectionTitle}>Categories</Text>
            <FlatList
              data={categories}
              horizontal
              keyExtractor={(item: any) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    indexStyles.categoryItem,
                    selectedCategory === item.id && indexStyles.selectedCategoryItem
                  ]}
                  onPress={() => setSelectedCategory(item.id)}
                >
                  <Image source={{ uri: item.imageURL }} style={indexStyles.categoryImage} />
                  <Text style={indexStyles.categoryName}>{item.name}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={indexStyles.categoriesListContainer}
            />
          </View>
          <View style={indexStyles.professionalsContainer}>
            <Text style={indexStyles.sectionTitle}>Professionals</Text>
            <FlatList
              scrollEnabled={true}
              data={filteredProfessionals}
              keyExtractor={(item: any) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate('bookForm')}>
                  <View style={indexStyles.professionalItem}>
                    <Image source={{ uri: item.imageURL }} style={indexStyles.professionalImage} />
                    <View style={indexStyles.professionalInfo}>
                      <Text style={indexStyles.professionalName}>{item.name}</Text>
                      <Text style={indexStyles.professionalSubtitle}>{item.subtitle}</Text>
                      <Text style={indexStyles.professionalDescription}>{item.description}</Text>
                      <View style={indexStyles.professionalFooter}>
                        <Text style={indexStyles.professionalPrice}>${item.price}</Text>
                        <TouchableOpacity style={indexStyles.bookButton}>
                          <Text style={indexStyles.bookButtonText}>Book</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text style={indexStyles.emptyText}>No professionals found.</Text>}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

