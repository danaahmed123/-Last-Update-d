function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
}

function verifyCode() {
    try {
        const correctCodes = ["123456", "444444", "7589"]; // الرموز الصحيحة للتحقق
        const enteredCode = document.getElementById('verification-code').value.trim();

        console.log("Entered Code:", enteredCode); // إضافة رسالة تصحيح

        if (enteredCode === "") {
            alert("Please enter the verification code.");
        } else if (correctCodes.includes(enteredCode)) {
            localStorage.setItem('verified', 'true');
            window.location.href = "../new/beforeAsses.html"; // إعادة التوجيه إلى صفحة beforeAsses
        } else {
            window.location.href = "../access/accessdenied.html"; // إعادة التوجيه إلى صفحة accessdenied
        }
    } catch (error) {
        console.error('Error during verification:', error);
        window.location.href = '../error/error.html'; // إعادة التوجيه إلى صفحة الخطأ في حالة حدوث خطأ
    }
}

// التحقق من حالة التحقق عند تحميل الصفحة
/*window.onload = function() {
    try {
        if (localStorage.getItem('verified') === 'true') {
            window.location.href = "../new/beforeAsses.html"; // إعادة التوجيه إلى صفحة beforeAsses إذا كان المستخدم قد تم التحقق منه بالفعل
        }
    } catch (error) {
        console.error('Error during page load:', error);
        window.location.href = '../error/error.html'; // إعادة التوجيه إلى صفحة الخطأ في حالة حدوث خطأ
    }
}*/