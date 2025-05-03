// Carga de datos JSON en seccion index.

const contenedor = document.getElementById("divJson");
let info = "";
let error = "Error en la carga de datos";
fetch('data/noticias.json')
    .then(response => response.json())
    .then(datos =>{
        
            datos.destinos.forEach(item=>{
                
                info += `<strong><p>Ciudad de ${item.nombre}</strong><br> Sus atracciones principales: <br>-${item.turismo.atracciones[0]}<br> -${item.turismo.atracciones[1]}<br> -${item.turismo.atracciones[2]}<br>${item.turismo.atracciones[3]}</p>`

                $(".divJson").html(info);
               
            })
              
    })
    .catch(error => $(".divJson").html(error));

    






