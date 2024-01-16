
/**
 * PARTE DO JAVASCRIPT CLIENTE SIDE
 *O Ajax permite que o JavaScript se comunique com o PHP para validar as condicionais de acesso.
 */
console.log("Script carregado!")//Teste

// Aguarda o carregamento completo da página
document.addEventListener("DOMContentLoaded", function () {

//Adiciona um ouvinte de eventos para o formulário
    document.getElementById("loginForm").addEventListener("submit", function (event) {

//Impede o envio tradicional do formulário
        event.preventDefault(); 
//Dados do usuário
        let user = document.getElementById("gmail").value;
        let passw = document.getElementById("senha").value;

//Essa variável é uma expressão regular para validar se o que foi digitado no campo de gmail é como um endereço de email
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailRegex.test(user)) {

//Essa variável vai conter dois objetos que são o email e senha
            var dates = new FormData();

            dates.append('end', user);
            dates.append('passw', passw);

//Essa parte realiza a comunicação entre o js e o php. É a requisição Ajax
            $.ajax({
                url: './php/login.php',//Caminho do arquivo php que será feita a validação
                type: 'POST',
                data: dates,
                processData: false,//Ajuste do formato da requisição
                contentType: false//Tipo dos objetos enviados para a requisição
            }).done(function(valide) {
            /*O .done() cuida do que ocorre depois da requisição bem sucedida.
            Inicío da validação de acesso.*/
                if (valide.status === "Encontrado") {
                    console.log(valide.message)
                    window.location.href = './teste.html' 
                }
                else if(valide.status === "SenhaErrada"){
                    console.log(valide.message)

                    //Esconder o form por um tempo
                    let form = document.querySelector("#loginForm")
                    form.style.opacity = '0'

                    /*Quadro de aviso criado
                    Verificar se a div já existe*/
                    let advice = document.querySelector('.advice');

                    //Se não existir, cria a div e a adiciona ao body
                    if (!advice) {
                        advice = document.createElement('div');
                        advice.className = 'advice';
                        let godfather = document.querySelector("body");
                        godfather.appendChild(advice);

                        let phrase = document.createElement("p")
                        phrase.id = 'alert'
                        phrase.innerHTML = 'Senha incorreta! <br> Por favor tente de novo.'

                        advice.appendChild(phrase)
                    }
                    
                    //Fazer o form reaparecer e esconder o aviso
                    setTimeout(()=>{
                        form.style.opacity = '1'

                        advice.style.zIndex = -1
                    },5000)

                }
                else {
                  console.log(valide.message)

                //Esconder o form por um tempo
                  let form = document.querySelector("#loginForm")
                  form.style.opacity = '0'

                //Quadro de aviso criado
                  let advice = document.createElement('div')

                  advice.className = 'advice'
                  
                  let godfather = document.querySelector("body")
                  godfather.appendChild(advice)

                  let phrase = document.createElement("p")
                  phrase.id = 'alert'
                  phrase.innerHTML = 'Dados inválidos! <br> Por favor se cadastre.'

                  advice.appendChild(phrase)

                  //Fazer o form reaparecer e esconder o aviso
                  setTimeout(()=>{
                      form.style.opacity = '1'

                      advice.style.opacity = '0'
                  },5000)
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                /*O .fail() serve para mostrar o erro caso exista*/
                console.log("Erro na requisição AJAX:", textStatus, errorThrown);
            });//fail
        }
    });
});

function Register() {
     
    window.location.href = 'index.html'
    
}
