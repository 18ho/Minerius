import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View, ScrollView, Image, Text, Button, FlatList } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { WeatherWidget } from './WeatherWidget.jsx';
import { NewsWidget } from './NewsWidget.jsx';
import { Notifee } from './Notifee.jsx';
import axios from 'axios';

const Container = styled.View`
    flex: 0.7;
    justify-content: center;
`;

const StyledText = styled.Text`
    font-size:20px;
`;

const styles = StyleSheet.create({
  // 전체 컨테이너
  container: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 0,
  },
  // 헤더
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  volunteerHeader: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  // 프로필 섹션
  profileSection: {
    backgroundColor: '#f2f8ff',
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    marginTop: 180,
    borderWidth: 2,
    borderColor: '#343d4c',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
  },
  profileView: {
    borderWidth : 1,
    borderColor: '#343d4c',
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    marginBottom: 10,

  },
  profileName: {
    fontSize: 18,
    color: '#343d4c',
  },
  editButton: {
    backgroundColor: '#F2F8FF',
    paddingVertical: 50,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  editButtonText: {
    color: '#343d4c',
    fontSize: 16,
  },
  // 섹션
  section: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 0,
    marginHorizontal: 10,
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
  },
  sectionWrapper: {
    borderRadius: 10,
  },
  sectionTitle: {
    paddingLeft: 20,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#a6a6a6',
  },
  sectionItem: {
    borderBottomColor: '#ffffff',
    borderBottomWidth: 2,
    backgroundColor: "#f4f4f4",
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  sectionItemText: {
    fontSize: 14,
    marginLeft: 10,
    color:'#343d4c',
  },
  sectionItemTitleText: {
    fontSize: 14,
    marginLeft: 10,
    color:'#343d4c',
    fontWeight:'bold'
  },
  volunteerTitle:{
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
    color:'#3182F7',
   },
  // 게시글 카드
  postCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  boardType: {
    fontSize: 16,
    backgroundColor: '#f4f4f4',
    borderRadius : 5,
    padding: 5,
    paddingHorizontal: 7,
    fontWeight: 'bold',
    color: '#6b7682',
    marginRight: 5,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  postContent: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
  },
  iconRow: {
    flexDirection: 'row',
    gap: 10,
  },
  postImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginTop: 10,
  },
  // 상단 탭 스타일
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#f4f4f4',
  },
  activeTab: {
    backgroundColor: '#007bff',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  // 리스트 컨테이너
  listContainer: {
    padding: 10,
    backgroundColor:'#ffffff',
  },
  // 하단 내비게이션
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#ECEFF1',
  },
  // 플로팅 버튼
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  floatingButtonText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  volunteerButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  volunteerButtonText: {
    fontSize: 22,
    color: '#fff',
  },
  call: {
    width: 40,
    height: 40,
  },
  settingButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 7,
    paddingHorizontal: 80,
    marginHorizontal: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    marginBottom: 20,
  },
  settingButtonText: {
    fontSize: 18,
    color: '#fff',
  }
});

export const Main = ({navigation, id}) => {
    return(
        <Container>
            {/*날씨 위젯 컨테이너*/}
            <Container style={{backgroundColor : '#F2F8FF'}}>
                <WeatherWidget navigation = {navigation} id={id}/>
            </Container>
            {/*뉴스 위젯 컨테이너*/}
            <Container>
                <NewsWidget component={NewsWidget} />
            </Container>
        </Container>
    )
};

export const Community = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [selectedTab, setSelectedTab] = useState('전체게시판'); // 초기 선택 탭
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  // 게시글 불러오기
  const loadPosts = async (boardType) => {
    try {
      setIsLoading(true); // 로딩 시작
      const response = await axios.get('http://59.0.101.115:3000/api/Post_Load', {
        params: { board_type: boardType }, // 선택된 게시판 유형 전달
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  // 탭 변경 시 데이터 로드
  useEffect(() => {
    const boardType = getBoardTypeValue(selectedTab); // 탭에 해당하는 board_type 값 가져오기
    loadPosts(boardType);
  }, [selectedTab]);

  // 탭 이름을 board_type 값으로 변환
  const getBoardTypeValue = (tabName) => {
    switch (tabName) {
      case '전체게시판':
        return 1;
      case '정보게시판':
        return 2;
      case '자유게시판':
        return 3;
      default:
        return 0;
    }
  };

  const getBoardTypeLabel = (boardType) => {
    switch (boardType) {
      case 1:
        return '자유';
      case 2:
        return '정보';
      default:
        return '전체';
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.postCard}
      onPress={() => navigation.navigate('PostView', { post: item })}
    >
      <View style={styles.postHeader}>
        <Text style={styles.boardType}>{getBoardTypeLabel(item.board_type)}</Text>
      </View>
      <Text style={styles.postTitle}>{item.post_title}</Text>
      <Text style={styles.postContent} numberOfLines={2}>
        {item.post_content}
      </Text>
      <View style={styles.postFooter}>
        <View style={styles.iconRow}>
          <Text style={{fontWeight:'bold',color:'#000000'}}>👍 {item.post_gaechu}</Text>
          <Text style={{fontWeight:'bold',color:'#000000'}}>💬 {item.post_comment}</Text>
        </View>
        <Text>{new Date(item.post_date).toLocaleTimeString()}</Text>
      </View>
      {item.image_url && (
        <Image source={{ uri: item.image_url }} style={styles.postImage} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 상단 탭 */}
      <View style={styles.tabContainer}>
        {['전체게시판', '자유게시판', '정보게시판'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && styles.activeTab, // 선택된 탭 스타일
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 로딩 표시 */}
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>로딩 중...</Text>
        </View>
      ) : (
        <FlatList style={{padding : 10,}}
          data={posts} // 서버에서 받아온 posts 배열
          keyExtractor={(item) => item.post_date.toString()} // 고유 키
          renderItem={renderItem} // 게시글 카드 렌더링
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* 새 게시글 작성 버튼 */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('PostWrite')}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Volunteer = () => {
  const [volunteerList, setVolunteerList] = useState([]);

  // 봉사 목록 불러오기
  const loadVolunteerList = async () => {
    try {
      const response = await axios.get('http://59.0.101.115:3000/api/volunteer_list');
      setVolunteerList(response.data);
    } catch (error) {
      console.error('Error loading volunteer list:', error);
      Alert.alert('봉사 목록 불러오기 실패', error.message);
    }
  };

  useEffect(() => {
    loadVolunteerList();
  }, []);

  // 요청 중: 요청 인원 증가
  const handleRequest = async (dong) => {
    try {
      const response = await axios.post('http://59.0.101.115:3000/api/volunteer_request', { dong });
      const { newState, currentReq } = response.data;

      setVolunteerList((prevList) =>
        prevList.map((item) =>
          item.dong === dong ? { ...item, state: newState, current_req: currentReq } : item
        )
      );

      if (newState === 1) {
        Alert.alert('검토 요청이 성공적으로 전송되었습니다.');
      } else {
        Alert.alert('요청 인원이 추가되었습니다.');
      }
    } catch (error) {
      Alert.alert(
        '봉사 요청에 실패했습니다.',
        error.response ? error.response.data.message : '오류 발생'
      );
    }
  };

  // 모집 중: URL로 이동
  const handleNavigate = (url) => {
    Linking.openURL(url).catch((err) =>
      Alert.alert('URL 열기 실패', '해당 URL을 열 수 없습니다. 다시 시도해주세요.')
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.section}>
      <View>
        <TouchableOpacity style={styles.volunteerButton}>
          <Text style={styles.volunteerButtonText}>봉사 요청하기</Text>
          <Image source={require('../asset/help-call.png')} style={styles.call} />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <View style={styles.volunteerHeader}>
          <Text style={styles.volunteerTitle}>{item.dong}동</Text>
          <Text style={styles.sectionItemTitleText}>자원봉사 요청 현황</Text>
          <Text style={styles.sectionItemText}>요청 횟수: {item.current_request}회</Text>
          <Text style={styles.sectionItemText}>예상 필요 인원: {item.minimum_request}명</Text>
          <Text style={styles.sectionItemText}>
            최신 요청 | {item.minutes_since_last_request}분 전
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.editButton,
            item.state === 0
              ? styles.requestState
              : item.state === 1
              ? styles.reviewState
              : styles.recruitState,
          ]}
          onPress={() => {
            if (item.state === 0) {
              handleRequest(item.dong);
            } else if (item.state === 2) {
              handleNavigate('https://example.com/volunteer');
            }
          }}
          disabled={item.state === 1} // 검토 중 상태에서는 비활성화
        >
          <Text style={styles.editButtonText}>
            {item.state === 0
              ? '요청 중'
              : item.state === 1
              ? '검토 중'
              : '모집 중'}
          </Text>
          {item.state === 0 || item.state === 2 ? (
            <Text style={styles.infoText}>
              {item.current_req}/{item.min_req}명
            </Text>
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      style={styles.listContainer}
      data={volunteerList}
      keyExtractor={(item) => item.dong}
      renderItem={renderItem}
    />
  );
};

export const Setting = ({navigation, id}) => {
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (id === null) {
                navigation.navigate('Login');
            }
        });

        return unsubscribe;
    }, [navigation, id]);

    return(
        <Container style={styles.container}>
            {/* Profile Section */}
            <View style={styles.profileSection}>
                <Image source={source= require('../asset/default.png')} style={styles.profileImage} />
                <View style={styles.profileView}>
                    <Text style={styles.profileName}>홍길동 님</Text>
                </View>
                <TouchableOpacity style={styles.settingButton}>
                    <Text style={styles.settingButtonText}>개인정보 수정</Text>
                </TouchableOpacity>
            </View>

            {/* Community Section */}
            <View style={styles.sectionWrapper}>
                <Text style={styles.sectionTitle}>커뮤니티</Text>
                <View style={styles.section}>
                    <TouchableOpacity style={styles.sectionItem}>
                        <Icon name="document-text-outline" size={20} color="#333" />
                        <Text style={styles.sectionItemText}>내가 작성한 게시글 목록</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sectionItem}>
                        <Icon name="chatbubble-outline" size={20} color="#333" />
                        <Text style={styles.sectionItemText}>내가 작성한 댓글 목록</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Volunteer Section */}
            <View style={styles.sectionWrapper}>
                <Text style={styles.sectionTitle}>자원봉사</Text>
                <View style={styles.section}>
                    <TouchableOpacity style={styles.sectionItem}>
                        <Icon name="document-text-outline" size={20} color="#333" />
                        <Text style={styles.sectionItemText}>봉사현황</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sectionItem}>
                        <Icon name="document-text-outline" size={20} color="#333" />
                        <Text style={styles.sectionItemText}>내가 요청한 봉사 목록</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sectionItem}>
                        <Icon name="document-text-outline" size={20} color="#333" />
                        <Text style={styles.sectionItemText}>내가 지원한 봉사 목록</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Container>
    )
};
