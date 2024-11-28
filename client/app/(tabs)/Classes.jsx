import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { addToCart, getAllClassesInCourse, getCart, getCourseById, getUser } from '../../api/apiRequest';
import Navbar from '../components/navbar';
import { styles } from './style';

const Classes = ({ route, navigation }) => {
    const { courseId } = route.params;
    const [username, setUsername] = useState('');
    const [classes, setClasses] = useState([]);
    const [course, setCourse] = useState(null);
    const [userId, setUserId] = useState('');
    const [cartItems, setCartItems] = useState([]);

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

        const fetchCourseData = async () => {
            try {
                const courseData = await getCourseById(courseId);
                setCourse(courseData);
            } catch (error) {
                console.error('Error fetching course data:', error);
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

        const fetchCartData = async () => {
            try {
                const cartData = await getCart();
                setCartItems(cartData.items.map(item => item.classId._id));
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchUserData();
        fetchCourseData();
        fetchClasses();
        fetchCartData();
    }, [courseId]);

    const handleAddToCart = async (classId) => {
        try {
            await addToCart(classId);
            setCartItems([...cartItems, classId]);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const handleViewClassInfo = (classId) => {
        navigation.navigate('ClassInfo', { classId });
    };

    return (
        <View style={styles.container}>
            <Navbar username={username} navigation={navigation} />
            <Image source={require('../../assets/slider2.jpg')} style={styles.banner} />
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.backButtonText}>Back to Home</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.content}>
                {course && (
                    <View style={styles.courseCard}>
                        <Text style={styles.courseTitle}>Course Information</Text>
                        <Text style={styles.courseText}>Day of Week: {course.dayOfWeek}</Text>
                        <Text style={styles.courseText}>Time: {course.courseTime}</Text>
                        <Text style={styles.courseText}>Price per Class: ${course.pricePerClass}</Text>
                        <Text style={styles.courseText}>Class Type: {course.classType}</Text>
                        <Text style={styles.courseText}>Location: {course.location}</Text>
                    </View>
                )}
                <Text style={styles.title}>Classes in Course</Text>
                {classes.map((classItem) => (
                    <View key={classItem._id} style={styles.card}>
                        <Text style={styles.cardTitle}>Teacher {classItem.teacherName}</Text>
                        <Text style={styles.cardText}>Description: {classItem.description}</Text>
                        <Text style={styles.cardText}>Date: {new Date(classItem.date).toLocaleDateString()}</Text>
                        <Text style={styles.cardText}>Duration: {classItem.duration}</Text>
                        <Text style={styles.cardText}>Capacity: {classItem.capacity}</Text>
                        <Text style={styles.cardText}>Status: {classItem.participants.length < classItem.capacity ? "Available" : "Full"}</Text>
                        {classItem.participants.includes(userId) ? (
                            <Button
                                title="View Class Information"
                                onPress={() => handleViewClassInfo(classItem._id)}
                                style={styles.viewClassButton}
                            />
                        ) : (
                            <Button
                                title="Add to Cart"
                                onPress={() => handleAddToCart(classItem._id)}
                                disabled={classItem.participants.length >= classItem.capacity || cartItems.includes(classItem._id)}
                                style={styles.addToCartButton}
                            />
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default Classes;