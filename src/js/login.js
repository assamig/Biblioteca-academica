

let toggle = document.getElementById('toggle-senha');
let input = document.getElementById('password');

// Alterna a visibilidade da senha sem alterar o valor digitado.
toggle.addEventListener('click', () => {
    if (input.type === 'password') {
        input.type = "text";
        toggle.classList.remove('fi-rr-eye');
        toggle.classList.add('fi-rs-crossed-eye')
    } else {
        input.type = "password";
        toggle.classList.remove('fi-rs-crossed-eye');
        toggle.classList.add('fi-rr-eye')
    }
})




function ModalSucessoLogin (id) {
    const modal = document.querySelector('.modal-login-sucesso');
    const modalId = document.getElementById('modal-login-sucesso')
    modalId.showModal();
    document.getElementById('resultado-modal-sucessoLogin').innerHTML = `<p>Login realizado com sucesso! Bem vindo de volta, ${id}.</p>`
    setTimeout(() =>{

            modal.classList.add('fechando');
            setTimeout(() => {
                modalId.close();
                modal.classList.remove('fechando');
            }, 3000)
        
    }, 3000)
}




function ModalErroLogin() {
    const modal = document.querySelector('.modal-login-error');
    const modalId = document.getElementById('modal-login-error')
    modalId.showModal();
    document.getElementById('resultado-modal-errorLogin').innerHTML = `<p>Erro em fazer cadastro.</p>`
    setTimeout(() =>{

            modal.classList.add('fechando');
            setTimeout(() => {
                modalId.close();
                modal.classList.remove('fechando');
            }, 2000)
        
    }, 3000)
}


function DeletarUsuario(id) {
    fetch(`https://mimicry.rest/m/bibliotecaapi-aa7c3c6b/users/${id}`, {
        'method': 'DELETE'
    })
    .then(data => {
        console.log(id)
    })

    .catch(error => {console.error('Error:', error)})

}


// Confere as credenciais na lista de usuários e cria a sessão local ao autenticar.
function FazerLogin() {

    const emailDigitado = document.getElementById('email').value.trim().toLowerCase();
    const senhaDigitada = document.getElementById('password').value;
    const resultado = document.getElementById('resultado-login-error')

    if (!emailDigitado || !senhaDigitada) {
        resultado.innerText = 'Preencha as informações';
        return;
    }

    resultado.innerText = '';


    fetch('https://mimicry.rest/m/bibliotecaapi-aa7c3c6b/users')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        } 
        return response.json()
    })
    .then(resposta => {
        const usuarios = resposta.data;

        if (!Array.isArray(usuarios)) {
            throw new Error('Formato inesperado na resposa da API');
        }

        


        const usuario = usuarios.find(item => 
            item.email?.trim().toLowerCase() === emailDigitado &&
            item.password === senhaDigitada
        );


        if (!usuario) {
            resultado.innerText = 'Email ou senha incorretos.';
            return;
        }

        sessionStorage.setItem('usuarioLogado', usuario.id)
        document.getElementById('resultado-login-error').innerText = ''
        ModalSucessoLogin(usuario.first_name)
        setTimeout(() => {
                window.location.href =  "src/services_crud_interface/get_index.html";

            }, 2500)
        
        
        })
    

        
    .catch(error => {console.error('Error', error)
        if (error) {
            ModalErroLogin()
        }
    })

}
