import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity, Modal, Image } from 'react-native';
import { checkout, deleteItemInCart, getCart, getUser } from '../../api/apiRequest';
import Navbar from '../components/navbar';
import { styles } from './style';

const Cart = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser();
        setUsername(userData.user.username);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchCartData = async () => {
      try {
        const cartData = await getCart();
        setCarts(cartData.items || []);
        calculateTotalPrice(cartData.items || []);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    }

    fetchUserData();
    fetchCartData();
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => {
      const price = item.classId.yogaCourseId?.pricePerClass || 0;
      return sum + price;
    }, 0);
    setTotalPrice(total);
  };

  const handleDeleteItemInCart = async (itemId) => {
    try {
      const data = await deleteItemInCart(itemId);
      setCarts(data.items);
      console.log('data.items:', data.items);
      calculateTotalPrice(data.items);
    } catch (error) {
      console.error('Error deleting item in cart:', error);
    }
  }

  const handleCheckout = async () => {
    try {
      await checkout(totalPrice);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error checkout:', error);
    }
  };

  const openModal = (type, itemId = null) => {
    setModalType(type);
    setSelectedItemId(itemId);
    setModalVisible(true);
  };

  const confirmAction = () => {
    if (modalType === 'delete') {
      handleDeleteItemInCart(selectedItemId);
    } else if (modalType === 'checkout') {
      handleCheckout();
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Navbar username={username} navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        {carts.length === 0 ? (
          <>
          <Image source={require('../../assets/empty-cart.png')} style={styles.banner} />
              <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.checkoutButtonText}>Buy something</Text>
              </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>Your Cart</Text>
            {carts.map((item) => (
              <View key={item._id} style={styles.card}>
                <Text style={styles.cardText}>Class ID: {item.classId._id}</Text>
                <Text style={styles.cardText}>Teacher: {item.classId.teacherName}</Text>
                <Text style={styles.cardText}>Description: {item.classId.description}</Text>
                <Text style={styles.cardText}>Date: {new Date(item.classId.date).toLocaleDateString()}</Text>
                <Text style={styles.cardText}>Duration: {item.classId.duration}</Text>
                <Text style={styles.cardText}>Capacity: {item.classId.capacity}</Text>
                <Text style={styles.cardText}>Price: ${item.classId.yogaCourseId?.pricePerClass || 0}</Text>
                <Text style={styles.cardText}>Order Date: {new Date(item.orderAt).toLocaleDateString()}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={() => openModal('delete', item._id)}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total Price: ${totalPrice.toFixed(2)}</Text>
              <TouchableOpacity style={styles.checkoutButton} onPress={() => openModal('checkout')}>
                <Text style={styles.checkoutButtonText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {modalType === 'delete' ? 'Are you sure you want to delete this item?' : 'Are you sure you want to proceed to checkout?'}
            </Text>
            <View style={styles.modalButtonContainer}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Confirm" onPress={confirmAction} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Cart;