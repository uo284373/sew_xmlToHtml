

class CalculadoraRPN{

    constructor(){
        this.stack = new Array();
        this.reset=false;
        this.teclado();
        
    }

    get pantalla(){
        return document.querySelector('textarea');
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
                this.enter();
            }else if(e.key=="0"||e.key=="1"||e.key=="2"||e.key=="3"||e.key=="4"||e.key=="5"||e.key=="6"||e.key=="7"||e.key=="8"||e.key=="9"){
                this.digitos(e.key);
            }else if(e.key=="."){
                this.punto();
            }else if(e.key=="o"){
                this.ON();
            }else if(e.key=="s"){
                this.sin();
            }else if(e.key=="c"){
                this.cos();
            }else if(e.key=="t"){
                this.tan();
            }else if(e.key=="q"){
                this.asin();
            }else if(e.key=="w"){
                this.acos();
            }else if(e.key=="e"){
                this.atan();
            }
        });
    }

    suma(){
        if(this.stack.length >= 2){
            var numero2 = this.stack.pop();
            var numero1 = this.stack.pop();
            var resultado = numero1 + numero2;
            if(isNaN(resultado)){
                this.reset=true;
            }else{
                this.stack.push(resultado);
                this.pantalla.value = resultado + "\n";
            }
        }
    }

    resta(){
        if(this.stack.length >= 2){
            var numero2 = this.stack.pop();
            var numero1 = this.stack.pop();
            var resultado = numero1 - numero2;
            if(isNaN(resultado)){
                this.reset=true;
            }else{
                this.stack.push(resultado);
                this.pantalla.value = resultado+ "\n";
            }
            
        }
    }

    multiplicacion(){
        if(this.stack.length >= 2){
            var numero2 = this.stack.pop();
            var numero1 = this.stack.pop();
            var resultado = numero1 * numero2;
            if(isNaN(resultado)){
                this.reset=true;
            }else{
                this.stack.push(resultado);
                this.pantalla.value = resultado+ "\n";
            }
            
        }
    }

    division(){
        if(this.stack.length >= 2){
            var numero2 = this.stack.pop();
            var numero1 = this.stack.pop();
            var resultado = numero1 / numero2;
            if(isNaN(resultado)){
                this.reset=true;
            }else{
                this.stack.push(resultado);
                this.pantalla.value = resultado+ "\n";
            }
            
        }
    }

    sin(){
        if(this.stack.length >= 1){
            var numero = this.stack.pop();
            var resultado = Math.sin(numero);
            if(isNaN(resultado)){
                this.reset=true;
                this.pantalla.value=this.pantalla.value.slice(0,this.pantalla.value.length-this.getLongitudNumero());
                this.pantalla.value += resultado + "\n";
            }else{
                this.stack.push(resultado);
                this.pantalla.value=this.pantalla.value.slice(0,this.pantalla.value.length-this.getLongitudNumero());
                this.pantalla.value += resultado + "\n";
            }
            
        }
    }

    cos(){
        if(this.stack.length >= 1){
            var numero = this.stack.pop();
            var resultado = Math.cos(numero);
            if(isNaN(resultado)){
                this.reset=true;
                this.pantalla.value=this.pantalla.value.slice(0,this.pantalla.value.length-this.getLongitudNumero());
                this.pantalla.value += resultado + "\n";
            }else{
                this.stack.push(resultado);
                this.pantalla.value=this.pantalla.value.slice(0,this.pantalla.value.length-this.getLongitudNumero());
                this.pantalla.value += resultado + "\n";
            }
            
        }
    }

    tan(){
        if(this.stack.length >= 1){
            var numero = this.stack.pop();
            var resultado = Math.tan(numero);
            if(isNaN(resultado)){
                this.reset=true;
                this.pantalla.value=this.pantalla.value.slice(0,this.pantalla.value.length-this.getLongitudNumero());
                this.pantalla.value += resultado + "\n";
            }else{
                this.stack.push(resultado);
                this.pantalla.value=this.pantalla.value.slice(0,this.pantalla.value.length-this.getLongitudNumero());
                this.pantalla.value += resultado + "\n";
            }
            
        }
    }

    asin(){
        if(this.stack.length >= 1){
            var numero = this.stack.pop();
            var resultado = Math.asin(numero);
            if(isNaN(resultado)){
                this.reset=true;
                this.pantalla.value=this.pantalla.value.slice(0,this.pantalla.value.length-this.getLongitudNumero());
                this.pantalla.value += resultado + "\n";
            }else{
                this.stack.push(resultado);
                this.pantalla.value=this.pantalla.value.slice(0,this.pantalla.value.length-this.getLongitudNumero());
                this.pantalla.value += resultado + "\n";
            }
            
        }
    }

    acos(){
        if(this.stack.length >= 1){
            var numero = this.stack.pop();
            var resultado = Math.acos(numero);
            if(isNaN(resultado)){
                this.reset=true;
                this.pantalla.value=this.pantalla.value.slice(0,this.pantalla.value.length-this.getLongitudNumero());
                this.pantalla.value += resultado + "\n";
            }else{
                this.stack.push(resultado);
                this.pantalla.value=this.pantalla.value.slice(0,this.pantalla.value.length-this.getLongitudNumero());
                this.pantalla.value += resultado + "\n";
            }
            
        }
    }

    atan(){
        if(this.stack.length >= 1){
            var numero = this.stack.pop();
            var resultado = Math.atan(numero);
            if(isNaN(resultado)){
                this.reset=true;
                this.pantalla.value=this.pantalla.value.slice(0,this.pantalla.value.length-this.getLongitudNumero());
                this.pantalla.value += resultado + "\n";
            }else{
                this.stack.push(resultado);
                this.pantalla.value=this.pantalla.value.slice(0,this.pantalla.value.length-this.getLongitudNumero());
                this.pantalla.value += resultado + "\n";
            }
            
        }
    }

    digitos(numero){
        if(this.reset){
            var longitud =this.getLongitudNumero();
            this.pantalla.value=this.pantalla.value.slice(0,this.pantalla.value.length-longitud);
            this.pantalla.value += numero;
            this.reset=false;
        }else{
            this.pantalla.value += numero;
        }
    }

    ON(){
        this.borrar();
    }

    getNumero(){
        var contador= 0;
        for(var i = this.pantalla.value.length;i>=0;i--){
            if(this.pantalla.value.charAt(i)!="\n"){
                contador++
            }else{
                break;
            }
        }
        var numero = this.pantalla.value.substring(this.pantalla.value.length-contador,this.pantalla.value.length);
        return new Number(numero);
    }

    getLongitudNumero(){
        var contador= 1;
        for(var i = this.pantalla.value.length-2;i>=0;i--){
            var a = this.pantalla.value.charAt(i);
            if(a!="\n"){
                contador++
            }else{
                break;
            }
        }
        return contador;
    }

    punto(){
        this.pantalla.value += ".";
    }

    enter(){
        try{
            var numero = this.getNumero();
            this.stack.push(numero);
            this.pantalla.value += "\n";
        }catch(err){
            this.pantalla.value = "Error: "+err;
        }
    }

    borrar(){
        this.pantalla.value = "";
        this.stack=new Array();
    }

    
}





var calculadora = new CalculadoraRPN();