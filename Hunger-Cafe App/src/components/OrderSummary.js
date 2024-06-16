import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OrderSummary = ({ selectedItems, onUpdateQuantity }) => {
  if (!selectedItems || selectedItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyMessage}>No items selected</Text>
      </View>
    );
  }

  const handleIncrement = (index) => {
    onUpdateQuantity(index, selectedItems[index].quantity + 1);
  };

  const handleDecrement = (index) => {
    const newQuantity = selectedItems[index].quantity - 1;
    onUpdateQuantity(index, newQuantity >= 0 ? newQuantity : 0);
  };

  const getTotalAmount = () => {
    return selectedItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      {selectedItems.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => handleDecrement(index)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => handleIncrement(index)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      ))}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Amount:</Text>
        <Text style={styles.totalAmount}>${getTotalAmount()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemName: {
    flex: 2,
    fontSize: 16,
    color: '#333333',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
    color: '#333333',
  },
  itemTotal: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
    color: '#333333',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#333333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default OrderSummary;
