import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, Alert } from 'react-native';
import Menu from '../components/Menu'; // Adjust the path to Menu component
import { useNavigation } from '@react-navigation/native';

const MenuScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const onRefresh = () => {
    setRefreshing(true);
    // Add your refresh logic here
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleProceedToSummary = (selectedItems) => {
    if (selectedItems.length === 0) {
      Alert.alert('No Items Selected', 'Please select items from the menu before proceeding.');
    } else {
      navigation.navigate('OrderSummary', { selectedItems });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Menu-List</Text>
      </View>
      <Menu refreshing={refreshing} onRefresh={onRefresh} onProceedToSummary={handleProceedToSummary} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Adjust for status bar height on Android
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
    color: '#66545e',
  },
});

export default MenuScreen;
