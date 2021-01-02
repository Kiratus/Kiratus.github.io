const vm = new Vue({
    el: "#app",
    data: {
        entrada: "",
        parc: [0, 0, 0, 0, 0, 0, 0, 0., 0, 0, 0],
        total: [0, 0, 0, 0, 0, 0, 0, 0., 0, 0, 0],
        hideError: true
    },
    watch: {
        entrada()
        {
            calcula();
            if(this.entrada == "")
            {
                this.parc = [0, 0, 0, 0, 0, 0, 0, 0., 0, 0, 0],
                this.total = [0, 0, 0, 0, 0, 0, 0, 0., 0, 0, 0],
                this.hideError = true
            }
        }
    }
});

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
    if(vm.entrada < 0)
    {
        alert("Não existem produtos com valor negativo. Pare de tentar quebrar meu site!");
        return;
    }

    for(let i = 2; i <= 12; i++)
    {
        let vTotal = (100*vm.entrada)/(100-juros[i-2]);

        vm.parc[i-2] = parseFloat(vTotal/i).toFixed(2);
        vm.total[i-2] = parseFloat(vTotal).toFixed(2);

        if((vTotal)/i < 5)
        {
            vm.parc[i-2] = ' //'
            vm.total[i-2] = ' //';
            vm.hideError = false;
        }
        else vm.hideError = true;
    }
}