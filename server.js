const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config');

const app = express();
const PORT = config.server.port;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// 메일 전송을 위한 transporter 설정 (네이버 메일)
const transporter = nodemailer.createTransporter({
    host: 'smtp.naver.com',
    port: 587,
    secure: false, // TLS 사용
    auth: {
        user: config.email.user,
        pass: config.email.pass
    },
    tls: {
        rejectUnauthorized: false
    }
});

// 메일 전송 API 엔드포인트
app.post('/api/send-email', async (req, res) => {
    try {
        const { name, email, field, schedule, message } = req.body;

        // 필수 필드 검증
        if (!name || !email || !field || !schedule || !message) {
            return res.status(400).json({ 
                success: false, 
                message: '모든 필드를 입력해주세요.' 
            });
        }

        // 메일 옵션 설정
        const mailOptions = {
            from: config.email.user, // 발신자 이메일
            to: 'yu0aud@naver.com', // 수신자 이메일 (당신의 네이버 메일)
            subject: `통역 상담 문의 - ${name}`,
            html: `
                <h2>통역 상담 문의가 접수되었습니다</h2>
                <p><strong>성함:</strong> ${name}</p>
                <p><strong>이메일:</strong> ${email}</p>
                <p><strong>통역 분야:</strong> ${field}</p>
                <p><strong>통역 일정:</strong> ${schedule}</p>
                <p><strong>상세 요청사항:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p><em>이 메일은 통역 상담 문의 폼에서 자동으로 전송되었습니다.</em></p>
            `
        };

        // 메일 전송
        await transporter.sendMail(mailOptions);

        res.json({ 
            success: true, 
            message: '상담 문의가 성공적으로 접수되었습니다.' 
        });

    } catch (error) {
        console.error('메일 전송 오류:', error);
        res.status(500).json({ 
            success: false, 
            message: '메일 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' 
        });
    }
});

// 루트 경로
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
    console.log('통역 상담 문의 메일을 yu0aud@naver.com으로 전송합니다.');
});
