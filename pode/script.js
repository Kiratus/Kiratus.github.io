let resp = document.querySelector('h1#pod');
let reas = document.querySelector('h2#reason');
let back = document.querySelector('img#cockbackground');
let lulu = document.querySelector('img#lulu');
let pointer = document.querySelector('img#cockpointer');
let saturday = false;
let holiday = 0; //0 = não é feriado //1 = domingo ou feriado comum //2 = feriado religioso
let isbday = false;
let bdayrun = false;
let data = new Date();

setInterval(
    function update()
    {
        data = new Date();
        updateClock();
    }
, 30000);

function updateClock()
{
    let horas = data.getHours();
    let minutos = data.getMinutes();
    let diaS = data.getDay();
    let dia = data.getDate();
    let mes = data.getMonth();

    if(!bdayrun) bday(dia, mes);
    if(!isbday)
    {
        holiday = isHoliday(diaS, dia, mes);
        saturday = diaS == 6? true : false;
        entaoPode(horas, minutos);
    }
    uptAnalog(minutos, horas);
}

function uptAnalog(M, H)
{
    let minus12 = H <= 11? 0 : 12;
    let grauH = (H-minus12)*30 + M*0.5;

    pointer.style.transform = `rotate(${grauH}deg)`;
}

function entaoPode(horas, minutos)
{
    updateDisk(horas);
    //domingo ou feriado
    if(holiday == 1)
    {
        //pode
        resp.innerHTML = "SIM";
        lulu.src = "images/baseYes.png";
        pointer.src = "images/pointerYes.png";
    }
    else if (holiday == 2)
    {
        //não pode
        resp.innerHTML = "NÃO";
        lulu.src = "images/baseNo.png";
        pointer.src = "images/pointerNo.png";
    }

    else
    {
        //sábado
        if(saturday)
        {
            if((horas == 7 && minutos >= 30) ||
            (horas > 7 && horas < 12))
            {
                // não pode
                resp.innerHTML = "NÃO";
                lulu.src = "images/baseNo.png";
                pointer.src = "images/pointerNo.png";
            }
            else
            {
                //pode
                resp.innerHTML = "SIM";
                lulu.src = "images/baseYes.png";
                pointer.src = "images/pointerYes.png";
            }
        }
        //dia útil
        else
        {
            if((horas == 7 && minutos >= 30) ||
            (horas > 7 && horas < 12))
            {
                // não pode
                resp.innerHTML = "NÃO";
                lulu.src = "images/baseNo.png";
                pointer.src = "images/pointerNo.png";
            }
            else if((horas >= 13 && horas < 17) ||
            (horas == 17 && minutos <= 30))
            {
                //não pode
                resp.innerHTML = "NÃO";
                lulu.src = "images/baseNo.png";
                pointer.src = "images/pointerNo.png";
            }
            else
            {
                //pode
                resp.innerHTML = "SIM";
                lulu.src = "images/baseYes.png";
                pointer.src = "images/pointerYes.png";
            }
        }
    }
}

function updateDisk(h)
{
    if (holiday == 1) back.src = "images/bgHd.png";
    else if (holiday == 2) back.src = "images/bgRd.png";
    else if (saturday)
    {
        if (h<12) back.src = "images/bgAm.png";
        else back.src = "images/bgHd.png";
    }
    else
    {
        if (h<12) back.src = "images/bgAm.png";
        else back.src = "images/bgPm.png";
    }
}

function bday(dia, mes)
{
    bdayrun = true;
    if (dia == 18 && mes == 0) isbday = confirm("Você é Iveson Amaro?");
    else if (dia == 2 && mes == 2) isbday = confirm("Você é Chico Ruan?");
    else if (dia == 16 && mes == 3) isbday = confirm("Você é Geucy Passos?");
    else if (dia == 17 && mes == 3) isbday = confirm("Você é João Pedro?");
    else if (dia == 9 && mes == 4) isbday = confirm("Você é Hermano Campos?");
    else if (dia == 21 && mes == 4) isbday = confirm("Você é Gabriel Souza?");
    else if (dia == 3 && mes == 5) isbday = confirm("Você é Matheus Lima?");
    else if (dia == 12 && mes == 6) isbday = confirm("Você é Marcelo Coalhada?");
    else if (dia == 10 && mes == 7) isbday = confirm("Você é Daniel Victor?");
    else if (dia == 21 && mes == 9) isbday = confirm("Você é Jeferson Matias?");
    else if (dia == 3 && mes == 11) isbday = confirm("Você é Emanoel Rodrigues?");

    if(isbday)
    {
        resp.innerHTML = "SIM";
        lulu.src = "images/baseYes.png";
        pointer.src = "images/pointerYes.png";
        back.src = "images/bgHd.png";
        reas.innerHTML = "aniversário";
    }
}

function isHoliday(diaS, dia, mes)
{
    //feriado comum
    if (
        dia == 1 && mes == 0 ||     //confraternização universal
        dia == 25 && mes == 2 ||    //Carta Magna
        dia == 13 && mes == 3 ||    //aniversário de Fortaleza
        dia == 21 && mes == 3 ||    //Tiradentes
        dia == 1 && mes == 4 ||     //Dia do trabalho
        dia == 7 && mes == 8 ||     //Independência do Brasil
        dia == 15 && mes == 10      //Proclamação da República 
    )
    {
        reas.innerHTML = "feriado";
        return 1;
    }
    else if (
        dia == 19 && mes == 2 ||    //São José
        dia == 8 && mes == 5 ||     //Corpos Christi
        dia == 15 && mes == 7 ||    //Nsa Sra Assunção
        dia == 12 && mes == 9 ||    //Nsa Sra Aparecida
        dia == 25 && mes == 11      //Natal
    )
    {
        reas.innerHTML = "feriado religioso";
        return 2;
    }
    else if (dia == 2 && mes == 10) //finados
    {
        reas.innerHTML = "finados";
        return 2;
    }

    //domingo
    if(diaS == 0)
    {
        //dia das mães
        if(mes == 4)
            if(dia > 7 && dia < 15)
            {
                reas.innerHTML = "dia das mães";
                return 2;
            }

        return 1;
    }
    
    else return 0; 
}