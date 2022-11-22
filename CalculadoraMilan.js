

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

var calculadora = new CalculadoraMilan();