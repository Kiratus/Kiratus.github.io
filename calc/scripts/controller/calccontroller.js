class CalcController {

    constructor(){
        this._lastOperation = '';
        this._lastNumber = '';
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");

        this.initialize();
        this.initButtonsEvents();
        this.initKeyboard();
    }

    initialize(){
        this.setDisplayDateTime();

        setInterval(() => {

            this.setDisplayDateTime();

        }, 10000);

        this.setLastNumberToDisplay();
    }

    initKeyboard(){
        document.addEventListener('keyup', e => {

            switch (e.key){
                case 'Escape':
                    this.clearAll();
                    break;
    
                case 'Backspace':
                    this.clearEntry();
                    break;
    
                case 'Enter':
                case '=':
                    this.calc();
                    break;
    
                case '.':
                case ',':
                    this.addDot();
                    break;
    
                case '+':    
                case '-':    
                case '*':    
                case '/':
                case '%':

                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperation(e.key);
                    break;
            }

        });
    }

    addEventListenerAll(element, events, fn){
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    clearAll(){
        this._operation = [];
        this._lastNumber = '';
        this._lastOperation = '';
        this.setLastNumberToDisplay();
    }

    clearEntry(){
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    getLastOperation(){
        return this._operation[this._operation.length - 1];
    }

    setLastOperation(value){
        this._operation[this._operation.length - 1] = value;
    }

    isOperator(value){

        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
        
    }

    pushOperation(value){

        this._operation.push(value);

        if(this._operation.length > 3){

            this.calc();
        }

    }

    getResult(){
        return eval(this._operation.join(""));
    }

    calc(){
        let last = '';

        this._lastOperation = this.getLastItem(true);

        if(this._operation.length < 3){
            if(!this._lastNumber){
                this.clearAll();
                this.displayCalc = 'ERROR';
                return;
            }

            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperation, this._lastNumber];
        }

        if(this._operation.length > 3){
            last = this._operation.pop();
            this._lastNumber = this.getResult();
        }

        else if(this._operation.length == 3){
            this._lastNumber = this.getLastItem(false);
        }

        let result = this.getResult();

        if(last == '%'){

            result /= 100;
            this._operation = [result];

        } else {

            this._operation = [result];

            if(last) this._operation.push(last);
        }

        this.setLastNumberToDisplay();
    }

    getLastItem(isOperator = true){
        let lastItem;

        for(let i = this._operation.length-1; i >= 0; i--){
            if(this.isOperator(this._operation[i]) == isOperator){
                lastItem = this._operation[i];
                break;
            }
        }

        if(!lastItem) lastItem = (isOperator) ? this._lastOperation : this._lastNumber;

        return lastItem;
    }

    setLastNumberToDisplay(){
        let lastNumber = this.getLastItem(false);
        let lastOp = this.getLastOperation();

        if(!lastNumber) lastNumber = 0;

        if(lastOp && isNaN(lastOp)) this.displayCalc = lastNumber + lastOp;
        else this.displayCalc = lastNumber;
    }

    addOperation(value){

        if(this.getLastOperation() == 0 && value == 0) return;

        if(isNaN(this.getLastOperation())) {

            if(this.isOperator(value)){

                this.setLastOperation(value);

            } else {
                
                this.pushOperation(value);
                //this.setLastNumberToDisplay();
            }

        } else {
            if(this.isOperator(value)){
                this.pushOperation(value);
            } else {

            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(newValue);

            //this.setLastNumberToDisplay();
            }
        }
        this.setLastNumberToDisplay();
    }

    addDot(){
        let lastOperator = this.getLastOperation();

        lastOperator = lastOperator.toString();

        if(typeof lastOperator === 'string' && lastOperator.split('').indexOf('.') > -1) return;

        if(this.isOperator(lastOperator) && lastOperator == 0) this.setLastOperation('0.');
        else if(this.isOperator(lastOperator) || !lastOperator) this.pushOperation('0.');

        else this.setLastOperation(lastOperator.toString() + '.');

        this.setLastNumberToDisplay();
    }

    execBtn(value){
        switch (value){
            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'soma':
                this.addOperation('+');    
                break;

            case 'subtracao':
                this.addOperation('-');    
                break;

            case 'multiplicacao':
                this.addOperation('*');    
                break;

            case 'divisao':
                this.addOperation('/');    
                break;

            case 'porcento':
                this.addOperation('%');    
                break;

            case 'igual':
                this.calc();
                break;

            case 'ponto':
                this.addDot();
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(value);
                break;

            default:
                this.displayCalc = "ERROR";
                break;
        }
    }

    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach(btn => {

            this.addEventListenerAll(btn, "click drag", e => {
                let textBtn = btn.className.baseVal.replace("btn-","");
                this.execBtn(textBtn);
            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            });
            
        });
    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day:"numeric",
            month:"short"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale,{
            hour:"2-digit",
            minute:"2-digit"
        });
    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(value){
        this._timeEl.innerHTML = value;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        this._dateEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._dateEl.innerHTML = value;
    }

}