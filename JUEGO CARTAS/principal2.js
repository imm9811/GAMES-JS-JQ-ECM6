//variables globales
let contenido=[];
let gatos = [];
let contadorFallos = 0;
let contadorAciertos = 0;
let contadorClick = 0;
let bandera=false;
//cargamos el ajax

$(document).ready(function () {
    $(".table").after('<button class="btn btn-info" onclick="reiniciar()">Reiniciar</button>')
    $.ajax({
        url: "gatos.json",
        datatype: "JSON",
        cache: false,
        beforeSend: function () { console.log("loading file..."); },
        complete: function () { console.log("file loded") },
        success: function (data, statusText) {
            contenido = data;
            colocarFotos();
        }
    });

});//fin function ready

function colocarFotos() {

    let texto = "";
    let arrayFotos = [];
    let apoyo = [];

    //meto los variables en otro array auxliar para no tratar con el original
    for (let index = 0; index < contenido.length; index++) {
        for (let index2 = 0; index2 < 2; index2++) {
            apoyo.push(contenido[index]);
        }
    }
    //desordeno los valores dentro del array
    arrayFotos = apoyo.sort(function () { return Math.random() - 0.5 });

    for (let index = 0; index < 12; index++) {
        texto += `<input type="checkbox" onclick="pasarDatos('${arrayFotos[index].nombre}')" class="${arrayFotos[index].nombre}"><u><img src="${arrayFotos[index].archivo}"></u><b></b>`;
    }
    //pongo todas las fotos en el html
    $('#deck').append(texto);
  
      

} //fin colocarFotos

//metodo que tiene todos los checkboxs en el cual se le pasa el valor de cada uno
function pasarDatos(nombreGatos) {

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
        console.log("fallos"+contadorFallos);
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
        if(contadorAciertos==6){
        }
    }
    gatos = [];
}

function reiniciar() {
    let gatos = [];
    let contadorFallos = 0;
    let contadorAciertos = 0;
    let contadorClick = 0;
    $("input[type=checkbox]").each(function () {
        this.checked=false;
        this.disabled = false;
    });
    reiniciarTiempo();
    $("#deck").empty();
    colocarFotos();
}


//https://codepen.io/natewiley/pen/HBrbL