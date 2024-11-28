import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Image } from 'react-native';
import { getAllCourses, getUser } from '../../api/apiRequest';
import Navbar from '../components/navbar';
import { styles } from './style';

const Home = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [courses, setCourses] = useState([]);
 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser();
        setUsername(userData.user.username);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchCourses = async () => {
      try {
        const coursesData = await getAllCourses();
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchUserData();
    fetchCourses();
  }, []);

  const handleCoursePress = (courseId) => {
    navigation.navigate('Classes', { courseId });
  };

  return (
    <View style={styles.container}>
      <Navbar username={username} navigation={navigation}/>
      <Image source={require('../../assets/slider1.jpg')} style={styles.banner} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Welcome, {username}</Text>
        {courses.map((course) => (
          <View key={course._id} style={styles.card}>
            <Text style={styles.cardTitle}>Course on {course.dayOfWeek}</Text>
            <Text style={styles.cardText}>Time: {course.courseTime}</Text>
            <Text style={styles.cardText}>Price per Class: ${course.pricePerClass}</Text>
            <Text style={styles.cardText}>Class Type: {course.classType}</Text>
            <Text style={styles.cardText}>Location: {course.location}</Text>
            <Button title="View all Class" onPress={() => handleCoursePress(course._id)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;