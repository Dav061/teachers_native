import React, {useState, } from 'react';
import { View, Text, Button, Pressable, StyleSheet,Image } from 'react-native';
import axios from 'axios';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { OptionData } from './optionCard';
import NavigationBar from './navbar';

type OptionDetailsRouteProp = RouteProp<{
  optionDetailsScreen: { option: OptionData };
}, 'optionDetailsScreen'>;

const ObjectDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<OptionDetailsRouteProp>();
  const [currentOption, setOption] = useState<OptionData>()
  const { option } = route.params;
  const getOption = async () => {
    try {
        const response = await axios(`http://192.168.0.30:8000/options/${option.id}`, {
            method: 'GET',
        });
        setOption({
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
    getOption()
  }, [])

  return (
    <View style={styles.container}>
      <NavigationBar />
      <View style={styles.content}>
        <Image source={{ uri: option?.image }} style={styles.image} />
        <Text style={styles.title}>ФИО: {option?.title}</Text>
        <Text style={styles.info}>Факультет: {option?.faculty}</Text>
        <Text style={styles.info}>Описание: {option?.description}</Text>
        <Text style={styles.info}>Основные сведения: {option?.features}</Text>
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