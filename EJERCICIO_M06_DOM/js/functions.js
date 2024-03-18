let nom = document.getElementById('validationNom');
let cognoms = document.getElementById('validationCognoms');
let dni = document.getElementById('validationDNI');
let email = document.getElementById('validationEmail')

$('#form-user-register').submit(function(e) {
  e.preventDefault();

  checkBuit(nom)
  checkBuit(cognoms)
  if (validateNIF_NIE(dni)) {
    dni.classList.remove('is-invalid');
    dni.classList.add('is-valid');
  } else {
    dni.classList.remove('is-valid');
    dni.classList.add('is-invalid');
  }
  checkBuit(email)
});

function checkBuit(data) {
  if (data.value == '') { // Valor buit
    data.classList.remove('is-valid');
    data.classList.add('is-invalid');

    let feedback_element = document.getElementById(`feedback${(data.id.substring(10))}`); // feedback + Nom/Cognom
    feedback_element.innerHTML = '<p class="invalid-feedback">Aquest camp no pot estar buit</p>'; // Posem el text en el div
    let feedback_texts = document.querySelectorAll('.invalid-feedback'); // Agafem tots els textos de feedback-invalid
    feedback_texts.forEach(el => { el.style.display = 'block'; }); // Els posem display block
    return false;
  } else { // Valor ple
    document.getElementById(`feedback${(data.id.substring(10))}`).innerHTML = ""; // feedback + Nom/Cognom
    data.classList.remove('is-invalid');
    data.classList.add('is-valid');
    return true;
  }
}

function validateNIF_NIE(value){
  if (checkBuit(value)) {
    value = value.value;
    var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
    var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    var str = value.toString().toUpperCase();

    if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

    var nie = str
      .replace(/^[X]/, '0')
      .replace(/^[Y]/, '1')
      .replace(/^[Z]/, '2');

    var letter = str.substr(-1);
    var charIndex = parseInt(nie.substr(0, 8)) % 23;

    if (validChars.charAt(charIndex) === letter) return true;

    return false;
  }
  return false;
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

function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
    alert("OK");
  }else{
    alert("KO");
  }
}

