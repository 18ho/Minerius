import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import Swiper from 'react-native-swiper';

const StyledText = styled.Text`
    font-size: 50px;
`;

export const WeatherWidget = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = 'NCgFiXeGTmaoBYl3hl5mrA';
    const BASE_URL = 'https://apihub.kma.go.kr/api/typ02/openApi/VilageFcstInfoService_2.0/getVilageFcst';  // 단기예보 엔드포인트

    const additionalLocations = [
        { name: '진월동', nx: 59, ny: 73 },
        { name: '도천동', nx: 58, ny: 76 },
        { name: '두암동', nx: 60, ny: 74 },
    ];

    // 현재 시간에서 가장 가까운 과거 3시간 단위로 baseTime 계산
    const getBaseTime = () => {
        const now = new Date();
        const hours = now.getHours();

        // 특정 시간 단위로 설정된 baseTime (02:00, 05:00, 08:00, 11:00, 14:00, 17:00, 20:00, 23:00)
        const availableTimes = [2, 5, 8, 11, 14, 17, 20, 23];

        // 현재 시간보다 작거나 같은 가장 가까운 시간 찾기
        const closestBaseTime = availableTimes.reduce((prev, curr) => {
            return curr <= hours ? curr : prev;
        });

        return `${String(closestBaseTime).padStart(2, '0')}00`;
    };

    // fcstTime을 baseTime에 1시간씩 더한 값으로 설정
    const getFcstTimes = (baseTime) => {
        let [baseHour, baseMinutes] = [parseInt(baseTime.slice(0, 2)), parseInt(baseTime.slice(2, 4))];

        // baseTime에서 1시간씩 더해 3개의 fcstTime 생성 (예: 02:00 -> 03:00, 04:00, 05:00)
        const fcstTimes = [];
        for (let i = 1; i <= 3; i++) {
            let fcstHour = baseHour + i;
            if (fcstHour >= 24) {
                fcstHour -= 24;  // 24시 넘으면 00시부터 시작
            }
            fcstTimes.push(`${String(fcstHour).padStart(2, '0')}00`);
        }
        return fcstTimes;
    };

    useEffect(() => {
        const fetchWeatherData = async (locations) => {
            try {
                const today = new Date();
                const formattedDate = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;

                // baseTime 계산
                const baseTime = getBaseTime();
                // fcstTime은 baseTime에 1시간씩 더한 값으로 설정 (1시간 간격)
                const fcstTimes = getFcstTimes(baseTime);

                const weatherPromises = locations.map(location =>
                    axios.get(BASE_URL, {
                        params: {
                            numOfRows: 100,
                            pageNo: 1,
                            dataType: 'JSON',
                            base_date: formattedDate,
                            base_time: baseTime, // baseTime 설정
                            nx: location.nx,
                            ny: location.ny,
                            authKey: API_KEY,
                        },
                    })
                );

                const responses = await Promise.all(weatherPromises);
                responses.forEach((response, index) => {
                    console.log(`Location: ${additionalLocations[index].name}`, response.data);
                });
                const weatherResults = responses.map(response => {
                    // 응답 데이터에서 fcstTime이 03:00, 04:00, 05:00 등인 데이터만 필터링
                    return response.data.response.body.items.item.filter(item => fcstTimes.includes(item.fcstTime));
                });

                setWeatherData(weatherResults);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchWeatherData(additionalLocations);
    }, []);

    if (loading) {
        return (
            <View>
                <StyledText>로딩중입니다...</StyledText>
            </View>
        );
    }

    if (error) {
        return (
            <View>
                <StyledText>Error fetching data: {error.message}</StyledText>
            </View>
        );
    }

    return (
        <Swiper>
            {weatherData.map((data, index) => {
                const temperatureData = data.find(item => item.category === 'TMP'); // 단기예보의 기온 데이터
                const humidityData = data.find(item => item.category === 'REH');   // 습도 데이터
                const precipitationData = data.find(item => item.category === 'POP'); // 강수 확률 데이터

                return (
                    <View key={index} style={styles.card}>
                        <View style={styles.header}>
                            <Text style={styles.locationText}>
                                {additionalLocations[index]?.name}
                            </Text>
                        </View>
                        <View style={styles.weatherInfo}>
                            <Image
                                style={styles.weatherIcon}
                                source={require('../asset/weather_13501686.png')} // 날씨 아이콘
                                resizeMode='center'
                            />
                            <StyledText>{temperatureData?.fcstValue}℃</StyledText>
                        </View>
                        <View style={styles.details}>
                            <Text>강수 확률 : {precipitationData?.fcstValue || 'N/A'}%</Text>
                            <Text>습도 : {humidityData?.fcstValue}%</Text>
                        </View>
                    </View>
                );
            })}
        </Swiper>
    );
};

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'black',
        margin: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    header: {
        marginBottom: 10,
    },
    locationText: {
        fontSize: 20,
        fontWeight: 'bold',
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
});
