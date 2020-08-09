import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import api from '../../services/api';

export interface Teacher {
    id: number;
    user_id: number;
    subject: string;
    cost: number;
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
}
interface TeacherItemProps {
    teacher: Teacher;
    favorited: boolean;
}
const TeacherItem: React.FC<TeacherItemProps> = ({teacher, favorited}) => {
    const [isFavorited, setIsFavorited] = useState(favorited);
    const handleLinkToWhatsapp = () => {
        api.post('/connections', {user_id: teacher.user_id});
        Linking.openURL(`whatsapp://send?text=Olá!&phone=${teacher.whatsapp}`)
    }   
    const handleToggleFavorite = async () => {
        const favorites = await AsyncStorage.getItem('favorites');
        
        let favoritesArray = [];
        if (favorites) {
            favoritesArray = JSON.parse(favorites);
        }

        if (isFavorited) {      
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
                return teacherItem.id === teacher.id;
            })
            favoritesArray.splice(favoriteIndex, 1);
            setIsFavorited(false);
        } else {
            favoritesArray.push(teacher);
            setIsFavorited(true);
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    } 
    return (
        <View style={ styles.container }>
            <View style={ styles.profile }>
                <Image 
                    style={ styles.avatar}
                    source={{
                        uri: teacher.avatar
                    }}
                />

                <View style={styles.profileInfo}>
                    <Text style={ styles.name }>
                        {teacher.name}
                    </Text>
                    <Text style={ styles.subject }>
                        {teacher.subject}
                    </Text>
                </View>
            </View>

            <Text style={ styles.bio }>
                {teacher.bio}
            </Text>

            <View style={ styles.footer }>
                <Text style={ styles.price }>
                    Preço/Hora {'   '}
                    <Text style={ styles.priceValue }>
                        {teacher.cost}
                    </Text>
                </Text>
                <View style={ styles.buttonsContainer}> 
                    <TouchableOpacity 
                        onPress={ handleToggleFavorite }
                        style={[ styles.favoriteButton, isFavorited && styles.favorited ]}
                        activeOpacity={0.7}
                    >
                        {isFavorited
                            ? <Image source={unfavoriteIcon} />
                            : <Image source={heartOutlineIcon} />
                        }                        
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={ handleLinkToWhatsapp }
                        style={ styles.contactButton }
                        activeOpacity={0.7}
                    >
                        <Image source={whatsappIcon} />
                        <Text style={ styles.contactButtonText }>Entrar em contato</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default TeacherItem;