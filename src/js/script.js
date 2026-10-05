let page = 1;
let limit = 10;

// Direciona a busca para a categoria escolhida; sem categoria, tenta os campos em sequência.
async function Pesquisar() {
    

    const input = document.getElementById('SearchInput').value;
    const inputVazio = document.getElementById('SearchInput').value == ''

    if (inputVazio) {
        FazerRequisicao()
    }


    if (filtrosPegos === 'titleSearchFilter') {
        await BuscarPorTitulo(input)
        return
    }

    if (filtrosPegos === 'authorSearchFilter') {
        await BuscarPorAutor(input)
        return
    }

    if (filtrosPegos === 'genreSearchFilter') {
        await BuscarPorGenero(input)
        return
    }

    if (filtrosPegos === 'yearSearchFilter') {
        await BuscarPorAno(input)
        return
    }

    

    

    //A partir daqui se apertar em todas as categorias limpa a variavel de filtros pegos e começa
    //a fazer requisição geral de acordo com a entrada
    if (filtrosPegos === 'allSearchFilter') {
        filtrosPegos = ''
    }

    const ProcurarTitulo = await BuscarPorTitulo(input) 
    if (ProcurarTitulo === true) {
        return;
    }

    const ProcurarAutor = await BuscarPorAutor(input) 
    if (ProcurarAutor === true) {
        return;
    }

    const ProcurarGen = await BuscarPorGenero(input) 
    if (ProcurarGen === true) {
        return;
    }

    
    


}



let filtrosPegos = ''

// Mantém o identificador do filtro selecionado para as buscas e a paginação.
function PegarFiltro(filtro) {
    filtrosPegos = filtro.id;
}


    
    



// Persiste o tema e aplica as cores correspondentes à página atual.
function TemaEscuro(estado) {
    const checkbox = estado.querySelector('input[type="checkbox"]');
    localStorage.setItem('tema', checkbox.checked ? 'escuro' : 'claro');
    
    
    let icone = document.querySelector('.fi-rr-moon');
    let icone2 = document.querySelector('.fi-rr-sun')
    if (!checkbox.checked) {
        document.body.classList.remove('tema-escuro'),
        document.body.style.setProperty(
            "background",
            "linear-gradient(to right, rgb(206, 206, 206), rgb(153, 153, 153))",
            "important"
        );
        document.querySelector('.ui.segment.faixa').style.background = 'rgb(233, 233, 233)';
        document.querySelector('.ui.menu').style.setProperty(
            "background",
            "#f7f7f7ec",
            "important"
        );
        document.querySelector('.container.bottom .ui.menu').style.setProperty(
            "background",
            "rgb(233, 233, 233)",
            "important"
        );
        document.querySelectorAll('.item-links a').forEach(elemento => {elemento.style.color = 'rgb(56, 56, 56)'});
        document.querySelector('.ui.segment.faixa .header.item-top').style.color = 'rgb(56, 56, 56)';
        document.querySelector('.ui.menu .header.item').style.color = 'rgb(5, 5, 5)';
        document.querySelector('.fi.fi-rs-book-alt').style.color = 'rgb(20, 20, 20)';
        document.querySelector('.footer-info p').style.color = 'rgb(0, 0, 0)';
        document.querySelectorAll('.top-content').forEach(elemento => {elemento.style.color = 'rgb(0, 0, 0)'});
        icone2?.classList.replace('fi-rr-sun', 'fi-rr-moon');
        if (icone2) {
            icone2.style.animation = 'none';
            setTimeout(() => {icone2.style.animation = 'rotateUp 1s'}, 10)
        };


        
        

    } else {
       document.body.classList.add('tema-escuro'),
       document.body.style.setProperty(
        "background",
        "linear-gradient(to right, rgb(39, 39, 39), rgb(94, 59, 97))",
        "important"
        );
        document.querySelector('.ui.segment.faixa').style.background = 'rgb(59, 59, 59)';
        document.querySelector('.ui.menu').style.setProperty(
            "background",
            "#444343ec",
            "important"
        );
        document.querySelector('.container.bottom .ui.menu').style.setProperty(
            "background",
            "rgb(59, 59, 59)",
            "important"
        );
        document.querySelectorAll('.item-links a').forEach(elemento => {elemento.style.color = 'rgb(255, 255, 255)'});
        document.querySelector('.ui.segment.faixa .header.item-top').style.color = 'rgb(255, 255, 255)';
        document.querySelector('.ui.menu .header.item').style.color = 'rgb(255, 255, 255)';
        document.querySelector('.fi.fi-rs-book-alt').style.color = 'rgb(255, 255, 255)';
        document.querySelector('.footer-info p').style.color = 'rgb(255, 255, 255)';
        icone?.classList.replace('fi-rr-moon', 'fi-rr-sun');
        if (icone) {
            icone.style.animation = 'none';
            setTimeout(() => {icone.style.animation = 'rotateDown 1s'}, 10);
        };
        document.querySelectorAll('.top-content').forEach(elemento => {elemento.style.color = 'rgb(255, 255, 255)'})
        
        
        

        
    }
}

    document.addEventListener('click', function(click) {
    const toggle = click.target.closest('.ui.toggle.checkbox');
    if (toggle) {
        const checkbox = toggle.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
        toggle.classList.toggle('checked', checkbox.checked);
        TemaEscuro(toggle);
    }
    });

    const TemaSalvo = localStorage.getItem('tema');
    const estado = document.querySelector('.ui.toggle.checkbox');
    if (TemaSalvo === 'claro') {
        estado.classList.add('checked');
        document.querySelector('.ui.toggle.checkbox input[type="checkbox"]').checked = false;
        
        

    } else {
        estado.classList.remove('checked');
        document.querySelector('.ui.toggle.checkbox input[type="checkbox"]').checked = true;
        


    }
    TemaEscuro(estado)

    
    
function Modal() {
    if (elemento.id === "allSearchFilter") {
        const modal = document.querySelector('.modal-filter');
        const modalId = document.getElementById('modal')
        modalId.showModal();
        document.getElementById('resultado-modal').innerHTML = `<p>Aperte na lupa para buscar por todas as categorias</p>`
        setTimeout(() =>{

            modal.classList.add('fechando');
            setTimeout(() => {
                modalId.close();
                modal.classList.remove('fechando');
            }, 2000)
        
    }, 3000)
    }
}





    

// A navegação reaplica a busca atual quando há termo; caso contrário, carrega a página inteira.
function BotaoProximo() {
    page++;
    document.getElementById('SearchInput').value.trim() ? Pesquisar() : FazerRequisicao();
    
}

function BotaoAnterior() {
    page--;
    document.getElementById('SearchInput').value.trim() ? Pesquisar() : FazerRequisicao();
    
}









// Busca o livro do usuário e apresenta seus detalhes em um diálogo.
function PegarID(id) {
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
        } return response.json()
    })
    .then(livro => {
        if (String(livro.ownerId) !== String(usuarioId)) {
            throw new Error('Este livro não pertence ao usuário autenticado')
        }

        

        modalIDInfo.showModal()
        document.getElementById('resultado-modal-info').innerHTML = `
                        <div class="livros-flex-info">
                            <img src="${livro.image}" height="300px" width="205px" alt="capa-livro">
                            <div class="livros-flex-info-p">
                                <div><h2>${livro.title}</h2></div>
                                <div><p>Autor: ${livro.author}</p></div>
                                <div><p>Ano de lançamento: ${livro.year}</p></div>
                                <div><p>Genêro: ${livro.genre}</p></div>
                                <div><p>Sinopse: ${livro.description}</p></div>
                                <button class="ui red button fechar-modal" id="btn-fechar">FECHAR</button>
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




// Busca a página atual dos livros do usuário e renderiza lista, estado vazio e navegação.
function FazerRequisicao() {
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
        return response.json()
    }
        
    )
    .then(data => {
        if (!Array.isArray(data.data)) {
            new Error('Formato inesperado na resposta da API.')
        }

        const livrosRastreados = data.data.filter(
            livro => String(livro.ownerId) === String(usuarioId)
        );

        if (livrosRastreados.length === 0) {
            document.getElementById('erro').innerHTML = `<h3>Sem livros para exibir.</h3>`
            document.getElementById('resultado-container').innerHTML = '';
            return;
        } else {
            document.getElementById('erro').innerText = '';
            document.getElementById('resultado-container').innerHTML = `
            <div class="show-page">Exibindo livros de ${(page -1) * limit} até ${page * limit}</div>

            <div class="ui centered grid">
                ${livrosRastreados.map(livro => 
                    `<div class="four wide computer eight wide mobile column">
                        <div class="livro-card">
                            <div class="livro-info">
                                <img src="${livro.image}" height="300px" width="205px" alt="capa-livro">
                                <p>${livro.title}</p>
                                <p>${livro.author}</p>
                                <p>${livro.year}</p>
                                <button class="ui inverted teal small button card-info" onclick="PegarID('${livro.id}')">MAIS INFORMAÇÕES</button>
                            </div>
                        </div>
                    
                    </div>
                `
                ).join('')}
            </div> 
            
            <div class="page-button">
                <button class="ui violet button" ${page === 1 ? 'disabled' : ''} onclick="BotaoAnterior()">Anterior</button>
                <button class="ui violet button"  ${page * limit >= data.meta.total ? 'disabled' : ''} onclick="BotaoProximo()">Próximo</button>
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



// Os filtros consultam a página atual e exibem somente os livros que correspondem ao campo.
function BuscarPorTitulo(titulo) {
    const usuarioId = sessionStorage.getItem('usuarioLogado');
    if (!usuarioId) {
        window.location.replace('../../index.html');
        return;
    }
    
    return fetch(`https://mimicry.rest/m/bibliotecaapi-aa7c3c6b/users/${encodeURIComponent(usuarioId)}/books?limit=${limit}&page=${page}`)
    .then(response => response.json())
    .then(data => {
        const livrosFiltrados = data.data.filter(livros => livros.title.toLowerCase().startsWith(titulo.toLowerCase()));
        if (livrosFiltrados.length === 0) {
            document.getElementById('erro').innerHTML = `<h3>Livro não encontrado.</h3>`
            document.getElementById('resultado-container').innerText = ''
            return false;
        } else {
            document.getElementById('erro').innerText = '';
            document.getElementById('resultado-container').innerHTML = `
            <div class="show-page">Exibindo livros de ${(page -1) * limit} até ${page * limit}</div>

            <div class="ui centered grid">
                ${livrosFiltrados.map(livro => 
                    `<div class="four wide computer eight wide mobile column">
                        <div class="livro-card">
                            <div class="livro-info">
                                <img src="${livro.image}" height="300px" width="205px" alt="capa-livro">
                                <p>${livro.title}</p>
                                <p>${livro.author}</p>
                                <p>${livro.year}</p>
                                <button class="ui inverted teal small button card-info" onclick="PegarID('${livro.id}')">MAIS INFORMAÇÕES</button>
                            </div>
                        </div>
                    
                    </div>
                `
                ).join('')}
            </div> 
            
            <div class="page-button">
                <button class="ui violet button" ${page === 1 ? 'disabled' : ''} onclick="BotaoAnterior()">Anterior</button>
                <button class="ui violet button"  ${page * limit >= data.meta.total ? 'disabled' : ''} onclick="BotaoProximo()">Próximo</button>
            </div>`
            return true;
        



    }})

    
    .catch(error => {
        console.error("Erro:", error)
        if (error) {
            document.getElementById('erro').innerHTML = `<h3 style="color: red;">Erro em carregar livros</h3>`
            document.getElementById('resultado-container').innerText = ''
        }
    })





}
    
function BuscarPorGenero(genero) {
    const usuarioId = sessionStorage.getItem('usuarioLogado');
    if (!usuarioId) {
        window.location.replace('../../index.html');
        return;
    }

    return fetch(`https://mimicry.rest/m/bibliotecaapi-aa7c3c6b/users/${encodeURIComponent(usuarioId)}/books?limit=${limit}&page=${page}`)
    .then(response => response.json())
    .then(data => {
        const livrosFiltrados = data.data.filter(livro => livro.genre.toLowerCase().startsWith(genero.toLowerCase()))
        if (livrosFiltrados.length === 0) {
            document.getElementById('erro').innerHTML = `<h3>Livro não encontrado.</h3>`
            document.getElementById('resultado-container').innerText = ''
            return false

        } else {
            
            document.getElementById('erro').innerText = '';
            document.getElementById('resultado-container').innerHTML = `
            <div class="show-page">Exibindo livros de ${(page -1) * limit} até ${page * limit}</div>

            <div class="ui centered grid">
                ${livrosFiltrados.map(livro => 
                    `<div class="four wide computer eight wide mobile column">
                        <div class="livro-card">
                            <div class="livro-info">
                                <img src="${livro.image}" height="300px" width="205px" alt="capa-livro">
                                <p>${livro.title}</p>
                                <p>${livro.author}</p>
                                <p>${livro.year}</p>
                                <button class="ui inverted teal small button card-info" onclick="PegarID('${livro.id}')">MAIS INFORMAÇÕES</button>
                            </div>
                        </div>
                    
                    </div>
                `
                ).join('')}
            </div> 
            
            <div class="page-button">
                <button class="ui violet button" ${page === 1 ? 'disabled' : ''} onclick="BotaoAnterior()">Anterior</button>
                <button class="ui violet button"  ${page * limit >= data.meta.total ? 'disabled' : ''} onclick="BotaoProximo()">Próximo</button>
            </div>`
            return true;
        }})
        .catch(error => {
        console.error("Erro:", error)
        if (error) {
            document.getElementById('erro').innerHTML = `<h3 style="color: red;">Erro em carregar livros</h3>`
            document.getElementById('resultado-container').innerText = ''
        }
    })

}

function BuscarPorAutor(autor) {
    const usuarioId = sessionStorage.getItem('usuarioLogado');
    if (!usuarioId) {
        window.location.replace('../../index.html');
        return;
    }


    return fetch(`https://mimicry.rest/m/bibliotecaapi-aa7c3c6b/users/${encodeURIComponent(usuarioId)}/books?limit=${limit}&page=${page}`)
    .then(response => response.json())
    .then(data => {

        const livrosFiltrados = data.data.filter(livro => livro.author.toLowerCase().startsWith(autor.toLowerCase()))
        if (livrosFiltrados.length === 0) {
            document.getElementById('erro').innerHTML = `<h3>Livro não encontrado.</h3>`
            document.getElementById('resultado-container').innerText = ''
            return false

        } else {
            
            document.getElementById('erro').innerText = '';
            document.getElementById('resultado-container').innerHTML = `
            <div class="show-page">Exibindo livros de ${(page -1) * limit} até ${page * limit}</div>

            <div class="ui centered grid">
                ${livrosFiltrados.map(livro => 
                    `<div class="four wide computer eight wide mobile column">
                        <div class="livro-card">
                            <div class="livro-info">
                                <img src="${livro.image}" height="300px" width="205px" alt="capa-livro">
                                <p>${livro.title}</p>
                                <p>${livro.author}</p>
                                <p>${livro.year}</p>
                                <button class="ui inverted teal small button card-info" onclick="PegarID('${livro.id}')">MAIS INFORMAÇÕES</button>
                            </div>
                        </div>
                    
                    </div>
                `
                ).join('')}
            </div> 
            
            <div class="page-button">
                <button class="ui violet button" ${page === 1 ? 'disabled' : ''} onclick="BotaoAnterior()">Anterior</button>
                <button class="ui violet button"  ${page * limit >= data.meta.total ? 'disabled' : ''} onclick="BotaoProximo()">Próximo</button>
            </div>`
            return true;
        }})
        .catch(error => {
        console.error("Erro:", error)
        if (error) {
            document.getElementById('erro').innerHTML = `<h3 style="color: red;">Erro em carregar livros</h3>`
            document.getElementById('resultado-container').innerText = ''
        }
    
    })
}


function BuscarPorAno(ano) {
    const usuarioId = sessionStorage.getItem('usuarioLogado');
    if (!usuarioId) {
        window.location.replace('../../index.html');
        return;
    }


    return fetch(`https://mimicry.rest/m/bibliotecaapi-aa7c3c6b/users/${encodeURIComponent(usuarioId)}/books?limit=${limit}&page=${page}`)
    .then(response => response.json())
    .then(data => {

        const livrosFiltrados = data.data.filter(livro => livro.year.toLowerCase().startsWith(ano.toLowerCase()))
        if (livrosFiltrados.length === 0) {
            document.getElementById('erro').innerHTML = `<h3>Livro não encontrado.</h3>`
            document.getElementById('resultado-container').innerText = ''
            return false

        } else {
            
            document.getElementById('erro').innerText = '';
            document.getElementById('resultado-container').innerHTML = `
            <div class="show-page">Exibindo livros de ${(page -1) * limit} até ${page * limit}</div>

            <div class="ui centered grid">
                ${livrosFiltrados.map(livro => 
                    `<div class="four wide computer eight wide mobile column">
                        <div class="livro-card">
                            <div class="livro-info">
                                <img src="${livro.image}" height="300px" width="205px" alt="capa-livro">
                                <p>${livro.title}</p>
                                <p>${livro.author}</p>
                                <p>${livro.year}</p>
                                <button class="ui inverted teal small button card-info" onclick="PegarID('${livro.id}')">MAIS INFORMAÇÕES</button>
                            </div>
                        </div>
                    
                    </div>
                `
                ).join('')}
            </div> 
            
            <div class="page-button">
                <button class="ui violet button" ${page === 1 ? 'disabled' : ''} onclick="BotaoAnterior()">Anterior</button>
                <button class="ui violet button"  ${page * limit >= data.meta.total ? 'disabled' : ''} onclick="BotaoProximo()">Próximo</button>
            </div>`
            return true;
        }})
        .catch(error => {
        console.error("Erro:", error)
        if (error) {
            document.getElementById('erro').innerHTML = `<h3 style="color: red;">Erro em carregar livros</h3>`
            document.getElementById('resultado-container').innerText = ''
        }
    
    })
}