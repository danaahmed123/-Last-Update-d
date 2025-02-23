document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('questions.json');
  const questions = await response.json();
  displayQuestions(questions);

  // إضافة مستمع حدث للنموذج
  const form = document.getElementById('question-form');
  form.addEventListener('submit', handleSubmit);
});

function displayQuestions(questions) {
  const questionContainer = document.getElementById('question-container');
  questions.forEach((question, index) => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `
      <h3>${index + 1}. ${question.question}</h3>
      ${question.options.map(option => `
        <label>
          <input type="radio" name="question${index}" value="${option}">
          ${option}
        </label>
      `).join('')}
    `;
    questionContainer.appendChild(questionElement);
  });
}

async function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const answers = {};
  let allAnswered = true;

  formData.forEach((value, key) => {
    answers[key] = value;
  });

  // التحقق من أن جميع الأسئلة قد تمت الإجابة عليها
  const totalQuestions = document.querySelectorAll('.question').length;
  const answeredQuestions = Object.keys(answers).length;

  // إزالة رسائل الخطأ السابقة
  document.querySelectorAll('.error-message').forEach(el => el.remove());

  if (answeredQuestions < totalQuestions) {
    allAnswered = false;
    // إضافة رسالة خطأ تحت كل سؤال لم تتم الإجابة عليه
    document.querySelectorAll('.question').forEach((questionElement, index) => {
      if (!answers[`question${index}`]) {
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.style.color = 'red';
        errorMessage.textContent = 'Please answer this question.';
        questionElement.appendChild(errorMessage);
      }
    });
  }

  if (!allAnswered) {
    return;
  }

  try {
    const response = await fetch('/api/submit-answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(answers)
    });

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem('score', result.score);
      localStorage.setItem('passed', result.passed);
      window.location.href = '../end/end.html';
    } else {
      window.location.href = '../error/error.html'; // إعادة التوجيه إلى صفحة الخطأ إذا لم يحدث استجابة صحيحة
    }
  } catch (error) {
    console.error('Error submitting answers:', error);
    window.location.href = '../error/error.html'; // إعادة التوجيه إلى صفحة الخطأ في حالة حدوث خطأ
  }
}