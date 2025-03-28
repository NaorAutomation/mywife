// טוען את קומפוננט ההמלצות
document.addEventListener('DOMContentLoaded', function() {
    // מחפש את האלמנט המכיל
    const testimonialsContainer = document.getElementById('testimonials-container');
    
    if (!testimonialsContainer) {
        console.error('לא נמצא מכל עבור קומפוננט ההמלצות');
        return;
    }
    
    // טוען את קומפוננט ההמלצות מהקובץ החיצוני
    fetch('components/testimonials.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('בעיה בטעינת קומפוננט ההמלצות');
            }
            return response.text();
        })
        .then(html => {
            // מכניס את התוכן למכל
            testimonialsContainer.innerHTML = html;
            
            // מפעיל אירועים לאחר טעינת הקומפוננט
            const event = new CustomEvent('testimonials-loaded');
            document.dispatchEvent(event);
            
            // מאזין לאירוע הטעינה להפעלת הפונקציונליות של ההמלצות
            document.addEventListener('testimonials-loaded', initTestimonials);
        })
        .catch(error => {
            console.error('שגיאה בטעינת קומפוננט ההמלצות:', error);
            testimonialsContainer.innerHTML = '<div class="text-center py-8"><p class="text-red-500">שגיאה בטעינת תוכן ההמלצות</p></div>';
        });
    
    // פונקציה לאתחול פונקציונליות ההמלצות
    function initTestimonials() {
        setTimeout(() => {
            // משתנים
            const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
            const testimonialCards = document.querySelectorAll('.testimonial-card');
            const prevButton = document.querySelector('.carousel-prev');
            const nextButton = document.querySelector('.carousel-next');
            const indicators = document.querySelectorAll('.indicator-dot');
            
            if (!testimonialsWrapper || !testimonialCards.length) {
                console.error('לא נמצאו אלמנטים נדרשים של קומפוננט ההמלצות');
                return;
            }
            
            let currentIndex = 0;
            let cardWidth;
            let cardsPerView;
            let maxIndex;
            
            // פונקציה לחישוב מספר הכרטיסים לתצוגה וגודל הכרטיס
            function calculateCardsPerView() {
                const viewportWidth = window.innerWidth;
                
                if (viewportWidth >= 1024) { // lg
                    cardsPerView = 3;
                } else if (viewportWidth >= 768) { // md
                    cardsPerView = 2;
                } else { // sm
                    cardsPerView = 1;
                }
                
                cardWidth = testimonialsWrapper.clientWidth / cardsPerView;
                maxIndex = Math.ceil(testimonialCards.length - cardsPerView);
                
                // עדכון רוחב הכרטיסים
                testimonialCards.forEach(card => {
                    card.style.width = `${100 / cardsPerView}%`;
                });
                
                // מעבר לתצוגה הנוכחית
                goToSlide(currentIndex);
            }
            
            // פונקציה למעבר לשקופית
            function goToSlide(index) {
                if (index < 0) index = 0;
                if (index > maxIndex) index = maxIndex;
                
                currentIndex = index;
                const translateX = -currentIndex * cardWidth;
                testimonialsWrapper.style.transform = `translateX(${translateX}px)`;
                
                // עדכון האינדיקטורים
                if (indicators && indicators.length) {
                    indicators.forEach((dot, i) => {
                        if (i === Math.floor(currentIndex / (testimonialCards.length / indicators.length))) {
                            dot.classList.add('active', 'bg-primary-pink');
                            dot.classList.remove('bg-gray-300');
                        } else {
                            dot.classList.remove('active', 'bg-primary-pink');
                            dot.classList.add('bg-gray-300');
                        }
                    });
                }
            }
            
            // הוספת מאזיני אירועים
            if (prevButton) {
                prevButton.addEventListener('click', () => {
                    goToSlide(currentIndex - 1);
                });
            }
            
            if (nextButton) {
                nextButton.addEventListener('click', () => {
                    goToSlide(currentIndex + 1);
                });
            }
            
            if (indicators && indicators.length) {
                indicators.forEach((dot, i) => {
                    dot.addEventListener('click', () => {
                        const slideIndex = i * Math.ceil(testimonialCards.length / indicators.length);
                        goToSlide(slideIndex);
                    });
                });
            }
            
            // התאמה לשינוי גודל החלון
            window.addEventListener('resize', calculateCardsPerView);
            
            // אתחול
            calculateCardsPerView();
            
            // אנימציה כאשר הסקשן נכנס לתצוגה
            if (typeof gsap !== 'undefined') {
                gsap.registerPlugin(ScrollTrigger);
                
                gsap.from('#testimonials .testimonial-card', {
                    scrollTrigger: {
                        trigger: '#testimonials',
                        start: 'top 80%'
                    },
                    opacity: 0,
                    y: 50,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: "power2.out"
                });
                
                gsap.from('#testimonials .testimonial-badge', {
                    scrollTrigger: {
                        trigger: '#testimonials',
                        start: 'top 70%'
                    },
                    opacity: 0,
                    scale: 0.5,
                    stagger: 0.2,
                    duration: 1,
                    ease: "elastic.out(1, 0.5)"
                });
            }
        }, 100); // השהייה קטנה לוודא שהתוכן נטען במלואו
    }
});