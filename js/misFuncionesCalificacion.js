///////////////////Calificación/////////////////////////////////////////////////
function traerInformacionCalificacion(){
    $.ajax({
        url:"http://129.151.105.249:8080/api/Calification/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaCalificacion(respuesta);
        }
    });
}

function pintarRespuestaCalificacion(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].calification+"</td>";
        myTable+="<td>"+respuesta[i].message+"</td>";
        myTable+="<td>"+respuesta[i].reservation+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionCalificacion("+respuesta[i].idCalification+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCalificacion("+respuesta[i].idCalification+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado7").html(myTable);
}

function guardarInformacionCalificacion(){
    let var8 = {
        calification:$("#cal").val(),
        message:$("#calMessage").val(),
        reservation:$("#calReservation").val(),
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var8),
        
        url:"http://129.151.105.249:8080/api/Calification/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });

}

function actualizarInformacionCalificacion(idElemento){
    let myData={
        idCalification:idElemento,
        calification:$("#cal").val(),
        message:$("#calMessage").val(),
        reservation:$("#calReservation").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.105.249:8080/api/Calification/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idCalification").val("");
            $("#cal").val("");
            $("#calMessage").val("");
            $("#calReservation").val("");
            traerInformacionCalificacion();
            alert("se ha Actualizado correctamente la calificacion")
        }
    });

}

function borrarCalificacion(idElemento){
    let myData={
        idCalification:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.105.249:8080/api/Calification/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idCalification").val("");
            traerInformacionCalificacion();
            alert("Se ha Eliminado.")
        }
    });

}