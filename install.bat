@echo off
echo 🚀 통역 상담 홈페이지 서버 시작
echo.

echo 📦 의존성 설치 중...
npm install

if %errorlevel% neq 0 (
    echo ❌ 의존성 설치 실패
    echo Node.js가 설치되어 있는지 확인해주세요.
    pause
    exit /b 1
)

echo ✅ 의존성 설치 완료
echo.

echo ⚙️  메일 설정 확인 필요:
echo 1. config.js 파일에서 네이버 메일 계정 정보를 설정하세요
echo 2. 네이버 메일 비밀번호를 정확히 입력하세요
echo.

echo 🌐 서버 시작 중...
echo 서버가 시작되면 http://localhost:3000 에서 접속할 수 있습니다.
echo.

npm start

pause
