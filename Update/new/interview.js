let currentQuestionIndex = 0;
let questions = [];
let answers = []; // مصفوفة لتخزين الإجابات
let isListening = false;

document.addEventListener('DOMContentLoaded', async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const path = urlParams.get('path');
  const subPath = urlParams.get('subPath');


  switch (path) {
    case 'soc':
      questions = [
        { text: "What is SOC?", audio: "audio/phishing.mp3" },
        { text: "Explain the role of a SOC analyst.", audio: "audio/identify_phishing.mp3" }
      ];
      break;
    case 'malware-analysis':
      questions = [
        { text: "What is malware analysis?", audio: "audio/phishing.mp3" },
        { text: "Describe the process of analyzing malware.", audio:  "audio/identify_phishing.mp3" },
        { text: "What is malware analysis?", audio: "audio/phishing.mp3" },
        { text: "Describe the process of analyzing malware.", audio:  "audio/identify_phishing.mp3" }
      ];
      break;
    case 'pen-test':
      if (subPath === 'web-application') {
        questions = [
          { text: "What is web penetration testing?", audio: "audio/phishing.mp3"  },
          { text: "Explain the OWASP Top 10.", audio:  "audio/identify_phishing.mp3" },
          { text: "What is malware analysis?", audio: "audio/phishing.mp3" },
          { text: "Describe the process of analyzing malware.", audio:  "audio/identify_phishing.mp3" }
        ];
      } else if (subPath === 'mobile-application') {
        questions = [
          { text: "What is mobile application penetration testing?", audio: "audio/phishing.mp3" },
          { text: "Describe the steps of mobile application testing.", audio:  "audio/identify_phishing.mp3" },
          { text: "What is malware analysis?", audio: "audio/phishing.mp3" },
          { text: "Describe the process of analyzing malware.", audio:  "audio/identify_phishing.mp3" }
        ];
      } else if (subPath === 'network') {
        questions = [
          { text: "What is network penetration testing?", audio:  "audio/phishing.mp3"  },
          { text: "Describe the steps of a network penetration test.", audio: "audio/identify_phishing.mp3" }
        ];
      }
      break;
    case 'redTeaming':
      questions = [
        { text: "What is red teaming?", audio: "audio/phishing.mp3"  },
        { text: "Explain the difference between red teaming and penetration testing.", audio:  "audio/identify_phishing.mp3"},
        { text: "What is malware analysis?", audio: "audio/phishing.mp3" },
        { text: "Describe the process of analyzing malware.", audio:  "audio/identify_phishing.mp3" }
      ];
      break;
    default:
      break;
  }

  // عرض الأسئلة
  displayQuestions(questions);

  // بدء السؤال الأول
  startListening();
});

function displayQuestions(questions) {
  const questionContainer = document.getElementById('question-container');
  questions.forEach((question, index) => {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `
      <h3>${index + 1}. ${question.text}</h3>
      <audio controls>
        <source src="${question.audio}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
    `;
    questionContainer.appendChild(questionElement);
  });
}

async function startListening() {
  try {
    if (!isRecording) {
      return;
    }
    if (isListening) {
      return; // لا تفعل شيئًا إذا كان الاستماع قيد التشغيل بالفعل
    }
    isListening = true;

    if (currentQuestionIndex < questions.length) {
      const question = questions[currentQuestionIndex];
      const audio = new Audio(question.audio);
      document.getElementById('send-button').disabled = false;

      audio.oncanplaythrough = () => {
        audio.play();
        document.getElementById('question-text').innerText = question.text;
        drawSoundWaves(audio); // استدعاء دالة رسم موجات الصوت وتمرير عنصر الصوت
        startCountdown(); // بدء العد التنازلي للسؤال
      };

      audio.onended = () => {
        isListening = false; // إعادة تعيين حالة الاستماع عند انتهاء الصوت
      };

      audio.onerror = (e) => {
        console.error('Error playing audio:', e);
        alert('Failed to play audio. Please check the audio file path.');
        window.location.href = '../error/error.html';
      };
    } else {
      alert('All questions have been played.');
    }
  } catch (error) {
    console.error('Error during listening:', error);
    window.location.href = '../error/error.html';
  }
}

async function sendAnswers() {
  try {
    stopRecording();

    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    localStorage.setItem('recordedVideo', url);

    // تخزين الإجابة في المصفوفة
    answers.push(blob);

    recordedChunks = []; // إعادة تعيين الأجزاء المسجلة للسؤال التالي
    currentQuestionIndex++; // الانتقال إلى السؤال التالي

    if (currentQuestionIndex < questions.length) {
      const question = questions[currentQuestionIndex];
      const audio = new Audio(question.audio);
      document.getElementById('send-button').disabled = false;

      audio.oncanplaythrough = () => {
        audio.play();
        document.getElementById('question-text').innerText = question.text;
        drawSoundWaves(audio); // استدعاء دالة رسم موجات الصوت وتمرير عنصر الصوت
        startCountdown(); // بدء العد التنازلي للسؤال
      };

      audio.onended = () => {
        isListening = false; // إعادة تعيين حالة الاستماع عند انتهاء الصوت
      };

      audio.onerror = (e) => {
        console.error('Error playing audio:', e);
        alert('Failed to play audio. Please check the audio file path.');
        window.location.href = '../error/error.html';
      };
     
    } else {
      // إرسال جميع الإجابات دفعة واحدة بعد الانتهاء من جميع الأسئلة
      const formData = new FormData();
      answers.forEach((answer, index) => {
        formData.append(`video${index + 1}`, answer);
      });

      const response = await fetch('/api/submit-answers', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('All questions have been answered.');
        window.location.href = '../wait/wait.html';
      } else {
        alert('Failed to submit answers. Please try again.');
        window.location.href = '../error/error.html';
      }
    }
  } catch (error) {
    console.error('Error submitting answers:', error);
    window.location.href = '../error/error.html';
  }
}

let mediaRecorder;
let recordedChunks = [];
let stream; // متغير لتخزين التدفق (stream)

let countdownInterval;
function startCountdown() {
  let countdownTime = 2 * 60; // دقيقتين بالثواني
  const countdownElement = document.getElementById('countdown');

  clearInterval(countdownInterval); // إيقاف أي عداد سابق
  countdownInterval = setInterval(() => {
    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;
    countdownElement.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    countdownTime--;

    if (countdownTime < 0) {
      clearInterval(countdownInterval);
      stopRecording(); // إيقاف التسجيل عند انتهاء الوقت
      sendAnswers(); // الانتقال للسؤال التالي
    }
  }, 1000);
}

let isRecording = false; // متغير لتتبع حالة التسجيل

document.addEventListener('DOMContentLoaded', async function () {
  // تعطيل زر Listen بشكل افتراضي
  document.getElementById('listen-button').disabled = true;
  document.getElementById('send-button').disabled = true;

  

 
});

async function startRecording() {
  try {
    if (!stream) {
      // طلب الوصول إلى الفيديو والصوت
      stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, frameRate: 30 }, // تأكد من تحديد دقة مناسبة
        audio: true
      });

      // إنشاء عنصر الفيديو وإضافته إلى الصفحة
      const videoElement = document.createElement('video');
      videoElement.srcObject = stream;
      videoElement.play();
      videoElement.autoplay = true;
      videoElement.playsInline = true; // خاص بالأجهزة المحمولة
      document.getElementById('video-container').innerHTML = ""; // حذف المحتوى السابق
      document.getElementById('video-container').appendChild(videoElement);

       // إخفاء الصورة عند بدء تشغيل الكاميرا
       const img = document.getElementById('person-placeholder');
       if (img) {
         img.style.display = 'none';
       }
    }

    if (mediaRecorder && mediaRecorder.state === 'recording') {
      console.warn('Recording is already in progress.');
      return;
    }

    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };
    mediaRecorder.start();

    // تمكين زر Listen عند بدء التسجيل
    document.getElementById('listen-button').disabled = false;
    document.getElementById('send-button').disabled = false;
    isRecording = true; // تحديث حالة التسجيل

  } catch (error) {
    console.error('Error during recording:', error);
    window.location.href = '../error/error.html';
  }
}

function stopRecording() {
  try {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    // تعطيل زر Listen عند إيقاف التسجيل
    document.getElementById('listen-button').disabled = true;
    document.getElementById('send-button').disabled = true;
    isRecording = false; // تحديث حالة التسجيل

    // إظهار الصورة عند إيقاف الكاميرا
    const img = document.getElementById('person-placeholder');
    if (img) {
      img.style.display = 'block';
    }
  } catch (error) {
    console.error('Error stopping recording:', error);
    window.location.href = '../error/error.html';
  }
}

function drawSoundWaves(audio) {
  const canvas = document.getElementById('sound-waves-canvas');
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const waveHeight = height / 2;
  let x = 0;
  let y = waveHeight;
  let animationFrameId;

   // إخفاء الصورة عند بدء تشغيل الصوت
   const img = document.getElementById('robot-bottom-img');
   if (img) {
     img.style.display = 'none';
   }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(0, waveHeight);

    for (let i = 0; i < width; i++) {
      const amplitude = Math.random() * 60; // تقليل ارتفاع الموجة بشكل عشوائي
      y = waveHeight + Math.sin((i + x) * 0.07) * amplitude; // تقليل تردد الذبذبة
      ctx.lineTo(i, y);
    }

    ctx.strokeStyle = '#3498DB';
    ctx.lineWidth = 5; // زيادة عرض الخط
    ctx.stroke();
    x += 1; // تحريك الموجة إلى اليمين
    animationFrameId = requestAnimationFrame(draw);
  }

  draw();

  // إيقاف الرسم عند انتهاء الصوت وإظهار الصورة مرة أخرى
  audio.onended = () => {
    cancelAnimationFrame(animationFrameId);
    ctx.clearRect(0, 0, width, height);
    if (img) {
      img.style.display = 'block';
    }
  };
}

// Example function to simulate robot emitting sound
function emitSound() {
  drawSoundWaves();
}

// Call emitSound() when the robot emits sound
document.querySelector('img[alt="Robot"]').addEventListener('click', emitSound);