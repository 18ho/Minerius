import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions,} from 'react-native';

const { width, height } = Dimensions.get('window');

const Registerss = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.overlap}>
        <Image
          style={styles.image}
          source={require('../resources/image/logo.png')}
        />
        <View style={styles.group}>
          <Text style={styles.titleText}>자연재해는 예고 없이 찾아옵니다.</Text>
        </View>
      </View>

      {['아이디', '비밀번호', '비밀번호 확인'].map((placeholder, index) => (
        <View key={index} style={styles.inputWrapper}>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              placeholderTextColor="#343d4c"
              secureTextEntry={placeholder.includes('비밀번호')}
            />
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
  },
  overlap: {
    backgroundColor: '#f2f8ff',
    width: '100%',
    maxWidth: 450,
    height: height * 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '15%',
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
    fontSize: width * 0.06,
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
    height: 65,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    fontSize: width * 0.05,
    color: '#343d4c',
    fontFamily: 'Pretendard-Medium',
  },
  button: {
    backgroundColor: '#4a90e2',
    borderRadius: 10,
    height: 65,
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
});

export default Registerss;
