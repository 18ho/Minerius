import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Post = ({ route }) => {
  const { post } = route.params; // 전달된 게시글 데이터 받기

  // 게시판 타입에 따른 이름 반환
  const getBoardTypeLabel = (boardType) => {
    switch (boardType) {
      case 1:
        return '자유게시판';
      case 2:
        return '정보게시판';
      case 3:
        return '고로시게시판';
      default:
        return '기타';
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 헤더 - 제목, 게시판 타입, 날짜 */}
      <View style={styles.header}>
        <Text style={styles.boardType}>{getBoardTypeLabel(post.board_type)}</Text>
        <Text style={styles.title}>{post.post_title}</Text>
        <Text style={styles.date}>{new Date(post.post_date).toLocaleDateString()}</Text>
      </View>

      {/* 내용 */}
      <Text style={styles.content}>{post.post_content}</Text>

      {/* 하단 정보 */}
      <View style={styles.footer}>
        <Text style={styles.stat}>👍 개추: {post.post_gaechu}</Text>
        <Text style={styles.stat}>💬 댓글: {post.post_comment}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  boardType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 4,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ECECEC',
    paddingTop: 10,
  },
  stat: {
    fontSize: 16,
    color: '#555',
  },
});

export default Post;
