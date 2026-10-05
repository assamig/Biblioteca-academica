function RandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const numero = RandomInt(1, 10000000)


// Converte a imagem selecionada para o formato enviado junto aos dados do livro.
function converterParaBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


function ModalSucesso () {
    const modal = document.querySelector('.modal-sucesso');
    const modalId = document.getElementById('modal-sucesso')
    modalId.showModal();
    document.getElementById('resultado-modal-sucesso').innerHTML = `<p>Livro adicionado com sucesso!</p>`
    setTimeout(() =>{

            modal.classList.add('fechando');
            setTimeout(() => {
                modalId.close();
                modal.classList.remove('fechando');
            }, 2000)
        
    }, 3000)
}



function ModalErro () {
    const modal = document.querySelector('.modal-erro');
    const modalId = document.getElementById('modal-erro')
    modalId.showModal();
    document.getElementById('resultado-modal-erro').innerHTML = `<p>Erro em adicionar livro.</p>`
    setTimeout(() =>{

            modal.classList.add('fechando');
            setTimeout(() => {
                modalId.close();
                modal.classList.remove('fechando');
            }, 2000)
        
    }, 3000)
}



function ModalAvisoInfo () {
    const modal = document.querySelector('.modal-aviso-info-incomplete');
    const modalId = document.getElementById('modal-aviso-info-incomplete')
    modalId.showModal();
    document.getElementById('resultado-modal-info-incomplete').innerHTML = `<p>Informações incompletas. Preencha os campos restantes.</p>`
    setTimeout(() =>{

            modal.classList.add('fechando');
            setTimeout(() => {
                modalId.close();
                modal.classList.remove('fechando');
            }, 2000)
        
    }, 3000)
}





function ModalAvisoDel () {
    const modal = document.querySelector('.modal-del');
    const modalId = document.getElementById('modal-del')
    modalId.showModal();
    document.getElementById('resultado-modal-del').innerHTML = `<p>Livro excluído com sucesso.</p>`
    setTimeout(() =>{

            modal.classList.add('fechando');
            setTimeout(() => {
                modalId.close();
                modal.classList.remove('fechando');
            }, 2000)
        
    }, 3000)
}



function ModalSucessoAtualiza () {
    const modal = document.querySelector('.modal-filter');
    const modalId = document.getElementById('modal')
    modalId.showModal();
    document.getElementById('resultado-modal').innerHTML = `<p>Livro atualizado com sucesso!</p>`
    setTimeout(() =>{

            modal.classList.add('fechando');
            setTimeout(() => {
                modalId.close();
                modal.classList.remove('fechando');
            }, 2000)
        
    }, 3000)
}


function ModalErroAtualiza () {
    const modal = document.querySelector('.modal-info-patch-error');
    const modalId = document.getElementById('modal-patch-error')
    modalId.showModal();
    document.getElementById('resultado-patch-error').innerHTML = `<p>Erro em atualizar livro.</p>`
    setTimeout(() =>{

            modal.classList.add('fechando');
            setTimeout(() => {
                modalId.close();
                modal.classList.remove('fechando');
            }, 2000)
        
    }, 3000)
}


// Carrega os detalhes do livro antes de pedir confirmação para excluí-lo.
function PegarIdDel(id) {
    const usuarioId = sessionStorage.getItem('usuarioLogado');

    if (!usuarioId) {
        window.location.replace('../../index.html');
        return;
    }
    const modalIDInfo = document.getElementById('modal-info');
    
    const checkbox = document.querySelector('input[type="checkbox"]');

    fetch(`https://mimicry.rest/m/bibliotecaapi-aa7c3c6b/users/${encodeURIComponent(usuarioId)}/books/${encodeURIComponent(id)}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return response.json()})
    .then(data => {
        
        modalIDInfo.showModal()
        document.getElementById('resultado-modal-info').innerHTML = `
                        <div class="livros-flex-info">
                            <img src="${data.image}" height="300px" width="205px" alt="capa-livro">
                            <div class="livros-flex-info-p">
                                <div><h2>${data.title}</h2></div>
                                <div><p>Autor: ${data.author}</p></div>
                                <div><p>Ano de lançamento: ${data.year}</p></div>
                                <div><p>Genêro: ${data.genre}</p></div>
                                <div><p>Sinopse: ${data.description}</p></div>
                                <div class="flex-del-buttons">
                                    <p>Deseja excluir este livro?</p>
                                    <div class="del-buttons">
                                        <button class="ui red button" onclick="DeletarLivro('${data.id}')">SIM</button>
                                        <button class="ui blue button" id="btn-fechar">NÃO</button>
                                    </div>
                                </div>
                            <div class="livros-flex-info-p">
                        </div>`;
        if (!checkbox.checked) {
            document.querySelector('.modal-info').style.background = '#ffffff';
            document.querySelector('.livros-flex-info-p h2').style.color = 'black'
            document.querySelectorAll('.livros-flex-info-p p').forEach(elemento => {elemento.style.color = 'black'});
        } else {
            
            document.querySelector('.modal-info').style.background = '#a8a8a8';
            document.querySelector('.livros-flex-info-p h2').style.color = 'white'
            document.querySelectorAll('.livros-flex-info-p p').forEach(elemento => {elemento.style.color = 'white'});
        }
        const FecharModal = document.getElementById('btn-fechar');
        FecharModal.addEventListener('click', () => {
            modalIDInfo.close()
        })


        })    
}



// Busca os dados atuais do livro e preenche o formulário de edição no modal.
function PegarIdAtualiza(id) {
    const usuarioId = sessionStorage.getItem('usuarioLogado');

    if (!usuarioId) {
        window.location.replace('../../index.html');
        return;
    }
    const modalIDInfo = document.getElementById('modal-patch');
    
    fetch(`https://mimicry.rest/m/bibliotecaapi-aa7c3c6b/users/${encodeURIComponent(usuarioId)}/books/${encodeURIComponent(id)}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return response.json()})
    .then(data => {
        
        modalIDInfo.showModal()
        document.getElementById('resultado-modal-patch').innerHTML = `
                        <form class="ui fluid form patch-modal">
                                <div class="field patch-modal">
                                    <input type="text" placeholder="Título..." id="title" value="${data.title}">
                                    <div class="ui pointing label">
                                        Digite o título do livro
                                    </div>
                                </div>

                                <div class="field patch-modal">
                                    <input type="text" placeholder="Autor..." id="author" value="${data.author}">
                                    <div class="ui pointing label">
                                        Digite o nome do autor
                                    </div>
                                </div>

                                <div class="field patch-modal">
                                    <input type="text" placeholder="Gênero..." id="genre" value="${data.genre}">
                                    <div class="ui pointing label">
                                        Digite o gênero do livro
                                    </div>
                                </div>

                                <div class="field patch-modal">
                                    <input type="number" placeholder="Ano..." id="year" value="${data.year}">
                                    <div class="ui pointing label">
                                        Digite o ano de lançamento
                                    </div>
                                </div>

                                <div class="field patch-modal">
                                    <input type="file" accept="image/*" id="image">
                                    <div class="ui pointing label">
                                        Anexe a capa do livro
                                    </div>
                                </div>

                                <div class="field patch-modal">
                                    <textarea placeholder="Sinopse..." id="description" class="input-sinopse">${data.description}</textarea>
                                    <div class="ui pointing label">
                                        Digite a sinopse do livro
                                    </div>
                                </div>

                                <div class="patch-buttons">
                                    <div class="p-patch">
                                        <p>Deseja atualizar este livro?</p>
                                    </div>

                                    <div>
                                        <button type="button" class="ui blue button" onclick="AtualizarLivro('${data.id}')">SIM</button>
                                        <button type="button" class="ui red button" id="btn-fechar">NÃO</button>
                                    </div>

                                </div>`;
        const FecharModal = document.getElementById('btn-fechar');
        FecharModal.addEventListener('click', () => {
            modalIDInfo.close()
        })


        })    
}



    

// Valida os campos obrigatórios e envia um novo livro associado ao usuário autenticado.
async function AdicionarLivro () {

    const usuarioId = sessionStorage.getItem('usuarioLogado');

    if (!usuarioId) {
        window.location.replace('../../index.html');
        return;
    }
    const labels = document.querySelectorAll('.ui.fluid.form .field .ui.pointing.label')
    const campos = document.querySelectorAll('.ui.fluid.form .field input, .ui.fluid.form .field textarea')
    const inputsVazios = Array.from(campos).some(elemento => elemento.value.trim() === '')
    

    if (inputsVazios) {
        ModalAvisoInfo()
        campos.forEach(elemento =>
        {if (elemento.value.trim() === '') {
            elemento.parentElement.querySelector('.ui.pointing.label').style.color = 'red'
        } else { elemento.parentElement.querySelector('.ui.pointing.label').style.color = 'black'

        }}
        );
        return;
    }


    const inputImagem = document.getElementById('image');
    let imagemBase64 = "";

    if (inputImagem.files && inputImagem.files[0]) {
        imagemBase64 = await converterParaBase64(inputImagem.files[0]);
    }
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            id: `L${numero}`,
            ownerId: usuarioId,
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            genre: document.getElementById('genre').value,
            year: document.getElementById('year').value,
            image: imagemBase64,
            description: document.getElementById('description').value
            
        })

    }

    fetch(`https://mimicry.rest/m/bibliotecaapi-aa7c3c6b/users/${encodeURIComponent(usuarioId)}/books`, options)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return response.json()})
    .then(data => {

        ModalSucesso()
        labels.forEach(elemento => elemento.style.color = 'black');
        document.getElementById('title').value = ''
        document.getElementById('author').value = ''
        document.getElementById('genre').value = ''
        document.getElementById('year').value = ''
        document.getElementById('image').value = ''
        document.getElementById('description').value = ''
    })
    .catch(error => {console.error('Error', error)
        if (error) {
            ModalErro()
            labels.forEach(elemento => elemento.style.color = 'black');
            document.getElementById('title').value = ''
            document.getElementById('author').value = ''
            document.getElementById('genre').value = ''
            document.getElementById('year').value = ''
            document.getElementById('image').value = ''
            document.getElementById('description').value = ''
        }
    })


}


// Envia apenas os campos editáveis; mantém a imagem existente quando não há novo arquivo.
async function AtualizarLivro(id) {
    const usuarioId = sessionStorage.getItem('usuarioLogado');

    if (!usuarioId) {
        window.location.replace('../../index.html');
        return;
    }
    

    const inputImagem = document.getElementById('image');
    let imagemBase64 = "";

    if (inputImagem.files && inputImagem.files[0]) {
        imagemBase64 = await converterParaBase64(inputImagem.files[0]);
    }
    

    const payload = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        genre: document.getElementById('genre').value,
        year: document.getElementById('year').value,
        description: document.getElementById('description').value
    };

    if (inputImagem.files && inputImagem.files[0]) {
        payload.image = imagemBase64;
    }

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(payload)

    }

    fetch(`https://mimicry.rest/m/bibliotecaapi-aa7c3c6b/users/${encodeURIComponent(usuarioId)}/books/${encodeURIComponent(id)}`, options)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return response.json()})
    .then(data => {

        ModalSucessoAtualiza()
        document.getElementById('title').value = ''
        document.getElementById('author').value = ''
        document.getElementById('genre').value = ''
        document.getElementById('year').value = ''
        document.getElementById('image').value = ''
        document.getElementById('description').value = ''

        setTimeout(() => {
            location.reload();
    }, 2000)
    })
    .catch(error => {console.error('Error', error)
        if (error) {
            ModalErroAtualiza()
            document.getElementById('title').value = ''
            document.getElementById('author').value = ''
            document.getElementById('genre').value = ''
            document.getElementById('year').value = ''
            document.getElementById('image').value = ''
            document.getElementById('description').value = ''
        }
    })


}












// Exclui o livro e só confirma a operação após uma resposta HTTP bem-sucedida.
function DeletarLivro(id) {
    const usuarioId = sessionStorage.getItem('usuarioLogado');

    if (!usuarioId) {
        window.location.replace('../../index.html');
        return;
    }
    
    fetch(`https://mimicry.rest/m/bibliotecaapi-aa7c3c6b/users/${encodeURIComponent(usuarioId)}/books/${encodeURIComponent(id)}`, {
        'method': 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
    })
    .then(data => {
        ModalAvisoDel();
        console.log(id)

        setTimeout(() => {
            location.reload();
    }, 2500)
    })

    .catch(error => {console.error('Error:', error)})

}



// A navegação preserva o filtro ativo; sem termo de busca, carrega a lista CRUD completa.
function BotaoProximoDel() {
    page++;
    document.getElementById('SearchInput').value.trim() ? PesquisarDel() : FazerRequisicaoDel();
    
}

function BotaoAnteriorDel() {
    page--;
    document.getElementById('SearchInput').value.trim() ? PesquisarDel() : FazerRequisicaoDel();
    
}



function BotaoProximoPatch() {
    page++;
    document.getElementById('SearchInput').value.trim() ? PesquisarAtualizar() : FazerRequisicaoAtualiza();
    
}

function BotaoAnteriorPatch() {
    page--;
    document.getElementById('SearchInput').value.trim() ? PesquisarAtualizar() : FazerRequisicaoAtualiza();
    
}

// Obtém a página da lista usada pela tela de exclusão e cria seus controles de navegação.
function FazerRequisicaoDel() {
    const usuarioId = sessionStorage.getItem('usuarioLogado');

    if (!usuarioId) {
        window.location.replace('../../index.html');
        return;
    }
    
    fetch(`https://mimicry.rest/m/bibliotecaapi-aa7c3c6b/users/${encodeURIComponent(usuarioId)}/books?limit=${limit}&page=${page}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return response.json()})
    .then(data => {
        if (data.data.length === 0) {
            document.getElementById('erro').innerHTML = `<h3>Sem livros para exibir.</h3>`
        } else {
            document.getElementById('erro').innerText = '';
            document.getElementById('resultado-container').innerHTML = `
            <div class="show-page">Exibindo livros de ${(page -1) * limit} até ${page * limit}</div>

            <div class="ui centered grid">
                ${data.data.map(livro => 
                    `<div class="four wide computer eight wide mobile column">
                        <div class="livro-card">
                            <div class="livro-info">
                                <img src="${livro.image}" height="300px" width="205px" alt="capa-livro">
                                <p>${livro.title}</p>
                                <p>${livro.author}</p>
                                <p>${livro.year}</p>
                                <button class="ui inverted red small button" onclick="PegarIdDel('${livro.id}')">EXCLUIR</button>
                            </div>
                        </div>
                    
                    </div>
                `
                ).join('')}
            </div> 
            
            <div class="page-button">
                <button class="ui violet button" ${page === 1 ? 'disabled' : ''} onclick="BotaoAnteriorDel()">Anterior</button>
                <button class="ui violet button"  ${page * limit >= data.meta.total ? 'disabled' : ''} onclick="BotaoProximoDel()">Próximo</button>
            </div>`;
    }})

    .catch(error => {
        console.error("Erro:", error)
        if (error) {
            document.getElementById('erro').innerHTML = `<h3 style="color: red;">Erro em carregar livros</h3>`
            document.getElementById('resultado-container').innerText = ''
        }
    })

}



// Obtém a página da lista usada pela tela de atualização e cria seus controles de navegação.
function FazerRequisicaoAtualiza() {

    const usuarioId = sessionStorage.getItem('usuarioLogado');

    if (!usuarioId) {
        window.location.replace('../../index.html');
        return;
    }
    

    fetch(`https://mimicry.rest/m/bibliotecaapi-aa7c3c6b/users/${encodeURIComponent(usuarioId)}/books?limit=${limit}&page=${page}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return response.json()})
    .then(data => {
        if (data.data.length === 0) {
            document.getElementById('erro').innerHTML = `<h3>Sem livros para exibir.</h3>`
        } else {
            document.getElementById('erro').innerText = '';
            document.getElementById('resultado-container').innerHTML = `
            <div class="show-page">Exibindo livros de ${(page -1) * limit} até ${page * limit}</div>

            <div class="ui centered grid">
                ${data.data.map(livro => 
                    `<div class="four wide computer eight wide mobile column">
                        <div class="livro-card">
                            <div class="livro-info">
                                <img src="${livro.image}" height="300px" width="205px" alt="capa-livro">
                                <p>${livro.title}</p>
                                <p>${livro.author}</p>
                                <p>${livro.year}</p>
                                <button class="ui inverted green small button patch-book" onclick="PegarIdAtualiza('${livro.id}')">ATUALIZAR</button>
                            </div>
                        </div>
                    
                    </div>
                `
                ).join('')}
            </div> 
            
            <div class="page-button">
                <button class="ui violet button" ${page === 1 ? 'disabled' : ''} onclick="BotaoAnteriorPatch()">Anterior</button>
                <button class="ui violet button"  ${page * limit >= data.meta.total ? 'disabled' : ''} onclick="BotaoProximoPatch()">Próximo</button>
            </div>`;
    }})

    .catch(error => {
        console.error("Erro:", error)
        if (error) {
            document.getElementById('erro').innerHTML = `<h3 style="color: red;">Erro em carregar livros</h3>`
            document.getElementById('resultado-container').innerText = ''
        }
    })

}
