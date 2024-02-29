// Variables de los selects HTML
let select_cat = document.getElementById("categoria");
let select_subcat = document.getElementById("subcategoria");

// Fetch que obtiene las categorías de la base de datos
fetch("getCats.php")
.then((response) => response.json())
.then((data) => {
    data.forEach(value => {
        let option = document.createElement("option"); // Creamos un elemento option
        option.value = value.nom; // Le ponemos el valor nombre
        option.innerHTML = value.nom; // Le ponemos texto 
        option.classList.add("checkCat"); // Añadimos una clase al elemento
        select_cat.appendChild(option); // Lo añadimos al select 
    });
})
.catch((error) => {console.log(error)});

// EventListener del select de categorías cuando se cambia el valor seleccionado
select_cat.addEventListener("change", function() {
    // Creamos un objeto FormData para especificar el método de la petición HTTP (POST) 
    // y los datos que enviaremos, que es la categoria que hayamos seleccionado
    let formData = new FormData();
    formData.append("cat", select_cat.selectedIndex);
    let options = {
        method: 'POST',
        body: formData
    }

    // Fetch que obtiene las subcategorías asociadas con el índice que le hemos pasado por la petición POST
    fetch("getSubCats.php", options)
    .then((response) => response.json())
    .then((data) => {
        select_subcat.innerHTML = ""; // Vaciamos el div de subcategorias
        data.forEach(value => {
            let option = document.createElement("option"); // Creamos un elemento input
            option.value = value.nom; // Le ponemos el valor nombre
            select_subcat.appendChild(option); // Lo añadimos al div de subcategorias
            option.innerHTML = value.nom; // Le ponemos texto 
        });
    })
    .catch((error) => {console.log(error)});
})