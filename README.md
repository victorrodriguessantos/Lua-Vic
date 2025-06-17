<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Painel de Servidores</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
</head>
<body class="bg-gray-100 min-h-screen p-4">
  <!-- Header -->
  <header class="flex items-center justify-between bg-white p-4 rounded shadow">
    <div class="flex items-center gap-4">
      <div class="text-xl font-bold">LOGO</div>
      <input type="text" id="filtro-nome" placeholder="Nome do Servidor" class="border px-3 py-1 rounded focus:outline-none" />
    </div>
    <div>
      <i class="fas fa-user-circle text-2xl text-gray-600"></i>
    </div>
  </header>

  <!-- Ações -->
  <div class="flex items-center gap-4 my-4">
    <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Criar Servidor</button>
    <button class="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
      <i class="fas fa-download"></i>
    </button>
  </div>

  <!-- Tabela -->
  <div class="bg-white rounded shadow p-4 overflow-x-auto">
    <table class="w-full text-left">
      <thead class="border-b">
        <tr class="text-gray-700">
          <th class="py-2 px-4">Servidor</th>
          <th class="py-2 px-4">IP Privado</th>
          <th class="py-2 px-4">IP Público</th>
          <th class="py-2 px-4">Instância</th>
          <th class="py-2 px-4">Sistema</th>
          <th class="py-2 px-4">Status</th>
          <th class="py-2 px-4">Estado</th>
          <th class="py-2 px-4">Ação</th>
        </tr>
      </thead>
      <tbody id="tabela-servidores">
        <tr><td colspan="8" class="text-center py-4 text-gray-500">Carregando...</td></tr>
      </tbody>
    </table>

    <!-- Paginação -->
    <div class="flex justify-end mt-4 gap-2">
      <button id="btn-anterior" class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">« Anterior</button>
      <span id="pagina-info" class="px-2 py-1 text-sm text-gray-700"></span>
      <button id="btn-proxima" class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Próxima »</button>
    </div>
  </div>

  <script>
    const tabela = document.getElementById('tabela-servidores');
    const filtroNome = document.getElementById('filtro-nome');
    const btnAnterior = document.getElementById('btn-anterior');
    const btnProxima = document.getElementById('btn-proxima');
    const paginaInfo = document.getElementById('pagina-info');

    let paginaAtual = 1;
    const limite = 10;
    let totalPaginas = 1;

    async function carregarServidores() {
      try {
        const resposta = await axios.get(`http://192.168.88.13:6060/instance/`, {
          headers: {
            'Signature': 'SUA_ASSINATURA_AQUI',
            'type_access': 'user_access'
          },
          params: {
            _limit: limite,
            page: paginaAtual
          }
        });

        const servidores = resposta.data.data;
        totalPaginas = resposta.data.total_pages;

        tabela.innerHTML = '';

        const filtro = filtroNome.value.toLowerCase();
        const filtrados = servidores.filter(s => s.server_name.toLowerCase().includes(filtro));

        if (!filtrados.length) {
          tabela.innerHTML = '<tr><td colspan="8" class="text-center py-4 text-gray-500">Nenhum servidor encontrado.</td></tr>';
          return;
        }

        filtrados.forEach(servidor => {
          const linha = document.createElement('tr');
          linha.innerHTML = `
            <td class="py-2 px-4">${servidor.server_name}</td>
            <td class="py-2 px-4">${servidor.private_ip}</td>
            <td class="py-2 px-4">${servidor.public_ip}</td>
            <td class="py-2 px-4">${servidor.instance_type}</td>
            <td class="py-2 px-4">${servidor.system}</td>
            <td class="py-2 px-4">${servidor.status_server}</td>
            <td class="py-2 px-4">${servidor.state_instance}</td>
            <td class="py-2 px-4"><button class="text-blue-600 hover:underline">Detalhes</button></td>
          `;
          tabela.appendChild(linha);
        });

        paginaInfo.textContent = `Página ${paginaAtual} de ${totalPaginas}`;

      } catch (erro) {
        console.error('Erro ao buscar servidores:', erro);
        tabela.innerHTML = '<tr><td colspan="8" class="text-center py-4 text-red-500">Erro ao buscar os dados.</td></tr>';
      }
    }

    filtroNome.addEventListener('input', () => {
      carregarServidores();
    });

    btnAnterior.addEventListener('click', () => {
      if (paginaAtual > 1) {
        paginaAtual--;
        carregarServidores();
      }
    });

    btnProxima.addEventListener('click', () => {
      if (paginaAtual < totalPaginas) {
        paginaAtual++;
        carregarServidores();
      }
    });

    carregarServidores();
  </script>
</body>
</html>

