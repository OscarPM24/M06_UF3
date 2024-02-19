let files = []; // Array vacío donde se guardan todos los archivos

// Elementos del HTML
let dropArea = document.querySelector('.drop-area');
let dragDropText = document.querySelector('h2');
let button = document.querySelector('button');
let input = document.querySelector('#input-file');
let preview = document.querySelector('#preview');
let form = document.querySelector('form');

// Array de eventos que prevenimos en el dropArea
let events_preventDefault = ['dragover', 'dragleave', 'drop'];

// PreventDefault del dropArea
events_preventDefault.forEach(evt => {
    dropArea.addEventListener(evt, prevDefault);

    function prevDefault(e) {
        e.preventDefault();
    }
});

// Event Listener dragover del dropArea
dropArea.addEventListener("dragover", function() {
    dropArea.classList.add("active");
    dragDropText.textContent = "Drop to upload files";
})

// Event Listener dragLeave del dropArea
dropArea.addEventListener("dragleave", function() {
    dropArea.classList.remove("active");
    dragDropText.textContent = "Drag & Drop files";
})

// Event Listener drop del dropArea
dropArea.addEventListener("drop", function(e) {
    files = files.concat(Array.from(e.dataTransfer.files));
    showFiles();
});

// Event Listener click del button
button.addEventListener("click", function(e) {
    e.preventDefault();
    input.click();
});

// Event Listener change del input
input.addEventListener("change", function() {
    let inputFiles = input.files;
    files = files.concat(Array.from(inputFiles));
    showFiles();
    form.submit();
});

// Event Listener submit del form
form.addEventListener("submit", function(e){
    e.preventDefault();
    console.log(e)
    const dataTransfer = new DataTransfer();
    files.forEach(file=>{
        dataTransfer.items.add(file);
    })
    input.files = dataTransfer.files;
    form.submit();
});

// Función que previsualiza los ficheros que hemos añadido
function showFiles() {
    preview.innerHTML = ""; // Vaciamos el preview
    // Drop Area vuelve a la situación inicial
    dropArea.classList.remove("active");
    dragDropText.textContent = "Drag & Drop files";

    if (files.length != 0) {
        files.forEach((file, index) => {
            processFile(file, index); 
        })
    }
}

// Función que procesa los ficheros del array files y los muestra en pantalla
function processFile(file, index) {
    const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"]; // Array de extensiones válidas 
    const docType = file.type; // Variable donde se almacens la extensión del archivo

    if (!validExtensions.includes(docType)) {
        console.log(`El archivo "${file.name}" no es válido!`);
        files.splice(index, 1); // Removemos el archivo no válido
    } else {
        let reader = new FileReader();
        reader.readAsDataURL(file); // Leemos el contenido del archivo
        reader.onloadend = function() { // Cuando acabe de leer el archivo 
            let prev = 
            `<div class="previewImage">
                <img src="${reader.result}"/> 
                <span>${file.name}</span>
                <span onclick="removeBtn(${index})" class="material-symbols-outlined
            removeBtn">c</span>
            </div>`; // reader.result es la ruta del archivo

            preview.innerHTML += prev;
        }
    }
}

function removeBtn(i) {
    files.splice(i, 1);
    showFiles();
}