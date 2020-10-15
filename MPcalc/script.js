function calctaxas()
{
    let inputValor = document.querySelector("input#valor").value;
    let taxa = 0;
    let fixo = 0;

    if(document.querySelector("input#hora").checked) fixo = 5.31;
    else if(document.querySelector("input#dia14").checked) fixo = 4.36;
    else fixo = 3.6;

    for(let i = 0; i <= 12; i++)
    {
        switch(i)
        {
            case 0: taxa = 0;
            break;
            case 1: taxa = 0;
            break;
            case 2: taxa = 4.09;
            break;
            case 3: taxa = 5.41;
            break;
            case 4: taxa = 6.7;
            break;
            case 5: taxa = 7.96;
            break;
            case 6: taxa = 9.2;
            break;
            case 7: taxa = 10.41;
            break;
            case 8: taxa = 11.61;
            break;
            case 9: taxa = 12.78;
            break;
            case 10: taxa = 13.92;
            break;
            case 11: taxa = 15.05;
            break;
            case 12: taxa = 16.15;
            break;
        }

        if(i == 0) preenche(i, inputValor, 1.99, 0);
        else preenche (i, inputValor, fixo, taxa);
    }
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