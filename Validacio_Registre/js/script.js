// Variable del formulario HTML
let form = document.querySelector('#form');

// Objeto que contiene los inputs del HTML
let inputs = {nom: document.querySelector('#nom'), 
            email: document.querySelector('#email'), 
            password: document.querySelector('#password'), 
            repeat: document.querySelector('#repeat'), 
            postal: document.querySelector('#postal')};

// Objeto que contiene los spans del HTML
let spans = {nom: document.querySelector('#nomMsg'), 
            email: document.querySelector('#emailMsg'), 
            password: document.querySelector('#passwordMsg'), 
            repeat: document.querySelector('#repeatMsg'), 
            postal: document.querySelector('#postalMsg')};

// Array que contiene las expresiones regulares que se usan al validar la contraseña
let regExps = [/^.{8,}$/, /[A-Z]/, /[a-z]/, /[0-9]/, /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/];

// EventListener del campo nom, que comprueba que no esté vacío, al hacer focusout
inputs.nom.addEventListener("focusout", function() {
    if (inputs.nom.value == '') stylesInputSpan(inputs.nom, spans.nom, 'red', false); 
    else stylesInputSpan(inputs.nom, spans.nom, 'green', true);
});

// EventListener del campo email, que comprueba que sea un correo válido, al hacer focusout 
inputs.email.addEventListener("focusout", function() {
    if (!validateEmail(inputs.email.value)) stylesInputSpan(inputs.email, spans.email, 'red', false);
    else stylesInputSpan(inputs.email, spans.email, 'green', true);
});

// EventListener del campo password, que recorre las expresiones regulares 
// y comprueba si se cumple o no la expresión regular con el método test(), al escribir en el campo
inputs.password.addEventListener("input", function() {
    regExps.forEach((regExp, index) => { showPasswordMessage(regExp.test(inputs.password.value), index); });
});

// EventListener del campo password, que comprueba si TODAS las expresiones regulares se cumplen, al hacer focusout
inputs.password.addEventListener("focusout", function() {
    let valid = 0;
    let lis = document.querySelectorAll('li');
    lis.forEach(li => { if (li.style.color == 'green') valid++; });    
    if (valid == 5) stylesInputSpan(inputs.password, spans.password, 'green', true);
    else stylesInputSpan(inputs.password, spans.password, 'red', false);
});

// EventListener del campo repeat, que comprueba si el campo password y repeat tienen el mismo valor, al hacer focusout
inputs.repeat.addEventListener("focusout", function() {
    if (inputs.repeat.value != inputs.password.value) stylesInputSpan(inputs.repeat, spans.repeat, 'red', false);
    else stylesInputSpan(inputs.repeat, spans.repeat, 'green', true);
});

// EventListener del campo postal, que comprueba que no esté vacío, al hacer focusout
inputs.postal.addEventListener("focusout", function() {
    if (inputs.postal.value == '') stylesInputSpan(inputs.postal, spans.postal, 'red', false); 
    else stylesInputSpan(inputs.postal, spans.postal, 'green', true);
});

// EventListener del form, que comprueba que todos los inputs sean válidos (borde verde), al clicar el botón de submit
form.addEventListener("submit", function(e){
    e.preventDefault();
    let valid = 0;

    Object.values(inputs).forEach((camp, index) => { if (camp.style.border == '1px solid green') valid++; });
    if (valid == 5) form.submit();
});

// Función que comprueba si un email está escrito correctamente
function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
       return true;
    } else {
       return false;
    }
}

// Función que recibe por parámetros un input, un span, un color, y un valor de hidden
// El borde del input se colorea con el color indicado, y el hidden del span se pone con el valor indicado 
function stylesInputSpan(input, span, color, hidden) {
    input.style.border = `1px solid ${color}`;
    span.hidden = hidden; 
}

// Función que muestra las 5 condiciones de la contraseña, y las colorea dependiendo de si són correctas o no
function showPasswordMessage(pwdTest, index) {
    spans.password.hidden = false;
    let li = document.getElementById(`li_${index}`);
    if (pwdTest) li.style.color = "green";
    else li.style.color = "red";

    return pwdTest;
}