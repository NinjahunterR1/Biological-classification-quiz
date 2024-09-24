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

    // List of 14 questions
const questions = [
    {
        question: "Find the sum of the infinite series: 1 + 1/2 + 1/4 + 1/8 + 1/16 + ...",
        options: ["A) 1/2", "B) 1", "C) 2", "D) 3/2"],
        answer: "C) 2",
        solution: `S = a/(1 - r), where: a = 1, r = 1/2.  
        Calculating: S = 1/(1 - 1/2) = 2`
    },
    {
        question: "In the equation P = (a - t^2)/(bx), where P is pressure, x is distance, and time are:",
        options: ["A) [M¹ L¹ T⁻²]", "B) [M¹ L⁰ T⁻²]", "C) [M⁻¹ L⁻² T²]", "D) [M¹ L⁻² T²]"],
        answer: "A) [M¹ L¹ T⁻²]",
        solution: `Given: P = (a - t^2)/(bx)  
        [p] = [pressure], [t^2] = [T^2].  
        Therefore, [b] = [T²]/[p][x].`
    },
    {
        question: "The empirical formula of a compound is CH2O and its vapor density is 30. What is the molecular formula of the compound?",
        options: ["A) C3H6O3", "B) C2H4O2", "C) CH2O", "D) C2H4O"],
        answer: "B) C2H4O2",
        solution: `Empirical Formula = CH2O, Empirical Formula Mass = 30.  
        Molar Mass = 2 × V.D. = 2 × 30 = 60.  
        n = Molar Mass / Empirical Formula Mass = 60 / 30 = 2.  
        Molecular Formula = (Empirical Formula)_n = (CH2O)_2 = C2H4O2.`
    },
    {
        question: "For the gaseous reaction: Cl2(g) + PCl3(g) → PCl5(g). If 10 mL of Cl2 completely reacts with PCl3, then the volume of PCl5 formed will be:",
        options: ["A) 10 mL", "B) 20 mL", "C) 5 mL", "D) 1 mL"],
        answer: "A) 10 mL",
        solution: `According to the reaction stoichiometry:  
        1 L Cl2 → 1 L PCl5.  
        Thus, 10 mL of Cl2 will produce 10 mL of PCl5.`
    },
    {
        question: "12 g of Mg (molar mass = 24 g/mol) reacts completely with HCl to give hydrogen gas. What is the volume at STP?",
        options: ["(a) 22.4 L", "(b) 11.2 L", "(c) 44.8 L", "(d) 6.1 L"],
        answer: "(b) 11.2 L",
        solution: `Mg + 2HCl → MgCl2 + H2.  
        24 g of Mg evolves 22.4 L of H2 at STP.  
        For 12 g of Mg: Volume = (22.4 × 12) / 24 = 11.2 L.`
    },
    {
        question: "Given below are two statements, one is labeled as Assertion A and the other is labeled as Reason R. Assertion A: ClO4 cannot show disproportionation reaction. Reason R: Minimum oxidation state of Cl in any compound is -1.",
        options: ["(A) A is true and R is false.", "(B) A is false and R is true.", "(C) Both A and R are true and R is the correct explanation of A.", "(D) Both A and R are true but R is NOT the correct explanation of A."],
        answer: "(D) Both A and R are true but R is NOT the correct explanation of A.",
        solution: `In ClO4, Cl is present in its highest oxidation state +7, so it cannot show disproportionation reaction.`
    },
    {
        question: "How many of the following statements are incorrect? 1. Sodium-potassium pumps move across the cell membrane by passive transport. 2. The quasi-fluid nature of lipids enables lateral movement of proteins within the lipid bilayer. 3. Polar solutes require carrier proteins to facilitate their transport across the membrane called facilitated diffusion. 4. Both facilitated diffusion and active transport are energy-dependent processes. 5. Neutral solutes may move across the membrane by simple diffusion.",
        options: ["(A) One", "(B) Three", "(C) Four", "(D) Two"],
        answer: "(C) Four",
        solution: `Statements 1 and 4 are incorrect.  
        The sodium-potassium pump is an example of active transport.  
        Facilitated diffusion is not energy-dependent.`
    },
    {
        question: "How many statements are incorrect related to chloroplast? 1. Mainly found in mesophyll cells. 2. Length 2-4 μm and width 5-10 μm. 3. Chlamydomonas contain 20 - 40 chloroplasts per cell. 4. Membrane of thylakoid encloses a space called lumen. 5. Stroma lamella connects thylakoids of different grana. 6. Stroma contains enzymes for synthesis of carbohydrates and proteins.",
        options: ["(A) Three", "(B) Two", "(C) Five", "(D) Four"],
        answer: "(B) Two",
        solution: `The correct dimensions for chloroplasts are 5-10 μm (length) and 2-4 μm (width).  
        Chlamydomonas contains 1 chloroplast per cell.`
    },
    {
        question: "Given below are two statements: Statement I: Ligaments are dense irregular tissue. Statement II: Cartilage is a dense regular tissue.",
        options: ["(A) Statement I is correct but Statement II is incorrect.", "(B) Statement I is incorrect but Statement II is correct.", "(C) Both Statement I and Statement II are correct.", "(D) Both Statement I and Statement II are incorrect."],
        answer: "(D) Both Statement I and Statement II are incorrect.",
        solution: `Ligaments are a type of dense regular connective tissue that connects bones to other bones, providing stability and support.  
        Cartilage is a type of specialized connective tissue that is not classified as dense.`
    },
    {
        question: "Tegmina in cockroach arises from:",
        options: ["(A) metathorax.", "(B) mesothorax.", "(C) prothorax.", "(D) both (A) and (B)"],
        answer: "(B) mesothorax.",
        solution: `Tegmina, or forewings (the first pair of wings), in cockroaches arise from the mesothorax.  
        No wing arises from the prothorax, and hindwings arise from the metathorax.`
    },
    {
        question: "How many statements are correct w.r.t the given below diagram? I. Multilayered epithelium II. Limited role in secretion and absorption III. Main Function is to provide protection against chemical and mechanical stresses. IV. They cover the dry surface of skin, moist surface of buccal cavity, and pharynx.",
        options: ["(A) Four", "(B) Three", "(C) Two", "(D) One"],
        answer: "(A) Four",
        solution: `Compound epithelium is made of more than one layer (multi-layered) of cells and thus has a limited role in secretion and absorption.  
        Their main function is to provide protection against chemical and mechanical stresses.  
        They cover the dry surface of the skin and the moist surface of the buccal cavity and pharynx.`
    }
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
