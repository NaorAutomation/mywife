// טעינת קומפוננטת השירותים
document.addEventListener('DOMContentLoaded', function() {
    const servicesContainer = document.getElementById('services-container');
    if (!servicesContainer) return;

    // טעינת קומפוננטת השירותים
    fetch('components/services.html')
        .then(response => response.text())
        .then(html => {
            // יצירת אלמנט זמני להחזקת ה-HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            
            // הוספת הקומפוננטה לדף
            const servicesSection = tempDiv.querySelector('section');
            if (servicesSection) {
                servicesContainer.appendChild(servicesSection);
                
                // הוספת סקריפטים
                const scripts = tempDiv.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    if (script.src) {
                        newScript.src = script.src;
                    } else {
                        newScript.textContent = script.textContent;
                    }
                    document.body.appendChild(newScript);
                });
            }
        })
        .catch(error => {
            console.error('שגיאה בטעינת קומפוננטת השירותים:', error);
            servicesContainer.innerHTML = '<p class="text-center py-16">לא ניתן לטעון את תוכן השירותים. נא לרענן את הדף.</p>';
        });
}); 