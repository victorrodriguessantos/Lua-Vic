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

