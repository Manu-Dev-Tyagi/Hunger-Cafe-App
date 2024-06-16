import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import OrderSummary from '../components/OrderSummary';

const OrderScreen = ({ route, navigation }) => {
  const { selectedItems } = route.params || [];
  const [items, setItems] = useState(selectedItems);

  const handleUpdateQuantity = (index, newQuantity) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = newQuantity;
    setItems(updatedItems);
  };

  const handleProceedToPayment = () => {
    // Filter out items with quantity 0 before proceeding to payment
    const itemsToPay = items.filter(item => item.quantity > 0);

    if (itemsToPay.length === 0) {
      alert('Please select items before proceeding to payment.');
      return; // Prevent navigation if no items to pay
    }

    // Navigate to PaymentScreen with updated items
    navigation.navigate('Payment', { selectedItems: itemsToPay });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Order Summary</Text>
      <ScrollView style={styles.scrollView}>
        <OrderSummary selectedItems={items} onUpdateQuantity={handleUpdateQuantity} />
      </ScrollView>
      <Button
        title="Proceed to Payment"
        onPress={handleProceedToPayment}
        style={styles.button}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default OrderScreen;
