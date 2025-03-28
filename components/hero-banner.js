// טעינת קומפוננטת הבאנר הראשי
document.addEventListener('DOMContentLoaded', () => {
    // חשוב לוודא שה-DOM כבר נטען
    setTimeout(() => {
        fetch('components/hero-banner.html')
            .then(response => response.text())
            .then(html => {
                // הכנסת התוכן לאלמנט main
                const mainElement = document.querySelector('main');
                if (mainElement) {
                    // נקה את תוכן ה-main אם יש צורך
                    // mainElement.innerHTML = '';
                    
                    // הכנסת התוכן ישירות ל-main במקום ליצור div נוסף
                    const tempContainer = document.createElement('div');
                    tempContainer.innerHTML = html;
                    
                    // העבר את כל ה-style לhead
                    const styles = tempContainer.querySelectorAll('style');
                    styles.forEach(style => {
                        document.head.appendChild(style.cloneNode(true));
                    });
                    
                    // מוסיף את ה-HTML ל-main
                    mainElement.insertAdjacentHTML('afterbegin', tempContainer.querySelector('section.hero-banner').outerHTML);
                    
                    // הפעלת האנימציה
                    setTimeout(() => {
                        gsap.from('.hero-banner .fade-in', {
                            opacity: 0,
                            y: 30,
                            duration: 1,
                            stagger: 0.2,
                            ease: "power2.out"
                        });
                    }, 100);
                }
            })
            .catch(error => console.error('שגיאה בטעינת הבאנר הראשי:', error));
    }, 100); // תן קצת זמן לוודא שה-DOM נטען לגמרי
}); 