import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import mineriusRemovebgPreview1 from '../asset/logo.png';

const { width, height } = Dimensions.get('window');

// 지역과 해당 지역의 동 목록을 정의
const areas = {
  서울: {
    강남구: ['역삼동', '신사동', '압구정동', '논현동'],
    서초구: ['서초동', '잠원동', '반포동'],
    강동구: ['천호동', '길동', '둔촌동'],
    강서구: ['화곡동', '가양동', '등촌동'],
    관악구: ['신림동', '봉천동'],
    종로구: ['명륜동', '청운동'],
    중구: ['을지로동', '신당동', '황학동'],
    용산구: ['이태원동', '한남동'],
  },
  경기: {
    수원시: ['영통구', '장안구'],
    용인시: ['기흥구', '수지구', '처인구'],
    성남시: ['분당구', '수정구', '중원구'],
    고양시: ['덕양구', '일산동구', '일산서구'],
    안산시: ['상록구', '단원구'],
    안양시: ['만안구', '동안구'],
    평택시: ['팽성읍', '신장동'],
    파주시: ['금촌동', '운정동'],
  },
  광주: {
    동구: [
      '충장동', '계림동', '산수동', '학동', '지산동', '남광주동', '동명동', '운림동',
      '광산동', '대인동', '소태동', '불로동', '지산2동', '남계동', '무등동'
    ],
    서구: [
      '화정동', '농성동', '상무동', '풍암동', '쌍촌동', '금호동', '양동', '동천동',
      '치평동', '화정1동', '유덕동', '서석동', '서창동', '마륵동', '덕흥동'
    ],
    남구: [
      '방림동', '주월동', '월산동', '봉선동', '진월동', '송하동', '구소동', '임암동',
      '양림동', '백운동', '노대동', '지석동', '양촌동', '행암동', '원산동'
    ],
    북구: [
      '문흥동', '용봉동', '운암동', '매곡동', '두암동', '삼각동', '일곡동', '오치동',
      '중흥동', '신안동', '우산동', '건국동', '양산동', '연제동', '청풍동'
    ],
    광산구: [
      '송정동', '신가동', '수완동', '도산동', '비아동', '우산동', '운남동', '선암동',
      '하남동', '신창동', '월계동', '소촌동', '장덕동', '임곡동', '하산동'
    ],
  },
  전남: {
    여수시: [
      '학동', '웅천동', '문수동', '여서동', '덕충동', '종화동', '신기동', '돌산읍', '국동',
      '소라면', '쌍봉동', '오림동', '봉계동', '충무동', '장흥면'
    ],
    순천시: [
      '연향동', '조례동', '왕지동', '장천동', '매곡동', '도사동', '오천동', '향동',
      '삼산동', '송광면', '해룡면', '덕월동', '낙안면', '별량면'
    ],
    목포시: [
      '산정동', '하당동', '용당동', '용해동', '죽교동', '대성동', '용당2동', '연동',
      '옥암동', '상동', '부주동', '북항동', '목원동', '연산동', '유달동'
    ],
    나주시: [
      '남내동', '빛가람동', '노안면', '금성동', '반남면', '봉황면', '다도면', '다시면',
      '영강동', '영산포동', '왕곡면', '금천면', '문평면', '안창동', '칠전동'
    ],
    광양시: [
      '중동', '마동', '광영동', '금호동', '옥곡면', '광양읍', '진월면', '봉강면',
      '옥룡면', '고흥면', '진상면', '덕례동', '서천동', '명당동'
    ],
  },
  부산: [],
  울산: [],
  대전: [],
  대구: [],
  인천: [],
  강원: [],
  충북: [],
  충남: [],
  전북: [],
  경북: [],
  경남: [],
  제주: [],
};

const Register = () => {
  const [currentPage, setCurrentPage] = useState('Register');
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const goToNicknamePage = () => {
    setCurrentPage('Nickname');
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

            <View style={styles.inputWrapper}>
              <View style={styles.inputGroup}>
                <TextInput
                  style={styles.input}
                  placeholder="아이디"
                  placeholderTextColor="#343d4c"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current.focus()}
                />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <View style={styles.inputGroup}>
                <TextInput
                  ref={passwordRef}
                  style={styles.input}
                  placeholder="비밀번호"
                  placeholderTextColor="#343d4c"
                  secureTextEntry
                  returnKeyType="next"
                  onSubmitEditing={() => confirmPasswordRef.current.focus()}
                />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <View style={styles.inputGroup}>
                <TextInput
                  ref={confirmPasswordRef}
                  style={styles.input}
                  placeholder="비밀번호 확인"
                  placeholderTextColor="#343d4c"
                  secureTextEntry
                  returnKeyType="done"
                />
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={goToNicknamePage}>
              <Text style={styles.buttonText}>다음</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      ) : currentPage === 'Nickname' ? (
        <NicknamePage onNext={() => setCurrentPage('Element')} />
      ) : (
        <Element />
      )}
    </>
  );
};

const NicknamePage = ({ onNext }) => (
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

    <TouchableOpacity style={styles.button} onPress={onNext}>
      <Text style={styles.buttonText}>다음</Text>
    </TouchableOpacity>
  </ScrollView>
);

const Element = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState(''); // 선택된 주소
  const [selectedArea, setSelectedArea] = useState(''); // 선택된 지역
  const [selectedGu, setSelectedGu] = useState(''); // 선택된 구
  const [isAreaModalVisible, setAreaModalVisible] = useState(false); // 지역 선택 모달 상태
  const [isGuModalVisible, setGuModalVisible] = useState(false); // 구 선택 모달 상태
  const [isDongModalVisible, setDongModalVisible] = useState(false); // 동 선택 모달 상태

  const handlePhoneNumberChange = (text) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    let formatted = cleaned;
    if (cleaned.length > 3 && cleaned.length <= 7) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else if (cleaned.length > 7) {
      formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
    }
    setPhoneNumber(formatted);
  };

  // "지역" 선택 시 호출되는 함수
  const selectArea = (area) => {
    setSelectedArea(area);
    setAreaModalVisible(false); // 지역 선택 모달 닫기
    setGuModalVisible(true); // 구 선택 모달 열기
  };

  // "구" 선택 시 호출되는 함수
  const selectGu = (gu) => {
    setSelectedGu(gu);
    setGuModalVisible(false); // 구 선택 모달 닫기
    setDongModalVisible(true); // 동 선택 모달 열기
  };

  // "동" 선택 시 호출되는 함수
  const selectDong = (dong) => {
    setAddress(`${selectedArea} ${selectedGu} ${dong}`);
    setDongModalVisible(false); // 동 선택 모달 닫기
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.overlap}>
        <Image style={styles.image} source={mineriusRemovebgPreview1} />
        <View style={styles.group}>
          <Text style={styles.titleText}>지금 바로 가입하세요!</Text>
        </View>
      </View>

      <View style={styles.inputWrapper}>
        <View style={styles.inputGroup}>
          <TextInput style={styles.input} placeholder="이름" placeholderTextColor="#343d4c" />
        </View>
      </View>

      <View style={styles.inputWrapper}>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="전화번호"
            placeholderTextColor="#343d4c"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
          />
          <TouchableOpacity style={styles.verifyButton}>
            <Text style={styles.verifyButtonText}>인증하기</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 주소 (지역 선택 및 동 선택) */}
      <View style={styles.inputWrapper}>
        <TouchableOpacity style={styles.inputGroup} onPress={() => setAreaModalVisible(true)}>
          <Text style={styles.input}>
            {address || '주소 (지역 선택)'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 지역 선택 모달 */}
      <Modal visible={isAreaModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>지역 선택</Text>
            <FlatList
              data={Object.keys(areas)}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectArea(item)} style={styles.modalItem}>
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setAreaModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 구 선택 모달 */}
      <Modal visible={isGuModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>구 선택 ({selectedArea})</Text>
            <FlatList
              data={Object.keys(areas[selectedArea] || {})}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectGu(item)} style={styles.modalItem}>
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setGuModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 동 선택 모달 */}
      <Modal visible={isDongModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>동 선택 ({selectedGu})</Text>
            <FlatList
              data={areas[selectedArea]?.[selectedGu] || []}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectDong(item)} style={styles.modalItem}>
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setDongModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>완료하기</Text>
      </TouchableOpacity>
    </ScrollView>
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

export default Register;