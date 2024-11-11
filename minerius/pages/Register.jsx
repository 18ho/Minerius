import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

const Register = () => {
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

            <View style={styles.inputWrapper}>
                <View style={styles.inputGroup}>
                    <TextInput style={styles.input} placeholder="아이디" placeholderTextColor="#343d4c" />
                </View>
            </View>

            <View style={styles.inputWrapper}>
                <View style={styles.inputGroup}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="비밀번호" 
                        placeholderTextColor="#343d4c" 
                        secureTextEntry
                    />
                </View>
            </View>

            <View style={styles.inputWrapper}>
                <View style={styles.inputGroup}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="비밀번호 확인" 
                        placeholderTextColor="#343d4c" 
                        secureTextEntry
                    />
                </View>
            </View>

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
    },
    overlap: {
        backgroundColor: '#f2f8ff',
        width: 412,
        height: 350,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    image: {
        width: 280,
        height: 218,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    group: {
        alignItems: 'center',
        marginTop: 20,
    },
    titleText: {
        color: '#343d4c',
        fontSize: 26,
        fontWeight: '500',
        letterSpacing: -0.65,
        textAlign: 'center',
    },
    inputWrapper: {
        width: 322,
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
        fontSize: 24,
        fontWeight: '500',
        color: '#343d4c',
    },
    button: {
        backgroundColor: '#4a90e2',
        borderRadius: 10,
        height: 65,
        width: 320,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 26,
        fontWeight: '500',
        letterSpacing: -0.65,
    },

    
});

export default Register;
