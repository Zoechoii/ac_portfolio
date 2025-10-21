// 배경 이미지 로드 확인
const bgImage = document.getElementById('bgImage');
bgImage.addEventListener('load', function() {
console.log('Background image loaded successfully');
});
bgImage.addEventListener('error', function() {
console.error('Failed to load background image');
alert('배경 이미지를 로드할 수 없습니다. background.jpg 파일을 확인해주세요.');
});

// 클릭 가능한 아이템들
const items = document.querySelectorAll('.item');
items.forEach(item => {
// 클릭 이벤트
item.addEventListener('click', function() {
const url = this.getAttribute('data-url');
    // 애니메이션 효과
    this.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        this.style.transform = '';
        // 새 창에서 URL 열기
        window.open(url, '_blank');
    }, 200);
});

// 마우스 오버 효과
item.addEventListener('mouseenter', function() {
    console.log('Hovering over item');
});
});

// 음악 재생 기능
// Y2K 아이팟 스타일 플레이어
const audio = new Audio('your-music.mp3');
const playBtnIpod = document.getElementById('playBtnIpod');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const volumeBarIpod = document.getElementById('volumeBarIpod');
const musicButton = document.getElementById('musicButton');
const timeCurrent = document.querySelector('.time-current');
const timeTotal = document.querySelector('.time-total');
let isPlaying = false;

// 시간 포맷
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// 재생/일시정지
playBtnIpod.addEventListener('click', function() {
    if (isPlaying) {
        audio.pause();
        playBtnIpod.textContent = '▶';
        musicButton.classList.remove('playing');
        isPlaying = false;
    } else {
        audio.play();
        playBtnIpod.textContent = '⏸';
        musicButton.classList.add('playing');
        isPlaying = true;
    }
});

// 진행바 업데이트
audio.addEventListener('timeupdate', function() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + '%';
    timeCurrent.textContent = formatTime(audio.currentTime);
    timeTotal.textContent = formatTime(audio.duration);
});

// 볼륨 조절
volumeBarIpod.addEventListener('input', function() {
    audio.volume = volumeBarIpod.value / 100;
});

// 초기 볼륨
audio.volume = 0.5;

// 음악 종료
audio.addEventListener('ended', function() {
    playBtnIpod.textContent = '▶';
    musicButton.classList.remove('playing');
    isPlaying = false;
    progressBar.style.width = '0%';
});

// 이전/다음 버튼
prevBtn.addEventListener('click', function() {
    audio.currentTime = 0;
});

nextBtn.addEventListener('click', function() {
    audio.currentTime = audio.duration;
});

// 랜덤 반짝임 효과
function addSparkle() {
const randomItem = items[Math.floor(Math.random() * items.length)];
const eye = randomItem.querySelector('.eye');
eye.style.filter = 'brightness(1.5) drop-shadow(0 0 30px rgba(255, 0, 110, 1))';
setTimeout(() => {
    eye.style.filter = '';
}, 500);
}

// 3초마다 랜덤 아이템 반짝임
setInterval(addSparkle, 3000);

// 페이지 로드 시 등장 효과
window.addEventListener('load', function() {
items.forEach((item, index) => {
item.style.opacity = '0';
setTimeout(() => {
item.style.opacity = '1';
}, index * 200);
});
});