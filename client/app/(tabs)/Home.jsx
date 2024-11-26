import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   navbar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#4338ca',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   logoContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   logo: {
//     width: 40,
//     height: 40,
//     marginRight: 8,
//   },
//   appName: {
//     fontSize: 18,
//   },
//   userButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   content: {
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 16,
//     marginBottom: 16,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   cardText: {
//     fontSize: 16,
//     marginBottom: 4,
//   },
// });

export default Home;