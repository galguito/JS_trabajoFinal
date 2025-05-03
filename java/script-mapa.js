//**************************        MAPA       ***************************************************/

let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximunAge: 0
};


if(navigator.geolocation){

    navigator.geolocation.getCurrentPosition(success, error, options)  //Pedimos coordenadas de la persona que esta visualizando la web.

}else{
    alert("Los servicios de geolocalizacion no estan disponibles");
};



function success(position){
    let latitude = position.coords.latitude;      //Coordenadas de quien visualiza la web.
    let longitude = position.coords.longitude;

    let map = L.map('map', {
        center: [-32.952022,-60.653329],
        zoom: 14
    })

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution: 'Travel Paradise'}).addTo(map);


   
    let ruta = L.Routing.control({
        waypoints: [
            L.latLng(-32.952022, -60.653329),   
            L.latLng(latitude, longitude)           
        ],
        language: "es",
        createMarker: function(i, wp, nWps){

            switch(i){
                case 0: 
                    return L.marker(wp.latLng).bindPopup('<span class="spanMap">Travel-Paradise</span> <br> <strong>Direccion:</strong> Balcarce 1435 Rosario, Argentina <br> <strong>Telefono:</strong> 0341-4244680 <br> <strong>Email:</strong> galguito89@gmail.com');
                
                case nWps-1:
                    return L.marker(wp.latLng).bindPopup("Aqui te encuentras");
                
                default: 
                    return L.marker(wp.latLng).bindPopup("Parada-Media");       
            }
        }

    }).addTo(map);


};

function error(){
    let map = L.map('map', {
        center: [-32.952022,-60.653329],
        zoom: 14
    })

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution: 'Travel Paradise'}).addTo(map)
};



/* 
    


    - En el formulario, no me reconoce la funcion .reset() siendo que esta todo correctamente identificado, funciona cuando utilizo el boton de borrar pero cuando se envia el formulario, y deberia borrarse todo, no la reconoce.

    - Error del cath.
*/






