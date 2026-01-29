let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    if (index >= slides.length) currentIndex = 0;
    if (index < 0) currentIndex = slides.length - 1;

    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

function currentSlide(n) {
    currentIndex = n;
    showSlide(currentIndex);
    resetTimer();
}

let slideInterval = setInterval(() => {
    currentIndex++;
    showSlide(currentIndex);
}, 2000);

function resetTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        currentIndex++;
        showSlide(currentIndex);
    }, 2000);
}