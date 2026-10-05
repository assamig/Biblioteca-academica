
// Encaminha a busca da tela de atualização para o filtro ativo ou pesquisa geral.
async function PesquisarAtualizar() {
    

    const input = document.getElementById('SearchInput').value;
    const inputVazio = document.getElementById('SearchInput').value == ''

    if (inputVazio) {
        FazerRequisicaoAtualiza()
    }


    if (filtrosPegosAtualiza === 'titleSearchFilter') {
        await BuscarPorTituloAtualizar(input)
        return
    }

    if (filtrosPegosAtualiza === 'authorSearchFilter') {
        await BuscarPorAutorAtualizar(input)
        return
    }

    if (filtrosPegosAtualiza === 'genreSearchFilter') {
        await BuscarPorGeneroAtualizar(input)
        return
    }

    if (filtrosPegosAtualiza === 'yearSearchFilter') {
        await BuscarPorAnoAtualizar(input)
        return
    }

    

    

    //A partir daqui se apertar em todas as categorias limpa a variavel de filtros pegos e começa
    //a fazer requisição geral de acordo com a entrada
    if (filtrosPegosAtualiza === 'allSearchFilter') {
        filtrosPegosAtualizal = ''
    }

    const ProcurarTitulo = await BuscarPorTituloAtualizar(input) 
    if (ProcurarTitulo === true) {
        return;
    }

    const ProcurarAutor = await BuscarPorAutorAtualizar(input) 
    if (ProcurarAutor === true) {
        return;
    }

    const ProcurarGen = await BuscarPorGeneroAtualizar(input) 
    if (ProcurarGen === true) {
        return;
    }

    const ProcurarAno = await BuscarPorAnoAtualizar(input)
    if (ProcurarAno === true) {
        return;
    }


}



let filtrosPegosAtualiza = ''

// Guarda a categoria selecionada para reutilizá-la ao navegar entre páginas.
function PegarFiltroAtualiza(filtro) {
    filtrosPegosAtualiza = filtro.id;
}





// Cada busca filtra a página consultada e renderiza ações de atualização para os resultados.
function BuscarPorTituloAtualizar(titulo) {
    
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
    
function BuscarPorGeneroAtualizar(genero) {

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
                                <button class="ui inverted green small button patch-book" onclick="PegarIdAtualiza('${livro.id}')">ATUALIZAR</button>
                        </div>
                    
                    </div>
                `
                ).join('')}
            </div> 
            
            <div class="page-button">
                <button class="ui violet button" ${page === 1 ? 'disabled' : ''} onclick="BotaoAnteriorPatch()">Anterior</button>
                <button class="ui violet button"  ${page * limit >= data.meta.total ? 'disabled' : ''} onclick="BotaoProximoPatch()">Próximo</button>
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


function BuscarPorAutorAtualizar(autor) {


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


function BuscarPorAnoAtualizar(ano) {


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



