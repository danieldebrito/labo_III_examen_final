var lista;
const server_url = "http://localhost:3000/";
var xhr;

window.onload = asignarEventos;

function asignarEventos() {
    $("#spinner").hide();
    btnAlta.onclick = function () {
        ejecutarTransaccion("Mostrar");
    }

    btnCancelAlta.onclick = function () {
        ejecutarTransaccion("Cerrar");
    }

    btnAcceptAlta.onclick = function () {
        ejecutarTransaccion("Alta");
    }

    btnEdit.onclick = function (){
        ejecutarTransaccion("Modificacion");
    }

    btnEliminar.onclick = function (){
        ejecutarTransaccion("Baja");
    }

    btnCancelar.onclick = function(){
        cerrarEditar();
    }

    ejecutarTransaccion("actualizarLista");

}

function Personaje(id, nombre, apellido, alias, edad, lado) {
    //contructor de objeto Personaje
    var personaje = {
        id: id,
        nombre: nombre,
        apellido: apellido,
        alias: alias,
        edad: edad,
        lado: lado
    }
    return personaje;
}

function traerIdHeroe(e) {

    //Este manejador de evento se ejecutra cuando se hace click en la grilla dinamica.
    //Propuesta: 1)Busco en el DOM el id del personaje a eliminar

    //2)Me traigo el heroe de la lista, haciendo una funcion de buscar, como por ejemplo:
    //var heroe = lista[buscarHeroe(lista, id)];
    //3)llamo a ejecutarTransaccion
    ejecutarTransaccion("MostrarHeroe", heroe);

}

function altaPersonaje() {
    //genero un nuevo "Personaje", y lo inserto
    var id = document.getElementById('altaId').value;
    var nombre = document.getElementById('altaNombre').value;
    var apellido = document.getElementById('altaApellido').value;
    var alias = document.getElementById('altaAlias').value;
    var edad = document.getElementById('altaEdad').value;
    var heroe = document.getElementById('heroeEdit');
    var villano = document.getElementById('villanoEdit');
    var lado;

    if (heroe.checked) {
        lado = heroe.value;
    } else if (villano.checked) {
        lado = villano.value;
    }

    
    var repetido = false;
    lista.forEach(function(element) {
        if(element.id === id){
            repetido = true;
        }
    });

    if(repetido){
        alert("El ID ingresado ya existe.");
    }else{
        var nuevoPersonaje = new Personaje(id, nombre, apellido, alias, edad, lado);
        ejecutarTransaccion("Insertar", nuevoPersonaje);
        ejecutarTransaccion("Cerrar");
    }
    
}

function eliminarPersonaje() {
    //Propuesta: 1)Busco en el DOM el id del personaje a eliminar
    var id = document.getElementById('editId').value;
    //2)Me traigo el heroe de la lista, haciendo una funcion de buscar, como por ejemplo:
    var heroe = buscarHeroe(lista, id);
    //3)llamo a ejecutarTransaccion
    ejecutarTransaccion("Eliminar", heroe);
    ejecutarTransaccion('actualizarLista');
    cerrarEditar();
    //Aca va alguna animacion para cerrar el formulario

}

function buscarHeroe(lista, id){
    var heroe;
    lista.forEach(function(element) {
        if(element.id === id){
            heroe = element;
        }
    });
    return heroe;
}

function modificarPersonaje() {
    //agregar codigo que crea necesario
    var id = document.getElementById('editId').value;
    var nombre = document.getElementById('editNombre').value;
    var apellido = document.getElementById('editApellido').value;
    var alias = document.getElementById('editAlias').value;
    var edad = document.getElementById('editEdad').value;
    var heroe = document.getElementById('editHeroe');
    var villano = document.getElementById('editVillano');
    var lado;

    if (heroe.checked) {
        lado = heroe.value;
    } else if (villano.checked) {
        lado = villano.value;
    }

    var personajeModificado = new Personaje(id, nombre, apellido, alias, edad, lado);
    ejecutarTransaccion("Modificar", personajeModificado);
    ejecutarTransaccion('actualizarLista');
    cerrarEditar();
    //animacion para cerrar formulario

}

function traerListaHeroes(callback) {
    //ESTA FUNCION RECIBE COMO PARAMETRO UN CALLBACK, POR SI SE QUIERE USAR 
    //PARA REFRESCAR LA TABLA A LA VUELTA DE LA PETICION AL SERVIDOR
    //VER EN CONTROLADOR.JS LA FUNCION ejecutarTransaccion PARA case "actualizarLista"

    $.ajax({
        url: 'http://localhost:3000/traer?collection=heroes',
        beforeSend: function() {
            $("#spinner").show();
        },
        complete: function() {
            $("#spinner").hide();
        },
        success: function (result) {
            callback(result.data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + ", " + thrownError);
        },
    });
}

function insertarHeroe(heroe) {

    // Acá va el código de la peticion ajax para insertar el nuevo heroe (POST)
    xhr = new XMLHttpRequest();
    var data = {
        "collection": "heroes",
        "heroe": heroe,
    }
    xhr.open('POST', 'http://localhost:3000/agregar', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var respuesta = xhr.response;
        }
    }
    xhr.send(JSON.stringify(data));
    //AGREGAR CODIGO PARA INSERTAR EL HEROE
}

function eliminarHeroe(heroe) {


    var data = {
        "collection": "heroes",
        "id": heroe.id
    }

    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/eliminar',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (result) {
            callback(result.data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + ", " + thrownError);
        },
    });
    //AGREGAR CODIGO PARA ELIMINAR EL HEROE
}

function modificarHeroe(heroe) {

    var data = {
        "collection": "heroes",
        "heroe": heroe,
    }

    $.ajax({
        type: "POST",
        url: 'http://localhost:3000/modificar',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (result) {
            callback(result.data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status + ", " + thrownError);
        },
    });
    
}

function cerrarEditar(){
    var frmEdit = document.getElementById("formEdit");
    frmEdit.classList.remove("visible");
    frmEdit.classList.add("hidden");
}

function mostrarFormulario() {
    var frmAlta = document.getElementById("formAlta");
    frmAlta.classList.remove("hidden");
    frmAlta.classList.add("visible");
}

function addRowHandlers() {
    var table = document.getElementById("tabla");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var currentRow = table.rows[i];
        var createClickHandler = function (row) {
            return function () {
                
                var id = row.getElementsByTagName("td")[0].innerHTML;
                var nombre = row.getElementsByTagName("td")[1].innerHTML;
                var apellido = row.getElementsByTagName("td")[2].innerHTML;
                var alias = row.getElementsByTagName("td")[3].innerHTML;
                var edad = row.getElementsByTagName("td")[4].innerHTML;
                var lado = row.getElementsByTagName("td")[5].innerHTML;
                var frmEdit = document.getElementById("formEdit");
                frmEdit.classList.remove("hidden");
                frmEdit.classList.add("visible");
                document.getElementById('editId').value = id;
                document.getElementById('editNombre').value = nombre;
                document.getElementById('editApellido').value = apellido;
                document.getElementById('editAlias').value = alias;
                document.getElementById('editEdad').value = edad;
                if(lado == "Heroe" || lado == "heroe"){
                    heroe = document.getElementById("editHeroe");
                    heroe.setAttribute("checked",true);
                }else{
                    villano = document.getElementById("editVillano");
                    villano.setAttribute("checked",true);
                }
                
            };
        };
        currentRow.onclick = createClickHandler(currentRow);
    }
}