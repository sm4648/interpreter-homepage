const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    // CORS 헤더 설정
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    // OPTIONS 요청 처리 (CORS preflight)
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // POST 요청만 처리
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { name, email, field, schedule, message } = JSON.parse(event.body);

        // 필수 필드 검증
        if (!name || !email || !field || !schedule || !message) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ 
                    success: false, 
                    message: '모든 필드를 입력해주세요.' 
                })
            };
        }

        // 네이버 메일 transporter 설정 (환경변수 사용)
        const transporter = nodemailer.createTransporter({
            host: 'smtp.naver.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER || 'bd3473@naver.com',
                pass: process.env.SMTP_PASS || 'ghkdtjdals12?'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // 메일 옵션 설정
        const mailOptions = {
            from: 'bd3473@naver.com',
            to: 'yu0aud@naver.com',
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

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                success: true, 
                message: '상담 문의가 성공적으로 접수되었습니다.' 
            })
        };

    } catch (error) {
        console.error('메일 전송 오류:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                success: false, 
                message: '메일 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' 
            })
        };
    }
};
