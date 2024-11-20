const express = require('express');
const db = require('./db.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();

router.get('/Post_Load', (req, res) => {
  const query = 'SELECT board_type, post_date, post_title, post_gaechu, post_content, post_comment FROM post';

  db.query(query, (error, rows) => {
    if (error) {
      console.error('게시글을 불러오는 중 오류가 발생했습니다:', error);
      return res.status(500).send('게시글을 불러오는 중 오류가 발생했습니다.');
    }
    res.status(200).json(rows);  // 결과 배열을 클라이언트에 바로 반환
  });
});

// 게시글 작성 API
router.post('/Post_Import', (req, res) => {
  const { board_type, post_title, post_content } = req.body;

  const query = 'INSERT INTO post (board_type, post_title, post_content) VALUES (?, ?, ?)';
  db.query(query, [board_type, post_title, post_content], (error, results) => {
    if (error) {
      console.error('게시글 저장 중 오류가 발생했습니다:', error);
      return res.status(500).send('게시글 저장 중 오류가 발생했습니다.');
    }
    res.status(200).send('게시글이 성공적으로 저장되었습니다.');
  });
});

// 로그인 API
router.post('/login', (req, res) => {
  const { Id, Password } = req.body;
  const findUserQuery = 'SELECT * FROM user WHERE id = ?';
  db.query(findUserQuery, [Id], (err, results) => {
    if (err) {
      console.error('데이터베이스 오류:', err);
      return res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
    }

    if (results.length === 0) {
      return res.status(200).json({ success: false, message: '존재하지 않는 아이디입니다.' });
    }

    const user = results[0];
    if (user.password === Password) {
      return res.status(200).json({ success: true, message: '로그인 성공' });
    } else {
      return res.status(200).json({ success: false, message: '비밀번호가 일치하지 않습니다.' });
    }
  });
});

// 회원가입 API
router.post('/register', (req, res) => {
  const { id, password, nickname, name, phone } = req.body;

  if (!id || !password || !nickname || !name || !phone) {
    return res.status(400).json({ success: false, message: '모든 필드를 입력해주세요.' });
  }
  const query = 'INSERT INTO user (id, password, nickname, name, phone) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [id, password, nickname, name, phone], (err, result) => {
    if (err) {
      console.error('회원가입 실패. 데이터베이스 오류:', err);
      return res.status(500).json({ success: false, message: '회원가입 실패. 데이터베이스 오류가 발생했습니다.' });
    }
    res.status(200).json({ success: true, message: '회원가입 성공' });
  });
});

module.exports = router;