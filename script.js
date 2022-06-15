document.body.addEventListener('keyup', (event) => {
    playSound(event.code.toLowerCase());
});

document.querySelector('.composer button').addEventListener('click', () => {
    let song = document.querySelector('#input').value; //seleciona o campo id input onde escrevemos a composição

    if (song !== '') { //se song diferente de vazio
        let songArray = song.split(''); //gera um array com cada letra da string
        playComposition(songArray);
    }
})

function playSound(sound) {
    let audioElement = document.querySelector(`#s_${sound}`);
    let keyElement = document.querySelector(`div[data-key="${sound}"]`);

    if (audioElement) {
        audioElement.currentTime = 0; // faz com que o audio reinicie, eliminando o tempo de espera do audio terminar de tocar quando a tecla é carregada
        audioElement.play();
    }

    if (keyElement) {
        keyElement.classList.add('active'); //adiciona a classe css .active para estilizar o botão, quando carregado.

        setTimeout(() => {
            keyElement.classList.remove('active');  //remove a classe .active passado o tempo.
        }, 300);
    }
}

function playComposition(songArray) {  //para tocar a composição corretamente é preciso configurar um timeout, caso contrário o javascript executará tudo ao mesmo tempo.
    let wait = 0;

    for (let songItem of songArray) {
        setTimeout(() => {
            playSound(`key${songItem}`);
        }, wait);
        wait += 250;
    }
}