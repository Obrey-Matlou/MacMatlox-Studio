 // Simple scroll animations
        document.addEventListener('DOMContentLoaded', function() {
            const framerElements = document.querySelectorAll('.framer-element');
            const header = document.getElementById('main-header');
            
            // Header scroll effect - transparent when at top
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
            
            // Initialize header state
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            }
            
            // Intersection Observer for scroll animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            // Set initial state and observe elements
            framerElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                observer.observe(el);
            });
            
            // Smooth scrolling for navigation links
            document.querySelectorAll('nav a, .footer-links a').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                });
            });
            
            // WhatsApp booking button functionality
            const whatsappBtn = document.getElementById('whatsapp-book-btn');
            whatsappBtn.addEventListener('click', function() {
                // Replace with your actual WhatsApp number and message
                const phoneNumber = '27686202423'; // Replace with your number
                const message = 'Hello! I would like to book an appointment with MacMatlox Studio.';
                const whatsappURL = `https://wa.me/${27686202423}?text=${encodeURIComponent(message)}`;
                
                window.open(whatsappURL, '_blank');
            });
            
            // Service card animations
            const serviceCards = document.querySelectorAll('.service-card');
            serviceCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });
        });
