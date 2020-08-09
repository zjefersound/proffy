import React, { useState, useEffect } from 'react';
import { 
    View, 
    ScrollView, 
    Text, 
    TextInput, 
    TouchableOpacity,
    SafeAreaView, 
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import styles from './styles';
import Header from '../../components/Header';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import api from '../../services/api';

const TeacherList: React.FC = () => {
    const [filtersVisible, setFiltersVisible] = useState(false);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');
    
    const [favorites, setFavorites] = useState<number[]>([]);
    const [teachersList, setTeachersList] = useState([]);

    const handleFiltersSubmit = async () => {
        await loadFavorites();
        api.get('/classes',{
            params: {
                subject,
                week_day,
                time,
            }
        }).then((response) => {
            setTeachersList(response.data);
        });
    }
    const loadFavorites = () => {
        AsyncStorage.getItem('favorites').then((response) => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                });
                setFavorites(favoritedTeachersIds);
            }
        });
    }
    useEffect(()=>{
        handleFiltersSubmit();
    },[]);
    return (
        <View style={styles.container}>
            <Header 
                title='Proffys disponíveis' 
                headerRight={(
                    <BorderlessButton
                        style={{padding:8}}
                        onPress={() => setFiltersVisible(!filtersVisible)}
                    >
                        <Feather 
                            name='filter'
                            size={24}
                            color='#FFF'
                        />
                    </BorderlessButton>
                )}
            >
                {filtersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={ styles.label}>Matéria</Text>
                        <TextInput 
                            placeholderTextColor='#c1bccc'
                            placeholder='Qual a matéria?'
                            value={ subject }
                            onChangeText={ text => setSubject(text) }
                            style={ styles.input }
                        />
                        <View style={ styles.inputGroup }>
                            <View style={ styles.inputBlock }>
                                <Text style={ styles.label}>Dia da semana</Text>
                                <TextInput 
                                    placeholderTextColor='#c1bccc'
                                    placeholder='Qual o dia?'
                                    value={ week_day }
                                    onChangeText={ text => setWeekDay(text) }
                                    style={ styles.input }
                                />
                            </View>
                            <View style={ styles.inputBlock }>
                                <Text style={ styles.label}>Horário</Text>
                                <TextInput 
                                    placeholderTextColor='#c1bccc'
                                    placeholder='Qual o horário?'
                                    value={ time }
                                    onChangeText={ text => setTime(text) }
                                    style={ styles.input }    
                                />
                            </View>
                        </View>
                        <TouchableOpacity 
                            onPress = { handleFiltersSubmit }
                            style={ styles.submitButton }
                            activeOpacity={0.7}
                        >
                            <Feather 
                                name='search'
                                color='#FFF'
                                size={20}
                            />
                            <Text style={styles.submitButtonText}>
                                Pesquisar
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Header>
            <ScrollView 
                style={ styles.teacherList }
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}    
            >
                {teachersList.map((teacher: Teacher) => {
                    return (
                        <TeacherItem 
                            key={String(teacher.id)}
                            teacher = {teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
}

export default TeacherList;