
///////////////////Administradores/////////////////////////////////////////////////
function traerInformacionAdmi(){
    $.ajax({
        url:"http://129.151.105.249:8080/api/Administrator/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaAdmi(respuesta);
        }
    });
}

function pintarRespuestaAdmi(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].correo+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionAdmi("+respuesta[i].idAdministrator+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarAdmi("+respuesta[i].idAdministrator+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado6").html(myTable);
}

function guardarInformacionAdmi(){
    let var7 = {
        name:$("#nameAdmi").val(),
        correo:$("#correoAdmi").val(),
        password:$("#passAdmi").val(),
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var7),
        
        url:"http://129.151.105.249:8080/api/Administrator/save",
       
        
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

function actualizarInformacionAdmi(idElemento){
    let myData={
        idAdministrator:idElemento,
        name:$("#nameAdmi").val(),
        correo:$("#correoAdmi").val(),
        password:$("#passAdmi").val(),
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.105.249:8080/api/Administrator/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idAdministrator").val("");
            $("#nameAdmi").val("");
            $("#correoAdmi").val("");
            $("#passAdmi").val("");
            traerInformacionAdmi();
            alert("se ha Actualizado correctamente el administrador")
        }
    });

}

function borrarAdmi(idElemento){
    let myData={
        idAdministrator:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.105.249:8080/api/Administrator/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idAdministrator").val("");
            traerInformacionAdmi();
            alert("Se ha Eliminado.")
        }
    });

}
