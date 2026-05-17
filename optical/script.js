document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentSlide = 0;
    const slideInterval = 6000; // Auto-rotate every 6 seconds

    // Function to update visual slide state
    function updateSlides(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides(currentSlide);
    }

    // Button event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
    });

    // Dot navigation listeners
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlides(currentSlide);
            resetTimer();
        });
    });

    // Automatic smooth slider rotation
    let autoSlideTimer = setInterval(nextSlide, slideInterval);

    function resetTimer() {
        clearInterval(autoSlideTimer);
        autoSlideTimer = setInterval(nextSlide, slideInterval);
    }
});
