
// Encaminha a busca da tela de exclusão para o filtro ativo ou pesquisa geral.
async function PesquisarDel() {
    

    const input = document.getElementById('SearchInput').value;
    const inputVazio = document.getElementById('SearchInput').value == ''

    if (inputVazio) {
        FazerRequisicaoDel()
    }


    if (filtrosPegosDel === 'titleSearchFilter') {
        await BuscarPorTituloDel(input)
        return
    }

    if (filtrosPegosDel === 'authorSearchFilter') {
        await BuscarPorAutorDel(input)
        return
    }

    if (filtrosPegosDel === 'genreSearchFilter') {
        await BuscarPorGeneroDel(input)
        return
    }

    if (filtrosPegosDel === 'yearSearchFilter') {
        await BuscarPorAnoDel(input)
        return
    }

    

    

    //A partir daqui se apertar em todas as categorias limpa a variavel de filtros pegos e começa
    //a fazer requisição geral de acordo com a entrada
    if (filtrosPegosDel === 'allSearchFilter') {
        filtrosPegosDel = ''
    }

    const ProcurarTitulo = await BuscarPorTituloDel(input) 
    if (ProcurarTitulo === true) {
        return;
    }

    const ProcurarAutor = await BuscarPorAutorDel(input) 
    if (ProcurarAutor === true) {
        return;
    }

    const ProcurarGen = await BuscarPorGeneroDel(input) 
    if (ProcurarGen === true) {
        return;
    }

    
    


}



let filtrosPegosDel = ''

// Guarda a categoria selecionada para reutilizá-la ao navegar entre páginas.
function PegarFiltroDel(filtro) {
    filtrosPegosDel = filtro.id;
}





// Cada busca filtra a página consultada e oferece a ação de exclusão nos resultados.
function BuscarPorTituloDel(titulo) {
    
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
    
function BuscarPorGeneroDel(genero) {

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


function BuscarPorAutorDel(autor) {

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


function BuscarPorAnoDel(ano) {

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



