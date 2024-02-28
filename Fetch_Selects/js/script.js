let select_cat = document.getElementById("categoria");
let select_subcat = document.getElementById("subcategoria");



fetch("getCats.php")
.then((response) => response.json())
.then((data) => {
    data.forEach(value => {
        let option = document.createElement("option");
        option.value = value.nom;
        option.innerHTML = value.nom;
        select_cat.appendChild(option);
    });
})
.catch((error) => {console.log(error)});

select_cat.addEventListener("change", function() {
    let formData = new FormData();
    formData.append("cat", select_cat.selectedIndex);
    let options = {
        method: 'POST',
        body: formData
    }

    fetch("getSubCats.php", options)
    .then((response) => response.json())
    .then((data) => {
        select_subcat.innerHTML = "";
        data.forEach(value => {
            let checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.classList.add("checkCat");
            checkbox.value = value.nom;
            select_subcat.appendChild(checkbox);
            select_subcat.innerHTML += `${value.nom}<br>`;
        });
        
        document.querySelectorAll(".checkCat").forEach(el=>
            el.addEventListener("change", function(){
                if(this.checked===true){
                    console.log(this.value + " check");
                }else{
                    console.log(this.value + " uncheck");
                }
            })
        )
    })
    .catch((error) => {console.log(error)});
})

