document.addEventListener('DOMContentLoaded', function () {
    // تفعيل الحركات عند تحميل الصفحة
    const animElements = document.querySelectorAll('.anim');
    animElements.forEach((element) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
    });

    setTimeout(() => {
        animElements.forEach((element) => {
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }, 100);

    // تفعيل زر "Services"
    const servicesBtn = document.querySelector('.btn');
    servicesBtn.addEventListener('click', function (event) {
        event.preventDefault(); // منع الانتقال إلى الصفحة الأخرى (لأغراض التصميم)
        alert('تم النقر على زر الخدمات!'); // يمكن استبدال هذا بالإجراء المطلوب
    });

    // تحسين القائمة المنسدلة (Hamburger Menu)
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.querySelector('nav ul');

    menuToggle.addEventListener('change', function () {
        if (menuToggle.checked) {
            navList.style.maxHeight = navList.scrollHeight + 'px';
        } else {
            navList.style.maxHeight = '0';
        }
    });

    // إضافة تأثيرات عند التمرير (Scroll Effects)
    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;
        const header = document.querySelector('header');

        if (scrollPosition > 50) {
            header.style.backgroundColor = '#ffffff';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.boxShadow = 'none';
        }
    });
});