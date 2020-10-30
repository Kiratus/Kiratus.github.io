let campoParcela = [];
let campoTotal = [];
let juros = [
    8.45,   //2x
    9.77,   //3x
    11.06,  //4x
    12.32,  //5x
    13.56,  //6x
    14.77,  //7x
    15.97,  //8x
    17.14,  //9x
    18.28,  //10x
    19.41,  //11x
    20.50   //12x
];

function calcula()
{
    let valor = document.querySelector("input#valor").value;

    if(isNaN(valor))
    {
        alert("Digite apenas números!");
        return;
    }

    for (let i = 2; i <= 12; i++)
    {
        campoParcela[i] = document.querySelector(`td#p${i}`);
        campoTotal[i] = document.querySelector(`td#t${i}`);
    }

    for(let i = 2; i <= 12; i++)
    {
        let vTotal = (100*valor)/(100-juros[i-2]);
        campoTotal[i].innerHTML = "R$" + parseFloat(vTotal).toFixed(2);
        campoParcela[i].innerHTML = `${i}x R$${parseFloat(vTotal/i).toFixed(2)}`

        if((vTotal)/i < 5)
        {
            campoTotal[i].innerHTML = "N/D";
            campoParcela[i].innerHTML = "N/D";
            document.getElementById("foot").innerHTML = "A parcela deve ser no mínimo R$5,00<br>&copy; - Ista Imports 2020"
        }
    }
}