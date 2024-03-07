const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Programming is not about what you know; it's about what you can figure out.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "In the end, we only regret the chances we didn't take.",
    "The only way to do great work is to love what you do."
  ];
  
  let startTime, endTime, timerInterval;
  
  function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
  
  function startTest() {
    document.getElementById('quote').textContent = getRandomQuote();
    document.getElementById('feedback').textContent = "";
    document.getElementById('result').textContent = "";
    document.getElementById('input').value = "";
    document.getElementById('input').focus();
    
    const duration = 60; // 60 seconds
    let timeLeft = duration;
    updateTimer(timeLeft);
  
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimer(timeLeft);
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        endTest();
      }
    }, 1000);
    
    startTime = new Date().getTime(); // Record start time
  }
  
  function endTest() {
    clearInterval(timerInterval);
    endTime = new Date().getTime();
    const textEntered = document.getElementById('input').value;
    const words = textEntered.trim().split(/\s+/).filter(Boolean);
    const totalTime = (endTime - startTime) / 1000;
    const speed = totalTime > 0 ? Math.round(words.length / (totalTime / 60)) : 0; // Avoid division by zero
    const accuracy = calculateAccuracy(textEntered, document.getElementById('quote').textContent);
    document.getElementById('result').textContent = `Your typing speed is ${speed} words per minute with ${accuracy}% accuracy.`;
  }
  
  function calculateAccuracy(inputText, originalText) {
    const originalWords = originalText.trim().split(/\s+/).filter(Boolean);
    const inputWords = inputText.trim().split(/\s+/).filter(Boolean);
    let correctWords = 0;
    for (let i = 0; i < inputWords.length; i++) {
      if (inputWords[i] === originalWords[i]) {
        correctWords++;
      }
    }
    return ((correctWords / originalWords.length) * 100).toFixed(2);
  }
  
  function updateTimer(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  
  document.getElementById('input').addEventListener('input', function() {
    const quote = document.getElementById('quote').textContent;
    const inputText = document.getElementById('input').value;
    if (inputText.length === quote.length) {
      endTest();
    }
  });
  