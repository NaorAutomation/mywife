// טוען את קומפוננט צור קשר
document.addEventListener('DOMContentLoaded', function() {
    // מחפש את האלמנט המכיל
    const contactContainer = document.getElementById('contact-container');
    
    if (!contactContainer) {
        console.error('לא נמצא מכל עבור קומפוננט צור קשר');
        return;
    }
    
    // טוען את קומפוננט צור קשר מהקובץ החיצוני
    fetch('components/contact.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('בעיה בטעינת קומפוננט צור קשר');
            }
            return response.text();
        })
        .then(html => {
            // מכניס את התוכן למכל
            contactContainer.innerHTML = html;
            
            // מפעיל טיפול בטופס לאחר טעינת הקומפוננט
            initContactForm();
        })
        .catch(error => {
            console.error('שגיאה בטעינת קומפוננט צור קשר:', error);
            contactContainer.innerHTML = '<div class="text-center py-8"><p class="text-red-500">שגיאה בטעינת טופס יצירת קשר</p></div>';
        });
});

// פונקציית אתחול לטופס צור קשר
function initContactForm() {
    // טיפול בהגשת הטופס
    const form = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // בדיקת ולידציה בסיסית
            const name = form.querySelector('#name').value.trim();
            const phone = form.querySelector('#phone').value.trim();
            
            if (!name || !phone) {
                alert('אנא מלאו את כל השדות הנדרשים');
                return;
            }
            
            // איסוף נתוני הטופס
            const formData = new FormData(form);
            const formDataObj = {};
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            console.log('נתוני הטופס:', formDataObj);
            
            // כאן בפרויקט אמיתי תהיה שליחה לשרת
            // לדוגמה:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataObj)
            })
            .then(response => response.json())
            .then(data => {
                console.log('הטופס נשלח בהצלחה:', data);
                showThankYouMessage();
            })
            .catch(error => {
                console.error('שגיאה בשליחת הטופס:', error);
                alert('אירעה שגיאה בשליחת הטופס. אנא נסו שנית או צרו קשר בטלפון.');
            });
            */
            
            // לצורך הדגמה, נציג את הודעת התודה מיד
            showThankYouMessage();
        });
    }
    
    // איפוס הטופס והסתרת הודעת תודה
    const resetButton = document.getElementById('resetForm');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            if (form) {
                form.reset();
                form.style.display = 'block';
            }
            
            if (thankYouMessage) {
                thankYouMessage.style.display = 'none';
            }
        });
    }
    
    // פונקציה להצגת הודעת תודה
    function showThankYouMessage() {
        if (form && thankYouMessage) {
            form.style.display = 'none';
            thankYouMessage.style.display = 'block';
        }
    }
    
    // אנימציות עם GSAP אם זמינות
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        
        // אנימציה לסקציית צור קשר
        gsap.from('#contact h2, #contact .text-center p', {
            scrollTrigger: {
                trigger: '#contact',
                start: 'top 80%'
            },
            opacity: 0,
            y: 30,
            stagger: 0.2,
            duration: 0.8,
            ease: "power2.out"
        });
        
        // אנימציה לטופס ולמידע
        gsap.from('#contact .w-full.md\\:w-1\\/2', {
            scrollTrigger: {
                trigger: '#contact .w-full.md\\:w-1\\/2',
                start: 'top 80%'
            },
            opacity: 0,
            x: 50,
            stagger: 0.3,
            duration: 0.8,
            ease: "power2.out"
        });
    }
} 