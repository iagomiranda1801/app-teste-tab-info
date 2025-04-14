import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Função para validar os campos
  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return false;
    }

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return false;
    }

    return true;
  };

  // Função para consumir a API de redefinição de senha
  const handleResetPassword = async () => {
    if (!validateForm()) return; // Valida antes de continuar

    try {
      const response = await fetch('SUA_API_DE_REDEFINICAO_DE_SENHA', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      // Verifica a resposta da API
      if (response.ok) {
        const data = await response.json();
        // Tratar a resposta, como mostrar uma mensagem de sucesso
        Alert.alert('Sucesso', 'Senha redefinida com sucesso!');
      } else {
        const error = await response.json();
        Alert.alert('Erro', error.message || 'Falha ao redefinir a senha.');
      }
    } catch (error) {
      console.error('Erro ao redefinir a senha:', error);
      Alert.alert('Erro', 'Ocorreu um erro. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Nova Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
        placeholder="Confirmar Senha"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Redefinir Senha" onPress={handleResetPassword} />
    </View>
  );
};

export default ResetPasswordScreen;
