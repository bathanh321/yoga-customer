import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { logout } from '../../api/apiRequest';

const Navbar = ({ username, navigation }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleLogout = () => {
        Alert.alert(
          'Logout',
          'Are you sure you want to logout?',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Logout cancelled'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                logout();
                Alert.alert('Logout', 'You have been logged out.');
                navigation.navigate('Login');
              },
            },
          ],
          { cancelable: false }
        );
      };
    
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const handleNavigateToCart = () => {
    setDropdownVisible(false);
    navigation.navigate('Cart');
  };

    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : '';
    };
    return (
        <>
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/logo.png')} style={styles.logo} />
                <Text style={styles.appName}>Yoga App</Text>
            </View>
          </TouchableOpacity>
            <TouchableOpacity style={styles.userButton} onPress={toggleDropdown}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{getInitials(username)}</Text>
                </View>
            </TouchableOpacity>
        </View>
        {dropdownVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.dropdownItem} onPress={handleNavigateToCart}>
            <Text style={styles.dropdownText}> Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem} onPress={handleLogout}>
            <Text style={styles.dropdownText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
        </>
    )
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#4338ca',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 8,
    },
    appName: {
        fontSize: 18,
    },
    userButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    dropdown: {
        position: 'absolute',
        top: 60,
        right: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 2,
        zIndex: 1000,
    },
    dropdownItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        width: 120,
    },
    dropdownText: {
        fontSize: 16,
    },
})

export default Navbar