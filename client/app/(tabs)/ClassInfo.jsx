import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Navbar from "../components/navbar";
import { styles } from "./style";
import { useEffect, useState } from "react";
import { getClassTypeById, getUser } from "../../api/apiRequest";

const ClassInfo = ({ route, navigation }) => {
    const { classId } = route.params;
    const [username, setUsername] = useState('');
    const [classInfo, setClassInfo] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUser();
                setUsername(userData.user.username);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchClass = async () => {
            try {
                const classesData = await getClassTypeById(classId);
                setClassInfo(classesData);
            } catch (error) {
                console.error('Error fetching class:', error);
            }
        };

        fetchUserData();
        fetchClass();
    }, []);
    return (
        <View style={styles.container}>
            <Navbar username={username} navigation={navigation} />
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.content}>
                {classInfo && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Class Information</Text>
                        <Text style={styles.cardText}>Teacher: {classInfo.teacherName}</Text>
                        <Text style={styles.cardText}>Description: {classInfo.description}</Text>
                        <Text style={styles.cardText}>Date: {new Date(classInfo.date).toLocaleDateString()}</Text>
                        <Text style={styles.cardText}>Duration: {classInfo.duration} hours</Text>
                        <Text style={styles.cardText}>Capacity: {classInfo.capacity}</Text>
                        <Text style={styles.cardText}>Participants({classInfo.participants.length}):</Text>
                        {classInfo.participants.map((participant) => (
                            <Text key={participant._id} style={styles.participantText}>
                                - {participant.username}
                            </Text>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

export default ClassInfo;