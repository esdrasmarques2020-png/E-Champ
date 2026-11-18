const form = document.getElementById('formContato');
const feedback = document.getElementById('mensagemSucesso');
const submitButton = form.querySelector('button[type="submit"]');

function mostrarFeedback(texto, tipo = 'sucesso') {
  feedback.textContent = texto;
  feedback.className = tipo;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const contato = document.getElementById('contato').value.trim();
  const motivo = document.getElementById('motivo').value.trim();

  if (!nome || !contato || !motivo) {
    mostrarFeedback('Preencha todos os campos obrigatórios.', 'erro');
    return;
  }

  const config = window.ECHAMP_SUPABASE_CONFIG;
  const configuracaoValida = config &&
    config.url.startsWith('https://') &&
    config.publishableKey &&
    !config.url.includes('COLE_AQUI') &&
    !config.publishableKey.includes('COLE_AQUI');

  if (!configuracaoValida) {
    mostrarFeedback('O banco ainda não está configurado. Consulte o README-S13.md.', 'erro');
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Enviando...';
  mostrarFeedback('');

  try {
    const client = window.supabase.createClient(config.url, config.publishableKey);
    const { error } = await client.from('contatos').insert([{ nome, contato, mensagem: motivo }]);

    if (error) throw error;

    mostrarFeedback(`Obrigado, ${nome}! Sua mensagem foi salva no banco de dados.`, 'sucesso');
    form.reset();
  } catch (error) {
    console.error('Erro ao salvar contato:', error);
    mostrarFeedback('Não foi possível salvar sua mensagem. Verifique a configuração do banco e tente novamente.', 'erro');
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Enviar mensagem →';
  }
});
