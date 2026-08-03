const questions = [
    {
        question: "☀️Pel matí i tarda, que et ve de gust?",
        type: "multi",
        key: "Dia",
        options: [
            "Platja",
            "Cine",
            "Passejar",
            "Gimnàs",
            "Bolera",
            "Videojocs",
            "Fira (?)"
        ]
    },
    {
        question: "📍 On t'agradaria anar per sopar?",
        type: "single",
        key: "Lloc",
        options: [
            "A casa",
            "Restaurant"
        ]
    },
    {
        question: "🍽️ Què et ve de gust sopar?",
        type: "single",
        key: "Menjar",
        options: [
            "Mersi Persi",
            "Sushi",
            "Xino",
            "Hamburguesa Brontosauria",
            "La Cosa Nostra",
            "TastaPans",
            "Descobrim un lloc nou"
        ]
    },
    {
        question: "❤️ Quin tipus de cita t'agradaria?",
        type: "multi",
        key: "Tipus de cita",
        options: [
            "Romàntica",
            "Tranquil·la",
            "Amb amics",
            "+18",
            "Absurda"
        ]
    },
    
    {
    question: "📅 Quin dia et va millor?",
    type: "date",
    key: "Data"
    },
    
    {
        question: "💬 Vols afegir algun comentari/queixa?",
        type: "text",
        key: "Comentari"
    }
];

let currentQuestion = 0;
let answers = {};

const question = document.getElementById("question");
const options = document.getElementById("options");
const summary = document.getElementById("summary");
const summaryContent = document.getElementById("summary-content");

const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const downloadBtn = document.getElementById("downloadBtn");

const progressBar = document.getElementById("progress-bar");
const stepCounter = document.getElementById("stepCounter");

// loadQuestion();

if (currentQuestion > 0) {

    currentQuestion--;

    // Si venim enrere i la pregunta del restaurant estava amagada,
    // també la saltem.
    while (
        currentQuestion > 0 &&
        questions[currentQuestion].key === "Menjar" &&
        answers["Lloc"] === "A casa"
    ) {
        currentQuestion--;
    }

    loadQuestion();
}
});

nextBtn.addEventListener("click", () => {

    const q = questions[currentQuestion];

    // Validació per preguntes single
    if (q.type === "single" && !answers[q.key]) {
        return;
    }

    // Validació per preguntes multi
    if (q.type === "multi" && (!answers[q.key] || answers[q.key].length === 0)) {
        return;
    }

    /*if (currentQuestion < questions.length - 1) {

        currentQuestion++;
        loadQuestion();

    } else {

        showSummary();

    */}
    if (currentQuestion < questions.length - 1) {

    currentQuestion++;

    // Si ha triat "A casa", ens saltem la pregunta del restaurant
    while (
        currentQuestion < questions.length &&
        questions[currentQuestion].key === "Menjar" &&
        answers["Lloc"] === "A casa"
    ) {
        currentQuestion++;
    }

    loadQuestion();

} else {

    showSummary();

}

});

downloadBtn.addEventListener("click",downloadCSV);

function loadQuestion() {

    summary.classList.add("hidden");
    document.getElementById("question-container").classList.remove("hidden");

    nextBtn.classList.remove("hidden");
    downloadBtn.classList.add("hidden");

    const q = questions[currentQuestion];

    stepCounter.innerHTML = `Pregunta ${currentQuestion + 1} de ${questions.length}`;

    question.innerHTML = q.question;

    options.innerHTML = "";

    progressBar.style.width = ((currentQuestion) / (questions.length)) * 100 + "%";

    backBtn.style.visibility = currentQuestion === 0 ? "hidden" : "visible";

    // ============================
    // PREGUNTA D'UNA OPCIÓ
    // ============================
    if (q.type === "single") {

        nextBtn.disabled = !answers[q.key];

        q.options.forEach(option => {

            const div = document.createElement("div");

            div.className = "option";

            div.innerHTML = option;

            if (answers[q.key] === option) {
                div.classList.add("selected");
            }

            div.onclick = () => {

                document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));

                div.classList.add("selected");

                answers[q.key] = option;

                nextBtn.disabled = false;

            };

            options.appendChild(div);

        });

    }

    // ============================
    // PREGUNTA MULTI
    // ============================
    else if (q.type === "multi") {

        if (!answers[q.key])
            answers[q.key] = [];

        nextBtn.disabled = answers[q.key].length === 0;

        q.options.forEach(option => {

            const div = document.createElement("div");

            div.className = "option";

            div.innerHTML = option;

            if (answers[q.key].includes(option))
                div.classList.add("selected");

            div.onclick = () => {

                if (answers[q.key].includes(option)) {

                    answers[q.key] = answers[q.key].filter(o => o !== option);

                    div.classList.remove("selected");

                } else {

                    answers[q.key].push(option);

                    div.classList.add("selected");

                }

                nextBtn.disabled = answers[q.key].length === 0;

            };

            options.appendChild(div);
            

        });

    }

    // ============================
    // TEXT
    // ============================
    else if (q.type === "text") {

        nextBtn.disabled = false;

        const textarea = document.createElement("textarea");

        textarea.placeholder = "Escriu aquí el que vulguis ❤️";

        textarea.value = answers[q.key] || "";

        textarea.oninput = () => {

            answers[q.key] = textarea.value;

        };

        options.appendChild(textarea);

    }

    else if (q.type === "date") {

    nextBtn.disabled = false;

    const input = document.createElement("input");

    input.type = "date";

    input.className = "date-input";

    const today = new Date().toISOString().split("T")[0];

    input.min = today;

    input.value = answers[q.key] || "";

    input.onchange = () => {

        answers[q.key] = input.value;

    };

    options.appendChild(input);

}
}

function showSummary() {

    progressBar.style.width = "100%";

    stepCounter.innerHTML = "Resum";

    document.getElementById("question-container").classList.add("hidden");

    summary.classList.remove("hidden");

    nextBtn.classList.add("hidden");

    downloadBtn.classList.remove("hidden");

    summaryContent.innerHTML = "";

    questions.forEach(q => {
        if (q.key === "Menjar" && answers["Lloc"] === "A casa") {
        return;
    }
        const card = document.createElement("div");

        card.className = "summary-card";

        let value = answers[q.key];

        if (Array.isArray(value)) {

            value = value.length > 0 ? value.join(", ") : "-";

        } else {

            value = value || "-";

        }

        card.innerHTML = `
            <div class="summary-title">${q.key}</div>
            <div class="summary-value">${value}</div>
        `;

        summaryContent.appendChild(card);

    });

}

function downloadCSV() {

    const now = new Date();

    let csv = "Camp,Valor\n";

    csv += `"Data","${now.toLocaleString()}"\n`;

    questions.forEach(q => {
        if (q.key === "Menjar" && answers["Lloc"] === "A casa") {
        return;
    }

        let value = answers[q.key];

        if (Array.isArray(value)) {

            value = value.join(" | ");

        }

        value = (value || "").replace(/"/g, '""');

        csv += `"${q.key}","${value}"\n`;

    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = `proposta_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

}
// ==============================
// Pantalla inicial
// ==============================

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const container = document.getElementById("container");
const welcome = document.getElementById("welcome-screen");

// ==============================
// Pantalla inicial
// ==============================

const funnyTexts = [
    "No 😒",
    "Segur? 🤨",
    "Ni de conya 😂",
    "No encertes eh...",
    "Segueixes intentant-ho? 😏",
    "On vas? Clica on toca dona 😂",
    "No et deixaré, Culín 😜",
    "Quasi... però no 😏",
    "Segueix provant 🤭",
    "No existeix aquesta opció 🤷",
    "Només pots dir que sí ❤️"
];

let tries = 0;

yesBtn.addEventListener("click", () => {

    welcome.classList.add("hidden");
    container.classList.remove("hidden");

    loadQuestion();

});

function moveNoButton() {

    // Mostrar el missatge corresponent
    const index = Math.min(tries, funnyTexts.length - 1);
    noBtn.innerHTML = funnyTexts[index];

    // Missatges especials
    if (tries === 10) {
        alert("😂 Encara ho estàs intentant?");
    }

    if (tries === 20) {
        alert("Vaaaa... clica el 'Sí' ❤️");
    }

    if (tries === 30) {
        alert("M'agrada la teva perseverança 😂");
    }

    tries++;

    // Nova posició aleatòria
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;

    noBtn.style.position = "fixed";
    noBtn.style.left = Math.random() * maxX + "px";
    noBtn.style.top = Math.random() * maxY + "px";

}

noBtn.addEventListener("mouseover", moveNoButton);

noBtn.addEventListener("touchstart", (e) => {

    e.preventDefault();
    moveNoButton();

});
