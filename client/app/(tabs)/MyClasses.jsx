import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Navbar from "../components/navbar";
import { styles } from "./style";
import { useEffect, useState } from "react";
import { getClassByUser, getUser } from "../../api/apiRequest";

const MyClasses = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUser();
                setUsername(userData.user.username);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchClassByUser = async () => {
            try {
                const classesData = await getClassByUser();
                setClasses(classesData);
            } catch (error) {
                console.error('Error fetching class:', error);
            }
        };

        fetchUserData();
        fetchClassByUser();
    }, []);

    return (
        <View style={styles.container}>
            <Navbar username={username} navigation={navigation} />
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.content}>
                {classes.map((classInfo) => (
                    <View key={classInfo._id} style={styles.card}>
                        <Text style={styles.cardTitle}>Class Information</Text>
                        <Text style={styles.cardText}>Teacher: {classInfo.teacherName}</Text>
                        <Text style={styles.cardText}>Description: {classInfo.description}</Text>
                        <Text style={styles.cardText}>Date: {new Date(classInfo.date).toLocaleDateString()}</Text>
                        <Text style={styles.cardText}>Duration: {classInfo.duration} minutes</Text>
                        <Text style={styles.cardText}>Capacity: {classInfo.capacity}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default MyClasses;