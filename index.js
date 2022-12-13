let saldos=[{usuario:'Mari',dinero:200},{usuario:'Gera',dinero:290},{usuario:'Maui',dinero:67}]
let pass=[['Mari',1234],['Gera',12345],['Maui',123456]]
let valorMin=10
let valorMax=990
var userActi
//Sección Menu principal
    document.querySelector("#btnUserMari").addEventListener("click", function(){
        window.userActi='Mari'
        cambiarSection(".login", ".principal")
        document.querySelector("#user").innerHTML='Mari'
        document.querySelector("#loUser").innerHTML=userActi
    });
    document.querySelector("#btnUserGera").addEventListener("click", function(){
        window.userActi='Gera'
        cambiarSection(".login", ".principal")
        document.querySelector("#user").innerHTML='Gera'
        document.querySelector("#loUser").innerHTML=userActi  
    });
    document.querySelector("#btnUserMaui").addEventListener("click", function(){
        window.userActi='Maui'
        cambiarSection(".login", ".principal")
        document.querySelector("#user").innerHTML='Maui'
        document.querySelector("#loUser").innerHTML=userActi       
    });
//Sección de login
    document.querySelector("#btnSignin").addEventListener("click", function(){
        let passtemp=document.querySelector("#inputPassword").value
        var acces=consulPass(userActi,passtemp)
        if(acces==true){
            cambiarSection(".operacion", ".login")
        }else{
            alert('Contraseña invalida')
            document.querySelector("#inputPassword").value = ""
        }
    });
//Sección de menu operaciones
    document.querySelector("#btnConsulSaldo").addEventListener("click", function(){
        cambiarSection(".consultarSaldo", ".operacion")
        //Modulo consultar saldo
        var saldotemp=finByName(userActi).dinero
        document.querySelector("#saldo").innerHTML=saldotemp
    });
    document.querySelector("#btnIngreMonto").addEventListener("click", function(){
        cambiarSection(".ingresarSaldo", ".operacion")
    });
    document.querySelector("#btnRetiMonto").addEventListener("click", function(){
        cambiarSection(".retirarMonto", ".operacion")
    });
//Boton Volver
    document.querySelector("#btnReturn").addEventListener("click", function(){
        cambiarSection(".operacion", ".consultarSaldo")
    });
    document.querySelector("#btnReturnIng").addEventListener("click", function(){
        cambiarSection(".operacion",".ingresarSaldo")
    });
    document.querySelector("#btnReturnRet").addEventListener("click", function(){
        cambiarSection(".operacion",".retirarMonto")
    });

//Boton Ingresar Saldo
    document.querySelector("#btnIngresarMonto").addEventListener("click", function(){
        var saldoIng=parseFloat(document.querySelector("#saldoIngresado").value)
        var saldotemp=parseFloat(finByName(userActi).dinero)
        var sumaSaldos=saldoIng+saldotemp
        if(saldoIng>0){
            if(sumaSaldos<valorMax){
                document.querySelector("#mostarSaldo").innerHTML=saldoIng
                document.querySelector("#mostarNuevoSaldo").innerHTML=sumaSaldos
                nuevoSaldo(sumaSaldos)
                document.querySelector("#saldoIngresado").value = ""
            }else{
                alert("No puede exceder los $"+valorMax+", ingrese otro monto")
                document.querySelector("#saldoIngresado").value = ""
            }
        }else{
            alert("Valor no valido, ingrese otro valor")
            document.querySelector("#saldoIngresado").value = ""
        }
    });
//Boton Retirar dinero
    document.querySelector("#btnRetirarMonto").addEventListener("click", function(){
        var saldoRet=parseFloat(document.querySelector("#saldoRetirado").value)
        document.querySelector("#mostrarSaldoRet").innerHTML=saldoRet
        var saldotemp=parseFloat(finByName(userActi).dinero)
        var sumaSaldos=saldotemp-saldoRet
        if(sumaSaldos>valorMin){
            document.querySelector("#mostrarNueSalRe").innerHTML=sumaSaldos
            nuevoSaldo(sumaSaldos)
            document.querySelector("#saldoRetirado").value = ""
        }else{
            alert("No puede dejar en la cuenta menos de $"+valorMin)
            document.querySelector("#saldoRetirado").value = ""
        }
    });


function cambiarSection(mostar, ocultar){
    let mostrarSection=document.querySelector(mostar)
    mostrarSection.style='display:flex'
    let ocultarSection=document.querySelector(ocultar)
    ocultarSection.style="display:none"
}
function consulPass(userActi,passtemp){
    var acceso=false
    for(var i=0;i<pass.length;i++){
        if(userActi==pass[i][0]&&passtemp==pass[i][1]){
            acceso=true
        }
    }
    return acceso
}
function finByName(name){
    return saldos.find(function(x){
        return x.usuario==name
    });
}
function nuevoSaldo(sumaSaldos){
    var nuSal=sumaSaldos
    for(var i=0;i<saldos.length;i++){
        saldos[i].dinero=nuSal
    }
}
function goHome(){
    window.location.reload();
}