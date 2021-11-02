function autoInicioRelacionCliente(){
    
    $.ajax({
        url:"http://129.151.105.249:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
          
            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}
function autoInicioOrtopedic(){

    $.ajax({
        url:"http://129.151.105.249:8080/api/Ortopedic/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        
            let $select = $("#select-ortopedic");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
         
            }); 
        }
    
    })
}

//Manejador "POST"
function guardarInformacionReservas() {
    
    if($("#startReserva").val().length == 0 || $("#devolutionReserva").val().length == 0 || $("#statusReserva").val().length == 0){
        alert("Todos los campos son Obligatorios")
    }else{  
        let var6 = {
            startDate: $("#startReserva").val(),
            devolutionDate: $("#devolutionReserva").val(),
            status: $("#statusReserva").val(),
            skate:{id: +$("#select-ortopedic").val()},
            client:{idClient: +$("#select-client").val()},
            
        }

        let dataToSend = JSON.stringify(var6);

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url:"http://129.151.105.249:8080/api/Reservation/save",
            //url: "http://localhost:8080/api/Reservation/save",
            data: dataToSend,
            datatype: "json",

            success: function (response) {
                console.log(response);
                //Limpiar Campos
                $("#resultado5").empty();
                $("#startReserva").val("");
                $("#devolutionReserva").val("");
                $("#statusReserva").val("");

                //Listar Tabla

                alert("Se ha guardado Correctamente!")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se guardo Correctamente!")
            }
        });
    }
}



function listarReservas(){
    $.ajax({
        url:"http://129.151.105.249:8080/api/Reservation/all",
        //url: "http://localhost:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaReservas(response);
        }
    });
}

function pintarRespuestaReservas(response){
   
    let myTable="<table>";
    myTable+="<tr>";
        myTable+="<td>Fecha Inicio</td>";
        myTable+="<td>fecha Devolucion</td>";
        myTable+="<td>Estado</td>";
        myTable+="<td>Patineta</td>";
        myTable+="<td>Cliente</td>";
     "</tr>";
      
    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>"+response[i].startDate+"</td>";
        myTable+="<td>"+response[i].devolutionDate+"</td>";
        myTable+="<td>"+response[i].status+"</td>";
        myTable+="<td>"+response[i].ortopedic.name+"</td>";
        myTable+="<td>"+response[i].client.name+"</td>";
        myTable+='<td><button  onclick="borrarReservation(' + response[i].idReservation + ')">Borrar Reserva!</button></td>';
        myTable+='<td><button  onclick="cargarDatosReservation(' + response[i].idReservation + ')">Editar Reserva!</button></td>';
        myTable+='<td><button  onclick="actualizarReservation(' + response[i].idReservation + ')">Actualizar Reserva!</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado5").html(myTable);
}


//Manejador DELETE
function borrarReservas(idElemento) {
    let myData = {
        idReservation: idElemento
    }

    let dataToSend = JSON.stringify(myData);

    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://129.151.105.249:8080/api/Reservation/"+idElemento,
            //url: "http://localhost:8080/api/Reservation/" + idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#resultado5").empty();
                $("#idReservation").val("");
                traerInformacionReservas();
                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Capturar informacion para Actualizar
function traerInformacionReservas(id) {
    $.ajax({
        dataType: 'json',
        url:"http://168.138.247.22:80/api/Reservation/"+id,
        //url: "http://localhost:8080/api/Reservation/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#startReserva").val(item.startDate);
            $("#devolutionReserva").val(item.devolutionDate);
            $("#statusReserva").val(item.status);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

//Manejador PUT
function actualizarInformacionReservas(idElemento) {
    
    if($("#startReserva").val().length == 0 || $("#devolutionReserva").val().length == 0 || $("#statusReserva").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            idReservation: idElemento,
            startDate: $("#startReserva").val(),
            devolutionDate: $("#devolutionReserva").val(),
            status: $("#statusReserva").val(),
            skate:{id: +$("#select-ortopedic").val()},
            client:{idClient: +$("#select-client").val()},
        }

        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://129.151.105.249:8080/api/Reservation/update",
            //url: "http://localhost:8080/api/Reservation/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#resultado").empty();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultado5").empty();
                $("#idReservation").val("");
                $("#startReserva").val("");
                $("#devolutionReserva").val("");
                $("#statusReserva").val("");
                traerInformacionReservas();
                

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}