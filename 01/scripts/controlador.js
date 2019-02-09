function ejecutarTransaccion(transaccion, heroe) {

    switch (transaccion) {

        case "Mostrar":

            mostrarFormulario();            
            break;

        case "MostrarHeroe":

            mostrarFormulario(heroe);
            break;

        case "Alta":

            altaPersonaje();
            break;

        case "Baja":

            eliminarPersonaje();
            break;

        case "Modificacion":

            modificarPersonaje();
            break;

        case "Insertar":

            insertarHeroe(heroe);
            traerListaHeroes(manejarActualizarLista);
            break;

        case "Eliminar":

            eliminarHeroe(heroe);
            break;

        case "Modificar":

            modificarHeroe(heroe);
            break;

        case "actualizarLista":

            traerListaHeroes(manejarActualizarLista);
            break;
        case "Cerrar":
            cerrarForm();
            break;
    }
}

function cerrarForm(){
    var frmAlta = document.getElementById("formAlta");
    frmAlta.classList.remove("visible");
    frmAlta.classList.add("hidden");
}

function manejarActualizarLista(l){
    lista = l;
    actualizarTabla(lista);
}

function actualizarTabla(lista) {
    tableBody.innerHTML = '';
    lista.forEach(personaje => {
        var fila = document.createElement('tr');
        var tdId = document.createElement('td');
        var tdNombre = document.createElement('td');
        var tdApellido = document.createElement('td');
        var tdAlias = document.createElement('td');
        var tdEdad = document.createElement('td');
        var tdLado = document.createElement('td');
        tdId.innerText = personaje.id;
        tdNombre.innerText = personaje.nombre;
        tdApellido.innerText = personaje.apellido;
        tdAlias.innerText = personaje.alias;
        tdEdad.innerText = personaje.edad;
        tdLado.innerText = personaje.lado;
        fila.appendChild(tdId);
        fila.appendChild(tdNombre);
        fila.appendChild(tdApellido);
        fila.appendChild(tdAlias);
        fila.appendChild(tdEdad);
        fila.appendChild(tdLado);
        tableBody.appendChild(fila);
    });
    addRowHandlers();
}