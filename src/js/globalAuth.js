const toggle = document.getElementById('userIcon');
const usuarioLogado = sessionStorage.getItem('usuarioLogado');

// As páginas CRUD dependem da sessão criada no login; sem ela, retorna-se à entrada.
if (!usuarioLogado) {
    window.location.replace("../../index.html");
}





// Carrega perfil e total de livros para compor o modal da conta.
function ModalInfoUser() {
    const usuarioId = sessionStorage.getItem('usuarioLogado');

    if (!usuarioId) {
        window.location.replace('../../index.html');
        return;
    }
    const modalIDInfo = document.getElementById('modal-user-info');
    
    fetch(`https://mimicry.rest/m/bibliotecaapi-aa7c3c6b/users/${encodeURIComponent(usuarioId)}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return response.json()})
    .then(async data => {
        const resposta = await fetch(`https://mimicry.rest/m/bibliotecaapi-aa7c3c6b/users/${encodeURIComponent(usuarioId)}/books?limit=${limit}&page=${page}`);
        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const livros = await resposta.json()
        const totalLivrosUser = livros.meta.total;



        
        modalIDInfo.showModal()
        document.getElementById('resultado-user-info').innerHTML = `
                        <form class="ui fluid form user-info-modal">
                                <div>
                                    <div class="user-info">
                                        <h2>Olá ${data.first_name} ${data.last_name}!</h2>
                                        <p>Total de livros cadastrados: ${totalLivrosUser}</p>
                                        <p>Email: ${data.email} </p>
                                    </div>

                                    <div class="buttons-logout">
                                        <button type="button" class="ui purple button" onclick="ConfirmarLogout()">SAIR</button>
                                        <button type="button" class="ui blue button" id="btn-fechar-info">VOLTAR PARA PÁGINA</button>
                                    </div>

                                </div>`;
        const FecharModal = document.getElementById('btn-fechar-info');
        FecharModal.addEventListener('click', () => {
            modalIDInfo.close()
        })

})    
}







// Encerra a sessão local antes de voltar para a tela de login.
function ConfirmarLogout() {
    const usuarioId = sessionStorage.getItem('usuarioLogado');

    if (!usuarioId) {
        window.location.replace('../../index.html');
        return;
    }
    const modalIDInfo = document.getElementById('modal-confirm-logout');
         
        modalIDInfo.showModal()
        document.getElementById('resultado-confirm-logout').innerHTML = `
                        <form class="ui fluid form logout-user">
                                    <p>Deseja sair da conta?</p>
                                    <div class="buttons-logout-confirm">
                                        <button type="button" class="ui blue button" id="confirm-button">SIM</button>
                                        <button type="button" class="ui red button" id="cancelar-logout">NÃO</button>
                                    </div>`

        
        const confirmar = document.getElementById('confirm-button');
        
        confirmar.addEventListener('click', () => {
            sessionStorage.removeItem('usuarioLogado')
            window.location.replace("../../index.html");
        })
        

        const FecharModal = document.getElementById('cancelar-logout');
        FecharModal.addEventListener('click', () => {
            modalIDInfo.close()
        })

    }




if (toggle) {
    toggle.addEventListener('click', () => {
    ModalInfoUser()
})
}
