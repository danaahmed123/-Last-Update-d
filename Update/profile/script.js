document.addEventListener('DOMContentLoaded', function () {
    // استدعاء بيانات المستخدم من LocalStorage
    const userData = getFromLocalStorage('user');
    if (userData) {
        document.getElementById('name').value = userData.name || '';
        document.getElementById('email').value = userData.email || '';
        document.getElementById('phone').value = userData.phone || '';
        document.getElementById('gender').value = userData.gender || 'male';
    }

    // تفعيل زر التعديل
    const editButton = document.querySelector('input[type="button"][value="Edit"]');
    editButton.addEventListener('click', function () {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const gender = document.getElementById('gender').value;

        const updatedUserData = { name, email, phone, gender };

        // حفظ البيانات في LocalStorage
        saveToLocalStorage('user', updatedUserData);
        alert('تم تحديث البيانات بنجاح!');

        // إرسال البيانات إلى Backend (معلقة حتى تحتاجها)
        /*
        updateProfileInBackend('https://your-backend-url.com/update-profile', updatedUserData)
            .then(response => {
                console.log('استجابة الخادم:', response);
                alert('تم تحديث البيانات بنجاح!');
            })
            .catch(error => {
                console.error('حدث خطأ:', error);
                alert('حدث خطأ أثناء تحديث البيانات. يرجى المحاولة مرة أخرى.');
            });
        */
    });

    // تفعيل زر تسجيل الخروج
    const logoutButton = document.querySelector('input[type="button"][value="Log out"]');
    logoutButton.addEventListener('click', function () {
        // حذف بيانات المستخدم من LocalStorage
        deleteFromLocalStorage('user');
        alert('تم تسجيل الخروج بنجاح!');
        window.location.href = '/login'; // توجيه المستخدم إلى صفحة تسجيل الدخول

        // إرسال طلب تسجيل الخروج إلى Backend (معلقة حتى تحتاجها)
        /*
        logoutFromBackend('https://your-backend-url.com/logout')
            .then(response => {
                console.log('استجابة الخادم:', response);
                alert('تم تسجيل الخروج بنجاح!');
                window.location.href = '/login'; // توجيه المستخدم إلى صفحة تسجيل الدخول
            })
            .catch(error => {
                console.error('حدث خطأ:', error);
                alert('حدث خطأ أثناء تسجيل الخروج. يرجى المحاولة مرة أخرى.');
            });
        */
    });

    // دالة لحفظ البيانات في LocalStorage
    function saveToLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    // دالة لاستدعاء البيانات من LocalStorage
    function getFromLocalStorage(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    // دالة لحذف البيانات من LocalStorage
    function deleteFromLocalStorage(key) {
        localStorage.removeItem(key);
    }

    // دالة لتحديث البيانات في Backend (معلقة حتى تحتاجها)
    /*
    async function updateProfileInBackend(url, data) {
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

    // دالة لتسجيل الخروج في Backend (معلقة حتى تحتاجها)
    /*
    async function logoutFromBackend(url) {
        const response = await fetch(url, {
            method: 'POST',
        });
        return await response.json();
    }
    */
});