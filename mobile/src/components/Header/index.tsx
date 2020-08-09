import React, { ReactNode } from 'react';
import { View, Image, Text, SafeAreaView } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native'; 

import styles from './styles';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';

interface HeaderProps {
    title: string;
    headerRight?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({
    title, children, headerRight
}) => {
    const {navigate} = useNavigation();
    const handleGoBack = () => {
        navigate('Landing');
    }
    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.topBar }>
                <BorderlessButton
                    onPress = { handleGoBack }
                >
                    <Image 
                        source={backIcon} 
                        resizeMode='contain'
                    />
                </BorderlessButton>
                <Image 
                    source={logoImg} 
                    resizeMode='contain'
                />
            </View>

            <View style={ styles.header }>
                <Text style={styles.title}>
                    {title}
                </Text>
                {headerRight}
            </View>

            {children}
        </SafeAreaView>
    );
}

export default Header;