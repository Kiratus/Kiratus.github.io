const vm = new Vue({
    el: "#app",
    data: {
        entrada: "",
        parc: [],
        total: [],
        classeLinha: [],
        hideError: true
    },
    watch: {
        entrada(novo, velho)
        {
            if(velho.length == 0 && novo.length >= 1) this.entrada = 'R$' + this.entrada;
            else if (this.entrada[0] != 'R' || this.entrada[1] != '$') this.entrada = "";
            else if (novo.length == 2) this.entrada = "";

            calcula(novo.replace('R$', ''));

            if(this.entrada == "") resetaDados();

            else {
                this.classeLinha[0] = 'preenchida';
                this.classeLinha[1] = 'preenchida';
            }
        }
    }
});

let juros =
[
    9,      //2x
    10,     //3x
    11.3,   //4x
    12.5,   //5x
    14,     //6x
    15,     //7x
    16,     //8x
    17.5,   //9x
    18.9,   //10x
    20,     //11x
    21      //12x
];

function calcula(value)
{
    if(value.length == 0) return;

    const numberEntrada = parseFloat(value);
    if(numberEntrada == 0) return;

    if(numberEntrada < 0)
    {
        alert("Não existem produtos com valor negativo. Pare de tentar quebrar meu site!");
        return;
    }

    if(isNaN(numberEntrada))
    {
        alert("Utilize apenas números!");
        return;
    }

    vm.total[0] = numberEntrada > 100 ? (numberEntrada + 5).toFixed(2) : numberEntrada.toFixed(2);
    vm.total[1] = numberEntrada > 100 ? (numberEntrada + 10).toFixed(2) : (numberEntrada + 3).toFixed(2);

    for(let i = 2; i <= 12; i++)
    {
        let vTotal = (100*numberEntrada)/(100-juros[i-2]);

        vm.parc[i-2] = parseFloat(vTotal/i).toFixed(2);
        vm.total[i] = parseFloat(vTotal).toFixed(2);

        if((vTotal)/i < 5)
        {
            vm.parc[i-2] = ' //';
            vm.total[i] = ' //';
            vm.hideError = false;
        }
        else vm.hideError = true;

        if(vm.total[i] == ' //') vm.classeLinha[i] = 'naoParcela';
        else vm.classeLinha[i] = 'preenchida';
    }
}

function resetaDados()
{
    vm.parc = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    vm.total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    vm.hideError = true;
    vm.classeLinha = ['naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida'];
}