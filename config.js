// 메일 전송 설정
module.exports = {
    email: {
        service: 'naver', // 네이버 메일 사용
        user: 'your-naver-id@naver.com', // 실제 네이버 메일 계정으로 변경 필요
        pass: 'your-naver-password' // 네이버 메일 비밀번호로 변경 필요
    },
    server: {
        port: process.env.PORT || 3000
    }
};
