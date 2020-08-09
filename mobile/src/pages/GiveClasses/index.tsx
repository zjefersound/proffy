import React from 'react';
import { View, ImageBackground, Text } from 'react-native';

import styles from './styles';

import giveClassesBgImg from '../../assets/images/give-classes-background.png'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const GiveClasses: React.FC = () => {
    const navigation = useNavigation();

    const handleBackLandingPage = () => {
        navigation.goBack();
    }

    return (
        <View style={ styles.container }>
            <ImageBackground 
                resizeMode = 'contain'
                style={ styles.content }
                source={ giveClassesBgImg }
            >
                <Text style={ styles.title }>
                    Quer ser um proffy?
                </Text>
                <Text style={ styles.description }>
                    Para começar, você precisa se cadastrar 
                    como professor na nossa plataforma web.
                </Text>
            </ImageBackground>

            <TouchableOpacity 
                onPress={ handleBackLandingPage }
                style={ styles.okButton }
                activeOpacity={ 0.7 }
            >
                <Text style={ styles.okButtonText }>
                    Tudo bem
                </Text>
            </TouchableOpacity>
        </View>
    ) ;
}

export default GiveClasses;