# eChamp — S10: Iteração e melhorias de UX

## Melhorias implementadas

### 1. Responsividade e navegação (Antes → Depois)
- **Antes:** em telas de até 1000 px, o menu principal da página inicial era ocultado, deixando os links de navegação indisponíveis nessa largura.
- **Depois:** o cabeçalho passa a se adaptar ao espaço disponível; os links ficam visíveis, organizados em mais de uma linha quando necessário, e os botões se ajustam em telas menores.
- **Motivação:** percepção do grupo ao revisar o comportamento em telas menores; a navegação precisa continuar acessível sem depender de uma tela grande.

### 2. Fluxo de pesquisa de campeonatos
- **Antes:** para desfazer uma pesquisa e um filtro de status, o usuário precisava apagar o campo e selecionar novamente “Todos”.
- **Depois:** foi incluído o botão **“Limpar filtros”**, que restaura a pesquisa e o status de uma só vez, atualiza a contagem de resultados e devolve o foco ao campo de pesquisa.
- **Motivação:** reduzir passos e tornar a recuperação da lista completa mais clara durante os testes de navegação.

### 3. Clareza nas mensagens de login
- **Antes:** qualquer campo vazio gerava a mesma mensagem genérica, sem indicar onde estava o problema.
- **Depois:** a tela informa se faltam usuário/e-mail, senha ou ambos; em caso de campo vazio, o foco vai para o campo que precisa de atenção. A mensagem de credenciais incorretas também orienta o usuário a conferir os dados.
- **Motivação:** percepção de melhoria na orientação ao usuário e prevenção de tentativas repetidas sem saber o que corrigir.

## Changelog e melhoria contínua
Esta entrega representa uma iteração de refinamento da versão anterior do eChamp. As mudanças foram priorizadas a partir da revisão do próprio fluxo e da percepção de usabilidade do grupo; não foi fornecido um registro formal de feedback individual da A2, então não atribuímos as mudanças a comentários específicos que não foram documentados. O backlog pode receber novos itens após testes com colegas e avaliação do professor, como aprimorar acessibilidade, testar diferentes tamanhos de tela e substituir os dados demonstrativos por integração com backend.

## Como testar
1. Abra `index.html` com o Live Server e reduza a largura do navegador para verificar o menu responsivo.
2. Acesse **Campeonatos**, pesquise um nome e selecione um status; clique em **Limpar filtros** e confira se a listagem retorna ao estado inicial.
3. Acesse **Login** e envie o formulário vazio, preencha apenas um dos campos e depois teste credenciais inválidas.
4. Acesso demonstrativo do front-end: usuário `teste`, senha `123`.

## Estrutura relevante
- `index.html` / `style.css`: página inicial e layout responsivo.
- `campeonatos.html` / `campeonatos.css` / `campeonatos.js`: listagem, busca, filtro e limpeza dos filtros.
- `login.html` / `login.css` / `login.js`: autenticação demonstrativa e mensagens de validação.
- `detalhe-campeonato.html` / `detalhe-campeonato.css` / `detalhe-campeonato.js`: detalhe do campeonato selecionado.
