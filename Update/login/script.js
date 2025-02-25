document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the user data from local storage
// Define the user object
// var user = {
//     password: 22168,
//     email: "dana1@gmail.com"
// };

// // Convert the user object to a JSON string
// var userJSON = JSON.stringify(user);

// // Store the user data in local storage
// localStorage.setItem("user", userJSON);


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

    // تفعيل النموذج
    const loginForm = document.querySelector('#login .content form');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // منع إرسال النموذج بالطريقة التقليدية

        // جمع بيانات النموذج
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // استدعاء البيانات من LocalStorage (للتجربة)
        const userData = getFromLocalStorage('user');

        // التحقق من صحة البيانات
        if (userData && userData.email == email && userData.password == password) {
            // alert('تم تسجيل الدخول بنجاح!');
            window.location.href = '../hommme 2/home 2.html'; // توجيه المستخدم إلى صفحة أخرى
            localStorage.setItem("login", "true");
            } else {
            alert('البريد الإلكتروني أو كلمة المرور غير صحيحة!');
        }

        // إرسال البيانات إلى Backend (معلقة حتى تحتاجها)
        /*
        loginToBackend('https://your-backend-url.com/login', { email, password })
            .then(response => {
                if (response.success) {
                    alert('تم تسجيل الدخول بنجاح!');
                    window.location.href = '/dashboard'; // توجيه المستخدم إلى صفحة أخرى
                } else {
                    alert('فشل تسجيل الدخول: ' + response.message);
                }
            })
            .catch(error => {
                console.error('حدث خطأ:', error);
                alert('حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.');
            });
        */
    });

    // دالة لاستدعاء البيانات من LocalStorage
    function getFromLocalStorage(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    // دالة لتسجيل الدخول في Backend (معلقة حتى تحتاجها)
    /*
    async function loginToBackend(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    }
    */
});