import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, Image, Text} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { WeatherWidget } from './WeatherWidget.jsx';
import { NewsWidget } from './NewsWidget.jsx';

const Container = styled.View`
    flex: 0.7;
    justify-content: center;
`;

const StyledText = styled.Text`
    font-size:20px;
`;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
  },
  profileName: {
    fontSize: 18,
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  section: {
    backgroundColor: '#ECEFF1',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  sectionItemText: {
    fontSize: 14,
    marginLeft: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#ECEFF1',
  },
});

export const Main = () => {
    return(
        <Container>
            {/*날씨 위젯 컨테이너*/}
            <Container>
                <WeatherWidget component={WeatherWidget} />
            </Container>
            {/*뉴스 위젯 컨테이너*/}
            <Container>
                <NewsWidget component={NewsWidget} />
            </Container>
        </Container>
    )
};

export const Community = () => {
    return(
        <Container>
            <StyledText>Community</StyledText>
        </Container>
    )
};

export const Volunteer = () => {
    return(
        <Container>
            <StyledText>Volunteer</StyledText>
        </Container>
    )
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
        <Container>
            {/* Profile Section */}
            <View style={styles.profileSection}>
                <Image source={source= require('../asset/default.png')} style={styles.profileImage} />
                <Text style={styles.profileName}>홍길동 님</Text>
                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>개인정보 수정</Text>
                </TouchableOpacity>
            </View>

            {/* Community Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>커뮤니티</Text>
                <TouchableOpacity style={styles.sectionItem}>
                    <Icon name="document-text-outline" size={20} color="#333" />
                    <Text style={styles.sectionItemText}>내가 작성한 게시글 목록</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sectionItem}>
                    <Icon name="chatbubble-outline" size={20} color="#333" />
                    <Text style={styles.sectionItemText}>내가 작성한 댓글 목록</Text>
                </TouchableOpacity>
            </View>

            {/* Volunteer Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>자원봉사</Text>
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
        </Container>
    )
};
