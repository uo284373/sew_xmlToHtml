

class CalculadoraMilan{

    constructor(){
        this.memoria=0.0;
        this.operaciones = "";
        this.reset = true;
        this.teclado();
    }

    get pantalla(){
        return document.querySelector('input[type="text"]');
    }

    teclado(){
        document.addEventListener('keydown',(e) => {
            if(e.key=="+"){
                this.suma();
            }else if(e.key=="-"){
                this.resta();
            }else if(e.key=="*"){
                this.multiplicacion();
            }else if(e.key=="/"){
                this.division();
            }else if(e.key=="=" || e.key=="Enter"){
                this.igual();
            }else if(e.key=="0"||e.key=="1"||e.key=="2"||e.key=="3"||e.key=="4"||e.key=="5"||e.key=="6"||e.key=="7"||e.key=="8"||e.key=="9"){
                this.digitos(e.key);
            }else if(e.key=="."){
                this.punto();
            }else if(e.key=="o"){
                this.ON();
            }else if(e.key=="c"){
                this.CE();
            }else if(e.key=="s"){
                this.masMenos();
            }else if(e.key=="r"){
                this.raiz();
            }else if(e.key=="p"){
                this.porcentaje();
            }else if(e.key=="m"){
                this.mrc();
            }else if(e.key=="n"){
                this.mMenos();
            }else if(e.key=="b"){
                this.mMas();
            }
        });
    }


    suma(){
        this.igual();
        this.operaciones += "+";
        this.reset=true;
    }

    resta(){
        this.igual();
        this.operaciones += "-";
        this.reset=true;
    }

    multiplicacion(){
        this.igual();
        this.operaciones += "*";
        this.reset=true;
    }

    division(){
        this.igual();
        this.operaciones += "/";
        this.reset=true;
    }

    raiz(){
        var longitudUltimoNumero = this.getLongitudUltimoNUmero();
        var numero = this.operaciones.substring(this.operaciones.length-longitudUltimoNumero,this.operaciones.length);
        this.operaciones = this.operaciones.slice(0,-longitudUltimoNumero);
        this.operaciones += "Math.sqrt("+new Number(numero)+")";
        this.reset=false;
    }

    digitos(numero){
        if(!this.reset){
            this.pantalla.value += new Number(numero);
            this.operaciones += new Number(numero);
        }else{
            this.pantalla.value = new Number(numero);
            this.operaciones += new Number(numero);
            this.reset = false;
        }
    }

    ON(){
        this.borrar();
    }

    CE(){
        var longitudUltimoNumero = this.getLongitudUltimoNUmero();
        var numero = this.pantalla.value.substring(this.pantalla.value.length-longitudUltimoNumero,this.pantalla.value.length);
        this.pantalla.value = this.pantalla.value.slice(0,-longitudUltimoNumero);
        this.operaciones = this.operaciones.slice(0,-longitudUltimoNumero);
    }

    masMenos(){
        try{
            this.pantalla.value = new Number(eval(this.pantalla.value*(-1)));
            this.operaciones = this.pantalla.value;
            this.reset=false;
        }catch(err){
            this.pantalla.value = "Error: " + err;
        }
        
    }

    porcentaje(){
        var primerNumero = this.getPrimerNumero();
        var longitudUltimoNumero = this.getLongitudUltimoNUmero();
        var numero = this.operaciones.substring(this.operaciones.length-longitudUltimoNumero,this.operaciones.length);
        this.operaciones = this.operaciones.slice(0,-longitudUltimoNumero);
        this.operaciones+="("+new Number(numero)+"/100)*"+primerNumero;
    }

    mrc(){
        this.pantalla.value = this.memoria;
        this.operaciones = this.memoria;
    }

    mMenos(){
        try{
            this.memoria = new Number(eval(this.memoria+"-"+this.pantalla.value));
        }catch(err){
            this.pantalla.value = "Error: " + err;
        }
        
    }

    punto(){
        this.pantalla.value += ".";
        this.operaciones += ".";
        this.reset=false;
    }

    igual(){
        if(this.pantalla.value == ""){
            this.pantalla.value = "0";
        }else{
            try{
                this.pantalla.value = new Number(eval(this.operaciones));
                var op = this.operaciones;
                this.operaciones = ""
                this.operaciones += new Number(eval(op));
            }catch(err){
                this.pantalla.value = "Error: "+ err;
            }
        }
        this.reset = true;
    }

    mMas(){
        try{
            this.memoria = new Number(eval(this.memoria+"+"+this.pantalla.value));
        }catch(err){
            this.pantalla.value = "Error: " + err;
        }
    }

    borrar(){
        this.pantalla.value = "0";
        this.operaciones = "";
        this.memoria=0.0;
        this.reset = true;
    }

    getLongitudUltimoNUmero(){
        var simbolo = false;
        for (let index = 0; index < this.operaciones.length; index++) {
            if(this.operaciones.charAt(index) == "+" || this.operaciones.charAt(index) == "-" || this.operaciones.charAt(index) == "*" || this.operaciones.charAt(index) == "/"){
                simbolo = true;
                break;
            }
        }
        if(simbolo){
            var contador = 0;
            for(let index=this.operaciones.length-1; index >= 0; index--){ 
                if(!isNaN(this.operaciones.charAt(index))){
                    contador++;
                }else{
                    if(contador+1==this.operaciones.length){
                        return contador+1;
                    }
                    return contador;
                }
            }
        }else{
            return this.operaciones.length;
        }
    }

    getPrimerNumero(){
        var contador = 0;
        for (let index = 0; index < this.operaciones.length; index++){
            if(this.operaciones.charAt(index) == "+" || this.operaciones.charAt(index) == "-" || this.operaciones.charAt(index) == "*" || this.operaciones.charAt(index) == "/"){
                break;
            }else{
                contador++;
            }
        }
        return this.operaciones.substring(0,contador);
    }

    
}



class CalculadoraCientifica extends CalculadoraMilan{

    constructor(){
        super();
        this.intrPotencia=false;
        this.shift=false;
        this.hyp=false;
        this.angular="rad";
        this.notacion = false;
    }

    teclado(){
        document.addEventListener('keydown',(e) => {
            if(e.key=="+"){
                this.suma();
            }else if(e.key=="-"){
                this.resta();
            }else if(e.key=="*"){
                this.multiplicacion();
            }else if(e.key=="/"){
                this.division();
            }else if(e.key=="=" || e.key=="Enter"){
                this.igual();
            }else if(e.key=="0"||e.key=="1"||e.key=="2"||e.key=="3"||e.key=="4"||e.key=="5"||e.key=="6"||e.key=="7"||e.key=="8"||e.key=="9"){
                this.digitos(e.key);
            }else if(e.key=="."){
                this.punto();
            }else if(e.key=="q"){
                this.masMenos();
            }else if(e.key=="w"){
                this.raiz();
            }else if(e.key=="e"){
                this.mrc();
            }else if(e.key=="r"){
                this.mMenos();
            }else if(e.key=="t"){
                this.mMas();
            }else if(e.key=="y"){
                this.ON();
            }else if(e.key=="u"){
                this.CE();
            }else if(e.key=="i"){
                this.unidadAngular();
            }else if(e.key=="o"){
                this.hiperbole();
            }else if(e.key=="p"){
                this.notacioncientifica();
            }else if(e.key=="a"){
                this.mc();
            }else if(e.key=="s"){
                this.ms();
            }else if(e.key=="d"){
                this.cuadrado();
            }else if(e.key=="f"){
                this.potencia();
            }else if(e.key=="g"){
                this.sin();
            }else if(e.key=="h"){
                this.cos();
            }else if(e.key=="j"){
                this.tan();
            }else if(e.key=="k"){
                this.potencia10();
            }else if(e.key=="l"){
                this.log();
            }else if(e.key=="z"){
                this.exp();
            }else if(e.key=="x"){
                this.mod();
            }else if(e.key=="c"){
                this.flecha();
            }else if(e.key=="v"){
                this.eliminar();
            }else if(e.key=="b"){
                this.pi();
            }else if(e.key=="n"){
                this.factorial();
            }else if(e.key=="m"){
                this.abreParentesis();
            }else if(e.key=="<"){
                this.cierraParentesis();
            }
        });
    }

    suma(){
        this.pantalla.value += "+";
        this.operaciones += "+";
        this.reset=false;
    }

    resta(){
        this.pantalla.value += "-";
        this.operaciones += "-";
        this.reset=false;
    }

    multiplicacion(){
        this.pantalla.value += "*";
        this.operaciones += "*";
        this.reset=false;
    }

    division(){
        this.pantalla.value += "/";
        this.operaciones += "/";
        this.reset=false;
    }

    raiz(){
        var longitudUltimoNumero = this.getLongitudUltimoNUmero();
        var numero = this.pantalla.value.substr(this.pantalla.value.length-longitudUltimoNumero,this.pantalla.value.length);
        this.pantalla.value = this.pantalla.value.slice(0,-longitudUltimoNumero);
        this.pantalla.value += "√"+numero;
        this.operaciones = this.operaciones.slice(0,-longitudUltimoNumero);
        this.operaciones += "Math.sqrt("+numero+")";
        this.reset=false;
    }

    digitos(numero){
        if(!this.reset){
            if(this.intrPotencia){
                this.pantalla.value += new Number(numero);
                this.operaciones += new Number(numero)+")";
                this.intrPotencia=false;
            }else{
                this.pantalla.value += new Number(numero);
                this.operaciones += new Number(numero);
            }
            
        }else{
            this.pantalla.value = new Number(numero);
            this.operaciones="";
            this.operaciones += new Number(numero);
            this.reset = false;
        }
    }

    mc(){
        this.memoria = 0.0;
    }

    ms(){
        this.memoria = this.pantalla.value;
    }

    cuadrado(){
        var longitudUltimoNumero = this.getLongitudUltimoNUmero();
        var numero = this.pantalla.value.substr(this.pantalla.value.length-longitudUltimoNumero,this.pantalla.value.length);
        this.pantalla.value += "^2";
        this.operaciones = this.operaciones.slice(0,-longitudUltimoNumero);
        this.operaciones += "Math.pow("+numero+",2)";
        this.reset=false;
    }

    unidadAngular(){
        if(this.angular=="deg"){
            document.querySelector('input[value="DEG"]').value="GRAD";
            this.angular="grad";
        }else if(this.angular=="rad"){
            document.querySelector('input[value="RAD"]').value="DEG";
            this.angular="deg";
        }else if(this.angular=="grad"){
            document.querySelector('input[value="GRAD"]').value="RAD";
            this.angular="rad";
        }
        
    }

    hiperbole(){
        if(this.hyp){
            this.hyp=false;
            document.querySelector('input[value="sinh"]').value="sin";
            document.querySelector('input[value="cosh"]').value="cos";
            document.querySelector('input[value="tanh"]').value="tan";
        }else{
            this.hyp=true;
            if(this.shift){
                document.querySelector('input[value="asin"]').value="sinh";
                document.querySelector('input[value="acos"]').value="cosh";
                document.querySelector('input[value="atan"]').value="tanh";
                this.shift=false;
            }else{
                document.querySelector('input[value="sin"]').value="sinh";
                document.querySelector('input[value="cos"]').value="cosh";
                document.querySelector('input[value="tan"]').value="tanh";
            }
            
        }
    }

    notacioncientifica(){
        if(this.notacion==false){
            this.notacion=true;
        }else{
            this.notacion=false;
        }
    }

    igual(){
        if(this.pantalla.value == ""){
            this.pantalla.value = "0";
        }else{
            try{
                if(this.notacion==true){
                    var number = new Number(eval(this.operaciones));
                    this.pantalla.value = number.toExponential();
                }else{
                    this.pantalla.value = new Number(eval(this.operaciones));
                }
                var op = this.operaciones;
                this.operaciones = ""
                this.operaciones += new Number(eval(op));
            }catch(err){
                this.pantalla.value = "Error: "+ err;
            }
        }
        this.reset = true;
    }

    potencia(){
        var longitudUltimoNumero = this.getLongitudUltimoNUmero();
        var numero = this.pantalla.value.substr(this.pantalla.value.length-longitudUltimoNumero,this.pantalla.value.length);
        this.pantalla.value += "^";
        this.operaciones = this.operaciones.slice(0,-longitudUltimoNumero);
        this.operaciones += "Math.pow("+numero+",";
        this.intrPotencia = true;
        this.reset=false;
    }

    sin(){
        var longitudUltimoNumero = this.getLongitudUltimoNUmero();
        var numero = this.pantalla.value.substr(this.pantalla.value.length-longitudUltimoNumero,this.pantalla.value.length);
        this.pantalla.value = this.pantalla.value.slice(0,-longitudUltimoNumero);
        this.operaciones = this.pantalla.value.slice(0,-longitudUltimoNumero);
        if(this.shift){
            this.pantalla.value += "asin(" + numero + ")";
            this.operaciones += "+Math.asin("+numero+")";
            this.reset=false;
        }else if(this.hyp){
            this.pantalla.value += "sinh(" + numero + ")";
            this.operaciones += "+Math.sinh("+numero+")";
            this.reset=false;
        }
        else{
            this.pantalla.value += "sin(" + numero + ")";
            this.operaciones += "+Math.sin("+numero+")";
            this.reset=false;
        }
        
    }

    cos(){
        var longitudUltimoNumero = this.getLongitudUltimoNUmero();
        var numero = this.pantalla.value.substr(this.pantalla.value.length-longitudUltimoNumero,this.pantalla.value.length);
        this.pantalla.value = this.pantalla.value.slice(0,-longitudUltimoNumero);
        this.operaciones = this.pantalla.value.slice(0,-longitudUltimoNumero);
        if(this.shift){
            this.pantalla.value += "acos(" + numero + ")";
            this.operaciones += "+Math.acos("+numero+")";
            this.reset=false;
        }else if(this.hyp){
            this.pantalla.value += "cosh(" + numero + ")";
            this.operaciones += "+Math.cosh("+numero+")";
            this.reset=false;
        }
        else{
            this.pantalla.value += "cos(" + numero + ")";
            this.operaciones += "+Math.cos("+numero+")";
            this.reset=false;
        }
        
    }

    tan(){
        var longitudUltimoNumero = this.getLongitudUltimoNUmero();
        var numero = this.pantalla.value.substr(this.pantalla.value.length-longitudUltimoNumero,this.pantalla.value.length);
        this.pantalla.value = this.pantalla.value.slice(0,-longitudUltimoNumero);
        this.operaciones = this.pantalla.value.slice(0,-longitudUltimoNumero);
        if(this.shift){
            this.pantalla.value += "atan(" + numero + ")";
            this.operaciones += "+Math.atan("+numero+")";
            this.reset=false;
        }else if(this.hyp){
            this.pantalla.value += "tanh(" + numero + ")";
            this.operaciones += "+Math.tanh("+numero+")";
            this.reset=false;
        }
        else{
            this.pantalla.value += "tan(" + numero + ")";
            this.operaciones += "+Math.tan("+numero+")";
            this.reset=false;
        }
        
    }

    potencia10(){
        var longitudUltimoNumero = this.getLongitudUltimoNUmero();
        var numero = this.pantalla.value.substr(this.pantalla.value.length-longitudUltimoNumero,this.pantalla.value.length);
        this.pantalla.value = this.pantalla.value.slice(0,-longitudUltimoNumero);
        this.operaciones = this.pantalla.value.slice(0,-longitudUltimoNumero);
        this.pantalla.value += "10^(" + numero + ")";
        this.operaciones += "+Math.pow(10,"+numero+")";
        this.reset=false;
    }

    log(){
        var longitudUltimoNumero = this.getLongitudUltimoNUmero();
        var numero = this.pantalla.value.substr(this.pantalla.value.length-longitudUltimoNumero,this.pantalla.value.length);
        this.pantalla.value = this.pantalla.value.slice(0,-longitudUltimoNumero);
        this.operaciones = this.pantalla.value.slice(0,-longitudUltimoNumero);
        this.pantalla.value += "log(" + numero + ")";
        this.operaciones += "+Math.log10("+numero+")";
        this.reset=false;
    }

    exp(){
        var longitudUltimoNumero = this.getLongitudUltimoNUmero();
        var numero = this.pantalla.value.substr(this.pantalla.value.length-longitudUltimoNumero,this.pantalla.value.length);
        this.operaciones = this.operaciones.slice(0,-longitudUltimoNumero);
        this.pantalla.value += "*10^";
        this.operaciones += numero+"*Math.pow(10,";
        this.intrPotencia=true;
        this.reset=false;
    }

    mod(){
        var longitudUltimoNumero = this.getLongitudUltimoNUmero();
        var numero = this.pantalla.value.substr(this.pantalla.value.length-longitudUltimoNumero,this.pantalla.value.length);
        this.pantalla.value += "mod";
        this.operaciones += "%";
        this.reset=false;
    }

    flecha(){
        if(this.shift){
            this.shift=false;
            document.querySelector('input[value="asin"]').value="sin";
            document.querySelector('input[value="acos"]').value="cos";
            document.querySelector('input[value="atan"]').value="tan";
        }else{
            this.shift=true;
            if(this.hyp){
                document.querySelector('input[value="sinh"]').value="asin";
                document.querySelector('input[value="cosh"]').value="acos";
                document.querySelector('input[value="tanh"]').value="atan";
                this.hyp=false;
            }else{
                document.querySelector('input[value="sin"]').value="asin";
                document.querySelector('input[value="cos"]').value="acos";
                document.querySelector('input[value="tan"]').value="atan";
            }
            
        }
    }

    eliminar(){
        this.pantalla.value = this.pantalla.value.slice(0,this.pantalla.value.length-1);
        this.operaciones = this.operaciones.slice(0,this.operaciones.length-1);
        this.reset=false;
    }

    pi(){
        this.pantalla.value += Math.PI;
        this.operaciones += Math.PI;
        this.reset=false;
    }

    factorial(){
        var longitudUltimoNumero = this.getLongitudUltimoNUmero();
        var numero = this.pantalla.value.substr(this.pantalla.value.length-longitudUltimoNumero,this.pantalla.value.length);
        this.pantalla.value += "!";
        for(var i = (numero-1);i >=1;i--){
            this.operaciones+="*"+i;
        }
        this.reset=false;
    }

    abreParentesis(){
        if(!this.reset){
            this.pantalla.value += "(";
            this.operaciones += "(";
        }else{
            this.pantalla.value = "(";
            this.operaciones = "(";
            this.reset=false;
        }
    }

    cierraParentesis(){
        if(!this.reset){
            this.pantalla.value += ")";
            this.operaciones += ")";
        }else{
            this.pantalla.value = ")";
            this.operaciones = ")";
            this.reset=false;
        }
    }

    getLongitudUltimoNUmero(){
        var simbolo = false;
        for (let index = 0; index < this.pantalla.value.length; index++) {
            if(this.pantalla.value.charAt(index) == "+" || this.pantalla.value.charAt(index) == "-" || this.pantalla.value.charAt(index) == "*" || this.pantalla.value.charAt(index) == "/"){
                simbolo = true;
                break;
            }
        }
        if(simbolo){
            var contador = 0;
            for(let index=this.pantalla.value.length-1; index >= 0; index--){ 
                if(!isNaN(this.pantalla.value.charAt(index))){
                    contador++;
                }else{
                    if(contador+1==this.pantalla.value.length){
                        return contador+1;
                    }
                    return contador;
                }
            }
        }else{
            return this.pantalla.value.length;
        }
    }


}

var calculadora = new CalculadoraCientifica();