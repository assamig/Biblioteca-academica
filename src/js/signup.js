function RandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const numero = RandomInt(1, 1000000)



function ModalSucessoSignup () {
    const modal = document.querySelector('.modal-signup');
    const modalId = document.getElementById('modal-signup')
    modalId.showModal();
    document.getElementById('resultado-modal-signup').innerHTML = `<p>Usuário cadastrado com sucesso! Faça seu login para entrar.</p>`
    setTimeout(() =>{

            modal.classList.add('fechando');
            setTimeout(() => {
                modalId.close();
                modal.classList.remove('fechando');
            }, 3000)
        
    }, 3000)
}


function ModalAvisoSignup () {
    const modal = document.querySelector('.modal-signup-alert');
    const modalId = document.getElementById('modal-signup-alert')
    modalId.showModal();
    document.getElementById('resultado-modal-signup-alert').innerHTML = `<p>Informações incompletas. Preencha os campos restantes.</p>`
    setTimeout(() =>{

            modal.classList.add('fechando');
            setTimeout(() => {
                modalId.close();
                modal.classList.remove('fechando');
            }, 2000)
        
    }, 3000)
}


function ModalErroSignup () {
    const modal = document.querySelector('.modal-signup-error');
    const modalId = document.getElementById('modal-signup-error')
    modalId.showModal();
    document.getElementById('resultado-modal-signup-error').innerHTML = `<p>Erro em fazer cadastro.</p>`
    setTimeout(() =>{

            modal.classList.add('fechando');
            setTimeout(() => {
                modalId.close();
                modal.classList.remove('fechando');
            }, 2000)
        
    }, 3000)
}



// Valida os campos, impede cadastro com email duplicado e só então envia o usuário à API.
async function AdicionarUsuario() {
    const labels = document.querySelectorAll('.ui.labeled.input .ui.label')
    const campos = document.querySelectorAll('.ui.labeled.input > input')
    const inputsVazios = Array.from(campos).some(elemento => elemento.value.trim() === '')
    

    if (inputsVazios) {
        ModalAvisoSignup()
        campos.forEach(elemento =>
        {if (elemento.value.trim() === '') {
            elemento.parentElement.querySelector('.ui.label').style.color = 'red'
        } else { elemento.parentElement.querySelector('.ui.label').style.color = 'black'

        }}
        );
        return;
    }




    const avisoSenha = document.getElementById('aviso_senha');
    const senha = document.getElementById('password').value;
    const senha_confirmada = document.getElementById('password_again').value;

    avisoSenha.textContent = '';

    if (senha != senha_confirmada) {
        avisoSenha.value = ''
        avisoSenha.textContent = 'A confirmação deve ser igual à senha digitada.'
        return;

    } 
    if (senha.length > 0 && senha.length < 8) {
        avisoSenha.value = ''
        avisoSenha.textContent = 'A senha deve ter pelo menos 8 caractéres'
        return;

    } 
    if (!/[A-Z]/.test(senha) || !/[0-9]/.test(senha) || !/[^A-Za-z0-9\s]/.test(senha)) {
        avisoSenha.textContent = 'A senha deve conter uma letra maiúscula, um número e um caractere especial.';
        return;

    }



    const options = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            id: `U${numero}`,
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            password_again: document.getElementById('password_again').value,
            
        })

    }
    const EmailDigitado = document.getElementById('email').value;
    const respostaUsers = (await fetch('https://mimicry.rest/m/bibliotecaapi-aa7c3c6b/users'))
        
        const usuarios = await respostaUsers.json()
        const listaUser = usuarios.data;
        const emailExiste = listaUser.some(usuario => usuario.email.trim().toLowerCase() === EmailDigitado.trim().toLowerCase());
        if (emailExiste) {
            document.getElementById('aviso_email').innerText = 'Já existe uma conta cadastrada com este email.'
            return;
        } else {
            document.getElementById('aviso_email').innerText = '';
        }


    fetch('https://mimicry.rest/m/bibliotecaapi-aa7c3c6b/users', options)
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha na requisição HTTP.');
        }
        return response.json()
    })
    .then(data => {
        document.getElementById('aviso_email').innerText = '';
            ModalSucessoSignup()
            labels.forEach(elemento => elemento.style.color = 'black');
            document.getElementById('first_name').value = ''
            document.getElementById('last_name').value = ''
            document.getElementById('email').value = ''
            document.getElementById('password').value = ''
            document.getElementById('password_again').value = ''

            setTimeout(() => {
            window.location.href =  "../../index.html";
            }, 3000)
        
    })
    .catch(error => {console.error('Error', error)
        if (error) {
            ModalErroSignup()
        }
    })


}
