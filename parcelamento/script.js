const vm = new Vue({
    el: "#app",
    data: {
        entrada: "",
        parc: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        total: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        classeLinha: ['naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida'],
        hideError: true
    },
    watch: {
        entrada()
        {
            calcula();

            if(this.entrada == "")
            {
                this.parc = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                this.total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                this.hideError = true,
                this.classeLinha = ['naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida']
            }

            else {
                this.classeLinha[0] = 'preenchida';
                this.classeLinha[1] = 'preenchida';
            }
        }
    }
});

let juros = [
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

function calcula()
{
    if(vm.entrada < 0)
    {
        alert("Não existem produtos com valor negativo. Pare de tentar quebrar meu site!");
        return;
    }

    const numberEntrada = parseFloat(vm.entrada);

    vm.total[0] = numberEntrada > 100 ? (numberEntrada + 5).toFixed(2) : numberEntrada.toFixed(2);
    vm.total[1] = numberEntrada > 100 ? (numberEntrada + 10).toFixed(2) : (numberEntrada + 3).toFixed(2);

    for(let i = 2; i <= 12; i++)
    {
        let vTotal = (100*vm.entrada)/(100-juros[i-2]);

        vm.parc[i-2] = parseFloat(vTotal/i).toFixed(2);
        vm.total[i] = parseFloat(vTotal).toFixed(2);

        if((vTotal)/i < 5)
        {
            vm.parc[i-2] = ' //'
            vm.total[i] = ' //';
            vm.hideError = false;
        }
        else vm.hideError = true;

        if(vm.total[i-2] == ' //') vm.classeLinha[i] = 'naoParcela';
        else vm.classeLinha[i] = 'preenchida';
    }
}