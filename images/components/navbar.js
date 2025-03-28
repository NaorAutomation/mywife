// טעינת קומפוננטת Navbar
document.addEventListener('DOMContentLoaded', () => {
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(html => {
            // מוודאים שרק החלק של ה-navbar נטען (ללא תוכן אחר)
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            
            // מוצאים את ה-nav ומכניסים אותו לקונטיינר
            const navElement = tempDiv.querySelector('nav');
            if (navElement) {
                document.getElementById('navbar-container').appendChild(navElement);
            }
            
            // מוסיפים את ה-CSS
            const styleElement = tempDiv.querySelector('style');
            if (styleElement) {
                document.head.appendChild(styleElement);
            }
            
            // מוסיפים את ה-JavaScript
            const scriptElement = tempDiv.querySelector('script');
            if (scriptElement) {
                const newScript = document.createElement('script');
                newScript.textContent = scriptElement.textContent;
                document.body.appendChild(newScript);
            }
        })
        .catch(error => console.error('שגיאה בטעינת ה-navbar:', error));
}); 