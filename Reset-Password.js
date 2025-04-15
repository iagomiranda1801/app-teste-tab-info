import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleResetPassword = async () => {
      console.log("entrei no password")
    if (!email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return false;
    }
    setLoading(true);
    try {
      const response = await fetch('http://192.168.1.3/teste-tab-info/reset-password.php', {
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
      if (data.success) {
        
        Alert.alert('Sucesso', 'Senha redefinida com sucesso!');

        setTimeout(() => {
          navigation.navigate('Login');
        }, 1500);
      } else {
        Alert.alert('Erro', data.message || 'Falha ao redefinir a senha.');
      }
    } catch (error) {
      console.error('Erro ao redefinir a senha:', error);
      Alert.alert('Erro', 'Ocorreu um erro. Tente novamente mais tarde.');
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Redefinir Senha</Text>
       {loading && <ActivityIndicator size="large" color="#4CAF50" style={{ marginBottom: 20 }} />}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Nova Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, { flex: 1, marginRight: 10 }]} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Redefinir Senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { flex: 1, backgroundColor: '#aaa' }]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    padding: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
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
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResetPasswordScreen;
