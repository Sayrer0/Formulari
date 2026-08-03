const questions = [
{
    question: "☀️ Pel matí i tarda, què et ve de gust?",
    key: "Dia",
    type: "multi",

    options:[
        "🌊 Platja",
        "🎬 Cine",
        "🚶 Passejar",
        "🏋️ Gimnàs",
        "🎳 Bolera",
        "🎮 Videojocs",
        "🎡 Fira",
        "🛍️ Compres",
        "☕ Cafeteria",
        "🏞️ Excursió"
    ]
},

{
    question:"📍 On sopem?",
    key:"Lloc",
    type:"single",

    options:[
        "🏠 A casa",
        "🍽️ Restaurant"
    ]
},

{
    question:"🍔 Quin restaurant?",
    key:"Restaurant",
    type:"single",

    showIf:{
        key:"Lloc",
        value:"🍽️ Restaurant"
    },

    options:[
        "🍣 Sushi",
        "🍔 Brontosauria",
        "🍝 La Cosa Nostra",
        "🥙 Mersi Persi",
        "🥪 TastaPans",
        "❓ Sorprèn-me"
    ]
},

{
    question:"❤️ Quin tipus de cita?",
    key:"Tipus",
    type:"multi",

    options:[
        "🥰 Romàntica",
        "😂 Divertida",
        "😌 Tranquil·la",
        "🌃 Nocturna",
        "🔥 +18",
        "🤪 Absurda"
    ]
},

{
    question:"📅 Quin dia et va millor?",
    key:"Data",
    type:"date"
},

{
    question:"💬 Alguna cosa més?",
    key:"Comentari",
    type:"text"
}
];
