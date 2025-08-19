# 🚀 GitHub에 메일 전송 기능 배포하기

## 📋 **1단계: 기존 저장소 클론**
```bash
git clone https://github.com/sm4648/interpreter-homepage.git
cd interpreter-homepage
```

## 📁 **2단계: 새 파일들 추가**
위에서 생성된 파일들을 저장소에 복사:
- `package.json`
- `api/send-email.js`
- `.github/workflows/deploy.yml`
- `.github/workflows/pages.yml`

## ⚙️ **3단계: GitHub 저장소 설정**
1. **GitHub 저장소 Settings** → **Pages**
2. **Source**: `Deploy from a branch` 선택
3. **Branch**: `gh-pages` 선택
4. **Save** 클릭

## 🔧 **4단계: GitHub Actions 활성화**
1. **Actions** 탭 클릭
2. **deploy.yml** 워크플로우 활성화
3. **Allow all actions and reusable workflows** 선택

## 📤 **5단계: 코드 푸시**
```bash
git add .
git commit -m "메일 전송 기능 추가 - GitHub Actions 배포"
git push origin main
```

## ✅ **6단계: 배포 확인**
- GitHub Actions에서 배포 진행 상황 확인
- `https://sm4648.github.io/interpreter-homepage/` 접속
- 통역 상담 문의 폼에서 "상담 문의하기" 버튼 테스트

## 🎯 **결과:**
"상담 문의하기" 버튼을 누르면 `yu0aud@naver.com`으로 메일이 자동 전송됩니다!

## ⚠️ **주의사항:**
- GitHub Pages는 정적 호스팅만 지원
- 메일 전송은 GitHub Actions나 외부 서비스 필요
- 실제 메일 전송을 위해서는 Netlify Functions나 Vercel 배포 권장
