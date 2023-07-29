let resp = document.querySelector('h1#pod')
let back = document.querySelector('img#cockbackground')
let lulu = document.querySelector('img#lulu')
let pointer = document.querySelector('img#cockpointer')
let saturday = false
let holyday = false
let data = new Date()

setInterval(
    function update()
    {
        data = new Date()
        updateClock()
    }
, 30000)

function updateClock()
{
    let horas = data.getHours()
    let minutos = data.getMinutes()
    let diaS = data.getDay()
    let dia = data.getDate()
    let mes = data.getMonth()

    holyday = isHolyday(diaS, dia, mes)
    saturday = diaS == 6? true : false
    entaoPode(horas, minutos)
    uptAnalog(minutos, horas)
}

function uptAnalog(M, H){
    let minus12 = H <= 11? 0 : 12
    let grauH = (H-minus12)*30 + M*0.5

    pointer.style.transform = `rotate(${grauH}deg)`
}

function entaoPode(horas, minutos)
{
    updateDisk(horas)
    //domingo ou feriado
    if(holyday)
    {
        //pode
        resp.innerHTML = "SIM";
        lulu.src = "images/baseYes.png";
        pointer.src = "images/pointerYes.png";
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
    if (holyday) back.src = "images/bgHd.png";
    else if (saturday)
    {
        if (h<=12) back.src = "images/bgAm.png";
        else back.src = "images/bgHd.png";
    }
    else
    {
        if (h<=12) back.src = "images/bgAm.png";
        else back.src = "images/bgPm.png";
    }
}

function isHolyday(diaS, dia, mes)
{
    if(diaS == 0) return true;

    else if(dia == 1 && mes == 0)   return true;
    else if(dia == 19 && mes == 2)  return true;
    else if(dia == 25 && mes == 2)  return true;
    else if(dia == 7 && mes == 3)   return true;
    else if(dia == 13 && mes == 3)  return true;
    else if(dia == 21 && mes == 3)  return true;
    else if(dia == 1 && mes == 4)   return true;
    else if(dia == 8 && mes == 5)   return true;
    else if(dia == 15 && mes == 7)  return true;
    else if(dia == 7 && mes == 8)   return true;
    else if(dia == 12 && mes == 9)  return true;
    else if(dia == 2 && mes == 10)  return true;
    else if(dia == 15 && mes == 10) return true;        
    else if(dia == 25 && mes == 11) return true;
    
    else return false; 
}