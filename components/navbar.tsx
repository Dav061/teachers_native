import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NavigationBar = () => {
  const handleNavigation = (routeName: string) => {
    console.log('Navigating to:', routeName);
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        style={[styles.navItem,  { backgroundColor: '#3D348B' }]}
      >
        <Text style={styles.navText}>Наши преподаватели</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navItem, { backgroundColor: '#3D348B' }]}
        onPress={() => handleNavigation('Выйти')}
      >
        <Text style={styles.navText}></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3D348B',
    width: '100%',
    paddingVertical: 20,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    color: 'white', // Темно-серый цвет текста
    fontSize: 18,
    marginTop: 50, // Расстояние между текстом и кнопкой
    textAlign: 'center',
    backgroundColor: '#3D348B'
  },
});

export default NavigationBar;