function ModalSucessoPassword () {
    const modal = document.querySelector('.modal-password_sucess');
    const modalId = document.getElementById('modal-password_sucess')
    modalId.showModal();
    document.getElementById('resultado-sucess-password').innerHTML = `<p>Senha atualizada com sucesso! Faça seu login para entrar.</p>`
    setTimeout(() =>{

            modal.classList.add('fechando');
            setTimeout(() => {
                modalId.close();
                modal.classList.remove('fechando');
            }, 3000)
        
    }, 3000)
}




function ModalErroPassword () {
    const modal = document.querySelector('.modal-password_error');
    const modalId = document.getElementById('modal-password_error')
    modalId.showModal();
    document.getElementById('resultado-error-password').innerHTML = `<p>Erro em modificar senha.</p>`
    setTimeout(() =>{

            modal.classList.add('fechando');
            setTimeout(() => {
                modalId.close();
                modal.classList.remove('fechando');
            }, 2000)
        
    }, 3000)
}


function ModalErroCatch () {
    const modal = document.querySelector('.modal-error-preven');
    const modalId = document.getElementById('modal-error-preven')
    modalId.showModal();
    document.getElementById('resultado-modal-preven-error').innerHTML = `<p>Erro. Verifique a conexão.</p>`
    setTimeout(() =>{

            modal.classList.add('fechando');
            setTimeout(() => {
                modalId.close();
                modal.classList.remove('fechando');
            }, 2000)
        
    }, 3000)
}







// Valida a nova senha, localiza a conta pelo email e atualiza sua senha na API.
async function AtualizarSenha() {


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
    const novaSenha = document.getElementById('new_password').value;
    const novaSenha_confirmada = document.getElementById('new_password_again').value;

    avisoSenha.textContent = '';

    if (novaSenha != novaSenha_confirmada) {
        avisoSenha.value = ''
        avisoSenha.textContent = 'A confirmação deve ser igual à senha digitada.'
        return;

    } 
    if (novaSenha.length > 0 && novaSenha.length < 8) {
        avisoSenha.value = ''
        avisoSenha.textContent = 'A senha deve ter pelo menos 8 caractéres'
        return;

    } 
    if (!/[A-Z]/.test(novaSenha) || !/[0-9]/.test(novaSenha) || !/[^A-Za-z0-9\s]/.test(novaSenha)) {
        avisoSenha.textContent = 'A senha deve conter uma letra maiúscula, um número e um caractere especial.';
        return;

    }


    
    const email = document.getElementById('email').value;
    // O PATCH só deve ocorrer depois de encontrar a conta correspondente ao email.
    fetch('https://mimicry.rest/m/bibliotecaapi-aa7c3c6b/users')
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha na requisição HTTP.');
        }
        return response.json()
    })
    .then(users => {
        const usuario = users.data.find(user => user.email === email);
        if (!usuario) {
            document.getElementById('aviso_email1').innerText = 'Email não encontrado, cadastre-se para criar uma senha.'
            document.getElementById('aviso_email2').innerHTML = `<a href="signup.html">Cadastre-se aqui!</a>`
            return;
        }
        const comparacaoSenhas = users.data.find(user => user.password === novaSenha);
        if (comparacaoSenhas) {
            avisoSenha.textContent = 'A nova senha não deve ser igual à senha antiga.'
            return;
        }

        const payload = {
        ...usuario,
        password: novaSenha,
        password_again: novaSenha_confirmada
        }

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }

        fetch(`https://mimicry.rest/m/bibliotecaapi-aa7c3c6b/users/${encodeURIComponent(usuario.id)}`, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha na requisição HTTP.');
            }
            return response.json()
        })
        .then(data => {
            ModalSucessoPassword()
            document.getElementById('aviso_email1').innerText = ''
            document.getElementById('aviso_email2').innerText = ''
            document.getElementById('email').value = '';
            document.getElementById('new_password').value = ''
            document.getElementById('new_password_again').value = ''

            setTimeout(() => {
                window.location.href =  "../../index.html";
            }, 3000)
        })

        .catch(error => {console.error('Error', error)
            if (error) {
            ModalErroPassword()
            }
        })
    })

    .catch(error => {console.error('Error', error)
        if (error) {
            ModalErroCatch()
        }
    })



        


        
}
