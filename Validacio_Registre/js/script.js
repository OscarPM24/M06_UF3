let campNom = document.querySelector('#nom');
let campEmail = document.querySelector('#email');
let campContraseña = document.querySelector('#password');

let nomMsg = document.getElementById("nomMsg");
campNom.addEventListener("focusout", function() {
    if (campNom.value == '') {
        campNom.style.border = '2px solid red';
        nomMsg.innerHTML = "Error: El campo no puede estar vacío!";
        nomMsg.style.color = "red";
    }
    else {
        campNom.style.border = '2px solid green';
        nomMsg.innerHTML = "";
    }
});

let emailMsg = document.getElementById("emailMsg");
campEmail.addEventListener("focusout", function() {
    if (!validateEmail(campEmail.value)) {
        campEmail.style.border = '2px solid red';
        emailMsg.innerHTML = "Error: El campo no puede estar vacío!";
        emailMsg.style.color = "red";
    }
    else {
        campEmail.style.border = '2px solid green';
        emailMsg.innerHTML = "";
    }
});

let regExps = [/[A-Z]/, /[a-z]/, /[0-9]/, /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/];

let passwordMsg = document.getElementById("passwordMsg");
passwordMsg.style.display = "none";
campContraseña.addEventListener("input", function() {
    let valid = 0;
    regExps.forEach((regExp, index) => {
        console.log(regExp)
        if (showPasswordMessage(regExp.test(campContraseña.value), index+1)) valid++;
        // if (valid == 5) {
        //     campContraseña.style.border = "green";
        //     passwordMsg.style.display = "none";
        // } else campContraseña.style.border = "red";
    });
});

// Función que comprueba si un email está escrito correctamente
function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
       return true;
    }else{
       return false;
    }
}

function showPasswordMessage(pwdTest, index) {
    passwordMsg.style.display = "block";

    let li = document.getElementById(`li_${index}`);

    if (campContraseña.value.length < 8) {
        document.getElementById(`li_0`).style.color = "red";
    } else {
        document.getElementById(`li_0`).style.color = "green";
    }
    
    console.log(li)
    console.log(pwdTest, index)
    console.log("-------------")

    if (!pwdTest) li.style.color = "red";
    else if (pwdTest) li.style.color = "green";

    return pwdTest;
}
