import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import Register from './register.jsx';

const Login = ({ navigation, setSessionId }) => {
  const [Id, setId] = useState('');
  const [Password, setPassword] = useState('');

  const handleLogin = async () => {
    if ( !Id || !Password ) {
      Alert.alert('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post('http://59.0.101.115:3000/api/login', {
        Id,
        Password
      });

      const data = response.data;
      if (data.success) {
        setSessionId(data.id);
        Alert.alert('로그인 성공!', '메인 페이지로 이동합니다.');
        navigation.navigate('Main');
      } else {
        Alert.alert(data.message);
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      Alert.alert('로그인 중 오류가 발생했습니다.' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={Id}
        onChangeText={setId}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry
        value={Password}
        onChangeText={setPassword}
      />
      <Button title="로그인" onPress={handleLogin} />
      <Button title="회원가입" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default Login;
