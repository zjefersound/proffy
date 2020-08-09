import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';


import styles from './styles';
import Header from '../../components/Header';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

const Favorites: React.FC = () => {
    const [teacherList, setTeacherList] = useState([]);
    const loadFavorites = () => {
        AsyncStorage.getItem('favorites').then((response) => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                setTeacherList(favoritedTeachers);
            }
        });
    }
    useFocusEffect(()=>{
        loadFavorites();
    });
    return (
        <View style={styles.container}>
            <Header title='Meus proffys favoritos'/>
            <ScrollView 
                style={ styles.teacherList }
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}    
            >
                {teacherList.map((teacher: Teacher) => {
                    return (
                        <TeacherItem key={teacher.id} 
                            teacher = {teacher}
                            favorited
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
}

export default Favorites;