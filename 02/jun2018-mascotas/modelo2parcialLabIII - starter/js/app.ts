
///<reference path="mascota.ts"/>

$(function () {
    // localStorage.clear();
    cargarTipos();

    mostrarMascotas();

    $('#cmbFiltro').change(function () {
        filtrarMascotas(this.value);
    });

    $('#chkId').change(mapearCampos);
    $('#chkName').change(mapearCampos);
    $('#chkEdad').change(mapearCampos);
    $('#chkPatas').change(mapearCampos);    

    //mapearCampos();


});

function agregarMascota(): void {
    let id: number = Number($('#txtId').val());
    let tipo: Clases.tipoMascota = Number($('#selectTipo').val());
    let nuevaMascota = new Clases.Mascota(Number($('#txtId').val()), String($('#txtNombre').val()), Number($('#txtEdad').val()), Number($('#txtPatas').val()), tipo);

    let MascotasString: string | null = localStorage.getItem("Mascotas");

    let MascotasJSON: JSON[] = MascotasString == null ? [] : JSON.parse(MascotasString);

    console.log(nuevaMascota.toJSON());

    MascotasJSON.push(JSON.parse(nuevaMascota.toJSON()));

    localStorage.setItem("Mascotas", JSON.stringify(MascotasJSON));

    alert("Mascota guardada!!!");

    mostrarMascotas();

    limpiarCampos();



    //console.log(nuevaMascota.toJSON());

}

function limpiarCampos() {
    $('#txtNombre').val("");
    $('#txtId').val("");
    $('#txtEdad').val("");
    $('#txtPatas').val("");
    $('#selectTipo').val(0);

    $('#txtId').focus();
}

function mostrarMascotas() {

    let MascotasString: string | null = localStorage.getItem("Mascotas");

    let MascotasJSON: Clases.Mascota[] = MascotasString == null ? [] : JSON.parse(MascotasString);

    let tabla: string = "<table class='table'><thead><tr><th>Id</th><th>Nombre</th><th>Edad</th><th>Tipo</th><th>Patas</th></tr>";



    for (let i = 0; i < MascotasJSON.length; i++) {

        tabla += `<tr><td>${MascotasJSON[i].id}</td><td>${MascotasJSON[i].nombre}</td><td>${MascotasJSON[i].edad}</td><td>${Clases.tipoMascota[MascotasJSON[i].tipo]}</td><td>${MascotasJSON[i].patas}</td></tr>`;

    }

    tabla += `</table>`;

    $('#divTabla').html(tabla);

}

function cargarTipos() {
    /* var paises = data.map(function(p){
         return p.pais;
     })
     .unique()
     .sort();
 */
    for (let i = 0; i < 5; i++) {
        $("#cmbFiltro").append('<option value="' + i + '">' + Clases.tipoMascota[i] + '</option>');
    }



    $.each(Clases.tipoMascota, function (value, tipo) {
        /* $("#cmbFiltro").append('<option value="'+value+'">'+tipo+'</option>');
             //console.log(x);
             i++;
             */

    });
}

function filtrarMascotas(tipo: number) {
    //console.log(tipo);

    let mascotasFiltradas: Array<Clases.Mascota>;

    let MascotasString: string | null = localStorage.getItem("Mascotas");

    let MascotasJSON: Clases.Mascota[] = MascotasString == null ? [] : JSON.parse(MascotasString);

    mascotasFiltradas = MascotasJSON.filter(function (mascota: Clases.Mascota) {

        return Clases.tipoMascota[mascota.tipo] === Clases.tipoMascota[tipo];

    }

    );
    //console.log(mascotasFiltradas);
    mostrarMascotasPorTipo(mascotasFiltradas);

}

function cleanStorage() {
    localStorage.clear();
    alert("LocalStorage Limpio");
}

function mostrarMascotasPorTipo(lista: Array<Clases.Mascota>) {


    let tabla: string = "<table class='table'><thead><tr><th>Id</th><th>Nombre</th><th>Edad</th><th>Tipo</th><th>Patas</th></tr>";

    if (lista.length == 0) {
        tabla += "<tr><td colspan='4'>No hay mascotas que mostrar</td></tr>";
    }
    else {


        for (let i = 0; i < lista.length; i++) {

            tabla += `<tr><td>${lista[i].id}</td><td>${lista[i].nombre}</td><td>${lista[i].edad}</td><td>${Clases.tipoMascota[lista[i].tipo]}</td><td>${lista[i].patas}</td></tr>`;

        }

    }

    tabla += `</table>`;

    $('#divTabla').html(tabla);

}

function calcularPromedio() {

    let promedio: number = 0;
    let totalEdades: number;
    let cantidad: number;

    let tipo: number = Number($('#cmbFiltro').val());



    let mascotasFiltradas: Array<Clases.Mascota>;

    let MascotasString: string | null = localStorage.getItem("Mascotas");

    let MascotasJSON: Clases.Mascota[] = MascotasString == null ? [] : JSON.parse(MascotasString);

    mascotasFiltradas = MascotasJSON.filter(function (mascota: Clases.Mascota) {

        return Clases.tipoMascota[mascota.tipo] === Clases.tipoMascota[tipo];

    });

    totalEdades = mascotasFiltradas.reduce(function (anterior, actual) {
        return anterior += actual.edad;

    }, 0);


    console.log(totalEdades);

    cantidad = mascotasFiltradas.length;


    console.log(cantidad);

    if (cantidad != 0) {
        promedio = totalEdades / cantidad;
    }

    $('#txtPromedio').val(promedio);

}

function mapearCampos() {

        let chkId: boolean = (<HTMLInputElement> $('#chkId')[0]).checked;
        let chkName: boolean = (<HTMLInputElement> $('#chkName')[0]).checked;
        let chkEdad: boolean = (<HTMLInputElement> $('#chkEdad')[0]).checked;
        let chkPatas: boolean = (<HTMLInputElement> $('#chkPatas')[0]).checked;

        //console.log(chkId);
        
    
        let MascotasString: string | null = localStorage.getItem("Mascotas");
    
        let MascotasJSON: Clases.Mascota[] = MascotasString == null ? [] : JSON.parse(MascotasString);
    
        let tabla: string = "<table class='table'><thead><tr>";

        if(chkId)
        tabla += "<th>Id</th>";
        if(chkName)
        tabla += "<th>Nombre</th>";
        if(chkEdad)
        tabla+= "<th>Edad</th>";
        tabla += "<th>Tipo</th>";
        if(chkPatas)
        tabla += "<th>Patas</th>";
        tabla += "</tr>";   
    
        for (let i = 0; i < MascotasJSON.length; i++) {
    
            tabla += `<tr>`;
            if(chkId)
            tabla += `<td>${MascotasJSON[i].id}</td>`;
            if(chkName)
            tabla += `<td>${MascotasJSON[i].nombre}</td>`;
            if(chkEdad)
            tabla+= `<td>${MascotasJSON[i].edad}</td>`;
            tabla += `<td>${Clases.tipoMascota[MascotasJSON[i].tipo]}</td>`;
            if(chkPatas)
            tabla += `<td>${MascotasJSON[i].patas}</td>`;
            tabla += `</tr>`;             
    
        }
    
        tabla += `</table>`;
    
        $('#divTabla').html(tabla);
    
    }
    