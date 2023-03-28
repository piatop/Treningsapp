import Dictionary from "./Dictionary.mjs";

let addExerciseBtn = document.getElementById("addExerciseBtn");
let addUserBtn = document.getElementById("addUserBtn");
let loginUserBtn = document.getElementById("loginUserBtn");
let container = document.getElementById('container');
let cont = document.getElementById('cont');


let navLinks;

function buttonAddEventListener() {
    let buttonEn = document.getElementById("buttonEn");
    let buttonNo = document.getElementById("buttonNo");
    let header = document.getElementById("header");
    let textbox = document.getElementById("textbox");

    buttonEn.addEventListener('click', function (evt) {
        header.innerHTML = Dictionary.en.header;
        buttonEn.innerHTML = Dictionary.en.buttonEn;
        buttonNo.innerHTML = Dictionary.en.buttonNo;
        textbox.innerHTML = Dictionary.en.textbox;
        listExercise.innerHTML = Dictionary.en.listExercise;
        addExercise.innerHTML = Dictionary.en.addExercise;
        chosenEx.innerHTML = Dictionary.en.chosenEx;
        addExerciseBtn = Dictionary.en.addExerciseBtn;
    })

    buttonNo.addEventListener('click', function (evt) {
        header.innerHTML = Dictionary.no.header;
        buttonEn.innerHTML = Dictionary.no.buttonEn;
        buttonNo.innerHTML = Dictionary.no.buttonNo;
        textbox.innerHTML = Dictionary.no.textbox;
        listExercise.innerHTML = Dictionary.no.listExercise;
        addExercise.innerHTML = Dictionary.no.addExercise;
        chosenEx.innerHTML = Dictionary.no.chosenEx;
        addExerciseBtn = Dictionary.no.addExerciseBtn;
    })
}

function draw() {
    let container = document.getElementById('container');
    let exercises = ["Pushups", "Pullups", "Dips", "Bicep curl", "Hip thrust", "Squat"];
    let addedExercises = [];
    container.innerHTML = "";
    for (let i = 0; i < exercises.length; i++) {

        let div = document.createElement('div');
        let button = document.createElement('button');
        div.innerHTML = exercises[i];
        button.innerHTML = "Add";
        div.appendChild(button);
        container.appendChild(div);
        
        button.addEventListener('click', function (evt) {
            addedExercises.push(exercises[i]);
            draw();
        })
    }
}

async function createUser() {
    const mailInput = document.getElementById('mail');
    const passwordInput = document.getElementById('password');

    const response = await fetch('/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mail: mailInput.value, password: passwordInput.value })
    });
    if (response.ok) {
        let data = await response.json();
        console.log(data);
        alert("Du har laget en ny bruker!");
    }
}

async function getUser() {
    const mailInput = document.getElementById('mail');
    const passwordInput = document.getElementById('password');

    const response = await fetch('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mail: mailInput.value, password: passwordInput.value })
    });
    if (response.ok) {
        let data = await response.json();
        console.log(data);
        alert("Du har logget inn som bruker!");
    }
}


window.addEventListener("load", () => {
    template_view("homePage", "cont")
    draw();
    buttonAddEventListener();
})

function setupCreateUserView() {
    document.getElementById("addUserBtn").addEventListener('click', function (evt) {
        evt.preventDefault();
        createUser();
    })
}

function loginPageView() {
    document.getElementById("loginUserBtn").addEventListener('click', function (evt) {
        evt.preventDefault();
        getUser();
    })
}


function template_view(id) {
    cont.innerHTML = "";
    let template = document.getElementById(id);
    let clone = template.content.cloneNode(true);
    cont.appendChild(clone);

    navLinks = document.querySelectorAll("a");
    handleNavLinks(navLinks);

    if(id === "registerPage"){
        setupCreateUserView();
    } else if(id === "loginPage") {
        loginPageView(); 
    } //Hvis man er på loginpage siden skal funksjonen for å logge inn 

}

function linkNav(event) {
    event.preventDefault();
    let path = event.target.getAttribute("href");
    template_view(path);
}

function handleNavLinks(links) {
    links.forEach((link) => {
        link.addEventListener("click", linkNav);
    })
}








