import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const Element = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* 상단 이미지 및 텍스트 */}
            <View style={styles.overlap}>
                <Image
                    style={styles.image}
                    source={mineriusRemovebgPreview1}
                />
                <View style={styles.group}>
                    <Text style={styles.textWrapper}>
                        자연재해는 예고 없이 찾아옵니다.
                    </Text>
                </View>
            </View>

            {/* 닉네임 입력 필드 */}
            <View style={styles.inputWrapper}>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputText}>닉네임</Text>
                </View>
            </View>

            {/* 다음 버튼 */}
            <TouchableOpacity style={styles.buttonWrapper}>
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
        width: width * 0.9,
        maxWidth: 360,
        height: height * 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    image: {
        width: 250,
        height: 195,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    group: {
        position: 'absolute',
        top: '75%',
        alignItems: 'center',
    },
    textWrapper: {
        color: '#343d4c',
        fontSize: 20,
        fontWeight: '500',
        letterSpacing: -0.5,
        fontFamily: 'Pretendard-Medium',
        textAlign: 'center',
    },
    inputWrapper: {
        width: '80%',
        maxWidth: 360,
        marginBottom: 15,
    },
    inputGroup: {
        backgroundColor: '#dadada4c',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    inputText: {
        fontSize: 18,
        color: '#343d4c',
        fontFamily: 'Pretendard-Medium',
        letterSpacing: -0.45,
    },
    buttonWrapper: {
        backgroundColor: '#4a90e2',
        borderRadius: 10,
        height: 50,
        width: '80%',
        maxWidth: 360,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: '500',
        letterSpacing: -0.55,
        fontFamily: 'Pretendard-Medium',
    },
});

export default Element;
