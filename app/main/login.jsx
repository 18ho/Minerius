import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Dimensions, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Register from './register.jsx';
import mineriusRemovebgPreview1 from '../asset/logo.png';

const { width, height } = Dimensions.get('window');

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
      <View style={{flex:1}}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.overlap}>
          <Image style={styles.image} source={mineriusRemovebgPreview1} />
          <View style={styles.group}>
            <Text style={styles.titleText}>
              자연재해는 예고 없이 찾아옵니다.
            </Text>
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="아이디"
              value={Id}
              onChangeText={setId}
            />
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="비밀번호"
              secureTextEntry
              value={Password}
              onChangeText={setPassword}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // 스타일 정의 (위와 동일)
  scrollContainer: {
    paddingTop: height * 0.4,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
    flexGrow: 1,
  },
  overlap: {
    backgroundColor: '#f2f8ff',
    width: '100%',
    maxWidth: 450,
    height: height * 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  image: {
    width: '70%',
    height: '60%',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  group: {
    alignItems: 'center',
    marginTop: 10,
  },
  titleText: {
    color: '#343d4c',
    fontSize: width * 0.05,
    fontWeight: '700',
    letterSpacing: -0.65,
    textAlign: 'center',
    fontFamily: 'Pretendard-Medium',
  },
  inputWrapper: {
    width: '80%',
    maxWidth: 400,
    marginBottom: 15,
  },
  inputGroup: {
    backgroundColor: '#dadada4c',
    borderRadius: 10,
    height: 70,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    fontSize: width * 0.05,
    color: '#343d4c',
    fontFamily: 'Pretendard-Medium',
  },
  verifyButton: {
    position: 'absolute',
    right: 20,
    top: 15,
    backgroundColor: '#4a90e2',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  verifyButtonText: {
    color: '#ffffff',
    fontSize: 20,
    height: 30,
    fontFamily: 'Pretendard-Bold',
  },
  button: {
    backgroundColor: '#4a90e2',
    borderRadius: 10,
    height: 60,
    width: '80%',
    maxWidth: 400,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: width * 0.06,
    letterSpacing: -0.65,
    fontFamily: 'Pretendard-Medium',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '80%',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalItem: {
    padding: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  modalItemText: {
    fontSize: 18,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#4a90e2',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default Login;
