document.addEventListener('DOMContentLoaded', function () {
    let timer;
    let startTime;
    let elapsedTime = 0; // Variable to track elapsed time
    const timerDisplay = document.getElementById('timerDisplay');
    const startTimerButton = document.getElementById('startTimerButton');
    const stopTimerButton = document.getElementById('stopTimerButton');
    const resultDiv = document.getElementById('resultScreen');
    const quizForm = document.getElementById('quizForm');

    // Set the total time for the quiz (20 minutes in milliseconds)
    const totalQuizTime = 20 * 60 * 1000;

    function formatTime(ms) {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function startStopwatch() {
        startTime = Date.now() - elapsedTime; // Adjust start time to continue from the last stop
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            const remainingTime = totalQuizTime - elapsedTime;
            if (remainingTime <= 0) {
                clearInterval(timer);
                timerDisplay.textContent = '00:00';
                document.querySelector('form').classList.add('hidden');
                resultDiv.classList.remove('hidden');
                // Handle quiz submission automatically when time is up
                quizForm.dispatchEvent(new Event('submit'));
            } else {
                timerDisplay.textContent = formatTime(remainingTime);
            }
        }, 1000);
    }

    function stopStopwatch() {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime; // Update elapsed time when stopped
    }

    startTimerButton.addEventListener('click', function () {
        startStopwatch();
        startTimerButton.disabled = true;
        stopTimerButton.disabled = false;
        document.querySelectorAll('input[type="radio"]').forEach(input => {
            input.disabled = false; // Enable answering
        });
    });

    stopTimerButton.addEventListener('click', function () {
        stopStopwatch();
        startTimerButton.disabled = false;
        stopTimerButton.disabled = true;
        document.querySelectorAll('input[type="radio"]').forEach(input => {
            input.disabled = true; // Disable answering
        });
    });

    // List of 20 questions
    const questions = [
        { q: 'Which of the following is a prokaryote?', options: ['E. coli', 'Yeast', 'Fungi', 'Paramecium'], a: 'E. coli' },
        { q: 'Which kingdom does not have a nucleus?', options: ['Protista', 'Fungi', 'Monera', 'Animalia'], a: 'Monera' },
        { q: 'What is the primary characteristic of fungi?', options: ['Photosynthesis', 'Cell walls with chitin', 'Autotrophic nutrition', 'Multicellular'], a: 'Cell walls with chitin' },
        { q: 'Which group of organisms includes algae?', options: ['Monera', 'Protista', 'Fungi', 'Animalia'], a: 'Protista' },
        { q: 'Which is not a characteristic of plants?', options: ['Chlorophyll', 'Cell walls', 'Heterotrophic nutrition', 'Multicellularity'], a: 'Heterotrophic nutrition' },
        { q: 'What distinguishes the Animalia kingdom?', options: ['Cell walls', 'Photosynthesis', 'Heterotrophic nutrition', 'Chlorophyll'], a: 'Heterotrophic nutrition' },
        { q: 'Which of these organisms is a protist?', options: ['Mushroom', 'Paramecium', 'Moss', 'Earthworm'], a: 'Paramecium' },
        { q: 'What is the primary component of bacterial cell walls?', options: ['Cellulose', 'Chitin', 'Peptidoglycan', 'Lignin'], a: 'Peptidoglycan' },
        { q: 'Which kingdom is characterized by having chlorophyll?', options: ['Monera', 'Protista', 'Plantae', 'Fungi'], a: 'Plantae' },
        { q: 'Which organism is a member of the kingdom Protista?', options: ['Mushroom', 'Amoeba', 'Fern', 'Euglena'], a: 'Amoeba' },
        { q: 'Which type of bacteria is rod-shaped?', options: ['Cocci', 'Bacilli', 'Spirilla', 'Vibrio'], a: 'Bacilli' },
        { q: 'Which kingdom includes mosses?', options: ['Monera', 'Plantae', 'Fungi', 'Protista'], a: 'Plantae' },
        { q: 'What is the main feature of Monera?', options: ['Cell walls with chitin', 'Lack of nucleus', 'Photosynthesis', 'Multicellularity'], a: 'Lack of nucleus' },
        { q: 'Which of these is a fungus?', options: ['Moss', 'Yeast', 'Algae', 'Protozoa'], a: 'Yeast' },
        { q: 'Which kingdom does not have cell walls?', options: ['Fungi', 'Plantae', 'Animalia', 'Monera'], a: 'Animalia' },
        { q: 'Which of these is a photosynthetic organism?', options: ['Amoeba', 'Yeast', 'Moss', 'Paramecium'], a: 'Moss' },
        { q: 'What is the characteristic feature of the kingdom Protista?', options: ['Lack of nucleus', 'Chitin in cell walls', 'Presence of chlorophyll', 'Unicellular or multicellular'], a: 'Unicellular or multicellular' },
        { q: 'Which kingdom includes lichens?', options: ['Fungi', 'Plantae', 'Protista', 'Monera'], a: 'Fungi' },
        { q: 'Which of these is a unicellular organism?', options: ['Mushroom', 'Yeast', 'Fern', 'Euglena'], a: 'Euglena' },
        { q: 'Which kingdom includes multicellular algae?', options: ['Monera', 'Protista', 'Plantae', 'Fungi'], a: 'Plantae' }
    ];

    function loadQuestions() {
        const container = document.getElementById('questionsContainer');
        questions.forEach((question, index) => {
            const questionHTML = `
                <fieldset>
                    <legend>Q${index + 1}: ${question.q}</legend>
                    ${question.options.map(option => `
                        <label>
                            <input type="radio" name="q${index}" value="${option}" required>
                            ${option}
                        </label><br>
                    `).join('')}
                </fieldset>
            `;
            container.innerHTML += questionHTML;
        });
    }

    loadQuestions();

    quizForm.addEventListener('submit', function (e) {
        e.preventDefault();

        stopStopwatch();
        const formData = new FormData(e.target);
        let score = 0;
        let totalQuestions = questions.length;
        let answersHTML = '';

        questions.forEach((question, index) => {
            const selectedOption = formData.get(`q${index}`);
            const isCorrect = selectedOption === question.a;
            if (isCorrect) {
                score += 4; // Add 4 points for correct answer
            } else if (selectedOption) {
                score -= 1; // Deduct 1 point for wrong answer
            }

            answersHTML += `
                <fieldset>
                    <legend>Q${index + 1}: ${question.q}</legend>
                    ${question.options.map(option => `
                        <label style="color: ${option === selectedOption ? (option === question.a ? 'green' : 'red') : 'black'}; font-weight: ${option === selectedOption || option === question.a ? 'bold' : 'normal'}">
                            ${option}
                        </label><br>
                    `).join('')}
                    <p>Correct Answer: <span style="color: green; font-weight: bold;">${question.a}</span></p>
                </fieldset>
            `;
        });

        const resultHTML = `
            <h2>Quiz Result</h2>
            <div id="scoreContainer">
                <div id="score" style="font-size: 4em; font-weight: bold; border-radius: 50%; background: #f0f0f0; width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; color: #000; margin: 0 auto;">
                    ${score}
                </div>
                <p>Total Marks: ${totalQuestions * 4}</p>
            </div>
            <div id="answerDetails">${answersHTML}</div>
            <button id="restartButton">Restart Quiz</button>
        `;

        resultDiv.classList.remove('hidden');
        resultDiv.innerHTML = resultHTML;
        document.querySelector('form').classList.add('hidden');

        // Restart button functionality
        document.getElementById('restartButton').addEventListener('click', function () {
            window.location.reload();
        });
    });
});
