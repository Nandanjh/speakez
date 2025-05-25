// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    
    function highlightNavOnScroll() {
        let scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Scroll cue functionality
    const scrollCue = document.querySelector('.scroll-cue');
    if (scrollCue) {
        scrollCue.addEventListener('click', function() {
            window.scrollTo({
                top: document.getElementById('intro').offsetTop,
                behavior: 'smooth'
            });
        });
    }
    
    // Audio toggle functionality
    const audioToggle = document.getElementById('audio-toggle');
    const backgroundAudio = document.getElementById('background-audio');
    
    if (audioToggle && backgroundAudio) {
        audioToggle.addEventListener('click', function() {
            if (backgroundAudio.paused) {
                backgroundAudio.play();
                audioToggle.classList.add('playing');
                audioToggle.querySelector('.audio-icon').textContent = '♫';
            } else {
                backgroundAudio.pause();
                audioToggle.classList.remove('playing');
                audioToggle.querySelector('.audio-icon').textContent = '♪';
            }
        });
    }
    
    // Menu items animation on scroll
    const menuItems = document.querySelectorAll('.menu-item');
    
    function animateMenuItems() {
        menuItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const itemBottom = item.getBoundingClientRect().bottom;
            
            if (itemTop < window.innerHeight - 100 && itemBottom > 0) {
                item.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', animateMenuItems);
    // Initial check for visible elements
    animateMenuItems();
    
    // Neon events cycling
    const neonEvents = document.querySelectorAll('.neon-event');
    let currentEventIndex = 0;
    
    function cycleEvents() {
        neonEvents.forEach(event => {
            event.classList.remove('active');
            const color = event.getAttribute('data-color');
            event.querySelector('.neon-text').style.textShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
        });
        
        neonEvents[currentEventIndex].classList.add('active');
        const activeColor = neonEvents[currentEventIndex].getAttribute('data-color');
        neonEvents[currentEventIndex].querySelector('.neon-text').style.textShadow = `0 0 10px ${activeColor}, 0 0 20px ${activeColor}, 0 0 30px ${activeColor}`;
        neonEvents[currentEventIndex].style.borderLeft = `5px solid ${activeColor}`;
        
        currentEventIndex = (currentEventIndex + 1) % neonEvents.length;
    }
    
    // Initial call and set interval
    if (neonEvents.length > 0) {
        cycleEvents();
        setInterval(cycleEvents, 4000);
    }
    
    // Football scoreboard live update simulation
    function updateScoreboard() {
        const homeScore = document.querySelector('.home-score');
        const awayScore = document.querySelector('.away-score');
        const matchInfo = document.querySelector('.match-info');
        
        if (homeScore && awayScore && matchInfo) {
            // Simulate time passing
            let currentMinute = parseInt(matchInfo.textContent.split(' - ')[1].replace("'", ""));
            currentMinute = (currentMinute + 1) % 90;
            if (currentMinute === 0) currentMinute = 1;
            
            // Occasionally update score (rare event)
            if (Math.random() < 0.02) {
                if (Math.random() > 0.5) {
                    homeScore.textContent = parseInt(homeScore.textContent) + 1;
                } else {
                    awayScore.textContent = parseInt(awayScore.textContent) + 1;
                }
                
                // Flash effect for goal
                const scoreboard = document.querySelector('.scoreboard');
                scoreboard.classList.add('goal-scored');
                setTimeout(() => {
                    scoreboard.classList.remove('goal-scored');
                }, 1000);
            }
            
            matchInfo.textContent = `LIVE - ${currentMinute}'`;
        }
    }
    
    // Update scoreboard every 3 seconds
    const scoreboardInterval = setInterval(updateScoreboard, 3000);
    
    // Soundwall audio functionality
    const soundTiles = document.querySelectorAll('.sound-tile');
    let currentAudio = null;
    
    soundTiles.forEach(tile => {
        // Add visible class for animation
        setTimeout(() => {
            tile.classList.add('visible');
        }, Math.random() * 1000);
        
        tile.addEventListener('click', function() {
            const audioSrc = this.getAttribute('data-audio');
            const icon = this.querySelector('.sound-icon');
            
            // Stop any currently playing audio
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                document.querySelectorAll('.sound-icon').forEach(icon => {
                    icon.textContent = '▶';
                });
            }
            
            // Play new audio if it's not the same as current
            if (!currentAudio || currentAudio.src !== audioSrc) {
                const audio = new Audio(audioSrc);
                audio.volume = 0.7;
                audio.play();
                currentAudio = audio;
                icon.textContent = '■';
                
                // Reset after audio ends
                audio.addEventListener('ended', function() {
                    icon.textContent = '▶';
                    currentAudio = null;
                });
            } else {
                currentAudio = null;
            }
        });
    });
    
    // Reservation modal functionality
    const reserveBtn = document.getElementById('reserve-btn');
    const reservationModal = document.getElementById('reservation-modal');
    const closeModal = document.querySelector('.close-modal');
    const reservationForm = document.getElementById('reservation-form');
    
    if (reserveBtn && reservationModal) {
        reserveBtn.addEventListener('click', function() {
            reservationModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        closeModal.addEventListener('click', function() {
            reservationModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside content
        reservationModal.addEventListener('click', function(e) {
            if (e.target === reservationModal) {
                reservationModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Form submission
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Reservation submitted successfully! We will contact you to confirm your reservation.');
                reservationForm.reset();
                reservationModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                submitBtn.textContent = 'Submit Reservation';
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Set minimum date for reservation to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // Parallax effect for sections
    function parallaxEffect() {
        const scrollPosition = window.scrollY;
        
        // Hero parallax
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        }
        
        // Football background parallax
        const footballBg = document.querySelector('.football-bg');
        if (footballBg) {
            const footballSection = document.getElementById('football');
            const footballOffset = footballSection.offsetTop;
            const footballScroll = scrollPosition - footballOffset;
            
            if (footballScroll > -window.innerHeight && footballScroll < window.innerHeight) {
                footballBg.style.transform = `translateY(${footballScroll * 0.1}px)`;
            }
        }
    }
    
    window.addEventListener('scroll', parallaxEffect);
    
    // Initialize animations and effects
    function init() {
        // Preload images for better performance
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                const preloadImg = new Image();
                preloadImg.src = src;
            }
        });
        
        // Set initial active nav link
        highlightNavOnScroll();
        
        // Check for visible elements on initial load
        animateMenuItems();
    }
    
    init();
});