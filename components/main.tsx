import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import TeacherCard, {TeacherData} from './teacherCard';
import NavigationBar from './navbar';
import {  TouchableOpacity, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

export type ReceivedTeachersData = {
  id: number;
  title: string;
  faculty: string;
  description: string;
  features: string;
  image: string;
}

type RootStackParamList = {
    MainScreen: undefined;
    TeacherDetailsScreen: { teacher: TeacherData };
  };
  
  type MainScreenNavigationProp = StackNavigationProp<
    RootStackParamList, 
    'MainScreen'
  >
  
  interface MainScreenProps {
    navigation: MainScreenNavigationProp;
  }
  
  const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
    const [teachers, setTeachers] = useState<TeacherData[]>([]);
    const [filteredTeachers, setFilteredTeachers] = useState<TeacherData[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
  
    const getTeachers = async () => {
      try {
          const response = await axios(
            `http://192.168.0.30:8000/teachers/?search=${searchQuery}`, 
              {
              method: 'GET',
              }
          );
          const teachers = response.data.teachers;
          const newArr = teachers.map((raw: ReceivedTeachersData) => ({
              id: raw.id,
              title: raw.title,
              faculty: raw.faculty,
              description: raw.description,
              image: raw.image ? raw.image.replace("localhost", "192.168.0.30") : "dd",
              features: raw.features
          }))
          setFilteredTeachers(newArr)
        } catch(e){
          throw e
        }
      };

      useEffect(() => {
        getTeachers();
      }, [searchQuery, teachers]);
  
    const handleDetailsPress = (teacher: TeacherData) => {
      console.log('Details Pressed:', teacher.title);
      navigation.navigate('TeacherDetailsScreen', { teacher });
    };
  
    const renderTeacherCard = ({ item }: { item: TeacherData }) => {
      return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => handleDetailsPress(item)}
      >
        <View>
          <TeacherCard teacher={item} onDetailsPress={() => {}} />
        </View>
      </TouchableOpacity>
    )
  }
  
    return (
      <View style={styles.container}>
        <NavigationBar />
        <TextInput
          style={styles.input}
          placeholder="Поиск по фамилии*"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <View style={{ flex: 1 }}>
          <FlatList
            contentContainerStyle={styles.aaa}
            data={filteredTeachers}
            renderItem={renderTeacherCard}
            keyExtractor={(item) => item.id.toString()}
          ></FlatList>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 0,
    },
    aaa: {
      // flex: 1,
      flexDirection: "row",
      // justifyContent: "space-between",
      gap: 2.5,
      flexWrap: "wrap",
    },
    input: {
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 10,
      marginTop: 10,
    },
    cardContainer: {
      // width: "100%",
      width: 190,
      height: 300,
    },
  });
  
  export default MainScreen;