import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import OptionCard, {OptionData} from './optionCard';
import NavigationBar from './navbar';
import {  TouchableOpacity, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

export type ReceivedOptionsData = {
  id: number;
  title: string;
  faculty: string;
  description: string;
  features: string;
  image: string;
}

type RootStackParamList = {
    MainScreen: undefined;
    OptionDetailsScreen: { option: OptionData };
  };
  
  type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainScreen'>;
  
  interface MainScreenProps {
    navigation: MainScreenNavigationProp;
  }
  
  const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
    const [options, setOptions] = useState<OptionData[]>([]);
    const [filteredOptions, setFilteredOptions] = useState<OptionData[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
  
    const getOptions = async () => {
      try {
          const response = await axios('http://192.168.0.30:8000/options', {
              method: 'GET',
          });
          const options = response.data.options;
          const newArr = options.map((raw: ReceivedOptionsData) => ({
              id: raw.id,
              title: raw.title,
              faculty: raw.faculty,
              description: raw.description,
              image: raw.image,
              features: raw.features
          }));
          setOptions(newArr)
          setTimeout(getOptions, 1000); // вызов getOptions каждые 1 секунду
      }
      catch(e){
        throw e
      }
     };

    useEffect(() => {
      getOptions();
    }, []);
  
    useEffect(() => {
      if (searchQuery === '') {
        setFilteredOptions(options);
      } else {
        const filtered = options.filter(
          (option) =>
            option.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredOptions(filtered);
      }
      console.log('title', searchQuery)
      console.log('')
    }, [searchQuery, options]);
  
    const handleDetailsPress = (option: OptionData) => {
      console.log('Details Pressed:', option.title);
      navigation.navigate('OptionDetailsScreen', { option });
    };
  
    const renderOptionCard = ({ item }: { item: OptionData }) => {
      return (
        <TouchableOpacity onPress={() => handleDetailsPress(item)}>
          <OptionCard option={item} onDetailsPress={() => {}} />
        </TouchableOpacity>
      );
    };
  
    return (
      <View style={styles.container}>
        <NavigationBar />
        <TextInput
          style={styles.input}
          placeholder="Поиск по фамилии*"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <FlatList
          data={filteredOptions}
          renderItem={renderOptionCard}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 0,
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
  });
  
  export default MainScreen;