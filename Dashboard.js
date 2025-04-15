import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Dashboard = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Imagem discreta no topo */}
            <Image 
                source={require('./assets/tabinfo1.png')} // Substitua pelo caminho correto da sua imagem
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.title}>Bem-vindo ao Dashboard!</Text>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
        opacity: 0.6, // Efeito discreto
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Dashboard;
