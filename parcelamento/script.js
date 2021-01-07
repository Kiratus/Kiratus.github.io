new Vue({
    el: "#app",
    data: {
        entrada: "",
        parc: [],
        total: [],
        classeLinha: [],
        classeValor: '',
        juros: [9, 10, 11.3, 12.5, 14, 15, 16, 17.5, 19, 20, 21] //2 a 12 vezes
    },
    watch: {
        entrada(novo)
        {
            //primeiro input
            if(novo.length == 1) this.entrada = 'R$' + this.entrada;

            //testa se o segundo caractere ainda é o $ ou se o input tem apenas 2 dígitos ("R$")
            else if (novo[1] != '$' || novo.length == 2) this.entrada = "";

            this.calcula(novo.replace('R$', '')); //chama função calculo passando o input sem os caracteres "R$"

            if(this.entrada == "") this.resetaDados();

            else {
                this.classeLinha[0] = 'preenchida';
                this.classeLinha[1] = 'preenchida';
                this.classeValor = 'valorPreenchido';
            }
        }
    },
    methods: {
        calcula(value) {
            const numberEntrada = parseFloat(value);

            if(isNaN(numberEntrada) || numberEntrada <= 0) {
                this.entrada = '';
                return;
            }

            this.total[0] = numberEntrada > 100 ? (numberEntrada + 5).toFixed(2) : numberEntrada.toFixed(2);
            this.total[1] = numberEntrada > 100 ? (numberEntrada + 10).toFixed(2) : (numberEntrada + 3).toFixed(2);

            for(let i = 2; i <= 12; i++)
            {
                let vTotal = (100*numberEntrada)/(100-this.juros[i-2]);

                this.parc[i-2] = parseFloat(vTotal/i).toFixed(2);
                this.total[i] = parseFloat(vTotal).toFixed(2);

                if((vTotal)/i < 5)
                {
                    this.parc[i-2] = ' //';
                    this.total[i] = ' //';
                }

                if(this.total[i] == ' //') this.classeLinha[i] = 'naoParcela';
                else this.classeLinha[i] = 'preenchida';
            }
        },

        resetaDados() {
            this.parc = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.classeLinha = ['naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida', 'naoPreenchida'];
            this.classeValor = 'valorNaoPreenchido';
        }
    },
    beforeMount(){
        this.resetaDados();
    }
});