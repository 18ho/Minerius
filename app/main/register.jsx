import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const Register = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // 회원가입 처리 함수
  const handleRegister = async () => {
    if (!id || !password || !nickname || !name || !phone) {
      Alert.alert('모든 필드를 채워주세요.');
      return;
    }

    try {
      const response = await axios.post('http://59.0.101.115:3000/api/register', {
        id,
        password,
        nickname,
        name,
        phone
      });

      const data = response.data;
      if (data.success) {
        Alert.alert('회원가입 성공!', '메인 페이지로 이동합니다.');
        navigation.navigate('Main');
      } else {
        Alert.alert('회원가입 실패', data.message);
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      Alert.alert('회원가입 중 오류가 발생했습니다.' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={id}
        onChangeText={setId}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="닉네임"
        value={nickname}
        onChangeText={setNickname}
      />
      <TextInput
        style={styles.input}
        placeholder="이름"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="전화번호"
        value={phone}
        onChangeText={setPhone}
      />
      <Button title="회원가입" onPress={handleRegister} />
      <Button
        title="메인으로 이동"
        onPress={() => navigation.navigate('Main')}  // Main 화면으로 이동
      />
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

export default Register;