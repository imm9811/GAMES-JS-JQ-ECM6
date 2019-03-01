//variables globales
var contenido=[];
var gatos = [];
var contadorFallos = 0;
var contadorAciertos = 0;


//cargamos el ajax

$(document).ready(function () {
    $(".table").after('<button class="btn btn-info" onclick="reiniciar()">Reiniciar</button>')
    $.ajax({
        url: "gatos.json",
        datatype: "JSON",
        cache: false,
        beforeSend: function () { console.log("loading file..."); },
        complete: function () { console.log("file loded") },
        error:()=>console.log("archivos no cargados"),
        success: function (data, statusText) {
            contenido = data;
            colocarFotos();
        }
    });
    $("#aciertos").text(contadorAciertos);
    $("#fallos").text(contadorFallos);
    
});//fin function ready

function colocarFotos() {

    var texto = "";
    var arrayFotos = [];
    var apoyo = [];

    //meto los variables en otro array auxliar para no tratar con el original
    for (var index = 0; index < contenido.length; index++) {
        for (var index2 = 0; index2 < 2; index2++) {
            apoyo.push(contenido[index]);
        }
    }
    //desordeno los valores dentro del array
    arrayFotos = apoyo.sort(function () { return Math.random() - 0.5 });

    for (var index = 0; index < 12; index++) {
        texto += `<input type="checkbox" id=${index} onclick="pasarDatos('${arrayFotos[index].nombre}',${index})" class="${arrayFotos[index].nombre}"><u><img src="${arrayFotos[index].archivo}"></u><b></b>`;
    }
    //pongo todas las fotos en el html
    $('#deck').append(texto);
  
      

} //fin colocarFotos

//metodo que tiene todos los checkboxs en el cual se le pasa el valor de cada uno
 

function pasarDatos(nombreGatos,id) {
    $(`#${id}`).prop('disabled', true);
    
    gatos.push(nombreGatos);
    //en el momento en el que meto dos gatos, deshablito todos los check para que no se metan mas nombre y compruebo
    if (gatos.length == 2) {
        $("input[type=checkbox]").prop('disabled', true);
        setTimeout(() => { ocultarGato(gatos[0], gatos[1]); }, 1000);
    }
   
}//fin pasarDatos

function ocultarGato(gato1, gato2) {
//si son DISTINTOS acumula fallo, y vuelve a darse la vuelta
    if (gato1 != gato2) {
        contadorFallos++;
        $("#fallos").text(contadorFallos);
        $(`.${gato1}`).prop("checked", false);

        $(`.${gato2}`).prop("checked", false);
      
    }
    //si son iguales SIGUEN deshabilitado y se bloquea para no poder seguir usandolo

    $("input[type=checkbox]").each(function (index) {
        if (this.checked == false) {
        
            this.disabled = false;
        }
       
    });
    if (gato1 == gato2) {
        contadorAciertos++;
       
        $("#aciertos").text(contadorAciertos);
        
        if(contadorAciertos==6){
        
            clearInterval(running_time);
            $("#resultado").text("¡Terminaste!").css("background-color", "yellow");
        }
    }
    gatos = [];
}

function reiniciar() {
     gatos = [];
     contadorFallos = 0;
     contadorAciertos = 0;
    $("input[type=checkbox]").each(function () {
        this.checked=false;
        this.disabled = false;
    });
    reiniciarTiempo();
    $("#deck").empty();
    colocarFotos();
    $("#aciertos").text(contadorAciertos);
    $("#fallos").text(contadorFallos);
    $("#resultado").text("").css("background-color", "none");
}


//https://codepen.io/natewiley/pen/HBrbL