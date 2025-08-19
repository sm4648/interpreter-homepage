# 🚀 Netlify로 메일 전송 기능 배포하기

## 📋 **1단계: Netlify 가입**
1. [Netlify](https://netlify.com) 접속
2. **Sign up** 클릭
3. GitHub 계정으로 로그인

## 📁 **2단계: GitHub 저장소 연결**
1. **New site from Git** 클릭
2. **GitHub** 선택
3. `sm4648/interpreter-homepage` 저장소 선택
4. **Deploy site** 클릭

## ⚙️ **3단계: 빌드 설정**
- **Build command**: `npm run build` (또는 비워두기)
- **Publish directory**: `.` (현재 폴더)
- **Functions directory**: `netlify/functions`

## 🔧 **4단계: 환경 변수 설정**
**Site settings** → **Environment variables**에서:
- `NODE_VERSION`: `18`
- `SMTP_HOST`: `smtp.naver.com`
- `SMTP_USER`: `bd3473@naver.com`
- `SMTP_PASS`: `ghkdtjdals12?`

## 📤 **5단계: 자동 배포**
- GitHub에 푸시하면 자동으로 Netlify에 배포
- `https://your-site-name.netlify.app`에서 접속 가능

## ✅ **6단계: 테스트**
- 통역 상담 문의 폼에서 "상담 문의하기" 버튼 클릭
- `yu0aud@naver.com`으로 메일 자동 전송 확인

## 🎯 **결과:**
"상담 문의하기" 버튼을 누르면 `yu0aud@naver.com`으로 메일이 자동 전송됩니다!

## ⚠️ **주의사항:**
- Netlify Functions는 무료 플랜에서 월 125,000회 호출 제한
- 메일 전송은 서버리스 함수로 처리
- CORS 문제 해결됨
