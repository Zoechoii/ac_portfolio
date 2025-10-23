// Background image load check
const bgImage = document.getElementById('bgImage');
bgImage.addEventListener('load', function() {
    console.log('Background image loaded successfully');
});
bgImage.addEventListener('error', function() {
    console.error('Failed to load background image');
    alert('Cannot load background image. Please check the background.JPG file.');
});

// Clickable items
const items = document.querySelectorAll('.item');
items.forEach(item => {
    // Click event - work on both desktop and mobile
    item.addEventListener('click', function(e) {
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
        
        // Check if it's the performances button
        if (this.id === 'performancesBtn') {
            // Handle performances popup instead of opening URL
            const performancesPopup = document.getElementById('performancesPopup');
            performancesPopup.classList.add('active');
            return;
        }
        
        // Only open URL if data-url exists
        if (url) {
            window.open(url, '_blank');
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

// Mobile touch event for Play/Pause button
playBtnIpod.addEventListener('touchstart', function(e) {
    e.preventDefault();
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

// Mobile touch events for Previous/Next buttons
prevBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    audio.currentTime = 0;
});

nextBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    audio.currentTime = audio.duration;
});

// Image preloading and fade-in effect
let imagesLoaded = 0;
const totalImages = document.querySelectorAll('img').length;
const preloader = document.getElementById('preloader');

// Function to check if all images are loaded
function checkAllImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        // All images loaded, hide preloader and show content
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Show all items at once - no sequential animation
            items.forEach((item) => {
                item.style.opacity = '1';
            });
        }, 500); // Small delay for smooth transition
    }
}

// Add load event listeners to all images
document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
        checkAllImagesLoaded();
    } else {
        img.addEventListener('load', checkAllImagesLoaded);
        img.addEventListener('error', checkAllImagesLoaded); // Count errors as "loaded"
    }
});

// Fallback: if no images or all images fail to load
if (totalImages === 0) {
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1000);
}

// Mobile touch button for SoundCloud
const soundcloudButton = document.getElementById('soundcloudButton');
if (soundcloudButton) {
    soundcloudButton.addEventListener('click', function(e) {
        e.stopPropagation();
        const url = 'https://soundcloud.com/user-523526653?ref=clipboard&p=i&c=1&si=550751A6631542E6B8CBCED96134C8C1&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing';
        window.open(url, '_blank');
    });
}

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

// Close bio panel when clicking/touching outside
bioPanel.addEventListener('click', function(e) {
    if (e.target === bioPanel) {
        bioPanel.classList.remove('active');
    }
});

// Also handle touch events for mobile
bioPanel.addEventListener('touchstart', function(e) {
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

// Performances popup functionality
const performancesBtn = document.getElementById('performancesBtn');
const performancesPopup = document.getElementById('performancesPopup');
const closePerformancesBtn = document.querySelector('.traffic-light.close-performances');

performancesBtn.addEventListener('click', function() {
    performancesPopup.classList.add('active');
});

closePerformancesBtn.addEventListener('click', function() {
    // Pause all videos when closing
    const allVideos = document.querySelectorAll('.performance-video');
    allVideos.forEach(video => {
        video.pause();
    });
    performancesPopup.classList.remove('active');
});

// Close performances popup when clicking outside
performancesPopup.addEventListener('click', function(e) {
    if (e.target === performancesPopup) {
        // Pause all videos when closing
        const allVideos = document.querySelectorAll('.performance-video');
        allVideos.forEach(video => {
            video.pause();
        });
        performancesPopup.classList.remove('active');
    }
});

// Video navigation functionality
let currentVideoIndex = 0;
const videoItems = document.querySelectorAll('.video-item');
const totalVideos = videoItems.length;
const videoPrevBtn = document.querySelector('.prev-video');
const videoNextBtn = document.querySelector('.next-video');
const videoCounter = document.querySelector('.video-counter');

function showVideo(index) {
    // Hide all videos
    videoItems.forEach(item => {
        item.classList.remove('active');
        const video = item.querySelector('video');
        video.pause();
    });
    
    // Show current video
    videoItems[index].classList.add('active');
    currentVideoIndex = index;
    
    // Update counter
    videoCounter.textContent = `${index + 1} / ${totalVideos}`;
}

function nextVideo() {
    const nextIndex = (currentVideoIndex + 1) % totalVideos;
    showVideo(nextIndex);
}

function prevVideo() {
    const prevIndex = (currentVideoIndex - 1 + totalVideos) % totalVideos;
    showVideo(prevIndex);
}

// Event listeners for navigation buttons
if (videoPrevBtn) {
    videoPrevBtn.addEventListener('click', prevVideo);
}

if (videoNextBtn) {
    videoNextBtn.addEventListener('click', nextVideo);
}

// Touch events for mobile swiping
let videoTouchStartX = 0;
let videoTouchEndX = 0;
const videoGallery = document.querySelector('.video-gallery');

if (videoGallery) {
    videoGallery.addEventListener('touchstart', function(e) {
        videoTouchStartX = e.changedTouches[0].screenX;
    });

    videoGallery.addEventListener('touchend', function(e) {
        videoTouchEndX = e.changedTouches[0].screenX;
        handleVideoSwipe();
    });

    function handleVideoSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = videoTouchEndX - videoTouchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe right - previous video
                prevVideo();
            } else {
                // Swipe left - next video
                nextVideo();
            }
        }
    }
}

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

// Mobile touch events for photoshoot gallery
let touchStartX = 0;
let touchEndX = 0;
let galleryCurrentIndex = 0;
const galleryPhotos = document.querySelectorAll('.photo-gallery img');

// Add touch events to photoshoot gallery
const photoGallery = document.querySelector('.photo-gallery');
if (photoGallery) {
    photoGallery.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    photoGallery.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for a swipe
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe right - previous photo
                showPreviousPhoto();
            } else {
                // Swipe left - next photo
                showNextPhoto();
            }
        }
    }

    function showPreviousPhoto() {
        galleryCurrentIndex = (galleryCurrentIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
        scrollToPhoto(galleryCurrentIndex);
    }

    function showNextPhoto() {
        galleryCurrentIndex = (galleryCurrentIndex + 1) % galleryPhotos.length;
        scrollToPhoto(galleryCurrentIndex);
    }

    function scrollToPhoto(index) {
        const photoWidth = photoGallery.clientWidth;
        photoGallery.scrollTo({
            left: index * photoWidth,
            behavior: 'smooth'
        });
    }
}
