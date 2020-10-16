function calctaxas()
{
    let inputValor = document.querySelector("input#valor").value;
    let fixo = 0;
    let juros = [4.09, 5.41, 6.70, 7.96, 9.20, 10.41, 11.61, 12.78, 13.92, 15.05, 16.14];

    preenche(0, inputValor, 1.99, 0);

    if(document.querySelector("input#hora").checked)
    {
        fixo = 5.31;
        preenche(1, inputValor, 4.74, 0);
    }
    else if(document.querySelector("input#dia14").checked)
    {
        fixo = 4.36;
        preenche(1, inputValor, 3.79, 0);
    }
    else
    {
        fixo = 3.60;
        preenche(1, inputValor, 3.03, 0);
    }

    for(let i = 2; i <= 12; i++) preenche(i, inputValor, fixo, juros[i-2]);
}


function preenche(i, inputValor, fixo, taxa)
{
    let calcTaxa = fixo + taxa;
    let valorFinal = (inputValor*100)/(100-calcTaxa);
    let taxaFinal = valorFinal - inputValor;
    let textoValorFinal = document.querySelector(`td#tx${i}f`);
    let textoTaxaFinal = document.querySelector(`td#tx${i}`);
    
    textoValorFinal.innerHTML = `R$${parseFloat(valorFinal.toFixed(2))}`;
    textoTaxaFinal.innerHTML = `R$${parseFloat(taxaFinal.toFixed(2))}`;
}