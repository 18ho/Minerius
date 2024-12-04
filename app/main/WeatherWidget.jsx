import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Alert,
} from 'react-native';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import { useIsFocused } from '@react-navigation/native';
import WeatherIcon from './WeatherIcon.jsx';

const { width } = Dimensions.get('window');

export const WeatherWidget = ({ id }) => {
    const [weatherData, setWeatherData] = useState([]);
    const [dongList, setDongList] = useState([]);
    const [error, setError] = useState(null);
    const API_KEY = 'NCgFiXeGTmaoBYl3hl5mrA';
    const BASE_URL =
        'https://apihub.kma.go.kr/api/typ02/openApi/VilageFcstInfoService_2.0/getVilageFcst';
    const isFocused = useIsFocused(); // 화면 포커스 감지

    // 동 목록 가져오기
    const loadCustomDongList = async () => {
        try {
            const response = await axios.get(
                'http://59.0.101.115:3000/api/dong_list',
                { params: { id } }
            );
            const formattedDongList = response.data.map((dong) => ({
                dong: dong.dong_name,
                nx: dong.nx,
                ny: dong.ny,
            }));
            setDongList(formattedDongList);
        } catch (error) {
            console.error('Error loading dong list:', error);
            Alert.alert('동 목록 불러오기 실패', error.message);
        }
    };

    // baseTime 계산
    const getBaseTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const availableTimes = [2, 5, 8, 11, 14, 17, 20, 23];
        const closestBaseTime = availableTimes.reduce(
            (prev, curr) => (curr <= hours ? curr : prev)
        );
        return `${String(closestBaseTime).padStart(2, '0')}00`;
    };

    // fcstTime 계산
    const getFcstTimes = (baseTime) => {
        const baseHour = parseInt(baseTime.slice(0, 2));
        return Array.from({ length: 3 }, (_, i) => {
            const fcstHour = (baseHour + i + 1) % 24;
            return `${String(fcstHour).padStart(2, '0')}00`;
        });
    };

    // 날씨 데이터 가져오기
    const fetchWeatherData = async () => {
        if (!dongList.length) return; // 동 목록이 없으면 종료

        try {
            const today = new Date();
            const formattedDate = `${today.getFullYear()}${String(
                today.getMonth() + 1
            ).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
            const baseTime = getBaseTime();
            const fcstTimes = getFcstTimes(baseTime);

            const weatherPromises = dongList.map((location) =>
                axios.get(BASE_URL, {
                    params: {
                        numOfRows: 100,
                        pageNo: 1,
                        dataType: 'JSON',
                        base_date: formattedDate,
                        base_time: baseTime,
                        nx: location.nx,
                        ny: location.ny,
                        authKey: API_KEY,
                    },
                })
            );

            const responses = await Promise.all(weatherPromises);

            const weatherResults = responses.map((response) =>
                response.data.response.body.items.item.filter((item) =>
                    fcstTimes.includes(item.fcstTime)
                )
            );
            setWeatherData(weatherResults);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            if (id) {
                await loadCustomDongList();
                await fetchWeatherData();
            }
        };

        if (isFocused && id) {
            loadData();
        }
    }, [id, isFocused]);

    if (!id) {
        return (
            <View style={styles.center}>
                <Text style={styles.messageText}>로그인을 해주세요.</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.messageText}>
                    데이터 로드 실패: {error.message}
                </Text>
            </View>
        );
    }

    return (
        <Swiper
            paginationStyle={{ position: 'absolute', bottom: 40, left: 300 }}
        >
            {weatherData.map((data, index) => {
                const temperatureData = data.find(
                    (item) => item.category === 'TMP'
                );
                const humidityData = data.find(
                    (item) => item.category === 'REH'
                );
                const precipitationData = data.find(
                    (item) => item.category === 'POP'
                );
                const PTY = data.find((item) => item.category === 'PTY');
                const SKY = data.find((item) => item.category === 'SKY');
                return (
                    <View key={index} style={styles.card}>
                        <View style={styles.header}>
                            <Text style={styles.locationText}>
                                {dongList[index]?.dong || '지역 정보 없음'}
                            </Text>
                        </View>
                        <View style={styles.weatherInfo}>
                            <WeatherIcon
                                PTY={parseInt(PTY?.fcstValue || 0, 10)}
                                SKY={parseInt(SKY?.fcstValue || 1, 10)}
                            />
                            <Text style={styles.textTemp}>
                                {temperatureData?.fcstValue || 'N/A'}℃
                            </Text>
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.textCommon}>
                                강수 확률: {precipitationData?.fcstValue || 'N/A'}%
                            </Text>
                            <Text style={styles.textCommon}>
                                습도: {humidityData?.fcstValue || 'N/A'}%
                            </Text>
                        </View>
                    </View>
                );
            })}
        </Swiper>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F8FF',
    },
    messageText: {
        fontSize: 40,
        textAlign: 'center',
        color: '#333',
    },
    card: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#FFFFFF',
        margin: 15,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    header: {
        marginBottom: 0,
        borderWidth: 1,
        borderRadius:50,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom : 10,
        borderColor: '#F2F8FF',
        backgroundColor: '#F2F8FF',
    },
    locationText: {
        fontSize: 16,
        padding: 10,
        fontWeight: 'bold',
        color: '#3182F7',
    },
    weatherInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    weatherIcon: {
        width: 80,
        height: 80,
    },
    details: {
        alignItems: 'flex-start',
    },
    addLocationButton: {
        position: 'absolute',
        backgroundColor: '#007bff',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        top: 100,
        left: width / 2 - 25, // 화면 너비의 절반에서 버튼 크기의 절반 빼기
    },
    addLocationText: {
        fontSize: 30,
        color: 'white',
    },
    textTemp: {
        border : 10,
        fontSize: 40,
        color: '#343D4C',
    },
    textCommon: {
        fontSize: 12,
        color: '#6b7682',
    },
});
