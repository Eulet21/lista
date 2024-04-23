
/**
 * PARTE DO JAVASCRIPT CLIENTE SIDE
 *O Ajax permite que o JavaScript se comunique com o PHP para validar as condicionais de acesso.
 */

// Aguarda o carregamento completo da página
document.addEventListener("DOMContentLoaded", function () {
    console.log("Script carregado!")//Teste

    const email = document.querySelector("#email")
    const password = document.querySelector("#senha")

    document.querySelector('form').addEventListener("submit", (event)=>{
        event.preventDefault()

        if(email.value.length == 0 && password.value.length == 0){
            console.log("Inputs vazios")
        }
        else{
            //console.log("Email: " , email.value , "Senha: " , password.value)

            const form = new FormData()
            form.append('email', email.value)
            form.append('senha', password.value)
            $.ajax({
                url: './php/login.php', type: 'POST', data: form, processData: false, contentType: false
            }).done(function(request){
                if (Array(request)){
                    console.log(request[0])
                    if(request[0] == "Invalida"){
                        console.log(request[0])
                    }
                    else if (request[0] == "Incorreta"){
                        console.log(request[0])
                    }
                }
            })
        }
    });//Evento do formulário
});//Carregamento

function Register() {

/*Essa função redireciona para a tela de escolha entre supermercado e comprador*/
   window.location.href = 'choose.html'
    
}
