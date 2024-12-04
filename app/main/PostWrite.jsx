import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const PostWrite = ({ navigation }) => {
  const [boardType, setBoardType] = useState('1');  // 기본값을 '1'로 설정
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [isSelecting, setIsSelecting] = useState(false);

  const handleSubmit = () => {
    axios.post('http://59.0.101.115:3000/api/Post_Import', {
      board_type: boardType,
      post_title: postTitle,
      post_content: postContent,
    })
    .then(response => {
      console.log(response.data);
      // 성공하면 게시글 목록 페이지로 이동
      navigation.navigate('Community');
    })
    .catch(error => {
      console.error(error);
    });
  };

  const selectBoardType = (type) => {
    setBoardType(type);
    setIsSelecting(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selector} onPress={() => setIsSelecting(true)}>
        <Text>
          {boardType === '1' ? ' 자유게시판' : boardType === '2' ? ' 정보게시판' : '고로시게시판'}
        </Text>
      </TouchableOpacity>


      {isSelecting && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={() => selectBoardType('1')}>
            <Text>자유게시판</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => selectBoardType('2')}>
            <Text>정보게시판</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => selectBoardType('3')}>
            <Text>고로시게시판</Text>
          </TouchableOpacity>
        </View>
      )}

      <TextInput
        placeholder="제목"
        value={postTitle}
        onChangeText={setPostTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="내용"
        value={postContent}
        onChangeText={setPostContent}
        style={styles.input}
        multiline
      />
      <Button title="게시글 작성" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  selector: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 12,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 12,
  },
});

export default PostWrite;