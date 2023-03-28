import { PauseRec, ResumeRec, StartRec, StopRec } from "./gravador.js";

const $start = document.querySelector("#start");
const $pause = document.querySelector("#pause");
const $stop = document.querySelector("#stop");

const $status = document.querySelector('#status');

let gravando = false; //controle para informar se está ou não gravando o sistema
let pause = false; //controle para informar se a gravação está pausada ou não

$start.addEventListener('click', function () {
    if (gravando) {
        alert("Você já iniciou a gravação, clique em STOP ou reinicie a pagina, caso a falha persista limpe o cache do seu navegador.")
        return;
    } else {
        StartRec();
        gravando = true;
    }

    atualizaStatus();
});

$stop.addEventListener('click', function () {
    if (!gravando) {
        alert("Você não iniciou a gravação, clique em STRAT para reiniciar a gravação caso ele não inicie reinicie a pagina, caso a falha persista limpe o cache do seu navegador.")
        return;
    } else {
        StopRec();
        gravando = false;
    }

    atualizaStatus();
});

$pause.addEventListener('click', function () {
    if (pause) {
        console.log('Resume');
        ResumeRec();
        pause = false;

    } else {
        PauseRec();
        console.log('Pause');
        pause = true;
    }

    atualizaStatus();
})

function atualizaStatus(){

    let stt = " ";
    if(gravando){
        stt = "Gravando";

        if(pause){
            stt = "Gravação Pausada"
        }
    }

    $status.innerHTML = stt;
}