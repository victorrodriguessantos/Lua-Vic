<thead class="border-b">
  <tr>
    <th>Servidor</th>
    <th>IP</th>
    <th>Instância <i class="fi fi-rr-filter" id="filtro-instancia"></i></th>
    <th>Sistema <i class="fi fi-rr-filter" id="filtro-sistema"></i></th>
    <th>Provedor <i class="fi fi-rr-filter" id="filtro-provedor"></i></th>
    <th>Status <i class="fi fi-rr-filter" id="filtro-status"></i></th>
    <th>State <i class="fi fi-rr-filter" id="filtro-state"></i></th>
    <th>Ação</th>
  </tr>
</thead>

const filtros = {
  instancia: document.getElementById("filtro-instancia"),
  sistema: document.getElementById("filtro-sistema"),
  provedor: document.getElementById("filtro-provedor"),
  status: document.getElementById("filtro-status"),
  state: document.getElementById("filtro-state"),
};

function criarDropdown(coluna, valores) {
  const menu = document.createElement("div");
  menu.classList.add("dropdown-menu");

  valores.forEach((valor) => {
    const item = document.createElement("div");
    item.textContent = valor;
    item.addEventListener("click", () => filtrarTabela(coluna, valor));
    menu.appendChild(item);
  });

  return menu;
}

function filtrarTabela(coluna, valor) {
  const filtrados = servidores.filter((s) => s[coluna] === valor);
  renderizarTabela(filtrados);
}

// Adiciona eventos de clique aos ícones de filtro
Object.entries(filtros).forEach(([coluna, elemento]) => {
  elemento.addEventListener("click", (event) => {
    const valoresUnicos = [...new Set(servidores.map((s) => s[coluna]))]; 
    const dropdown = criarDropdown(coluna, valoresUnicos);
    
    dropdown.style.position = "absolute";
    dropdown.style.top = `${event.clientY}px`;
    dropdown.style.left = `${event.clientX}px`;

    document.body.appendChild(dropdown);
  });
});



.dropdown-menu {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  padding: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  max-width: 150px;
  cursor: pointer;
}

.dropdown-menu div {
  padding: 5px;
}

.dropdown-menu div:hover {
  background: #f0f0f0;
}


<!-- 
Acão da tabela
-->

function renderizarTabela(lista) {
  tabela.innerHTML = '';
  if (lista.length === 0) {
    tabela.innerHTML = '<tr><td colspan="8" class="text-center py-4 text-gray-500">Nenhum servidor encontrado.</td></tr>';
  } else {
    lista.forEach(servidor => {
      const linha = document.createElement('tr');
      linha.innerHTML = `
        <td class="py-2 px-4">${servidor.server_name}</td>
        <td class="py-2 px-4">${servidor.public_ip}</td>
        <td class="py-2 px-4">${servidor.instance_type}</td>
        <td class="py-2 px-4">${servidor.system}</td>
        <td class="py-2 px-4">${servidor.provider}</td>
        <td class="py-2 px-4">${servidor.status_server}</td>
        <td class="py-2 px-4">${servidor.state_instance}</td>
        <td class="py-2 px-4 actions-cell" style="position: relative;">
          <button class="btn-toggle bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
            Ligar/Desligar
          </button>
          <button class="btn-actions bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
            Ações
          </button>
          <div class="dropdown-actions hidden absolute z-10 bg-white border shadow-md mt-1 rounded">
            <div class="dropdown-item py-1 px-3 hover:bg-gray-100 cursor-pointer" data-action="mais-informacoes">
              Mais informações
            </div>
            <div class="dropdown-item py-1 px-3 hover:bg-gray-100 cursor-pointer" data-action="reiniciar">
              Reiniciar
            </div>
            <div class="dropdown-item py-1 px-3 hover:bg-gray-100 cursor-pointer" data-action="mudar-instancia">
              Mudar instância
            </div>
            <div class="dropdown-item py-1 px-3 hover:bg-gray-100 cursor-pointer" data-action="excluir-servidor">
              Excluir Servidor
            </div>
          </div>
        </td>
      `;
      tabela.appendChild(linha);
    });
    
    // Ativar eventos para os botões de ações após renderizar todos os registros
    document.querySelectorAll('.btn-actions').forEach(btn => {
      btn.addEventListener('click', event => {
        // Fecha todos os dropdowns abertos antes de abrir um novo
        document.querySelectorAll('.dropdown-actions').forEach(drop => {
          if(drop !== btn.nextElementSibling) drop.classList.add('hidden');
        });
        // Toggle sobre o dropdown de ações
        const dropdown = btn.nextElementSibling;
        dropdown.classList.toggle('hidden');
      });
    });
    
    // Eventos para os itens do dropdown, por enquanto apenas exibe a ação no console.
    document.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', event => {
        const acao = item.getAttribute('data-action');
        console.log(`Ação solicitada: ${acao}`);
        // Aqui você pode chamar a função correspondente ou disparar uma requisição
        // Por exemplo: executarAcao(acao, servidor);
        // Depois fecha o dropdown:
        item.parentElement.classList.add('hidden');
      });
    });
    
    // Opcional: fechar o dropdown ao clicar fora
    document.addEventListener('click', function(e) {
      document.querySelectorAll('.dropdown-actions').forEach(drop => {
        if (!drop.contains(e.target) && !drop.previousElementSibling.contains(e.target)) {
          drop.classList.add('hidden');
        }
      });
    });
  }
}
