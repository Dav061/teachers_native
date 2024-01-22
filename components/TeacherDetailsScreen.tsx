import React, {useState, } from 'react';
import { View, Text, Button, Pressable, StyleSheet,Image } from 'react-native';
import axios from 'axios';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { TeacherData } from './teacherCard';
import NavigationBar from './navbar';

type TeacherDetailsRouteProp = RouteProp<{
  teacherDetailsScreen: { teacher: TeacherData };
}, 'teacherDetailsScreen'>;

const ObjectDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<TeacherDetailsRouteProp>();
  const [currentTeacher, setTeacher] = useState<TeacherData>()
  const { teacher } = route.params;
  const getTeacher = async () => {
    try {
        const response = await axios(`http://192.168.0.30:8000/teachers/${teacher.id}`, {
            method: 'GET',
        });
        setTeacher({
          id: response.data.id,
          title: response.data.title,
          faculty: response.data.faculty,
          description: response.data.description,
          image: response.data.image,
          features: response.data.features
        }
      )
    }
    catch(e){
      throw e
    }
  };

  React.useEffect(() => {
    getTeacher()
  }, [])

  return (
    <View style={styles.container}>
      <NavigationBar />
      <View style={styles.content}>
        <Image source={{ uri: teacher?.image }} style={styles.image} />
        <Text style={styles.title}>ФИО: {teacher?.title}</Text>
        <Text style={styles.info}>Факультет: {teacher?.faculty}</Text>
        <Text style={styles.info}>Описание: {teacher?.description}</Text>
        <Text style={styles.info}>Основные сведения: {teacher?.features}</Text>
      </View>
      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
     <Text style={styles.text}>Назад</Text>
   </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%', // Пример задания ширины изображения
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 10, // Добавляем отступ снизу для текста
  },
  content: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#2787F5',
    marginTop: 10
   },
   text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
   },
});

export default ObjectDetailsScreen;