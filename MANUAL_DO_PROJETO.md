# Manual do projeto — Biblioteca Acadêmica

## 1. Visão geral

Esta é a Biblioteca Acadêmica, uma aplicação web que simula a gestão de uma coleção pessoal de livros. O usuário pode criar uma conta, entrar no sistema e realizar as operações CRUD (Create, Read, Update e Delete) sobre os livros associados à sua conta. Também há pesquisa por campos, paginação, exibição de detalhes e alternância entre tema claro e escuro.

O projeto usa HTML, CSS e JavaScript no navegador, sem framework de aplicação ou processo de build próprio. A interface utiliza Semantic UI, jQuery e ícones Flaticon carregados externamente.

## 2. Acesso e execução

- **Acesso online:** EM ANEXO
- **Execução local:** abra `index.html`, localizado na raiz, em um navegador moderno.
- **Conectividade:** mesmo em execução local, é necessário acesso à internet para obter Semantic UI, jQuery, os ícones e os dados da API Mimicry.

## 3. Persistência e API

Para a persistência escolhi a API do Mimicry com o objetivo de ser algo mais didático e simples, já que o Mimicry entrega pronta a capacidade de criar um projeto CRUD simples. Este projeto foi feito de forma didática para simular uma necessidade real: um CRUD com interface web.

Os scripts usam a base:

```text
https://mimicry.rest/m/bibliotecaapi-aa7c3c6b
```

As operações principais seguem estes caminhos:

| Operação | Método e caminho utilizado |
|---|---|
| Listar livros do usuário | `GET /users/{usuarioId}/books?limit={limit}&page={page}` |
| Obter um livro | `GET /users/{usuarioId}/books/{livroId}` |
| Adicionar livro | `POST /users/{usuarioId}/books` |
| Atualizar livro | `PATCH /users/{usuarioId}/books/{livroId}` |
| Excluir livro | `DELETE /users/{usuarioId}/books/{livroId}` |
| Listar usuários | `GET /users` |
| Obter perfil | `GET /users/{usuarioId}` |
| Criar conta | `POST /users` |
| Alterar senha | `PATCH /users/{usuarioId}` |

As respostas de listagem de usuários e livros são tratadas como objetos que contêm arrays em `data`. A listagem de livros também utiliza `meta.total` para determinar se existe uma próxima página. Os registros de livro incluem campos como `id`, `ownerId`, `title`, `author`, `genre`, `year`, `image` e `description`; a conta contém identificador, nome, email e campos de senha usados pela aplicação.

O identificador da conta autenticada é mantido em `sessionStorage` na chave `usuarioLogado`. A escolha de `sessionStorage` mantém esse identificador durante a sessão da aba; o tema escolhido é salvo em `localStorage`, na chave `tema`.

> **Escopo didático:** a autenticação e a autorização são implementadas no cliente e os dados são lidos pela aplicação no navegador. Isso demonstra o fluxo de uma interface CRUD, mas não substitui autenticação segura e autorização no servidor para um sistema de produção.

## 4. Percurso do usuário

### 4.1 Cadastro

1. Na tela inicial, o visitante segue o link de registro.
2. O formulário solicita nome, sobrenome, email, senha e confirmação.
3. O JavaScript verifica campos obrigatórios, igualdade entre senhas, comprimento mínimo e presença de maiúscula, número e caractere especial.
4. Antes do cadastro, consulta os usuários existentes para impedir que o mesmo email seja usado novamente.
5. Se o email estiver livre, envia os dados à API e apresenta o resultado.

### 4.2 Login e saída

1. O login valida que email e senha foram preenchidos.
2. Consulta os usuários e compara email (sem diferença entre maiúsculas/minúsculas) e senha.
3. Ao autenticar, guarda o ID do usuário em `sessionStorage` e navega para a listagem de livros.
4. Nas páginas CRUD, `globalAuth.js` redireciona visitantes sem sessão para a tela inicial.
5. O ícone de usuário abre o perfil e a opção de saída. Ao confirmar, remove o ID da sessão e retorna ao login.

### 4.3 Consulta, pesquisa e paginação

A listagem padrão solicita 10 livros por página, começando em `page = 1`. Cada livro é exibido em um cartão. A ação de detalhes consulta o registro individual e apresenta seus campos em um diálogo.

Os filtros disponíveis são título, autor, gênero e ano. A pesquisa sem categoria percorre campos em sequência, conforme implementado em cada tela. Os filtros são aplicados no navegador aos livros recebidos da página atual da API; portanto, a pesquisa não representa necessariamente uma busca global em todas as páginas do servidor.

Os botões Anterior e Próximo atualizam o número da página e fazem nova solicitação. Nas telas de exclusão e atualização, handlers próprios mantêm a operação associada à tela; quando há um termo no campo, tentam reaplicar a pesquisa atual.

### 4.4 Criação, atualização e exclusão

- **Adicionar:** a tela exige os campos do formulário. Se houver uma imagem, ela é convertida para Base64 antes do envio. A API recebe o novo livro com `ownerId` associado à sessão atual.
- **Atualizar:** a tela carrega os livros disponíveis para edição. Ao selecionar um, abre um formulário preenchido com seus dados. A imagem é incluída na atualização apenas quando um novo arquivo é escolhido; sem novo arquivo, o valor existente é preservado pela API.
- **Excluir:** a tela mostra os livros e solicita confirmação por meio de um diálogo com detalhes. A exclusão só apresenta confirmação de sucesso após uma resposta HTTP aceita; em seguida, a página é recarregada.

### 4.5 Redefinição de senha

O visitante informa email, nova senha e confirmação. O JavaScript aplica os mesmos requisitos básicos de senha do cadastro, consulta a lista de usuários, localiza o email e envia uma atualização `PATCH` para o usuário encontrado. A interface mostra o resultado e, em caso de sucesso, retorna ao login.

## 5. Organização dos arquivos

### Páginas HTML

| Caminho | Responsabilidade |
|---|---|
| `index.html` | Entrada do sistema e formulário de login. |
| `src/services_login_interface/signup.html` | Formulário de criação de conta. |
| `src/services_login_interface/forgout.html` | Formulário de redefinição de senha. |
| `src/services_crud_interface/get_index.html` | Listagem, pesquisa e detalhes dos livros. |
| `src/services_crud_interface/create.html` | Formulário para adicionar livro. |
| `src/services_crud_interface/patch.html` | Listagem, pesquisa e edição de livros. |
| `src/services_crud_interface/delete.html` | Listagem, pesquisa e exclusão de livros. |

As páginas carregam os arquivos JavaScript necessários por meio de elementos `<script>`. `script.js` fornece funções e estado compartilhados para várias telas. As páginas CRUD carregam também `main_crud.js` e o arquivo de busca pertinente; telas autenticadas carregam `globalAuth.js`. Os diálogos HTML fornecem elementos que os scripts preenchem dinamicamente.

### Arquivos JavaScript

#### `src/js/login.js`

Controla o formulário de login. Alterna a visibilidade do campo de senha, consulta `/users`, valida o formato esperado (`resposta.data`), compara email e senha, grava `usuarioLogado` em `sessionStorage` e redireciona após a autenticação. Também apresenta diálogos de sucesso e erro.

#### `src/js/signup.js`

Implementa o cadastro. Faz validações locais, consulta a lista atual de usuários, compara emails sem diferenciar maiúsculas e minúsculas, e envia o novo registro com `POST`. O ID enviado é gerado pelo helper `RandomInt`. Também controla os diálogos de sucesso, campos incompletos e falha.

#### `src/js/forgoutPassword.js`

Implementa a redefinição de senha. Valida os campos, procura o usuário pelo email e envia o novo valor por `PATCH`. Mantém separados os avisos de email inexistente, erro de conexão, falha na atualização e sucesso.

#### `src/js/globalAuth.js`

É compartilhado pelas telas autenticadas. Verifica se há `usuarioLogado` ao carregar a página; fornece o modal de perfil, que consulta o usuário e o total de livros; e implementa a confirmação de logout removendo a chave da sessão.

#### `src/js/script.js`

Contém comportamento compartilhado da interface:

- estado global de paginação (`page`, iniciando em 1, e `limit`, igual a 10);
- encaminhamento das pesquisas e armazenamento da categoria selecionada;
- tema claro/escuro, evento do controle de alternância e persistência em `localStorage`;
- handlers de paginação da listagem padrão;
- consulta de detalhes de livro;
- carregamento da listagem padrão;
- filtros por título, gênero, autor e ano, com renderização dos resultados.

Nas telas que também carregam scripts CRUD, este arquivo é carregado antes deles, permitindo que compartilhem o estado de paginação e as funções de tema.

#### `src/js/main_crud.js`

Concentra as operações CRUD sobre livros e as funções de suporte a diálogos:

- `converterParaBase64` transforma arquivo de capa para envio;
- `PegarIdDel` consulta e apresenta detalhes antes da confirmação de exclusão;
- `PegarIdAtualiza` busca os dados atuais e constrói o formulário de edição;
- `AdicionarLivro`, `AtualizarLivro` e `DeletarLivro` enviam, respectivamente, `POST`, `PATCH` e `DELETE`;
- `FazerRequisicaoDel` e `FazerRequisicaoAtualiza` carregam as listagens de cada tela;
- handlers de anterior/próximo delegam à listagem correspondente e tentam reaplicar a busca se há texto no campo.

Os nomes dos handlers distintos evitam que a paginação das telas de atualização e exclusão chame por engano a listagem principal.

#### `src/js/patchSearch.js`

Controla a pesquisa da tela de atualização. Lê o campo e o filtro escolhido, chama a busca correspondente e renderiza cartões com a ação `ATUALIZAR`. Os controles de página usam `BotaoAnteriorPatch` e `BotaoProximoPatch`, definidos em `main_crud.js`.

#### `src/js/delSearch.js`

Controla a pesquisa da tela de exclusão. Segue o mesmo padrão de `patchSearch.js`, mas os cartões oferecem a ação `EXCLUIR` e a paginação usa `BotaoAnteriorDel` e `BotaoProximoDel`.

### Arquivos CSS

#### `src/css/style.css`

Folha compartilhada: estrutura vertical do documento, cabeçalho, navegação, cartões, rodapé, diálogos de detalhes e estilos de tema escuro para alguns elementos. Define animações reutilizadas. Seus breakpoints ajustam o conteúdo dos diálogos abaixo de 950 px e 450 px, e reorganizam o menu, pesquisa e controle de tema até 726 px.

#### `src/css/style_index.css`

Complementa a listagem padrão: área de pesquisa, modal de filtro, caixa principal e botão de detalhes que aparece no hover dos cartões. Reorganiza a área de pesquisa em telas até 726 px.

#### `src/css/style_crud.css`

Estiliza os formulários CRUD, botões de salvar/editar/excluir, mensagens e diálogos de operação, pesquisa e formulário de edição em modal. Ajusta a pesquisa abaixo de 1000 px e 960 px e permite sua expansão e quebra no menu abaixo de 726 px.

#### `src/css/style_login.css`

Define o painel de login, o ícone para mostrar/ocultar senha e diálogos de resultado. As margens laterais do painel diminuem progressivamente nos breakpoints 1300, 1200, 1115, 960 e 720 px. Também ajusta cores de título e ícones no tema escuro.

#### `src/css/style_signup.css`

Define o formulário de cadastro e diálogos de sucesso, erro e validação. Reduz as margens laterais do formulário nos breakpoints 1300, 1200, 1115, 960 e 720 px. O título do formulário recebe cor apropriada no tema escuro.

#### `src/css/style_password.css`

Estiliza os diálogos de sucesso, erro de atualização de senha e falhas de comunicação, incluindo a animação de fechamento.

#### `src/css/style_modalUser.css`

Organiza o diálogo de perfil, suas informações e botões de ação, além do diálogo de confirmação de logout. No tema escuro ajusta fundo e cor do texto; em larguras até 726 px reduz a largura dos diálogos.

## 6. Responsividade

A interface combina classes de grid do Semantic UI, Flexbox e media queries próprias. O viewport é definido nos HTML com a meta tag apropriada, e as caixas principais usam dimensões flexíveis, permitindo que o conteúdo acompanhe a largura disponível.

### Comportamento por área

- **Cabeçalho e navegação:** `style.css` permite quebra dos itens com `flex-wrap`. Até 726 px, o menu também quebra, o título reduz de tamanho e a pesquisa ganha espaço flexível; o texto do dropdown é truncado para não alargar o menu.
- **Pesquisa CRUD:** em `style_crud.css`, a distância vertical muda em telas intermediárias (1000 px e 960 px). Em dispositivos estreitos a pesquisa ocupa a linha disponível e o menu aceita quebra.
- **Cartões:** as páginas usam colunas do grid do Semantic UI (`four wide computer eight wide mobile`), oferecendo largura diferente conforme o dispositivo. Os cartões mantêm metadados e ações dentro de cada coluna.
- **Painéis de login e cadastro:** as margens são gradualmente reduzidas em breakpoints sucessivos, mantendo os formulários centralizados sem depender de uma margem fixa em todos os tamanhos.
- **Detalhes e modais:** a imagem do livro tem altura ajustada abaixo de 950 px e até 450 px; em telas pequenas a grade reduz o espaçamento. O modal de perfil e logout também recebe larguras próprias até 726 px.

Os breakpoints são regras específicas da implementação atual; não representam necessariamente uma convenção universal de dispositivos.

## 7. Tema claro e escuro

O comportamento do controle de tema é implementado em `src/js/script.js`, na função `TemaEscuro`:

1. Ao alternar, o script lê o estado do checkbox e salva `escuro` ou `claro` em `localStorage` sob a chave `tema`.
2. No carregamento, recupera o valor salvo e define o checkbox.
3. Para o tema escuro, adiciona a classe `tema-escuro` ao `body`, aplica fundos escuros e cores claras a elementos do cabeçalho, links, textos e ícones.
4. Para o tema claro, remove a classe e aplica novamente fundos e cores claras.

As regras CSS usam seletores `body.tema-escuro`, distribuídos entre `style.css`, `style_login.css`, `style_signup.css` e `style_modalUser.css`. Esses seletores adaptam itens específicos, como texto da listagem, títulos de formulários, ícones e caixas do modal de perfil. Portanto, o tema é composto por regras JavaScript (alterações diretas de estilo e classe) e complementos CSS.

## 8. Dependências de interface

As páginas incluem recursos externos:

- jQuery 3.7.1;
- Semantic UI 2.5.0 e seus estilos;
- folhas de ícones Flaticon;
- API Mimicry para dados.

Uma conexão disponível é necessária para esses recursos. Se um CDN estiver indisponível, componentes visuais ou ícones podem não carregar mesmo que os arquivos HTML, CSS e JavaScript estejam locais.

## 9. Notas de comportamento e limites conhecidos

- A busca filtra os resultados da página já recebida da API; para pesquisar todo o acervo, seria necessário implementar busca no servidor ou percorrer as páginas.
- A paginação depende dos parâmetros `page` e `limit` e de `meta.total` fornecidos pela API.
- A sessão é representada por uma chave no armazenamento do navegador. A validação de sessão no cliente é útil para controlar a navegação didática, mas não constitui uma barreira de segurança do servidor.
- A conversão de imagem em Base64 facilita o envio no exemplo, mas imagens grandes aumentam o tamanho do corpo da requisição.
- Operações dependem da disponibilidade da API e da estrutura de resposta esperada pelos scripts.

## 10. Guia rápido para manutenção

1. Abra a página HTML da funcionalidade a alterar e identifique quais scripts e folhas CSS ela carrega.
2. Mantenha os caminhos relativos coerentes com a localização da página.
3. Para alterar o CRUD de livros, revise `main_crud.js` junto do HTML e do arquivo de busca da respectiva tela.
4. Para alterar a aparência compartilhada, comece por `style.css`; para uma tela específica, use a folha correspondente.
5. Ao mudar parâmetros ou formato da API, atualize os scripts que interpretam `data` e `meta.total`.
6. Teste em desktop e em larguras menores que 1000 px, 960 px, 726 px e 450 px, além de verificar ambos os temas.
