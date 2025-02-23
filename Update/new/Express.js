const express = require('express');
const app = express();
app.use(express.json());

let users = []; // تخزين معلومات المستخدمين ونتائج الامتحان مؤقتًا

// الإجابات الصحيحة للأسئلة
const correctAnswers = {
  question0: "A cyber attack",
  question1: "All of the above",
  question2: "The correct answer for question 2",
  // أضف المزيد من الإجابات الصحيحة هنا
};

app.post('/api/submit-answers', (req, res) => {
  try {
    const { email, name, answers } = req.body;
    let score = 0;
    let totalQuestions = Object.keys(correctAnswers).length;

    // التحقق من صحة الإجابات وحساب النتيجة
    for (const [key, value] of Object.entries(answers)) {
      if (correctAnswers[key] === value) {
        score++;
      }
    }

    // تحديد ما إذا كان المستخدم قد نجح أم لا
    const passed = score >= (totalQuestions / 2); // مثال: النجاح إذا كانت النتيجة 50% أو أكثر

    // تخزين معلومات المستخدم ونتيجة الامتحان
    users.push({ email, name, score, passed });

    res.json({ success: true, score, passed });
  } catch (error) {
    console.error('Error processing answers:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// نقطة نهاية لجلب معلومات المستخدمين ونتائج الامتحان
app.get('/api/users', (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});