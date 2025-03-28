// קוד JavaScript ראשי

// אנימציות GSAP
document.addEventListener('DOMContentLoaded', () => {
    // אנימציית הופעה בגלילה
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.utils.toArray('.fade-in').forEach(element => {
        gsap.from(element, {
            opacity: 0,
            y: 30,
            duration: 1,
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // אנימציית Navbar בגלילה
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-shrink');
            } else {
                navbar.classList.remove('navbar-shrink');
            }
        });
    }
    
    // מאזין לסגירת התפריט המובייל בלחיצה מחוץ לו
    document.addEventListener('click', (e) => {
        const menu = document.getElementById('mobile-menu');
        const menuButton = document.querySelector('.mobile-menu-btn');
        
        if (menu && menu.classList.contains('show') && 
            !menu.contains(e.target) && 
            menuButton && !menuButton.contains(e.target)) {
            menu.classList.remove('show');
            const menuIcon = document.querySelector('.mobile-menu-icon');
            if (menuIcon) menuIcon.classList.remove('open');
        }
    });
});

// טעינת קומפוננטות
function loadComponent(url, targetId) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(targetId).innerHTML = html;
            
            // טעינת סקריפטים נוספים אם יש צורך
            const scripts = document.getElementById(targetId).querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                document.head.appendChild(newScript);
            });
        })
        .catch(error => console.error(`שגיאה בטעינת הקומפוננטה: ${error}`));
} 