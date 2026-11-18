# eChamp — S13: Banco de dados e primeiro deploy

## Escopo implementado nesta etapa
- Integração do formulário `contato.html` com Supabase (PostgreSQL gerenciado).
- Fluxo previsto: visitante preenche o formulário → JavaScript valida → Supabase grava uma linha na tabela `contatos` → interface confirma o salvamento.
- Tratamento de falha de conexão/configuração, estado de envio e mensagens de sucesso/erro.
- Script SQL em `database/supabase_schema.sql` com tabela e política RLS de inserção pública restrita.

> **Estado honesto da entrega:** o código de integração está preparado, mas a conexão real só ficará ativa depois que o grupo criar o projeto Supabase, executar o SQL e preencher `supabase-config.js` com a URL e a chave publicável do próprio projeto. Não há credenciais reais fornecidas neste pacote e, portanto, não afirmamos que o banco já esteja provisionado.

## Plataforma escolhida e justificativa
**Supabase** foi escolhido por oferecer PostgreSQL gerenciado, painel para criar tabelas e políticas de segurança (Row Level Security — RLS), além de uma API que pode ser consumida pelo front-end estático. O site pode continuar hospedado na Vercel, que já é a plataforma usada pelo grupo. Assim, a aplicação web (front-end) e o banco ficam em serviços separados.

## Configuração do banco (uma vez por projeto)
1. Criar uma conta em https://supabase.com e um projeto novo.
2. No painel do projeto, abrir o SQL Editor.
3. Copiar e executar todo o conteúdo de `database/supabase_schema.sql`.
4. Em Project Settings / API (ou Connect), copiar a Project URL e a chave **publishable** (ou a chave `anon` legada).
5. Abrir `supabase-config.js` e substituir os dois textos `COLE_AQUI...` pelos valores do projeto.
6. Salvar e testar o formulário de contato. A mensagem de sucesso só deve aparecer após a gravação ser confirmada.
7. No Table Editor, abrir `contatos` e confirmar que a linha foi criada.

**Segurança:** nunca usar nem publicar a chave `service_role`/secret. A chave publishable/anon é destinada ao cliente e a proteção dos dados depende das políticas RLS. O script libera apenas INSERT para `anon`; não cria permissões públicas para consultar, alterar ou excluir mensagens.

## Execução local (ambiente de desenvolvimento)
1. Instalar o Visual Studio Code e a extensão Live Server.
2. Abrir a pasta do projeto no VS Code.
3. Configurar `supabase-config.js` com URL e chave publishable.
4. Clicar com o botão direito em `index.html` e selecionar **Open with Live Server**.
5. Abrir **Contato**, enviar uma mensagem de teste e verificar a tabela `contatos` no Supabase.

O Live Server serve os arquivos estáticos localmente; o banco continua sendo o projeto Supabase remoto. Esse fluxo é adequado para desenvolvimento/teste, não é um backend local.

## Primeiro deploy (ambiente de produção)
O grupo já utiliza a Vercel para hospedar o front-end. Para publicar esta iteração:
1. Garantir que os arquivos atualizados estejam no repositório GitHub conectado à Vercel.
2. Fazer commit e push para a branch configurada como produção (normalmente `main`).
3. Aguardar a Vercel concluir o build/deploy dos arquivos estáticos.
4. Abrir o domínio de produção e testar navegação e envio de contato.
5. Conferir no Supabase se o registro foi inserido.

Como o projeto é HTML/CSS/JavaScript estático, não há processo de build obrigatório nem API própria Node neste pacote. O Supabase fornece a API de dados. Se o grupo configurar variáveis no painel Vercel, deve lembrar que arquivos HTML estáticos não leem automaticamente variáveis de ambiente em tempo de execução; nesta versão, a URL e a chave publicável são configuradas em `supabase-config.js`. Não inserir chaves secretas nesse arquivo.

## Problemas conhecidos / pendências
- O grupo precisa criar o projeto Supabase e executar o SQL.
- A URL e a chave publicável precisam ser adicionadas antes do deploy de produção.
- O deploy precisa ser atualizado pela Vercel e validado com uma mensagem real.
- Login e área restrita anteriores continuam demonstrativos; esta S13 não implementa autenticação real.
- Para uso real, será necessário definir política de retenção e tratamento de dados pessoais enviados no formulário.

## Links
- Aplicação Vercel usada pelo grupo (confirmar que é o deploy atualizado): https://echampprojetos10melhorias.vercel.app/
- Repositório informado anteriormente: https://github.com/esdrasmarques2020-png/E-Champ
- Supabase: https://supabase.com
- Vercel: https://vercel.com


## Melhorias de interface e contato
- Cards de campeonatos com inscrições encerradas ou vagas esgotadas recebem estilo em tons de cinza.
- A página de detalhes informa quando não há mais inscrições disponíveis.
- O contato com o eChamp e com os organizadores usa o WhatsApp configurado no código.
- A tela de login permite escolher entre jogador e administrador. Os acessos continuam demonstrativos, sem autenticação real.
- A página Criar conta orienta o visitante a solicitar cadastro pelo WhatsApp; o cadastro automático ainda não está implementado.
- Os campeonatos e os contatos de organizador são dados demonstrativos no JavaScript; cada telefone pode ser personalizado no objeto do campeonato.
