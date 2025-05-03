//-------------------------------------------------------------------------------//

//                    FORMULARIO. 


//Validacion Inputs.

const nombreInput = document.getElementById("nombre");
const apellidoInput = document.getElementById("apellido");
const telefonoInput = document.getElementById("telefono");
const emailInput = document.getElementById("email");


function validarNombre(){
    const nombre = nombreInput.value;
    const nombrePattern = /^[a-zA-Z]{1,15}$/;
    if(nombrePattern.test(nombre)){
        nombreInput.classList.add("valido");
        nombreInput.classList.remove("invalido");

    }else{
        nombreInput.classList.add("invalido");
        nombreInput.classList.remove("valido");
    }
};

function validarApellido(){
    const apellido = apellidoInput.value;
    const apellidoPattern = /^[a-zA-Z]{1,40}$/;
    if(apellidoPattern.test(apellido)){
        apellidoInput.classList.add("valido");
        apellidoInput.classList.remove("invalido");

    }else{
        apellidoInput.classList.add("invalido");
        apellidoInput.classList.remove("valido");
    }
};

function validarTelefono(){
    const telefono = telefonoInput.value;
    const telefonoPattern = /^\d{9}$/;
    if(telefonoPattern.test(telefono)){
        telefonoInput.classList.add("valido");
        telefonoInput.classList.remove("invalido");
    }else{
        telefonoInput.classList.add("invalido");
        telefonoInput.classList.remove("valido");
    }
};

function validarEmail(){
    const email = emailInput.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(emailPattern.test(email)){
        emailInput.classList.add("valido");
        emailInput.classList.remove("invalido");
    }else{
        emailInput.classList.add("invalido");
        emailInput.classList.remove("valido");
    }
};

// Eventos Inputs para validar.
nombreInput.addEventListener("input", validarNombre);
apellidoInput.addEventListener("input", validarApellido);
telefonoInput.addEventListener("input", validarTelefono);
emailInput.addEventListener("input", validarEmail);



// ---------------------------- PRESUPUESTO.--------------------------------------------

let presupuesto = [];

const destinoInput = document.getElementById("destino");
const divPaquete = document.getElementById("div-paquete");


// Evento para sumar al presupuesto

destinoInput.addEventListener("input", ()=>{

    const opcionSeleccionada = destinoInput.options[destinoInput.selectedIndex];
    const valorSeleccionado = opcionSeleccionada.value;

    const [nombreDestino, precioDestino ] = valorSeleccionado.split(":"); //Separamos valores

    const precio = parseFloat(precioDestino);

    presupuesto.push({destino: nombreDestino, precio});   //Lo colocamos dentro del array.



    actualizarPresupuesto();
});


function actualizarPresupuesto(){

// limpiar presupuesto.

    divPaquete.innerHTML = "";

    let totalPresupuesto = 0;

    //Mostrar Destinos. Creamos div donde colocamos cada vez que seleccionamos un option.

    presupuesto.forEach((viaje, index) =>{

        totalPresupuesto += viaje.precio;

        const articuloCarrito = document.createElement("div");

        articuloCarrito.classList.add("paquete");

        articuloCarrito.innerHTML = `-${viaje.destino} - ${viaje.precio.toFixed(2)}
        <button class= "eliminar-viaje" data-index= "${index}">Eliminar Viaje</button>`; //Boton para eliminar opcion.

        divPaquete.appendChild(articuloCarrito);
    
    });
    
//Elminar Viajes mediante el boton.


    document.querySelectorAll(".eliminar-viaje").forEach((boton)=>{

        boton.addEventListener("click", (e)=>{

            const index = e.target.dataset.index;
            eliminarViaje(index);
        })
    })

    actualizarPresupuestoTotal();

}

//Actualizar presupuesto total.

const presupuestoTotal = document.getElementById("presupuesto-total");

function actualizarPresupuestoTotal(){

    let total = presupuesto.reduce((suma, item) => suma + item.precio, 0);


    // Suma costo de los extras.

    const extraSeleccionados = document.querySelectorAll(".checkboxExtra:checked");

    extraSeleccionados.forEach((checkbox)=>{

        const [, precioExtra] = checkbox.value.split(":");

        total += parseFloat(precioExtra);
   
    })

    // Aplicar descuento.

    const descuento = parseFloat(document.getElementById("numero").value);

    if(descuento == 1){

        total = total - (total*0.05);
    }else if(descuento == 2){
        total = total - (total*0.1);
    }else if(descuento == 3){
        total = total - (total*0.2);
    }

    presupuestoTotal.value = total;
    
}

// Actualizar cuando seleccionamos los extras.

const checkboxExtras = document.querySelectorAll(".checkboxExtra");

    checkboxExtras.forEach((checkbox) =>{

        checkbox.addEventListener("change", actualizarPresupuestoTotal);
    })


//Actualizar cuando aplicamos descuento.

const descExtra = document.getElementById("numero");

descExtra.addEventListener("change", actualizarPresupuestoTotal);



//Funcion de eliminar viaje

function eliminarViaje(index){

    presupuesto.splice(index, 1);

    actualizarPresupuesto();
}


// Resetear Formulario

const form = document.querySelector("#formulario");

const borrar = document.getElementById("borrar");

borrar.addEventListener("click", resetFormulario);


function resetFormulario(){

    formulario.reset();
    nombreInput.classList.remove("valido");
    nombreInput.classList.remove("invalido");
    apellidoInput.classList.remove("valido");
    apellidoInput.classList.remove("invalido");
    telefonoInput.classList.remove("valido");
    telefonoInput.classList.remove("invalido");
    emailInput.classList.remove("valido");
    emailInput.classList.remove("invalido");
    divPaquete.innerHTML = "";
    
};


// Submit Formulario.

const condiciones = document.getElementById("condiciones");


form.addEventListener("submit", function(e){

    e.preventDefault();
    validarNombre();
    validarApellido();
    validarTelefono();
    validarEmail();

    if(nombreInput.classList.contains("valido")&& apellidoInput.classList.contains("valido")&& telefonoInput.classList.contains("valido")&& emailInput.classList.contains("valido")&& condiciones.checked && destinoInput.value !== "" && descExtra.value > 0 && divPaquete.innerHTML !== ""){

        alert("Formulario enviado correctamente");
        resetFormulario();

    }else{
        alert("Corrija los errores en el formulario")
    };
    
});
