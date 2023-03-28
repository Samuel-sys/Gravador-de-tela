//responsaveis por armazinar as informações de video e audio gravado
let mediaRecorder;
let dado = [];

export async function StartRec() {
    try {
        //Pedimos autorização para iniciar a gravação do audio do mic e da tela do user
        const streamUser = await navigator.mediaDevices.getUserMedia({ audio: true });
        const streamDisplay = await navigator.mediaDevices.getDisplayMedia({ video: true });

        //Estamos filtrando para poder pegar somente o audio desse stream
        const audioTrack = streamUser.getAudioTracks()[0];
        //Estamos filtrando para poder pegar somente o video desse stream
        const videoTrack = streamDisplay.getVideoTracks()[0];

        // Combinamos as 2 stream para que juntos possam trazer o resultado esperado da tela do user e do mic do PC
        const stream = new MediaStream([audioTrack, videoTrack]);

        //iniciamos o objeto de gravação de capitura das informações de video e audio do user
        mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm; codecs=vp9" });

        //informamos oque o sistema deve fazer com os dados apois a gravação ter sido terminada
        mediaRecorder.ondataavailable = (e) => dado.push(e.data);

        //definindo oque o codigo deve fazer quando darmos a orientação para ele parar a gravação
        mediaRecorder.onstop = function () {

            //Geramos um elemento Blob para salvar os dados entreges pelo MediaRecorder e Stream
            const blob = new Blob(dado, { type: "video/webm" });

            //Criamos um elemento HTML para ter o video criado lincado a ele
            const a = window.document.createElement('a');

            a.href = URL.createObjectURL(blob); //transformamos o video em um link para atrelar a tag 'a'
            a.download = "Video.webm"; // nome do arquivo quando ele baixar
            a.click(); //efetuamos um clique no elementro que acabamos de criara para baixar automaticamente
        };

        //Iniciamos a gravação da tela
        mediaRecorder.start();
    } catch (e) {
        alert("Ocorreu algum erro ao iniciar a gravação, reinicie a pagina caso a falha persista limpe o cache do seu navegador", e)
    }
}

export function StopRec() {
    mediaRecorder.stop();
}

export function PauseRec(){
    mediaRecorder.pause();
}

export function ResumeRec(){
    mediaRecorder.resume();
}