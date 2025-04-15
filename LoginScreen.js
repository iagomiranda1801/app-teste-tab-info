import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Alert, ActivityIndicator, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Função para consumir a API de login
  const handleLogin = async () => {


    if (!email || !password) {
      console.log("entrei no if")
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return false;
    }
    setLoading(true);
    try {
      const response = await fetch('http://192.168.1.3/teste-tab-info/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          senha: password,
        }),
      });

      const data = await response.json();
      console.log("response", data)

      // Verifica se a resposta da API foi bem-sucedida
      if (data.success) {
        setLoading(false);
        // Aqui você pode tratar a resposta da API, como armazenar o token ou redirecionar o usuário
        console.log('Login bem-sucedido:', data);

        Alert.alert('Sucesso', 'Login realizado com sucesso!');

        await AsyncStorage.setItem('userId', data.user.id.toString());

        navigation.navigate('Dashboard');

      } else {
        // Caso o login falhe
        setLoading(false);
        Alert.alert('Atenção', data.message || 'Falha no login.');
      }
    } catch (error) {
      setLoading(false);
      console.log('Erro ao fazer login:', error);
      Alert.alert('Erro', 'Ocorreu um erro. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/tabinfo1.png')} // Ou uma URL: { uri: 'https://link-da-sua-imagem' }
        style={styles.logo}
        resizeMode="contain"
      />
      {loading && <ActivityIndicator size="large" color="#4CAF50" style={{ marginBottom: 20 }} />}
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Bem-vindo!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: '100%', }} onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={styles.signupText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  logo: {
    width: 200,
    height: 100,
    bottom: 50,
    opacity: 0.8, // Discreto!
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 15,
    fontSize: 14,
    color: '#777',
    width: '100%',
    textAlign: 'center',
  },
  signupLink: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
