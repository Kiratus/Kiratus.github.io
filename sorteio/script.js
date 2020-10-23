let nomes = ["Allan", "Wesley", "César Junior", "Bianca", "Bruna", "Daniel",
"Diego", "Emanoel", "Emanueli", "Ezequiel", "Maiara", "Samara", "Jailson",
"Henrique", "Gabriel", "Renê", "Pedro", "Raquel", "Rúben", "Thiago",
"Vitória", "Virginia", "Alex", "Ítalo"];

function sorteia()
{
    let sorteados = [];
    let quantSorteado = 0;
    let campo = [];
    let msg = document.querySelector("div#sorteando");
    msg.innerHTML = "SORTEANDO...";
    
    for(let i = 0; i < 24; i++) campo[i] = document.querySelector(`td#c${i}`);
    for(let i = 0; i < 24; i++) campo[i].innerHTML = "";

    let repeat = setInterval(function()
    {
        let sorteado = Math.floor(Math.random() * 24);

        for(let i = 0; i < sorteados.length; i++)
        {
            if(sorteado == sorteados[i])
            {
                console.log("REPETIDO: ", sorteado, " ", sorteados[i]);
                return;
            }
        }

        sorteados.push(sorteado);
        campo[quantSorteado].innerHTML = nomes[sorteado];

        quantSorteado++;

        if(sorteados.length >= 24){
            clearInterval(repeat);
            msg.innerHTML = "";
        }
    }, 50);
}