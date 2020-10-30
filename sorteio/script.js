let nomes = [ //lista de alunos
"Allan",
"Wesley",
"César Junior",
"Bianca",
"Bruna",
"Daniel",
"Diego",
"Emanoel",
"Emanueli",
"Ezequiel",
"Maiara",
"Samara",
"Jailson",
"Henrique",
"Gabriel",
"Renê",
"Pedro",
"Raquel",
"Rúben",
"Thiago",
"Vitória",
"Virginia",
"Alex",
"Ítalo"
];

const quantAlunos = 24; //quantidade de alunos a serem sorteados.

function sorteia() //função chamada quando o botão clicar é chamado.
{
    let sorteados = []; //salva os números já sorteados
    let campo = [];
    
    document.querySelector("div#sorteando").innerHTML = "SORTEANDO..."
    
    for(let i = 0; i < quantAlunos; i++)
        campo[i] = document.querySelector(`td#c${i}`); //salva células em variáveis.

    for(let i = 0; i < 24; i++)
        campo[i].innerHTML = ""; //reseta células caso o botão de sortear seja clicado novamente.

    while (sorteados.length < quantAlunos)
    {
        let sorteado = Math.floor(Math.random() * quantAlunos-1);
        let jaFoi = false;
        
        for(let i = 0; i < quantAlunos; i++)
            if(sorteado == sorteados[i]) jaFoi = true;

        if(jaFoi) continue; //caso sorteie número repetido, o loop reinicia.

        sorteados.push(sorteado); //caso passe a verificação anterior, salva o número sorteado.
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