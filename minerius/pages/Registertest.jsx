import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import mineriusRemovebgPreview1 from '../resources/image/logo.png';

const { width, height } = Dimensions.get('window');

const Registertest = () => {
  const [currentPage, setCurrentPage] = useState('Register');

  const goToElementPage = () => {
    setCurrentPage('Element'); // 페이지 변경
  };

  return (
    <>
      {currentPage === 'Register' ? (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.overlap}>
              <Image style={styles.image} source={mineriusRemovebgPreview1} />
              <View style={styles.group}>
                <Text style={styles.titleText}>
                  자연재해는 예고 없이 찾아옵니다.
                </Text>
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

            <TouchableOpacity style={styles.button} onPress={goToElementPage}>
              <Text style={styles.buttonText}>다음</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      ) : (
        <Element /> // 두 번째 페이지 렌더링
      )}
    </>
  );
};

const Element = () => (
  <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.overlap}>
      <Image style={styles.image} source={mineriusRemovebgPreview1} />
      <View style={styles.group}>
        <Text style={styles.titleText}>
          여러분의 작은 참여가 큰 차이를 만듭니다.
        </Text>
      </View>
    </View>

      <View style={styles.inputWrapper}>
        <View style={styles.inputGroup}>
          <TextInput style={styles.input} placeholder="닉네임" placeholderTextColor="#343d4c" />
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
  </ScrollView>
);



const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: height * 0.4, // 상단 고정 영역을 피하기 위한 여백
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
    flexGrow: 1,
  },
  elementScrollContainer: {
    paddingTop: height * 0.4, // 두 번째 페이지 여백
    alignItems: 'center',
    flexGrow: 1,
    height: '100%',
    backgroundColor: '#000000',
  },
  overlap: {
    backgroundColor: '#f2f8ff',
    width: '100%',
    maxWidth: 450,
    height: height * 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // 상단 고정
    top: 0,
    zIndex: 1,
  },
  elementContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // 상단부터 정렬
    backgroundColor: '#FFFFFF',
    width: '100%',
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
});

export default Registertest;
