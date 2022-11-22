

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
            
        }else if(this.stack.length==0){
            this.pantalla.value += "-";
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


class CalculadoraEspecializada extends CalculadoraRPN{

    constructor(){
        super();
        this.modo="normal";
        this.parentesis=false;
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
            }else if(e.key=="n"){
                this.normal();
            }else if(e.key=="a"){
                this.avanzado();
            }else if(e.key=="x"){
                this.digitos(e.key);
            }else if(e.key=="i"){
                this.integral();
            }else if(e.key=="d"){
                this.derivar();
            }
        });
    }

    normal(){
        this.modo="normal";
    }

    avanzado(){
        this.modo="avanzado";
    }

    suma(){
        if(this.modo=="normal"){
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
        }else{
            if(this.stack.length >= 2){
                var numero2 = this.stack.pop();
                var numero1 = this.stack.pop();
                var resultado = numero1+ "+" +numero2;
                this.stack.push(resultado);
                this.pantalla.value=resultado+"\n";
            }
        }
        
    }

    resta(){
        if(this.stack.length==0){
            this.pantalla.value += "-";
        }else if(this.modo=="normal"){
            if(this.stack.length >= 2){
                var numero2 = this.stack.pop();
                var numero1 = this.stack.pop();
                var resultado = numero1 - numero2;
                if(isNaN(resultado)){
                    this.reset=true;
                }else{
                    this.stack.push(resultado);
                    this.pantalla.value = resultado + "\n";
                }
            }
        }else{
            if(this.stack.length >= 2){
                var numero2 = this.stack.pop();
                var numero1 = this.stack.pop();
                var resultado = numero1+ "-" +numero2;
                this.stack.push(resultado);
                this.pantalla.value=resultado+"\n";
            }
        }
    }

    multiplicacion(){
        if(this.modo=="normal"){
            if(this.stack.length >= 2){
                var numero2 = this.stack.pop();
                var numero1 = this.stack.pop();
                var resultado = numero1 * numero2;
                if(isNaN(resultado)){
                    this.reset=true;
                }else{
                    this.stack.push(resultado);
                    this.pantalla.value = resultado + "\n";
                }
            }
        }else{
            if(this.stack.length >= 2){
                var numero2 = this.stack.pop();
                var numero1 = this.stack.pop();
                var resultado = numero1+ "*" +numero2;
                this.stack.push(resultado);
                this.pantalla.value=resultado+"\n";
            }
        }
    }

    division(){
        if(this.modo=="normal"){
            if(this.stack.length >= 2){
                var numero2 = this.stack.pop();
                var numero1 = this.stack.pop();
                var resultado = numero1 / numero2;
                if(isNaN(resultado)){
                    this.reset=true;
                }else{
                    this.stack.push(resultado);
                    this.pantalla.value = resultado + "\n";
                }
            }
        }else{
            if(this.stack.length >= 2){
                var numero2 = this.stack.pop();
                var numero1 = this.stack.pop();
                var resultado = numero1+ "/" +numero2;
                this.stack.push(resultado);
                this.pantalla.value=resultado+"\n";
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
            if(this.parentesis){
                this.pantalla.value += numero + ")";
                this.parentesis=false;
            }else{
                this.pantalla.value += numero;
            }
        }
    }

    integral(){
        this.pantalla.value="";
        var f = this.stack.pop();
        var operandos = new Array();
        var posicion = 0;
        for(var i = 0;i < f.length;i++){
            if((i+1)<f.length && f.charAt(i)=="x" && f.charAt(i+1)!="*"){
                operandos.push(f.substring(posicion,i+1));
                posicion=i+1;
            }else if((i+1)>=f.length){
                operandos.push(f.substring(posicion,i+1));
            }
        }
        var contador = 0;
        var contadorx = 0;
        var signo = false;
        for(var e = 0;e < operandos.length;e++){
            for(var f = 0;f < operandos[e].length;f++){
                if(operandos[e].charAt(0)=="-"||operandos[e].charAt(0)=="+"){
                    signo=true;
                }
                if(operandos[e].charAt(f)=="x"){
                    contador++;
                }
                if(operandos[e].charAt(f)=="*"){
                    contadorx++;
                }
            }

            operandos[e] = operandos[e] + "*x";
            contador++;
            if(signo){
                if(isNaN(operandos[e].charAt(1))){
                    var nuevo_numero = 1+"/"+contador;
                    operandos[e] = operandos[e].charAt(0) + nuevo_numero + "*"+ operandos[e].substring(1,operandos[e].length);
                }else{
                    var numero = new Number(this.getNumeroOperandos(operandos[e].substring(1,operandos[e].length)));
                    var nuevo_numero = numero+"/"+contador;
                    operandos[e] = operandos[e].charAt(0) + nuevo_numero + operandos[e].substring(this.getLongitudNumeroOperandos(operandos[e])+1,operandos[e].length);
                }
            }else{
                if(isNaN(operandos[e].charAt(0))){
                    var nuevo_numero = 1+"/"+contador;
                    operandos[e] = nuevo_numero + "*"+ operandos[e];
                }else{
                    var numero = new Number(this.getNumeroOperandos(operandos[e])); 
                    var nuevo_numero = numero+"/"+contador;
                    operandos[e] = nuevo_numero + operandos[e].substring(this.getLongitudNumeroOperandos(operandos[e]),operandos[e].length);
                }
            }
            this.pantalla.value+=operandos[e];
            contador = 0;
            contadorx = 0;
            signo = false;
        }
    }

    derivar(){
        this.pantalla.value="";
        var f = this.stack.pop();
        var operandos = new Array();
        var posicion = 0;
        for(var i = 0;i < f.length;i++){
            if((i+1)<f.length && f.charAt(i)=="x" && f.charAt(i+1)!="*"){
                operandos.push(f.substring(posicion,i+1));
                posicion=i+1;
            }else if((i+1)>=f.length && f.charAt(i)=="x"){
                operandos.push(f.substring(posicion,i+1));
            }
        }
        var contador = 0;
        var contadorx = 0;
        var signo = false;
        for(var e = 0;e < operandos.length;e++){
            for(var f = 0;f < operandos[e].length;f++){
                if(operandos[e].charAt(0)=="-"||operandos[e].charAt(0)=="+"){
                    signo=true;
                }
                if(operandos[e].charAt(f)=="x"){
                    contador++;
                }
                if(operandos[e].charAt(f)=="*"){
                    contadorx++;
                }
            }
            if(contadorx>0){
                operandos[e] = operandos[e].substring(0,operandos[e].length-2);
            }else{
                operandos[e] = operandos[e].substring(0,operandos[e].length-1);
            }
            if(signo){
                var numero =  new Number(this.getNumeroOperandos(operandos[e].substring(1,operandos[e].length))); 
                if(numero==0 || isNaN(numero)){
                    numero=1;
                    operandos[e] = operandos[e].charAt(0)+(numero*contador)+operandos[e].substring(1,operandos[e].length);
                }else{
                    operandos[e] = operandos[e].charAt(0)+(numero*contador)+operandos[e].substring(this.getLongitudNumeroOperandos(operandos[e])+1,operandos[e].length);
                }
                
            }else{
                var numero = new Number(this.getNumeroOperandos(operandos[e])); 
                if(numero==0 || isNaN(numero)){
                    numero=1;
                    operandos[e] = (numero*contador)+"*"+operandos[e].substring(0,operandos[e].length);
                }else{
                    operandos[e] = (numero*contador)+operandos[e].substring(this.getLongitudNumeroOperandos(operandos[e]),operandos[e].length);
                }
                
            }
            this.pantalla.value+=operandos[e];
            contador = 0;
            contadorx = 0;
            signo = false;
        }
    }

    getLongitudNumeroOperandos(cadena){
        var contador = 0;
        for(var e = 0;e < cadena.length;e++){
            if(!isNaN(cadena.charAt(e))){
                contador++;
            }
        }
        return contador;
    }

    getNumeroOperandos(cadena){
        var contador = 0;
        for(var e = 0;e < cadena.length;e++){
            if(!isNaN(cadena.charAt(e))){
                contador++;
            }
        }
        return cadena.substring(0,contador);
    }
    
    getNumero(){
        var contador= 0;
        for(var i = this.pantalla.value.length-1;i>=0;i--){
            if(this.pantalla.value.charAt(i)!="\n"){
                contador++
            }else{
                break;
            }
        }
        var numero = this.pantalla.value.substring(this.pantalla.value.length-contador,this.pantalla.value.length);
        if(this.modo=="avanzado"){
            return numero;
        }else{
            return new Number(numero);

        }
        
    }

}

var calculadora = new CalculadoraEspecializada();