import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { addToCart, getAllClassesInCourse, getUser } from '../../api/apiRequest';
import Navbar from '../components/navbar';
import { styles } from './style';

const Classes = ({ route, navigation }) => {
    const { courseId } = route.params;
    const [username, setUsername] = useState('');
    const [classes, setClasses] = useState([]);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUser();
                setUsername(userData.user.username);
                setUserId(userData.user._id);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchClasses = async () => {
            try {
                const classesData = await getAllClassesInCourse(courseId);
                setClasses(classesData);
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };

        fetchUserData();
        fetchClasses();
    }, [courseId]);

    const handleAddToCart = async (classId) => {
        try {
            await addToCart(classId);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    }

    return (
        <View style={styles.container}>
            <Navbar username={username} navigation={navigation} />
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.backButtonText}>Back to Home</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Classes for Course</Text>
                {classes.map((classItem) => (
                    <View key={classItem._id} style={styles.card}>
                        <Text style={styles.cardTitle}>Teacher {classItem.teacherName}</Text>
                        <Text style={styles.cardText}>Description: {classItem.description}</Text>
                        <Text style={styles.cardText}>Date: {new Date(classItem.date).toLocaleDateString()}</Text>
                        <Text style={styles.cardText}>Duration: {classItem.duration}</Text>
                        <Text style={styles.cardText}>Capacity: {classItem.capacity}</Text>
                        <Text style={styles.cardText}>Status: {classItem.participants.length < classItem.capacity ? "Available" : "Full"}</Text>
                        <Button 
                        title="Add to Cart" 
                        onPress={() => handleAddToCart(classItem._id)} 
                        disabled={classItem.participants.includes(userId)}
                        style={styles.addToCartButton}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default Classes;