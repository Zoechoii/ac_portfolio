// Background image load check
const bgImage = document.getElementById('bgImage');
bgImage.addEventListener('load', function() {
    console.log('Background image loaded successfully');
});
bgImage.addEventListener('error', function() {
    console.error('Failed to load background image');
    alert('Cannot load background image. Please check the background.jpg file.');
});

// Clickable items
const items = document.querySelectorAll('.item');
items.forEach(item => {
    // Click event
    item.addEventListener('click', function(e) {
        // Only trigger if clicking on the eye itself
        if (e.target.closest('.eye')) {
            const url = this.getAttribute('data-url');
            // Animation effect
            const eye = this.querySelector('.eye');
            eye.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                eye.style.transform = '';
                // Open URL in new window
                window.open(url, '_blank');
            }, 200);
        }
    });

    // Mouse hover effect - only on eye element
    const eye = item.querySelector('.eye');
    eye.addEventListener('mouseenter', function() {
        console.log('Hovering over item');
    });
});

// Music playback feature
// Y2K iPod style player
const audio = new Audio('your-music.mp3');
const playBtnIpod = document.getElementById('playBtnIpod');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const timeCurrent = document.querySelector('.time-current');
const timeTotal = document.querySelector('.time-total');
let isPlaying = false;

// Time format
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Play/Pause
playBtnIpod.addEventListener('click', function() {
    if (isPlaying) {
        audio.pause();
        playBtnIpod.textContent = '▶';
        isPlaying = false;
    } else {
        audio.play();
        playBtnIpod.textContent = '⏸';
        isPlaying = true;
    }
});

// Update progress bar
audio.addEventListener('timeupdate', function() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + '%';
    timeCurrent.textContent = formatTime(audio.currentTime);
    timeTotal.textContent = formatTime(audio.duration);
});

// Initial volume
audio.volume = 0.5;

// Music ended
audio.addEventListener('ended', function() {
    playBtnIpod.textContent = '▶';
    isPlaying = false;
    progressBar.style.width = '0%';
});

// Previous/Next buttons
prevBtn.addEventListener('click', function() {
    audio.currentTime = 0;
});

nextBtn.addEventListener('click', function() {
    audio.currentTime = audio.duration;
});

// Random sparkle effect
function addSparkle() {
    const randomItem = items[Math.floor(Math.random() * items.length)];
    const eye = randomItem.querySelector('.eye');
    eye.style.filter = 'brightness(1.5) drop-shadow(0 0 30px rgba(255, 0, 110, 1))';
    setTimeout(() => {
        eye.style.filter = '';
    }, 500);
}

// Random item sparkle every 3 seconds
setInterval(addSparkle, 3000);

// Fade-in effect on page load
window.addEventListener('load', function() {
    items.forEach((item, index) => {
        item.style.opacity = '0';
        setTimeout(() => {
            item.style.opacity = '1';
        }, index * 200);
    });
});

// Bio panel toggle
const bioToggle = document.getElementById('bioToggle');
const bioPanel = document.getElementById('bioPanel');
const bioClose = document.getElementById('bioClose');

bioToggle.addEventListener('click', function() {
    bioPanel.classList.add('active');
});

bioClose.addEventListener('click', function() {
    bioPanel.classList.remove('active');
});

// Close bio panel when clicking outside
bioPanel.addEventListener('click', function(e) {
    if (e.target === bioPanel) {
        bioPanel.classList.remove('active');
    }
});