import React from 'react';
import { Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    weatherIcon:{
        width: 100,
        height: 100,
    }
});

    const getWeatherIcon = (PTY, SKY) => {
        if (PTY === 0) { // 강수 없음
            switch (SKY) {
                case 1: return require('../asset/weather_sun.png'); // 맑음
                case 3: return require('../asset/weather_cloud.png'); // 구름 많음
                case 4: return require('../asset/weather_cloudy.png'); // 흐림
            }
        } else { // 강수 있음
            switch (PTY) {
                case 1: return require('../asset/weather_rain.png'); // 비
                case 2: return require('../asset/weather_snowrain.png'); // 비/눈
                case 3: return require('../asset/weather_snow.png'); // 눈
            }
        }
    };

const WeatherIcon = ({PTY, SKY}) => {
    const weatherIconSource = getWeatherIcon(PTY, SKY);

    return (
        <Image
            style={styles.weatherIcon}
            source={weatherIconSource}
            resizeMode="center"
        />
    );
}

export default WeatherIcon;

