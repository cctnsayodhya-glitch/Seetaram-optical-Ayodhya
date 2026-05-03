// Simple alert for the booking button
function openBooking() {
    alert("Welcome to Seetaram Eye Care! Redirecting you to our appointment system...");
}

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
