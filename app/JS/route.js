const express = require('express');
const db = require('./db.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();

router.get('/dong_list', (req, res) => {
  const { id } = req.query;

  const query = `
    SELECT d.dong_name, c.nx, c.ny FROM custom_dong AS c inner join location AS d ON c.dong = d.dong WHERE id = ?;
  `;
  db.query(query, [id], (error, rows) => {
    if (error) {
      console.error('동 목록을 불러오는 중 오류가 발생했습니다:', error);
      return res.status(500).send('동 목록을 불러오는 중 오류가 발생했습니다.');
    }
    res.status(200).json(rows); // 동 목록을 반환
  });
});



router.get('/Post_Load', (req, res) => {
  const { board_type } = req.query;

  if (!board_type) {
    return res.status(400).send('board_type 값이 필요합니다.');
  }

  const query = `
    SELECT board_type, post_date, post_title, post_gaechu, post_content, post_comment
    FROM post
    WHERE board_type = ?
  `;

  db.query(query, [board_type], (error, rows) => {
    if (error) {
      console.error('게시글을 불러오는 중 오류가 발생했습니다:', error);
      return res.status(500).send('게시글을 불러오는 중 오류가 발생했습니다.');
    }

    res.status(200).json(rows); // 결과 배열을 클라이언트에 반환
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
      return res.status(200).json({ success: true, message: '로그인 성공', id: Id });
    } else {
      return res.status(200).json({ success: false, message: '비밀번호가 일치하지 않습니다.' });
    }
  });
});

// 회원가입 API
router.post('/register', (req, res) => {
  const { id, password, nickname, name, phone, dong } = req.body;

  if (!id || !password || !nickname || !name || !phone || !dong) {
    return res.status(400).json({ success: false, message: '모든 필드를 입력해주세요.' });
  }
  const query = 'INSERT INTO user (id, password, nickname, name, phone, dong) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [id, password, nickname, name, phone, dong], (err, result) => {
    if (err) {
      console.error('회원가입 실패. 데이터베이스 오류:', err);
      return res.status(500).json({ success: false, message: '회원가입 실패. 데이터베이스 오류가 발생했습니다.' });
    }
    res.status(200).json({ success: true, message: '회원가입 성공' });
  });
});

// 봉사 요청 목록 가져오기 API (시간 차이 계산 포함)
router.get('/volunteer_list', (req, res) => {
  const query = `
    SELECT
      dong,
      minimum_request,
      current_request,
      state,
      last_request,
      TIMESTAMPDIFF(MINUTE, last_request, NOW()) AS minutes_since_last_request
    FROM volunteer;
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('봉사 목록을 불러오는 중 오류가 발생했습니다:', error);
      return res.status(500).send('봉사 목록을 불러오는 중 오류가 발생했습니다.');
    }
    res.status(200).json(results); // 봉사 목록을 반환
  });
});

// 자원봉사 요청 업데이트 API
router.post('/volunteer_request', (req, res) => {
  const { dong } = req.body;

  const selectQuery = 'SELECT minimum_request, current_request, state FROM volunteer WHERE dong = ?';
  db.query(selectQuery, [dong], (err, results) => {
    if (err) {
      console.error('봉사 요청 조회 중 오류:', err);
      return res.status(500).json({ message: '서버 오류 발생' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: '해당 동이 존재하지 않습니다' });
    }

    const { minimum_request, current_request, state } = results[0];
    if (state === 2) {
      return res.status(400).json({ message: '이미 모집 중입니다' });
    }

    const updatedReq = current_request + 1;
    let newState = state;
    if (updatedReq >= minimum_request) {
      newState = 1; // 검토 중 상태로 변경
    }

    const updateQuery = 'UPDATE volunteer SET current_request = ?, state = ?, last_request = NOW() WHERE dong = ?';
    db.query(updateQuery, [updatedReq, newState, dong], (updateErr) => {
      if (updateErr) {
        console.error('봉사 요청 업데이트 중 오류:', updateErr);
        return res.status(500).json({ message: '서버 오류 발생' });
      }
      res.status(200).json({
        message: '봉사 요청이 업데이트되었습니다',
        newState: newState,
        currentReq: updatedReq,
      });
    });
  });
});

module.exports = router;