function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://129.151.105.249:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}
//Manejador GET
function traerInformacionOrtopedics() {
    $.ajax({
        url:"http://129.151.105.249:8080/api/Ortopedic/all",
        //url: "http://localhost:8080/api/Skate/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaOrtopedics(response);
        }

    });

}

function pintarRespuestaOrtopedics(response){

    let myTable="<table>"
    myTable+="<tr>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>Modelo</td>";
        myTable+="<td>Año</td>";
        myTable+="<td>Descripcion</td>";
        myTable+="<td>Categoria</td>";
    "</tr>";

    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].brand + "</td>";
        myTable+="<td>" + response[i].year + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
      //  myTable+="<td>" + response[i].category.name + "</td>";
        myTable+='<td><button class = "boton2" onclick="borrarOrtopedics(' + response[i].id + ')">Borrar Ortopedic!</button></td>';
        myTable+='<td><button class = "boton2" onclick="cargarDatosOrtopedic(' + response[i].id + ')">Editar Ortopedic!</button></td>';
        myTable+='<td><button class = "boton2" onclick="actualizarInformacionOrtopedics(' + response[i].id + ')">Actualizar Ortopedic!</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado2").html(myTable);
}
//Capturar informacion para Actualizar
function cargarDatosOrtopedic(id) {
    $.ajax({
        dataType: 'json',
        url:"http://129.151.105.249:8080/api/Ortopedic/"+id,
        //url: "http://localhost:8080/api/Skate/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#Oname").val(item.name);
            $("#Obrand").val(item.brand);
            $("#Oyear").val(item.year);
            $("#Odescription").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function guardarInformacionOrtopedics() {

    if($("#Oname").val().length == 0 || $("#Obrand").val().length == 0 || $("#Oyear").val().length == 0 || $("#Odescription").val().length == 0){
       alert("Todos los campos son obligatorios")
    }else{

            let elemento = {
                name: $("#Oname").val(),
                brand: $("#Obrand").val(),
                year: $("#Oyear").val(),
                description: $("#Odescription").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:"http://129.151.105.249:8080/api/Ortopedic/save",
                //url: "http://localhost:8080/api/Skate/save",
                data: dataToSend,
                datatype: 'json',

                success: function (response) {
                    console.log(response);
                    console.log("Se guardo Correctamente");
                    //Limpiar Campos
                    $("#resultado2").empty();
                    $("#Oname").val("");
                    $("#Obrand").val("");
                    $("#Oyear").val("");
                    $("#Odescription").val("");
                    

                    //Listar Tabla

                    alert("Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            });
    }
}
//Manejador DELETE
function borrarOrtopedics(idElemento) {
    var myData = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(myData);
console.log(dataToSend);
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://129.151.105.249:8080/api/Ortopedic/"+idElemento,
            //url: "http://localhost:8080/api/Skate/" + idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#resultado").empty();
                $("#id").val("");
                traerInformacionOrtopedics();
                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Manejador PUT
function actualizarInformacionOrtopedics(idElemento) {
    
    if($("#Oname").val().length == 0 || $("#Obrand").val().length == 0 || $("#Oyear").val().length == 0 || $("#Odescription").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let myData = {
            id: idElemento,
            name: $("#Oname").val(),
            brand: $("#Obrand").val(),
            year: $("#Oyear").val(),
            description: $("#Odescription").val(),
            category:{id: +$("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://129.151.105.249:8080/api/Ortopedic/update",
            //url: "http://localhost:8080/api/Skate/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#resultado").empty();
                listarOrtopedics();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultado").empty();
                $("#id").val("");
                $("#Oname").val("");
                $("#Obrand").val("");
                $("#Oyear").val("");
                $("#Odescription").val("");
                $("#select-category").val("");
                traerInformacionOrtopedics();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}
