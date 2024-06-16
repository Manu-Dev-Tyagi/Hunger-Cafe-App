import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, RefreshControl, TouchableOpacity, Alert, Button} from 'react-native';
import axios from 'axios';

const Menu = ({ refreshing, onRefresh, onProceedToSummary }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://172.16.165.17:8000/api/menu');
        console.log('Response data:', response.data);
        setMenuItems(response.data);
        const initialQuantities = response.data.reduce((acc, item) => {
          acc[item._id] = 0;
          return acc;
        }, {});
        setQuantities(initialQuantities);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError('Failed to fetch menu items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [refreshing]);

  const incrementQuantity = (id) => {
    setQuantities({ ...quantities, [id]: quantities[id] + 1 });
  };

  const decrementQuantity = (id) => {
    if (quantities[id] > 0) {
      setQuantities({ ...quantities, [id]: quantities[id] - 1 });
    }
  };

  const handleProceedToSummary = () => {
    const selectedItems = menuItems.filter(item => quantities[item._id] > 0).map(item => ({
      ...item,
      quantity: quantities[item._id]
    }));

    if (selectedItems.length === 0) {
      Alert.alert('No Items Selected', 'Please select items from the menu before proceeding.');
    } else {
      onProceedToSummary(selectedItems);
    }
  };

  const handleRefresh = async () => {
    onRefresh();
    try {
      const response = await axios.get('http://172.16.165.17:8000/api/menu');
      setMenuItems(response.data);
    } catch (err) {
      setError('Failed to refresh menu items. Please try again.');
    } finally {
      setTimeout(() => {
        onRefresh();
      }, 2000);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.menuItem}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage} />
      )}
      <View style={styles.itemDetails}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.priceQuantityContainer}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => decrementQuantity(item._id)} style={styles.button}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantities[item._id]}</Text>
            <TouchableOpacity onPress={() => incrementQuantity(item._id)} style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  if (loading && !menuItems.length) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#0000ff"
            title="Pull to refresh..."
            titleColor="#0000ff"
          />
        }
        ListFooterComponent={() => (
          loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        )}
      />
      <TouchableOpacity
        style={styles.proceedButton}
        onPress={handleProceedToSummary}
        disabled={Object.values(quantities).every(quantity => quantity === 0)}
      >
        <Text style={styles.proceedButtonText}>Proceed to Order Summary</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  menuItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#cccccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    minWidth: 20,
    textAlign: 'center',
    color: '#000',
  },
  proceedButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Menu;
