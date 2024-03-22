let geocoder = new google.maps.Geocoder(); // Variable del Geocoder de Google
let findLoc = document.getElementById("findLoc"); // Botón para buscar una dirección
let ubicacion = document.getElementById("ubicacion"); // Botón para volver al centro
let myLatLng = new google.maps.LatLng(41.390205, 2.154007); // Latitud y longitud por defecto
let map; // Mapa

// Función que genera el mapa con la posición establecida y con un marcador
async function initMap(pos, zoom) {
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(document.getElementById("map"), {
        center: pos, // coordenadas del centro del mapa
        zoom: zoom, // zoom del map      
    });

    createMarker(pos, map);
}

// Creamos el mapa
initMap(myLatLng, 12);

// EventListener del botón para que al clicarlo actualice el mapa con el nombre de la calle que hayamos puesto
findLoc.addEventListener("click", geolocalitza);

// EventListener que recoje tus coordenadas actuales y envia el mapa hacia esa posición, pone un marker y cambia el zoom
ubicacion.addEventListener("click", function() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(pos);
            map.setZoom(9);

            document.getElementById("latitude").value = pos.lat;
            document.getElementById("longitude").value = pos.lng;
            
            let marker = createMarker(pos, map, "./marker.png");
        });
    }
});

// Función que crea un marker con la posición, mapa y icono pasados por paràmetros, también añade una infoWindow
function createMarker(pos, map, icon) {
    let marker = new google.maps.Marker({
        position: pos, // posición del marcador
        map, // mapa
        title: "Barcelona", // nombre del marcador
        icon: icon
    });

    let infowindow = new google.maps.InfoWindow({
        content: document.getElementById("adreca").value
    });
    
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });

    return marker;
}

// Funcion que dada una dirección, centra el mapa y pone el marcador en ese lugar
function geolocalitza() {
    let geocoder = new google.maps.Geocoder();
    let address = document.getElementById("adreca").value;
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            latitude = results[0].geometry.location.lat();
            longitude = results[0].geometry.location.lng();
            let myLatLng = new google.maps.LatLng(latitude, longitude);
            
            initMap(myLatLng, 16)

            document.getElementById("latitude").value = latitude;
            document.getElementById("longitude").value = longitude;
        } else alert("Adreça no trobada!");
    });
}