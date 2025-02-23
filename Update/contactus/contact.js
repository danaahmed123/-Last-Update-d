function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden");
}

async function handleSubmit(event) {
  event.preventDefault(); // منع إعادة تحميل الصفحة

  const form = event.target;
  const formData = new FormData(form);

  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message')
  };

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert('Your message has been sent successfully!');
      form.reset(); // إعادة تعيين النموذج
    } else {
      alert('Failed to send your message. Please try again.');
      window.location.href = '../error/error.html'; // إعادة التوجيه إلى صفحة الخطأ
    }
  } catch (error) {
    console.error('Error:', error);
    window.location.href = '../error/error.html'; // إعادة التوجيه إلى صفحة الخطأ في حالة حدوث خطأ
  }
}