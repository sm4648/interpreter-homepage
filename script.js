// 모바일 햄버거 메뉴 토글
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 네비게이션 링크 클릭 시 메뉴 닫기
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// 스무스 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 스크롤 시 네비게이션 바 스타일 변경
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// 통역 상담 폼 제출 처리
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // 폼 데이터 수집
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const field = this.querySelectorAll('input[type="text"]')[1].value;
        const schedule = this.querySelectorAll('input[type="text"]')[2].value;
        const message = this.querySelector('textarea').value;
        
        // 간단한 유효성 검사
        if (!name || !email || !field || !schedule || !message) {
            alert('모든 필드를 입력해주세요.');
            return;
        }
        
        // 서버로 메일 전송 요청
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    field,
                    schedule,
                    message
                })
            });

            const result = await response.json();

            if (result.success) {
                alert('통역 상담 문의가 성공적으로 접수되었습니다!\n메일을 확인해주세요.');
            } else {
                alert('문의 접수 중 오류가 발생했습니다: ' + result.message);
            }
        } catch (error) {
            console.error('메일 전송 오류:', error);
            alert('문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
        
        // 폼 초기화
        this.reset();
    });
}

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 애니메이션을 적용할 요소들
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .feature, .contact-item, .timeline-content');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 로딩 애니메이션
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 서비스 카드 호버 효과
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 현재 활성 메뉴 표시
function updateActiveMenu() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveMenu);

// 통역 서비스 카테고리별 하이라이트
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        // 클릭된 서비스 카드의 제목을 가져와서 연락처 폼의 통역 분야에 자동 입력
        const serviceTitle = this.querySelector('h3').textContent;
        const fieldInput = document.querySelector('input[placeholder="통역 분야"]');
        if (fieldInput) {
            fieldInput.value = serviceTitle;
            // 연락처 섹션으로 스크롤
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 페이지 로드 시 초기 실행
document.addEventListener('DOMContentLoaded', () => {
    updateActiveMenu();
    
    // 콘솔에 환영 메시지
    console.log('🎉 한중 통역 전문가 홈페이지에 오신 것을 환영합니다!');
    console.log('💡 통역 서비스 상담을 원하시면 연락처 섹션을 확인해보세요.');
    console.log('🏥 의료 분야 전문 통역도 가능합니다 (영남대 약학과 석사)');
});

// 통역 분야별 아이콘 애니메이션
document.querySelectorAll('.service-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'rotate(360deg) scale(1.1)';
        this.style.transition = 'transform 0.6s ease';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'rotate(0deg) scale(1)';
    });
});

// 경력 타임라인 애니메이션
document.querySelectorAll('.timeline-content').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 10px 30px rgba(44, 90, 160, 0.2)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    });
});
