let nomes = ["Allan", "Wesley", "César Junior", "Bianca", "Bruna", "Daniel",
"Diego", "Emanoel", "Emanueli", "Ezequiel", "Maiara", "Samara", "Jailson",
"Henrique", "Gabriel", "Renê", "Pedro", "Raquel", "Rúben", "Thiago",
"Vitória", "Virginia", "Alex", "Ítalo"];

function sorteia()
{
    let sorteados = [];
    let campo = [];
    let msg = document.querySelector("div#sorteando");
    msg.innerHTML = "SORTEANDO...";
    
    for(let i = 0; i < 24; i++) campo[i] = document.querySelector(`td#c${i}`);
    for(let i = 0; i < 24; i++) campo[i].innerHTML = "";

    while (sorteados.length < 24)
    {
        let sorteado = Math.floor(Math.random() * 24);
        let jaFoi = false;
        
        for(let i = 0; i < 24; i++)
            if(sorteado == sorteados[i]) jaFoi = true;

        if(jaFoi) continue;

        sorteados.push(sorteado);
    }

    let preenchidos = 0;

    let preenche = setInterval(function()
    {
        campo[preenchidos].innerHTML = nomes[sorteados[preenchidos]];

        preenchidos++

        if(preenchidos >= 24){
            clearInterval(preenche);
            msg.innerHTML = "";
        }
    }, 1000);
}