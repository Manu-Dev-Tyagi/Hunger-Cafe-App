import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';

const PaymentScreen = ({ route, navigation }) => {
  const { selectedItems } = route.params;
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    const totalAmount = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    try {
      // Simulating a successful payment (replace with actual payment API call)
      // In a real app, replace this with actual payment processing logic
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
      Alert.alert('Success', 'Payment processed successfully');
      navigation.navigate('Menu');
    } catch (error) {
      console.error('Error processing payment:', error);
      Alert.alert('Error', 'Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getTotalAmount = () => {
    return selectedItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Filter out items with quantity === 0
  const filteredItems = selectedItems.filter(item => item.quantity > 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Payment Details</Text>
      <View style={styles.paymentDetailsContainer}>
        {filteredItems.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.itemText}>Name: {item.name}</Text>
            <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
            <Text style={styles.itemText}>Price: ${item.price.toFixed(2)}</Text>
          </View>
        ))}
        <Text style={styles.totalAmount}>Total Amount: ${getTotalAmount()}</Text>
        <TouchableOpacity style={styles.paymentButton} onPress={handlePayment} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.paymentButtonText}>Process Payment</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  paymentDetailsContainer: {
    backgroundColor: '#fff',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    minHeight: 200, // Adjust the minimum height as per your design
  },
  itemContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    width: '100%',
  },
  itemText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  paymentButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
