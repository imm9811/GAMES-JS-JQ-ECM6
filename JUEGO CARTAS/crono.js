var tiempo = {
    hora: 0,
    minuto: 0,
    segundo: 0
};
var running_time = null;
var bandera = false;
$(document).ready(function () {
    $("#deck").click(function () {
        if (bandera == true) {
            //si entra que no haga nada para que no pete el crono
        }
        else {
            bandera = true;
            running_time = setInterval(function () {

                // Segundos
                tiempo.segundo++;
                if (tiempo.segundo >= 60) {
                    tiempo.segundo = 0;
                    tiempo.minuto++;
                }

                // Minutos
                if (tiempo.minuto >= 60) {
                    tiempo.minuto = 0;
                    tiempo.hora++;
                }

                $("#hour").html(tiempo.hora < 10 ? '0' + tiempo.hora : tiempo.hora);
                $("#minute").text(tiempo.minuto < 10 ? '0' + tiempo.minuto : tiempo.minuto);
                $("#second").text(tiempo.segundo < 10 ? '0' + tiempo.segundo : tiempo.segundo);
            }, 1000);

        }

    });
});
function reiniciarTiempo() {
    clearInterval(running_time);
    tiempo.hora = 0;
    tiempo.minuto = 0;
    tiempo.segundo = 0;
    $("#hour").text(tiempo.hora < 10 ? '0' + tiempo.hora : tiempo.hora + " : ");
    $("#minute").text(tiempo.minuto < 10 ? '0' + tiempo.minuto : tiempo.minuto + " : ");
    $("#second").text(tiempo.segundo < 10 ? '0' + tiempo.segundo : tiempo.segundo);
    bandera = false;
}