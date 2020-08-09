import React, { useState, useEffect } from 'react';
import { 
    View, 
    Image, 
    Text,
    TouchableOpacity 
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import api from '../../services/api';

import styles from './styles';

//images
import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png'

const Landing: React.FC = () => {
    const [totalConnections, setTotalConnections] = useState(0);
    const navigation = useNavigation();
    
    const handleNavigateToGiveClassesPage = () => {
        navigation.navigate('GiveClasses');
    }
    const handleNavigateToStudyPage = () => {
        navigation.navigate('Study');
    }

    useFocusEffect(() => {
        api.get('/connections').then(response => {
            setTotalConnections(response.data.total);
        });
    });
    return (
        <View style={ styles.container }>
            <Image style={ styles.banner } source={ landingImg }/>
            
            <Text style={ styles.title }>
                Seja bem-vindo, {'\n'}
                <Text style={ styles.titleBold }>
                    O que deseja fazer?
                </Text>
            </Text>

            <View style={ styles.buttonsContainer }>
                <TouchableOpacity 
                    activeOpacity={ 0.7 } 
                    style={ [styles.button, styles.buttonPrimary] }
                    onPress={ handleNavigateToStudyPage }
                >
                    <Image source={ studyIcon }/>
                    <Text style={ styles.buttonText }>Estudar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    activeOpacity={ 0.7 } 
                    style={ [styles.button, styles.buttonSecondary] }
                    onPress={ handleNavigateToGiveClassesPage }
                >
                    <Image source={ giveClassesIcon }/>
                    <Text style={ styles.buttonText }>Dar aulas</Text>
                </TouchableOpacity>
            </View>

            <Text style={ styles.totalConnections }>
                Total de {totalConnections} conexões já realizadas {'  '}
                <Image style={ styles.heartIcon } source={ heartIcon }/>
            </Text>
        </View>
    );
}

export default Landing;