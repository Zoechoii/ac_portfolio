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
            
            // Check if it's the contact button
            if (this.id === 'contactBtn') {
                // Handle contact popup instead of opening URL
                const contactPopup = document.getElementById('contactPopup');
                contactPopup.classList.add('active');
                return;
            }
            
            // Check if it's the photoshoot button
            if (this.id === 'photoshootBtn') {
                // Handle photoshoot popup instead of opening URL
                const photoshootPopup = document.getElementById('photoshootPopup');
                photoshootPopup.classList.add('active');
                return;
            }
            
            // Only open URL if data-url exists
            if (url) {
                window.open(url, '_blank');
            }
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

// Contact popup functionality
const contactBtn = document.getElementById('contactBtn');
const contactPopup = document.getElementById('contactPopup');
const closeBtn = document.querySelector('.traffic-light.close');

contactBtn.addEventListener('click', function() {
    contactPopup.classList.add('active');
});

closeBtn.addEventListener('click', function() {
    contactPopup.classList.remove('active');
});

// Close contact popup when clicking outside
contactPopup.addEventListener('click', function(e) {
    if (e.target === contactPopup) {
        contactPopup.classList.remove('active');
    }
});

// Photoshoot popup functionality
const photoshootBtn = document.getElementById('photoshootBtn');
const photoshootPopup = document.getElementById('photoshootPopup');
const closePhotoshootBtn = document.querySelector('.traffic-light.close-photoshoot');

photoshootBtn.addEventListener('click', function() {
    photoshootPopup.classList.add('active');
});

closePhotoshootBtn.addEventListener('click', function() {
    photoshootPopup.classList.remove('active');
});

// Close photoshoot popup when clicking outside
photoshootPopup.addEventListener('click', function(e) {
    if (e.target === photoshootPopup) {
        photoshootPopup.classList.remove('active');
    }
});

// Photo Lightbox functionality
let currentZoom = 1;
let currentPhotoIndex = 0;
let allPhotos = [];
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const zoomIn = document.getElementById('zoomIn');
const zoomOut = document.getElementById('zoomOut');
const prevPhoto = document.getElementById('prevPhoto');
const nextPhoto = document.getElementById('nextPhoto');

// Add click event to all gallery photos
document.addEventListener('DOMContentLoaded', function() {
    const galleryPhotos = document.querySelectorAll('.gallery-photo');
    
    // Store all photos for navigation
    allPhotos = Array.from(galleryPhotos);
    
    galleryPhotos.forEach((photo, index) => {
        photo.addEventListener('click', function(e) {
            e.stopPropagation();
            currentPhotoIndex = index;
            const src = this.src;
            lightboxImage.src = src;
            lightbox.classList.add('active');
            currentZoom = 1;
            lightboxImage.style.transform = 'scale(1)';
        });
    });
});

// Close lightbox
lightboxClose.addEventListener('click', function(e) {
    e.stopPropagation();
    lightbox.classList.remove('active');
});

// Close lightbox when clicking outside image
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

// Zoom controls
zoomIn.addEventListener('click', function(e) {
    e.stopPropagation();
    currentZoom = Math.min(currentZoom * 1.2, 5);
    lightboxImage.style.transform = `scale(${currentZoom})`;
});

zoomOut.addEventListener('click', function(e) {
    e.stopPropagation();
    currentZoom = Math.max(currentZoom / 1.2, 0.1);
    lightboxImage.style.transform = `scale(${currentZoom})`;
});

// Previous photo functionality
prevPhoto.addEventListener('click', function(e) {
    e.stopPropagation();
    currentPhotoIndex = (currentPhotoIndex - 1 + allPhotos.length) % allPhotos.length;
    const prevPhotoSrc = allPhotos[currentPhotoIndex].src;
    lightboxImage.src = prevPhotoSrc;
    currentZoom = 1;
    lightboxImage.style.transform = 'scale(1)';
});

// Next photo functionality
nextPhoto.addEventListener('click', function(e) {
    e.stopPropagation();
    currentPhotoIndex = (currentPhotoIndex + 1) % allPhotos.length;
    const nextPhotoSrc = allPhotos[currentPhotoIndex].src;
    lightboxImage.src = nextPhotoSrc;
    currentZoom = 1;
    lightboxImage.style.transform = 'scale(1)';
});

// Keyboard controls
document.addEventListener('keydown', function(e) {
    if (lightbox.classList.contains('active')) {
        switch(e.key) {
            case 'Escape':
                lightbox.classList.remove('active');
                break;
            case '+':
            case '=':
                zoomIn.click();
                break;
            case '-':
                zoomOut.click();
                break;
            case 'ArrowLeft':
                prevPhoto.click();
                break;
            case 'ArrowRight':
            case ' ':
                nextPhoto.click();
                break;
        }
    }
});
