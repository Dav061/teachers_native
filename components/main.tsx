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
  
  type MainScreenNavigationProp = StackNavigationProp<
    RootStackParamList, 
    'MainScreen'
  >
  
  interface MainScreenProps {
    navigation: MainScreenNavigationProp;
  }
  
  const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
    const [options, setOptions] = useState<OptionData[]>([]);
    const [filteredOptions, setFilteredOptions] = useState<OptionData[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
  
    const getOptions = async () => {
      try {
          const response = await axios(
            `http://192.168.0.30:8000/options/?search=${searchQuery}`, 
              {
              method: 'GET',
              }
          );
          const options = response.data.options;
          const newArr = options.map((raw: ReceivedOptionsData) => ({
              id: raw.id,
              title: raw.title,
              faculty: raw.faculty,
              description: raw.description,
              image: raw.image ? raw.image.replace("localhost", "192.168.0.30") : "dd",
              features: raw.features
          }))
          setFilteredOptions(newArr)
        } catch(e){
          throw e
        }
      };

      useEffect(() => {
        getOptions();
      }, [searchQuery, options]);
  
    const handleDetailsPress = (option: OptionData) => {
      console.log('Details Pressed:', option.title);
      navigation.navigate('OptionDetailsScreen', { option });
    };
  
    const renderOptionCard = ({ item }: { item: OptionData }) => {
      return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => handleDetailsPress(item)}
      >
        <View>
          <OptionCard option={item} onDetailsPress={() => {}} />
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
            data={filteredOptions}
            renderItem={renderOptionCard}
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