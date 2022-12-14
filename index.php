<!DOCTYPE HTML>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>Calculadora Milan</title>

    <meta name ="author" content ="Carlos Diez Fernández" />
    <meta name ="description" content ="Este documento contiene los botones de una calculadora Milan basica" />
    <meta name ="keywords" content ="milan,calculadora,botones" />

    <!--Definición de la ventana gráfica-->
    <meta name ="viewport" content ="width=device-width, initial scale=1.0" />
    
    
    <!-- añadir el elemento link de enlace a la hoja de estilo dentro del <head> del documento html -->
    <link rel="stylesheet" type="text/css" href="CalculadoraMilan.css" />
</head>

<body>
    <!-- Datos con el contenidos que aparece en el navegador -->

    <?php 
        session_start();
        
        class CalculadoraBasica{
            protected $memoria;
            protected $resultado;
            protected $operaciones;
            protected $reset;

            public function __construct(){
                $this->memoria = "";
                $this->resultado = "";
                $this->operaciones = "";
                $this->reset = false;
            }

            public function digitos($digito){
                if($this->reset==true){
                    $this->resultado = $digito;
                    $this->operaciones .= $digito;
                    $this->reset = false;
                }else{
                    $this->resultado .= $digito;
                    $this->operaciones .= $digito;
                }
                
                
            }

            public function suma(){
                $this->operaciones .= "+";
                $this->reset = true;
            }

            public function resta(){
                $this->operaciones .= "-";
                $this->reset = true;
            }

            public function multiplicacion(){
                $this->operaciones .= "*";
                $this->reset = true;
            }

            public function division(){
                $this->operaciones .= "/";
                $this->reset = true;
            }

            public function raiz(){
                $longitudUltimoNumero = $this->getLongitudUltimoNUmero();
                $numero = substr($this->resultado,strlen($this->resultado)-$longitudUltimoNumero,strlen($this->resultado));
                $this->operaciones = substr($this->operaciones,0,-$longitudUltimoNumero);
                $this->operaciones .= "sqrt($numero)";
                $this->reset=false;
            }

            public function porcentaje(){
                $primerNumero = $this->getPrimerNumero();
                $longitudUltimoNumero = $this->getLongitudUltimoNUmero();
                $numero = substr($this->resultado,strlen($this->resultado)-$longitudUltimoNumero,strlen($this->resultado));
                $this->operaciones = substr($this->operaciones,0,-$longitudUltimoNumero);
                $this->operaciones .= "(($numero)/100)*$primerNumero";
            }

            public function mrc(){
                $this->operaciones = $this->memoria;
                $this->resultado = $this->memoria;
            }

            public function mMas(){
                $memoria = intval($this->memoria);
                $resultado = intval($this->resultado);
                $this->memoria = $memoria + $resultado;
            }

            public function mMenos(){
                $memoria = intval($this->memoria);
                $resultado = intval($this->resultado);
                $this->memoria = $memoria - $resultado;
            }

            public function masMenos(){
                $this->resultado = "-$this->resultado";
                $this->operaciones = "-$this->operaciones";
            }

            public function igual(){
                if($this->resultado == ""){
                    $this->resultado = "0";
                }else{
                    try{
                        $this->resultado = "";
                        $this->resultado .= eval("return $this->operaciones ;");
                        $op = $this->operaciones;
                        $this->operaciones = "";
                        $this->operaciones .= eval("return $op ;");
                    }catch(Exception $err){
                        $this->resultado = "Error: " .$err->getMessage();
                    }
                    $this->reset = true;
                }
            }

            public function getResultado(){
                return $this->resultado;
            }

            public function borrar(){
                $this->resultado = "";
                $this->operaciones = "";
                $this->memoria = "";
                $this->reset = false;
            }

            public function CE(){
                $longitudUltimoNumero = $this->getLongitudUltimoNUmero();
                $numero = substr($this->resultado,strlen($this->resultado)-$longitudUltimoNumero,strlen($this->resultado));
                $this->resultado = substr($this->resultado,0,-$longitudUltimoNumero);
                $this->operaciones = substr($this->operaciones,0,-$longitudUltimoNumero);
            }

            public function getLongitudUltimoNUmero(){
                $simbolo = false;
                for ($index = 0; $index < strlen($this->resultado); $index++) {
                    if(($this->resultado)[$index] == "+" || ($this->resultado)[$index] == "-" || ($this->resultado)[$index] == "*" || ($this->resultado)[$index] == "/"){
                        $simbolo = true;
                        break;
                    }
                }
                if($simbolo){
                    $contador = 0;
                    for($index=strlen($this->resultado)-1; $index >= 0; $index--){ 
                        if(!isNaN((($this->resultado)[$index]))){
                            $contador++;
                        }else{
                            if($contador+1==strlen($this->resultado)){
                                return $contador+1;
                            }
                            return $contador;
                        }
                    }
                }else{
                    return strlen($this->resultado);
                }
            }

            public function getPrimerNumero(){
                $contador = 0;
                for ($index = 0; $index < strlen($this->operaciones); $index++){
                    if(($this->operaciones)[$index] == "+" || ($this->operaciones)[$index] == "-" || ($this->operaciones)[$index] == "*" || ($this->operaciones)[$index] == "/"){
                        break;
                    }else{
                        $contador++;
                    }
                }
                return substr($this->operaciones,0,$contador);
            }

            
        }

        if(isset($_SESSION['calculadora'])) {
            $calculadora =$_SESSION['calculadora'];
        }
        else{
            $calculadora = new CalculadoraBasica();
        }
        $resultado="";

        if (count($_POST)>0) 
        {  
            if(isset($_POST['m+'])){
                $calculadora->mMas();
            } 
            if(isset($_POST['m-'])){
                $calculadora->mMenos();
            } 
            if(isset($_POST['mrc'])){
                $calculadora->mrc();
            } 
            if(isset($_POST['+'])){
                $calculadora->suma();
            } 
            if(isset($_POST['-'])){
                $calculadora->resta();
            } 
            if(isset($_POST['*'])){
                $calculadora->multiplicacion();
            } 
            if(isset($_POST['/'])){
                $calculadora->division();
            } 
            if(isset($_POST['punto'])){
                $calculadora->digitos(".");
            } 
            if(isset($_POST['0'])){
                $calculadora->digitos("0");
            } 
            if(isset($_POST['1'])){
                $calculadora->digitos("1");
            } 
            if(isset($_POST['2'])){
                $calculadora->digitos("2");
            } 
            if(isset($_POST['3'])){
                $calculadora->digitos("3");
            } 
            if(isset($_POST['4'])){
                $calculadora->digitos("4");
            } 
            if(isset($_POST['5'])){
                $calculadora->digitos("5");
            } 
            if(isset($_POST['6'])){
                $calculadora->digitos("6");
            } 
            if(isset($_POST['7'])){
                $calculadora->digitos("7");
            } 
            if(isset($_POST['8'])){
                $calculadora->digitos("8");
            } 
            if(isset($_POST['9'])){
                $calculadora->digitos("9");
            } 
            if(isset($_POST['ON/C'])){
                $calculadora->borrar();
            } 
            if(isset($_POST['CE'])){
                $calculadora->CE();
            } 
            if(isset($_POST['='])){
                $calculadora->igual();
            } 
            if(isset($_POST['+/-'])){
                $calculadora->masMenos();
            }
            if(isset($_POST['raiz'])){
                $calculadora->raiz();
            }
            if(isset($_POST['porcentaje'])){
                $calculadora->porcentaje();
            } 
            $resultado=$calculadora->getResultado();
            
            $_SESSION['calculadora'] = $calculadora;
		
    
        }

        

    
    
    echo "
    <form action='#' method='post'>
        <label for='pantalla'>nata by MILAN</label>
        <input id='pantalla' type='text' value='$resultado' readonly>
        <input type='submit' value='ON/C' name='ON/C'>
        <input type='submit' value='CE' name='CE'>
        <input type='submit' value='+/-' name='+/-'>
        <input type='submit' value='√' name='raiz'>
        <input type='submit' value='%' name='porcentaje'>
        <input type='submit' value='7' name='7'>
        <input type='submit' value='8' name='8'>
        <input type='submit' value='9' name='9'>
        <input type='submit' value='X' name='*'>
        <input type='submit' value='/' name='/'>
        <input type='submit' value='4' name='4'>
        <input type='submit' value='5' name='5'>
        <input type='submit' value='6' name='6'>
        <input type='submit' value='-' name='-'>
        <input type='submit' value='Mrc' name='mrc'>
        <input type='submit' value='1' name='1'>
        <input type='submit' value='2' name='2'>
        <input type='submit' value='3' name='3'>
        <input type='submit' value='+' name='+'>
        <input type='submit' value='M-' name='m-'>
        <input type='submit' value='0' name='0'>
        <input type='submit' value='.' name='punto'>
        <input type='submit' value='=' name='='>
        <input type='submit' value='M+' name='m+'>
    </form>
    
    ";
?>
    
</body>
</html>
