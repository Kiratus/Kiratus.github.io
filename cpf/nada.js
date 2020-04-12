function gerar(){
    document.querySelector("p#verify").innerHTML = ''
    let campo = document.querySelector("input#CPF")
    let CPF = []

    //gera os 9 primeiros digitos aleatoriamente
    for(let i = 0; i<9; i++){
        CPF.push(Math.floor(Math.random() * 10))
    }

    //calcula o primeiro dígito verificador
    let posicao = 0
    let digito1 = 0

    for(let i = 10; i>=2; i--){
        digito1 = digito1 + (CPF[posicao] * i)
        posicao++
    }

    digito1 = digito1 % 11
    digito1 = digito1 < 2? 0 : 11 - digito1
    CPF.push(digito1)

    //calcula o segundo digito verificador
    posicao = 0
    let digito2 = 0

    for(let i = 11; i >= 2; i--){
        digito2 = digito2 + (CPF[posicao] * i)
        posicao++
    }

    digito2 = digito2 % 11
    digito2 = digito2 < 2? 0 : 11 - digito2
    CPF.push(digito2)

    //passa todos os números para uma única variável
    let fullCPF = ''
    for(let i = 0; i < CPF.length; i++){
        fullCPF += CPF[i].toFixed()
        if(i == 2 || i == 5) fullCPF += '.'
        if(i == 8) fullCPF += '-'
    }
    
    //escreve no campo
    campo.value = fullCPF
}

function verificar(){
    let campo = document.querySelector("input#CPF")
    let mensagem = document.querySelector("p#verify")
    let CPF = ''
    let digito1 = 0
    let digito2 = 0
    CPF = campo.value
    let arrayCPF = CPF.split("")

    //erros
    if(campo.value.length != 11 && campo.value.length != 14) return alert('Por favor, verifique o CPF digitado.')
    if(campo.value.length == 14){
        if(arrayCPF[3] != '.' || arrayCPF[7] != '.' || arrayCPF[11] != '-') return alert('Por favor, verifique o CPF digitado')
        else{
            arrayCPF[3] = arrayCPF[4]
            arrayCPF[4] = arrayCPF[5]
            arrayCPF[5] = arrayCPF[6]
            arrayCPF[6] = arrayCPF[8]
            arrayCPF[7] = arrayCPF[9]
            arrayCPF[8] = arrayCPF[10]
            arrayCPF[9] = arrayCPF[12]
            arrayCPF[10] = arrayCPF[13]
        }
    }

    //deixa o CPF do usuário bonitinho
    campo.value = ''
    for(let i = 0; i < 11; i++){
        campo.value += arrayCPF[i]
        if(i == 2 || i == 5) campo.value += '.'
        if(i == 8) campo.value += '-'
    }

    //verifica digito 1
    let posicao = 0
    for(let i = 10; i>=2; i--){
        digito1 = digito1 + (arrayCPF[posicao] * i)
        posicao++
    }

    digito1 = digito1 % 11
    digito1 = digito1 < 2? 0 : 11 - digito1

    //verifica digito 2
    posicao = 0

    for(let i = 11; i >= 2; i--){
        digito2 = digito2 + (arrayCPF[posicao] * i)
        posicao++
    }

    digito2 = digito2 % 11
    digito2 = digito2 < 2? 0 : 11 - digito2

    //compara o calculado com o digitado
    if(digito1 != arrayCPF[9] || digito2 != arrayCPF[10]){
        mensagem.innerHTML = 'CPF INVÁLIDO!'
        mensagem.style.color = 'red'
    } else {
        mensagem.innerHTML = 'CPF VÁLIDO!'
        mensagem.style.color = 'green'
    }
}