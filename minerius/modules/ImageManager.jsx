import React from "react";
import { View, Image } from 'react-native';

const images = {
    Logo: require("../assets/images/logo.png"),

};


// GetImage의 type이 images의 키값과 일치해야 이미지를 불러옴 
// 라고 현철이가 쓴거 훔쳐옴

export const GetImage = ({type, width, height, marginLeft, marginRight, marginTop, marginBottom}) => {
    return (
        <Image
            source={images[type]}
            style={{
                width : width,
                height : height,
                marginLeft : marginLeft,
                marginRight : marginRight,
                marginTop : marginTop,
                marginBottom : marginBottom,
            }}
        />
    );
};