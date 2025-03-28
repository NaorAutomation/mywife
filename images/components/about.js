// טוען את קומפוננט האודות
document.addEventListener('DOMContentLoaded', function() {
    // מחפש את האלמנט המכיל
    const aboutContainer = document.getElementById('about-container');
    
    if (!aboutContainer) {
        console.error('לא נמצא מכל עבור קומפוננט האודות');
        return;
    }
    
    // טוען את קומפוננט האודות מהקובץ החיצוני
    fetch('components/about.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('בעיה בטעינת קומפוננט האודות');
            }
            return response.text();
        })
        .then(html => {
            // מכניס את התוכן למכל
            aboutContainer.innerHTML = html;
            
            // מפעיל אירועים לאחר טעינת הקומפוננט
            const event = new CustomEvent('about-loaded');
            document.dispatchEvent(event);
            
            // מפעיל אנימציות לאחר טעינת הקומפוננט
            if (typeof gsap !== 'undefined') {
                gsap.registerPlugin(ScrollTrigger);
                
                gsap.from('#about .w-full', {
                    scrollTrigger: {
                        trigger: '#about',
                        start: 'top 80%'
                    },
                    opacity: 0,
                    y: 40,
                    duration: 1,
                    stagger: 0.3,
                    ease: "power2.out"
                });
            }
        })
        .catch(error => {
            console.error('שגיאה בטעינת קומפוננט האודות:', error);
            aboutContainer.innerHTML = '<div class="text-center py-8"><p class="text-red-500">שגיאה בטעינת תוכן האודות</p></div>';
        });
}); 