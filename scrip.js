let fulldata = document.querySelector('h1#data')
setInterval(
    function update(){
        fulldata.innerHTML = ''
        let data = new Date()
        let dia = data.getDate()
        let sem = data.getDay()
        let mes = data.getMonth()
        let ano = data.getFullYear()

        let hora = data.getHours()
        let minu = data.getMinutes()
        let segu = data.getSeconds()

        uptSau(Number(hora))

        uptDia(Number(dia))
        uptSem(Number(sem))
        uptMes(Number(mes))
        uptAno(Number(ano))

        uptHora(Number(hora))
        uptMinu(Number(minu))
        uptSegu(Number(segu))

    }, 20)

function uptSau(h) {
    let saudacao = document.querySelector('h1#saud')
    if(h >= 5 && h < 12){
        saudacao.innerHTML = 'Bom dia!'
        document.body.style.background = '#93a2b9'
    } else if(h >= 12 && h < 19){
        saudacao.innerHTML = 'Boa tarde!'
        document.body.style.background = '#f3b256'
    } else {
        saudacao.innerHTML = 'Boa noite!'
        document.body.style.background = '#083c7c'
    } 
}

function uptDia(d){
    let d1 = 0
    let d2 = 0
    if(d < 10) d1 = 0
    else if(d < 20) d1 = 1
    else if(d < 30) d1 = 2
    else if(d < 40) d1 = 3

    for(let i=0; i <= 3; i++){
        if(d1 == i) fulldata.innerHTML += `${i}`
    }

    d2 = (d - (d1*10))
    for(let i=0; i <= 9; i++){
        if(d2 == i) fulldata.innerHTML += `${i}/`
    }
}

function uptSem(s){
    let semana = document.querySelector('p#semana')
    switch(s){
        case 0:
        semana.innerHTML = 'DOMINGO'
        break;
        case 1:
        semana.innerHTML = 'SEGUNDA'
        break;
        case 2:
        semana.innerHTML = 'TERÇA'
        break;
        case 3:
        semana.innerHTML = 'QUARTA'
        break;
        case 4:
        semana.innerHTML = 'QUINTA'
        break;
        case 5:
        semana.innerHTML = 'SEXTA'
        break;
        case 6:
        semana.innerHTML = 'SÁBADO'
        break;
        default: semana.innerHTML = 'ERRO'
        break
    }
}

function uptMes(m){
    let m1 = 0
    let m2 = 0
    if(m < 9) m1 = 0
    else if(m < 20) m1 = 1

    if(m1 == 0) fulldata.innerHTML += '0'
    if(m1 == 1) fulldata.innerHTML += '1'

    m2 = (m - (m1 * 10) + 1)
    for(let i=0; i <= 9; i++){
        if(m2 == i) fulldata.innerHTML += `${i}/`
    }
}

function uptAno(a){
    fulldata.innerHTML += `${a}`
}

function uptHora(h){
    let h1 = 0
    let h2 = 0
    let h1img = document.querySelector('img#hora1')
    let h2img = document.querySelector('img#hora2')

    if(h < 10) h1 = 0
    else if(h < 20) h1 = 1
    else h1 = 2

    if(h1 == 0) h1img.src = 'number/0.png'
    else if(h1 == 1) h1img.src = 'number/1.png'
    else h1img.src = 'number/2.png'

    h2 = (h - (h1*10))
    for(let i=0; i < 10; i++){
        if(h2 == i) h2img.src = `number/${i}.png`
    }
}

function uptMinu(m){
    let m1 = 0
    let m2 = 0
    let m1img = document.querySelector('img#minu1')
    let m2img = document.querySelector('img#minu2')

    if(m < 10) m1 = 0
    else if(m < 20) m1 = 1
    else if(m < 30) m1 = 2
    else if(m < 40) m1 = 3
    else if(m < 50) m1 = 4
    else if(m < 60) m1 = 5

    for(let i=0; i < 6; i++){
        if(m1 == i) m1img.src = `number/${i}.png`
    }

    m2 = (m - (m1*10))
    for(let i=0; i < 10; i++){
        if(m2 == i) m2img.src = `number/${i}.png`
    }
}

function uptSegu(s){
    let s1 = 0
    let s2 = 0
    let s1img = document.querySelector('img#sec1')
    let s2img = document.querySelector('img#sec2')

    if(s < 10) s1 = 0
    else if(s < 20) s1 = 1
    else if(s < 30) s1 = 2
    else if(s < 40) s1 = 3
    else if(s < 50) s1 = 4
    else if(s < 60) s1 = 5

    for(let i=0; i < 6; i++){
        if(s1 == i) s1img.src = `number/mini/${i}.png`
    }

    s2 = (s - (s1*10))
    for(let i=0; i < 10; i++){
        if(s2 == i) s2img.src = `number/mini/${i}.png`
    }
}