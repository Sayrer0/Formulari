const questions = [

    {
        question: "☀️ Pel matí i tarda, què et ve de gust?",
        key: "Plans",
        type: "multi",

        options: [
            "Platja",
            "Cine",
            "Passejar",
            "Gimnàs",
            "Bolera",
            "Videojocs",
            "Fira",
            "Compres",
            "Excursió"
        ]
    },

    {
        question: "📍 On t'agradaria sopar?",
        key: "Lloc",
        type: "single",

        options: [
            "🏠 A casa",
            "🍽️ Restaurant"
        ]
    },

    {
        question: "🍔 Quin restaurant et ve de gust?",
        key: "Restaurant",
        type: "single",

        showIf: {
            key: "Lloc",
            value: "🍽️ Restaurant"
        },

        options: [
            "Sushi",
            "Hamburguesa Brontosauria (DeLocos)",
            "Mersi Persi",
            "La Cosa Nostra",
            "TastaPans",
            "Sorprèn-me"
        ]
    },

    {
        question: "❤️ Quin tipus de cita t'agradaria?",
        key: "Tipus",
        type: "multi",

        options: [
            "Romàntica",
            "Divertida",
            "Amb amics"
            "Tranquil·la",
            "+18",
            "Absurda"
        ]
    },

    {
        question: "📅 Quin dia et va millor?",
        key: "Data",
        type: "date"
    },

    {
        question: "💬 Alguna cosa més? Alguna queixa? Vols que porti o faci alguna cosa especial?",
        key: "Comentari",
        type: "text"
    }

];

// =========================
// VARIABLES
// =========================

let answers = {};

let currentQuestion = 0;

let visibleQuestions = [];

// =========================
// ELEMENTS HTML
// =========================

const welcome = document.getElementById("welcome-screen");
const container = document.getElementById("container");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const question = document.getElementById("question");
const options = document.getElementById("options");

const summary = document.getElementById("summary");
const summaryContent = document.getElementById("summary-content");

const progressBar = document.getElementById("progress-bar");
const stepCounter = document.getElementById("stepCounter");

const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const downloadBtn = document.getElementById("downloadBtn");

// =========================
// TEXTOS BOTÓ NO
// =========================

const funnyTexts = [

    "No 😒",
    "Segur? 🤨",
    "Ni de conya 😂",
    "No encertes 😏",
    "Segueixes intentant-ho? 🤭",
    "On vas? 😂",
    "No et deixaré Culín ❤️",
    "Segueix provant 😜",
    "No existeix aquesta opció 🤷",
    "Només pots dir que sí ❤️"

];

let tries = 0;

// =========================
// FUNCIONS
// =========================

function rebuildQuestions() {

    visibleQuestions = questions.filter(q => {

        if (!q.showIf)
            return true;

        return answers[q.showIf.key] === q.showIf.value;

    });

}

function init() {

    rebuildQuestions();

    welcome.classList.remove("hidden");

    container.classList.add("hidden");

    summary.classList.add("hidden");

}

init();

// =========================
// PANTALLA INICIAL
// =========================

yesBtn.addEventListener("click", () => {

    welcome.classList.add("hidden");

    container.classList.remove("hidden");

    currentQuestion = 0;

    rebuildQuestions();

    loadQuestion();

});

function moveNoButton() {

    const index = Math.min(
        tries,
        funnyTexts.length - 1
    );

    noBtn.innerHTML = funnyTexts[index];

    tries++;

    const maxX =
        window.innerWidth -
        noBtn.offsetWidth -
        20;

    const maxY =
        window.innerHeight -
        noBtn.offsetHeight -
        20;

    noBtn.style.position = "fixed";

    noBtn.style.left =
        Math.random() * maxX + "px";

    noBtn.style.top =
        Math.random() * maxY + "px";

}

noBtn.addEventListener(
    "mouseover",
    moveNoButton
);

noBtn.addEventListener(
    "touchstart",
    function (e) {

        e.preventDefault();

        moveNoButton();

    }
);

// =========================
// LOAD QUESTION
// =========================

function loadQuestion() {

    rebuildQuestions();

    summary.classList.add("hidden");

    document
        .getElementById("question-container")
        .classList.remove("hidden");

    nextBtn.classList.remove("hidden");

    downloadBtn.classList.add("hidden");

    const q = visibleQuestions[currentQuestion];

    stepCounter.innerHTML =
        `Pregunta ${currentQuestion + 1} de ${visibleQuestions.length}`;

    progressBar.style.width =
        (currentQuestion / visibleQuestions.length) * 100 + "%";

    question.innerHTML = q.question;

    options.innerHTML = "";

    backBtn.style.visibility =
        currentQuestion === 0
            ? "hidden"
            : "visible";

    // =========================
    // PREGUNTA SINGLE
    // =========================

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

                document.querySelectorAll(".option")
                    .forEach(o => o.classList.remove("selected"));

                div.classList.add("selected");

                answers[q.key] = option;

                nextBtn.disabled = false;

            };

            options.appendChild(div);

        });

    }

    // =========================
    // PREGUNTA MULTI
    // =========================

    else if (q.type === "multi") {

        if (!answers[q.key]) {
            answers[q.key] = [];
        }

        nextBtn.disabled = answers[q.key].length === 0;

        q.options.forEach(option => {

            const div = document.createElement("div");

            div.className = "option";

            div.innerHTML = option;

            if (answers[q.key].includes(option)) {
                div.classList.add("selected");
            }

            div.onclick = () => {

                if (answers[q.key].includes(option)) {

                    answers[q.key] =
                        answers[q.key].filter(o => o !== option);

                    div.classList.remove("selected");

                } else {

                    answers[q.key].push(option);

                    div.classList.add("selected");

                }

                nextBtn.disabled =
                    answers[q.key].length === 0;

            };

            options.appendChild(div);

        });

    }

    // =========================
    // TEXT
    // =========================

    else if (q.type === "text") {

        nextBtn.disabled = false;

        const textarea = document.createElement("textarea");

        textarea.placeholder =
            "Escriu aquí el que vulguis ❤️";

        textarea.value =
            answers[q.key] || "";

        textarea.oninput = () => {

            answers[q.key] =
                textarea.value;

        };

        options.appendChild(textarea);

    }

    // =========================
    // DATA
    // =========================

    else if (q.type === "date") {

        nextBtn.disabled = false;

        const input =
            document.createElement("input");

        input.type = "date";

        input.className = "date-input";

        input.min =
            new Date()
                .toISOString()
                .split("T")[0];

        input.value =
            answers[q.key] || "";

        input.onchange = () => {

            answers[q.key] =
                input.value;

        };

        options.appendChild(input);

    }

}

// =========================
// BOTÓ ENRERE
// =========================

backBtn.addEventListener("click", () => {

    if (currentQuestion > 0) {

        currentQuestion--;

        loadQuestion();

    }

});

// =========================
// BOTÓ SEGÜENT
// =========================

nextBtn.addEventListener("click", () => {

    const q = visibleQuestions[currentQuestion];

    if (q.type === "single" && !answers[q.key]) {
        return;
    }

    if (
        q.type === "multi" &&
        (!answers[q.key] ||
            answers[q.key].length === 0)
    ) {
        return;
    }

    currentQuestion++;

    rebuildQuestions();

    if (currentQuestion < visibleQuestions.length) {

        loadQuestion();

    } else {

        showSummary();

    }

});

// =========================
// RESUM
// =========================

function showSummary() {

    progressBar.style.width = "100%";

    stepCounter.innerHTML = "Resum ❤️";

    document
        .getElementById("question-container")
        .classList.add("hidden");

    summary.classList.remove("hidden");

    nextBtn.classList.add("hidden");

    downloadBtn.classList.remove("hidden");

    summaryContent.innerHTML = "";

    visibleQuestions.forEach(q => {

        const card =
            document.createElement("div");

        card.className = "summary-card";

        let value = answers[q.key];

        if (Array.isArray(value)) {
            value = value.join(", ");
        }

        if (!value) {
            value = "-";
        }

        card.innerHTML = `
            <div class="summary-title">
                ${q.question}
            </div>

            <div class="summary-value">
                ${value}
            </div>
        `;

        summaryContent.appendChild(card);

    });

}

// =========================
// DESCARREGAR CSV
// =========================

downloadBtn.addEventListener("click", downloadCSV);

function downloadCSV() {

    const now = new Date();

    let csv = "Camp,Valor\n";

    csv += `"Data","${now.toLocaleString()}"\n`;

    visibleQuestions.forEach(q => {

        let value = answers[q.key];

        if (Array.isArray(value)) {
            value = value.join(" | ");
        }

        value = value || "";

        value = value.replace(/"/g, '""');

        csv += `"${q.key}","${value}"\n`;

    });

    const blob = new Blob(
        [csv],
        {
            type: "text/csv;charset=utf-8;"
        }
    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download =
        `proposta_${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}.csv`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    launchConfetti();

}

// =========================
// CONFETI
// =========================

function launchConfetti(){

    for(let i=0;i<120;i++){

        createConfetti();

    }

}

function createConfetti(){

    const confetti = document.createElement("div");

    confetti.innerHTML = Math.random()>0.5 ? "❤️" : "🎉";

    confetti.style.position="fixed";

    confetti.style.left=Math.random()*100+"vw";

    confetti.style.top="-50px";

    confetti.style.fontSize=(18+Math.random()*20)+"px";

    confetti.style.pointerEvents="none";

    confetti.style.transition="transform 4s linear, opacity 4s linear";

    document.body.appendChild(confetti);

    requestAnimationFrame(()=>{

        confetti.style.transform=`translateY(${window.innerHeight+100}px) rotate(${720*Math.random()}deg)`;

        confetti.style.opacity="0";

    });

    setTimeout(()=>{

        confetti.remove();

    },4000);

}

// =========================
// GUARDAR AUTOMÀTICAMENT
// =========================

function saveAnswers(){

    localStorage.setItem(
        "formulari-cita",
        JSON.stringify(answers)
    );

}

function loadAnswers(){

    const data =
        localStorage.getItem("formulari-cita");

    if(!data)
        return;

    try{

        answers = JSON.parse(data);

    }

    catch{

        answers = {};

    }

}

// Guardem automàticament cada segon

setInterval(saveAnswers,1000);

loadAnswers();

// =========================
// EDITAR DESPRÉS DEL RESUM
// =========================

const editBtn = document.createElement("button");

editBtn.innerHTML = "✏️ Editar respostes";

editBtn.style.marginRight = "10px";

editBtn.onclick = () => {

    summary.classList.add("hidden");

    document
        .getElementById("question-container")
        .classList.remove("hidden");

    nextBtn.classList.remove("hidden");

    downloadBtn.classList.add("hidden");

    currentQuestion = 0;

    loadQuestion();

};

document
    .querySelector(".buttons")
    .insertBefore(editBtn, downloadBtn);

// =========================
// ANIMACIÓ ENTRADA PREGUNTES
// =========================

const observer = new MutationObserver(()=>{

    const container =
        document.getElementById("question-container");

    container.animate(

        [

            {
                opacity:0,
                transform:"translateX(25px)"
            },

            {
                opacity:1,
                transform:"translateX(0)"
            }

        ],

        {

            duration:300

        }

    );

});

observer.observe(options,{

    childList:true

});

console.log("❤️ Organitzem una cita carregat correctament.");
