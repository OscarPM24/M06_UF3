// -----------------------REGISTRE USUARIS--------------------------------

let nom = document.getElementById('validationNom');
let cognoms = document.getElementById('validationCognoms');
let dni = document.getElementById('validationDNI');
let email = document.getElementById('validationEmail');
let telefon = document.getElementById('validationTelf');

$(nom).on('focusout', () => {checkBuit(nom)})
$(cognoms).on('focusout', () => {checkBuit(cognoms)})
$(dni).on('focusout', () => {validateNIF_NIE(dni)})
$(email).on('focusout', () => {validateEmail(email)})
$(telefon).on('focusout', () => {validateTlf(telefon)})

$('#form-user-register').submit(function(e) {
  e.preventDefault();

  checkBuit(nom)
  checkBuit(cognoms)
  validateNIF_NIE(dni)
  validateEmail(email)
  validateTlf(telefon)
});

function checkBuit(data) {
  if (data.value == '') { // Valor buit
    data.classList.remove('is-valid');
    data.classList.add('is-invalid');
    errorText(data.id.substring(10), 'Aquest camp no pot estar buit!');
    return false;
  } else { // Valor ple
    document.getElementById(`feedback${(data.id.substring(10))}`).innerHTML = ""; // feedback + ID Atribut
    data.classList.remove('is-invalid');
    data.classList.add('is-valid');
    return true;
  }
}

function validateNIF_NIE(dni){
  if (checkBuit(dni)) {
    value = dni.value;
    var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
    var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    var str = value.toString().toUpperCase();

    if (!nifRexp.test(str) && !nieRexp.test(str)) {
      dni.classList.remove('is-valid');
      dni.classList.add('is-invalid');
      errorText(dni.id.substring(10), 'El DNI és invàlid!');
      return false;
    }

    var nie = str
      .replace(/^[X]/, '0')
      .replace(/^[Y]/, '1')
      .replace(/^[Z]/, '2');

    var letter = str.substr(-1);
    var charIndex = parseInt(nie.substr(0, 8)) % 23;

    if (validChars.charAt(charIndex) === letter) {
      dni.classList.remove('is-invalid');
      dni.classList.add('is-valid');
      return true;
    }
    dni.classList.remove('is-valid');
    dni.classList.add('is-invalid');
    errorText(dni.id.substring(10), 'El DNI és invàlid!');
    return false;
  }
  return false;
}

function validateEmail(mail) {
  if (checkBuit(mail)) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
      mail.classList.remove('is-invalid');
      mail.classList.add('is-valid');
      return true;
    }
    mail.classList.remove('is-valid');
    mail.classList.add('is-invalid');
    errorText(mail.id.substring(10), 'El correu és invàlid!');
  }
  return false;
}

function validateTlf(tlf) {
  if (checkBuit(tlf)) { 
    var tlfRegexp = /^\d{9}$/;
    if (tlf.value.match(tlfRegexp)) {
      tlf.classList.remove('is-invalid');
      tlf.classList.add('is-valid');
      return true;
    }
    tlf.classList.remove('is-valid');
    tlf.classList.add('is-invalid');
    errorText(tlf.id.substring(10), 'El telèfon és invàlid!');
  }
  return false;
}

function errorText(element, text) {
  let feedback_element = document.getElementById(`feedback${element}`); // feedback + ID Atribut
  feedback_element.innerHTML = `<p class="invalid-feedback">${text}</p>`; // Posem el text en el div
  let feedback_texts = document.querySelectorAll('.invalid-feedback'); // Agafem tots els textos de feedback-invalid
  feedback_texts.forEach(el => { el.style.display = 'block'; }); // Els posem display block
}

document.querySelector('.input-group-text').addEventListener('click', function() {
  let username = "";

  username += nom.value.charAt(0).toLowerCase(); // Primera lletra del nom en minúscula
  username += cognoms.value.charAt(0).toUpperCase(); // Primera lletra del primer cognom en majúscula
  username += (cognoms.value.replace(/ /g,'')).substring(1, 4).toLowerCase(); // Quitem l'espai entre el primer i segon cognom i següents 3 lletres dels cognoms en minúscula
  for (let i = 0; i < 7; i++) {
    if (i % 2 == 0) username += dni.value.charAt(i); // Numeros de posicions senars del DNI
  }

  document.getElementById('validationUsername').value = username;
});