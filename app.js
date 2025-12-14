// ===============================
// CONFIG
// ===============================
const API_URL = "https://fullbelly-cs9f.onrender.com/// FULLBELLY - JavaScript com Animações
// app.js - Lógica do projeto FULLBELLY

// Dados de exemplo para simulação
const doacoesExemplo = [
    {
        id: 1,
        item: "Pães franceses",
        quantidade: "50 unidades",
        validade: "2023-12-10",
        local: "Padaria Doce Pão - Centro",
        doador: "Padaria Doce Pão",
        tipo: "Pães",
        descricao: "Pães franceses frescos do dia",
        data: "2023-12-09 18:30"
    },
    {
        id: 2,
        item: "Salmão grelhado",
        quantidade: "15 porções",
        validade: "2023-12-09",
        local: "Restaurante Maré Alta - Zona Sul",
        doador: "Restaurante Maré Alta",
        tipo: "Peixes",
        descricao: "Salmão grelhado com legumes",
        data: "2023-12-09 15:45"
    },
    {
        id: 3,
        item: "Arroz e feijão",
        quantidade: "30 marmitas",
        validade: "2023-12-10",
        local: "Cantina da Vovó - Zona Leste",
        doador: "Cantina da Vovó",
        tipo: "Marmitas",
        descricao: "Marmitas completas com arroz, feijão, carne e salada",
        data: "2023-12-09 12:20"
    },
    {
        id: 4,
        item: "Bolos diversos",
        quantidade: "20 fatias",
        validade: "2023-12-11",
        local: "Confeitaria Doce Lar - Zona Norte",
        doador: "Confeitaria Doce Lar",
        tipo: "Doces",
        descricao: "Fatias de bolo de chocolate, cenoura e laranja",
        data: "2023-12-09 10:15"
    },
    {
        id: 5,
        item: "Legumes frescos",
        quantidade: "10 kg",
        validade: "2023-12-12",
        local: "Hortifruti Natural - Centro",
        doador: "Hortifruti Natural",
        tipo: "Legumes",
        descricao: "Cenouras, batatas, cebolas e tomates",
        data: "2023-12-08 17:30"
    },
    {
        id: 6,
        item: "Frutas da estação",
        quantidade: "8 kg",
        validade: "2023-12-10",
        local: "Mercado Central - Centro",
        doador: "Mercado Central",
        tipo: "Frutas",
        descricao: "Bananas, maçãs e laranjas",
        data: "2023-12-08 14:45"
    }
];

const usuariosExemplo = [
    {
        id: 1,
        nome: "Restaurante Sabor Mineiro",
        tipo: "restaurante",
        email: "contato@sabormineiro.com",
        telefone: "(11) 99999-8888",
        endereco: "Rua das Flores, 123 - Centro",
        descricao: "Restaurante tradicional mineiro",
        doacoes: 24,
        dataCadastro: "2023-10-15"
    },
    {
        id: 2,
        nome: "Maria Silva",
        tipo: "beneficiario",
        email: "maria.silva@email.com",
        telefone: "(11) 98888-7777",
        endereco: "Av. Principal, 456 - Zona Leste",
        descricao: "Mãe de 3 crianças, em situação de vulnerabilidade",
        doacoes: 8,
        dataCadastro: "2023-11-05"
    }
];

const mensagensExemplo = [
    {
        id: 1,
        nome: "João Restaurante",
        tipo: "restaurante",
        texto: "Tenho 20 marmitas de frango para doar hoje às 18h.",
        data: "2023-12-09 14:30",
        lida: true
    },
    {
        id: 2,
        nome: "Ana Beneficiária",
        tipo: "beneficiario",
        texto: "Alguém tem legumes para doar? Preciso para preparar sopa.",
        data: "2023-12-09 15:45",
        lida: true
    },
    {
        id: 3,
        nome: "Padaria Pão Quente",
        tipo: "restaurante",
        texto: "Estamos com excesso de pães hoje. Interessados podem retirar até 19h.",
        data: "2023-12-09 16:20",
        lida: false
    }
];

// Função para carregar as últimas doações na página inicial
function carregarUltimasDoacoes() {
    const container = document.getElementById('ultimas-doacoes');
    if (!container) return;
    
    // Limita a 4 doações na página inicial
    const ultimasDoacoes = doacoesExemplo.slice(0, 4);
    
    container.innerHTML = ultimasDoacoes.map(doacao => `
        <div class="doacao-card">
            <div class="doacao-imagem">
                <i class="fas fa-${getIconePorTipo(doacao.tipo)}"></i>
            </div>
            <div class="doacao-conteudo">
                <h3>${doacao.item}</h3>
                <p>${doacao.descricao}</p>
                <div class="doacao-info">
                    <div>
                        <small><i class="fas fa-balance-scale"></i> ${doacao.quantidade}</small>
                    </div>
                    <div>
                        <small><i class="fas fa-map-marker-alt"></i> ${doacao.doador}</small>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Função para carregar todas as doações na página de doações
function carregarTodasDoacoes() {
    const container = document.getElementById('todas-doacoes');
    if (!container) return;
    
    container.innerHTML = doacoesExemplo.map(doacao => `
        <div class="doacao-card">
            <div class="doacao-imagem">
                <i class="fas fa-${getIconePorTipo(doacao.tipo)}"></i>
            </div>
            <div class="doacao-conteudo">
                <h3>${doacao.item}</h3>
                <p>${doacao.descricao}</p>
                <div class="doacao-detalhes">
                    <p><i class="fas fa-balance-scale"></i> <strong>Quantidade:</strong> ${doacao.quantidade}</p>
                    <p><i class="fas fa-calendar-alt"></i> <strong>Validade:</strong> ${formatarData(doacao.validade)}</p>
                    <p><i class="fas fa-map-marker-alt"></i> <strong>Local:</strong> ${doacao.local}</p>
                    <p><i class="fas fa-user"></i> <strong>Doador:</strong> ${doacao.doador}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Função para carregar mensagens no chat
function carregarMensagensChat() {
    const container = document.getElementById('chat-messages');
    if (!container) return;
    
    container.innerHTML = mensagensExemplo.map(msg => `
        <div class="message-card ${msg.tipo === 'restaurante' ? 'sent' : ''}">
            <div class="message-header">
                <strong>${msg.nome}</strong>
                <span>${formatarDataHora(msg.data)}</span>
            </div>
            <div class="message-text">
                ${msg.texto}
            </div>
        </div>
    `).join('');
    
    // Rolagem automática para a última mensagem
    container.scrollTop = container.scrollHeight;
}

// Função para carregar usuários na página de admin
function carregarUsuariosAdmin() {
    const container = document.getElementById('usuarios-admin');
    if (!container) return;
    
    container.innerHTML = usuariosExemplo.map(usuario => `
        <tr>
            <td>${usuario.nome}</td>
            <td><span class="badge ${usuario.tipo === 'restaurante' ? 'badge-restaurante' : 'badge-beneficiario'}">
                ${usuario.tipo === 'restaurante' ? 'Restaurante' : 'Beneficiário'}
            </span></td>
            <td>${usuario.email}</td>
            <td>${usuario.telefone}</td>
            <td>${usuario.doacoes}</td>
            <td>
                <button class="btn btn-sm btn-primary">Editar</button>
                <button class="btn btn-sm btn-secondary">Excluir</button>
            </td>
        </tr>
    `).join('');
}

// Função para carregar doações na página de admin
function carregarDoacoesAdmin() {
    const container = document.getElementById('doacoes-admin');
    if (!container) return;
    
    container.innerHTML = doacoesExemplo.map(doacao => `
        <tr>
            <td>${doacao.item}</td>
            <td>${doacao.doador}</td>
            <td>${doacao.tipo}</td>
            <td>${doacao.quantidade}</td>
            <td>${formatarData(doacao.validade)}</td>
            <td>
                <button class="btn btn-sm btn-primary">Editar</button>
                <button class="btn btn-sm btn-secondary">Remover</button>
            </td>
        </tr>
    `).join('');
}

// Função para selecionar perfil no cadastro
function configurarSelecaoPerfil() {
    const perfilOptions = document.querySelectorAll('.perfil-option');
    const tipoInput = document.getElementById('tipo-usuario');
    
    if (!perfilOptions.length || !tipoInput) return;
    
    perfilOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove a classe selected de todas as opções
            perfilOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Adiciona a classe selected à opção clicada
            this.classList.add('selected');
            
            // Atualiza o valor do input hidden
            tipoInput.value = this.dataset.tipo;
        });
    });
}

// Função para enviar mensagem no chat
function configurarEnvioMensagem() {
    const form = document.getElementById('chat-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nomeInput = document.getElementById('message-name');
        const textoInput = document.getElementById('message-text');
        
        if (!nomeInput.value.trim() || !textoInput.value.trim()) {
            alert('Por favor, preencha seu nome e a mensagem.');
            return;
        }
        
        // Adiciona a nova mensagem
        const novaMensagem = {
            id: mensagensExemplo.length + 1,
            nome: nomeInput.value,
            tipo: 'usuario',
            texto: textoInput.value,
            data: new Date().toISOString(),
            lida: false
        };
        
        mensagensExemplo.push(novaMensagem);
        
        // Limpa o campo de texto
        textoInput.value = '';
        
        // Recarrega as mensagens
        carregarMensagensChat();
    });
}

// Função para configurar filtro de doações
function configurarFiltroDoacoes() {
    const filtroSelect = document.getElementById('filtro-tipo');
    if (!filtroSelect) return;
    
    filtroSelect.addEventListener('change', function() {
        const tipoSelecionado = this.value;
        
        if (tipoSelecionado === 'todos') {
            carregarTodasDoacoes();
        } else {
            const doacoesFiltradas = doacoesExemplo.filter(doacao => 
                doacao.tipo.toLowerCase() === tipoSelecionado.toLowerCase()
            );
            
            const container = document.getElementById('todas-doacoes');
            if (container) {
                container.innerHTML = doacoesFiltradas.map(doacao => `
                    <div class="doacao-card">
                        <div class="doacao-imagem">
                            <i class="fas fa-${getIconePorTipo(doacao.tipo)}"></i>
                        </div>
                        <div class="doacao-conteudo">
                            <h3>${doacao.item}</h3>
                            <p>${doacao.descricao}</p>
                            <div class="doacao-detalhes">
                                <p><i class="fas fa-balance-scale"></i> <strong>Quantidade:</strong> ${doacao.quantidade}</p>
                                <p><i class="fas fa-calendar-alt"></i> <strong>Validade:</strong> ${formatarData(doacao.validade)}</p>
                                <p><i class="fas fa-map-marker-alt"></i> <strong>Local:</strong> ${doacao.local}</p>
                                <p><i class="fas fa-user"></i> <strong>Doador:</strong> ${doacao.doador}</p>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }
    });
}

// Funções auxiliares
function getIconePorTipo(tipo) {
    const icones = {
        'Pães': 'bread-slice',
        'Peixes': 'fish',
        'Marmitas': 'utensils',
        'Doces': 'birthday-cake',
        'Legumes': 'carrot',
        'Frutas': 'apple-alt'
    };
    
    return icones[tipo] || 'box-open';
}

function formatarData(dataString) {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
}

function formatarDataHora(dataString) {
    const data = new Date(dataString);
    return data.toLocaleString('pt-BR');
}

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    // Carrega conteúdo baseado na página atual
    const path = window.location.pathname;
    const page = path.split('/').pop();
    
    if (page === 'index.html' || page === '') {
        carregarUltimasDoacoes();
    } else if (page === 'doacoes.html') {
        carregarTodasDoacoes();
        configurarFiltroDoacoes();
    } else if (page === 'chat.html') {
        carregarMensagensChat();
        configurarEnvioMensagem();
    } else if (page === 'admin.html') {
        carregarUsuariosAdmin();
        carregarDoacoesAdmin();
        configurarTabsAdmin();
    } else if (page === 'cadastro.html') {
        configurarSelecaoPerfil();
    }
    
    // Configurações comuns
    configurarAtualizacaoEstatisticas();
    configurarFormularios();
});

// Função para atualizar estatísticas dinamicamente
function configurarAtualizacaoEstatisticas() {
    // Simula atualização de estatísticas
    setInterval(() => {
        const doacoesElement = document.getElementById('total-doacoes');
        if (doacoesElement) {
            const atual = parseInt(doacoesElement.textContent.replace(',', ''));
            doacoesElement.textContent = (atual + Math.floor(Math.random() * 5)).toLocaleString();
        }
    }, 5000);
}

// Função para configurar envio de formulários
function configurarFormularios() {
    const forms = document.querySelectorAll('form:not(#chat-form)');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simula envio de dados
            alert('Dados enviados com sucesso! Em uma implementação real, os dados seriam enviados para um servidor.');
            
            // Redireciona para a página inicial após cadastro
            if (form.id === 'cadastro-form') {
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }
            
            // Limpa o formulário
            this.reset();
        });
    });
}

// Função para configurar tabs na página admin
function configurarTabsAdmin() {
    const tabs = document.querySelectorAll('.admin-tab');
    const conteudos = document.querySelectorAll('.admin-conteudo');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.dataset.target;
            
            // Ativa tab clicada
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Mostra conteúdo correspondente
            conteudos.forEach(conteudo => {
                conteudo.style.display = conteudo.id === target ? 'block' : 'none';
            });
        });
    });
}

// Simula notificações
function mostrarNotificacao(mensagem, tipo = 'info') {
    // Cria elemento de notificação
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao notificacao-${tipo}`;
    notificacao.innerHTML = `
        <i class="fas fa-${tipo === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${mensagem}</span>
        <button class="notificacao-fechar">&times;</button>
    `;
    
    // Estilos da notificação
    notificacao.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${tipo === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${tipo === 'success' ? '#155724' : '#721c24'};
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    // Adiciona ao corpo
    document.body.appendChild(notificacao);
    
    // Remove após 5 segundos
    setTimeout(() => {
        notificacao.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notificacao.remove(), 300);
    }, 5000);
    
    // Configura botão de fechar
    notificacao.querySelector('.notificacao-fechar').addEventListener('click', () => {
        notificacao.remove();
    });
}

// Adiciona estilos de animação
const estiloAnimacao = document.createElement('style');
estiloAnimacao.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .badge {
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 600;
    }
    
    .badge-restaurante {
        background-color: #d4edda;
        color: #155724;
    }
    
    .badge-beneficiario {
        background-color: #cce5ff;
        color: #004085;
    }
    
    .btn-sm {
        padding: 0.3rem 0.6rem;
        font-size: 0.8rem;
    }
`;
document.head.appendChild(estiloAnimacao);

// Funções para edição de perfil
function configurarEdicaoPerfil() {
    const btnEditarPerfil = document.getElementById('btn-editar-perfil');
    if (!btnEditarPerfil) return;
    
    btnEditarPerfil.addEventListener('click', function() {
        abrirModalEdicaoPerfil();
    });
}

function abrirModalEdicaoPerfil() {
    // Cria o modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'modal-editar-perfil';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2><i class="fas fa-user-edit"></i> Editar Perfil</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form id="form-editar-perfil">
                    <div class="form-group text-center">
                        <div class="perfil-avatar-editavel" style="width: 150px; height: 150px; margin: 0 auto 1.5rem;">
                            <div id="avatar-preview" class="avatar-preview">
                                <i class="fas fa-user" style="font-size: 4rem; line-height: 140px;"></i>
                            </div>
                            <div class="avatar-overlay">
                                <i class="fas fa-camera"></i>
                            </div>
                        </div>
                        <input type="file" id="foto-perfil" class="file-input" accept="image/*">
                        <button type="button" class="btn btn-secondary btn-sm" id="btn-alterar-foto">
                            <i class="fas fa-camera"></i> Alterar Foto
                        </button>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="edit-nome"><i class="fas fa-user"></i> Nome *</label>
                            <input type="text" id="edit-nome" name="nome" required value="Maria Silva">
                        </div>
                        
                        <div class="form-group">
                            <label for="edit-email"><i class="fas fa-envelope"></i> E-mail *</label>
                            <input type="email" id="edit-email" name="email" required value="maria.silva@email.com">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="edit-telefone"><i class="fas fa-phone"></i> Telefone *</label>
                            <input type="tel" id="edit-telefone" name="telefone" required value="(11) 98888-7777">
                        </div>
                        
                        <div class="form-group">
                            <label for="edit-cpf"><i class="fas fa-id-card"></i> CPF</label>
                            <input type="text" id="edit-cpf" name="cpf" value="123.456.789-00">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="edit-endereco"><i class="fas fa-map-marker-alt"></i> Endereço *</label>
                        <input type="text" id="edit-endereco" name="endereco" required value="Av. Principal, 456 - Zona Leste">
                    </div>
                    
                    <div class="form-group">
                        <label for="edit-descricao"><i class="fas fa-info-circle"></i> Descrição / Sobre</label>
                        <textarea id="edit-descricao" name="descricao" rows="4" placeholder="Conte um pouco sobre você...">Mãe de 3 crianças, em situação de vulnerabilidade</textarea>
                    </div>
                    
                    <!-- Campos específicos para restaurante -->
                    <div id="campos-restaurante-edit" style="display: none;">
                        <h3>Informações do Restaurante</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="edit-cnpj">CNPJ</label>
                                <input type="text" id="edit-cnpj" name="cnpj">
                            </div>
                            
                            <div class="form-group">
                                <label for="edit-tipo-cozinha">Tipo de Cozinha</label>
                                <select id="edit-tipo-cozinha" name="tipo-cozinha">
                                    <option value="">Selecione...</option>
                                    <option value="brasileira">Brasileira</option>
                                    <option value="italiana">Italiana</option>
                                    <option value="japonesa">Japonesa</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Campos específicos para beneficiário -->
                    <div id="campos-beneficiario-edit" style="display: none;">
                        <h3>Informações Adicionais</h3>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="edit-pessoas-familia">Pessoas na família</label>
                                <input type="number" id="edit-pessoas-familia" name="pessoas-familia" min="1" value="4">
                            </div>
                            
                            <div class="form-group">
                                <label for="edit-renda-familiar">Renda familiar</label>
                                <select id="edit-renda-familiar" name="renda-familiar">
                                    <option value="ate-1">Até 1 salário mínimo</option>
                                    <option value="1-2">1 a 2 salários mínimos</option>
                                    <option value="2-3">2 a 3 salários mínimos</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="edit-necessidades">Necessidades especiais</label>
                            <textarea id="edit-necessidades" name="necessidades" rows="3" placeholder="Alergias, restrições alimentares..."></textarea>
                        </div>
                    </div>
                    
                    <div class="form-actions" style="margin-top: 2rem;">
                        <button type="button" class="btn btn-secondary close-modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Configura eventos do modal
    configurarModalEdicaoPerfil(modal);
}

function configurarModalEdicaoPerfil(modal) {
    const closeButtons = modal.querySelectorAll('.close-modal, .modal-close');
    const form = modal.querySelector('#form-editar-perfil');
    const btnAlterarFoto = modal.querySelector('#btn-alterar-foto');
    const inputFoto = modal.querySelector('#foto-perfil');
    const avatarEditavel = modal.querySelector('.perfil-avatar-editavel');
    
    // Fechar modal
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.remove();
        });
    });
    
    // Fechar ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Alterar foto
    if (btnAlterarFoto && inputFoto) {
        btnAlterarFoto.addEventListener('click', () => {
            inputFoto.click();
        });
        
        avatarEditavel.addEventListener('click', () => {
            inputFoto.click();
        });
        
        inputFoto.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const avatarPreview = modal.querySelector('#avatar-preview');
                    avatarPreview.innerHTML = `<img src="${event.target.result}" alt="Preview da foto" style="width: 100%; height: 100%; object-fit: cover;">`;
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Enviar formulário
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui iria a lógica para salvar no backend
            const formData = new FormData(this);
            console.log('Dados do formulário:', Object.fromEntries(formData));
            
            mostrarNotificacao('Perfil atualizado com sucesso!', 'success');
            modal.remove();
            
            // Atualiza os dados na página de perfil
            atualizarDadosPerfil(formData);
        });
    }
}

function atualizarDadosPerfil(formData) {
    // Atualiza os dados na página de perfil (simulação)
    const dados = Object.fromEntries(formData);
    
    if (dados.nome) {
        const nomeElement = document.getElementById('perfil-nome');
        if (nomeElement) nomeElement.textContent = dados.nome;
    }
    
    if (dados.email) {
        const emailElement = document.getElementById('info-email');
        if (emailElement) emailElement.textContent = dados.email;
    }
    
    if (dados.telefone) {
        const telefoneElement = document.getElementById('info-telefone');
        if (telefoneElement) telefoneElement.textContent = dados.telefone;
    }
    
    if (dados.endereco) {
        const enderecoElement = document.getElementById('info-endereco');
        if (enderecoElement) enderecoElement.textContent = dados.endereco;
    }
    
    if (dados.descricao) {
        const descricaoElement = document.getElementById('perfil-descricao');
        if (descricaoElement) descricaoElement.textContent = dados.descricao;
    }
}

// Função para mostrar termos de uso
function mostrarTermosUso() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'modal-termos';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2><i class="fas fa-file-contract"></i> Termos de Uso e Política de Privacidade</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="termos-container">
                    <div class="termos-section">
                        <h3>1. Aceitação dos Termos</h3>
                        <p>Ao utilizar a plataforma FULLBELLY, você concorda com estes Termos de Uso. Se não concordar, não utilize nossos serviços.</p>
                    </div>
                    
                    <div class="termos-section">
                        <h3>2. Cadastro na Plataforma</h3>
                        <p>2.1. Para usar a plataforma, você deve se cadastrar fornecendo informações verdadeiras e completas.</p>
                        <p>2.2. Você é responsável por manter a confidencialidade de sua senha.</p>
                        <p>2.3. O cadastro é gratuito para ambos os perfis (doadores e beneficiários).</p>
                    </div>
                    
                    <div class="termos-section">
                        <h3>3. Responsabilidades dos Restaurantes</h3>
                        <p>3.1. Os alimentos doados devem estar em condições adequadas para consumo.</p>
                        <p>3.2. É obrigatório informar data de validade e condições de armazenamento.</p>
                        <p>3.3. Os restaurantes são responsáveis pela qualidade dos alimentos doados.</p>
                    </div>
                    
                    <div class="termos-section">
                        <h3>4. Responsabilidades dos Beneficiários</h3>
                        <p>4.1. Os beneficiários devem comparecer no local e horário combinados.</p>
                        <p>4.2. É necessário confirmar o recebimento das doações.</p>
                        <p>4.3. Os beneficiários devem utilizar os alimentos exclusivamente para consumo próprio.</p>
                    </div>
                    
                    <div class="termos-section">
                        <h3>5. Política de Privacidade</h3>
                        <p>5.1. Coletamos apenas informações necessárias para o funcionamento da plataforma.</p>
                        <p>5.2. Não compartilhamos seus dados com terceiros sem sua autorização.</p>
                        <p>5.3. Utilizamos medidas de segurança para proteger suas informações.</p>
                    </div>
                    
                    <div class="termos-section">
                        <h3>6. Isenção de Responsabilidade</h3>
                        <p>6.1. A plataforma FULLBELLY atua apenas como intermediária entre doadores e beneficiários.</p>
                        <p>6.2. Não nos responsabilizamos pela qualidade dos alimentos doados.</p>
                        <p>6.3. Não garantimos a disponibilidade constante de doações.</p>
                    </div>
                    
                    <div class="termos-section">
                        <h3>7. Modificações nos Termos</h3>
                        <p>Reservamo-nos o direito de modificar estes Termos a qualquer momento. As alterações serão comunicadas aos usuários.</p>
                    </div>
                    
                    <div class="termos-section">
                        <h3>8. Contato</h3>
                        <p>Para questões sobre estes Termos, entre em contato: contato@fullbelly.org</p>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="checkbox-group">
                        <input type="checkbox" id="aceitar-termos-modal" required>
                        <span>Eu li e concordo com os Termos de Uso e Política de Privacidade da plataforma FULLBELLY</span>
                    </label>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-secondary close-modal">Fechar</button>
                    <button type="button" class="btn btn-primary" id="btn-confirmar-termos">
                        <i class="fas fa-check-circle"></i> Confirmar Aceitação
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Configura eventos do modal de termos
    configurarModalTermos(modal);
}

function configurarModalTermos(modal) {
    const closeButtons = modal.querySelectorAll('.close-modal, .modal-close');
    const btnConfirmar = modal.querySelector('#btn-confirmar-termos');
    const checkboxTermos = modal.querySelector('#aceitar-termos-modal');
    
    // Fechar modal
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.remove();
        });
    });
    
    // Fechar ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Confirmar termos
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', () => {
            if (!checkboxTermos.checked) {
                alert('Por favor, leia e aceite os Termos de Uso para continuar.');
                return;
            }
            
            mostrarNotificacao('Termos de Uso aceitos com sucesso!', 'success');
            modal.remove();
            
            // Salvar aceitação no localStorage (simulação)
            localStorage.setItem('fullbelly-termos-aceitos', 'true');
        });
    }
}

// Função para mostrar política de privacidade
function mostrarPoliticaPrivacidade() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'modal-politica';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2><i class="fas fa-shield-alt"></i> Política de Privacidade</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="termos-container">
                    <div class="termos-section">
                        <h3>Coleta de Informações</h3>
                        <p>Coletamos informações que você nos fornece diretamente, como nome, e-mail, telefone e endereço. Essas informações são necessárias para o funcionamento da plataforma.</p>
                    </div>
                    
                    <div class="termos-section">
                        <h3>Uso das Informações</h3>
                        <p>Utilizamos suas informações para:
                        <ul>
                            <li>Conectar doadores e beneficiários</li>
                            <li>Melhorar nossos serviços</li>
                            <li>Enviar comunicações importantes</li>
                            <li>Garantir a segurança da plataforma</li>
                        </ul>
                        </p>
                    </div>
                    
                    <div class="termos-section">
                        <h3>Compartilhamento de Dados</h3>
                        <p>Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto quando necessário para o funcionamento do serviço ou por exigência legal.</p>
                    </div>
                    
                    <div class="termos-section">
                        <h3>Segurança</h3>
                        <p>Implementamos medidas de segurança para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.</p>
                    </div>
                    
                    <div class="termos-section">
                        <h3>Seus Direitos</h3>
                        <p>Você tem o direito de:
                        <ul>
                            <li>Acessar suas informações pessoais</li>
                            <li>Corrigir dados imprecisos</li>
                            <li>Solicitar a exclusão de seus dados</li>
                            <li>Revogar consentimentos</li>
                        </ul>
                        Para exercer esses direitos, entre em contato: contato@fullbelly.org</p>
                    </div>
                    
                    <div class="termos-section">
                        <h3>Alterações na Política</h3>
                        <p>Podemos atualizar esta Política periodicamente. Notificaremos sobre mudanças significativas.</p>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-primary close-modal">
                        <i class="fas fa-check"></i> Entendi
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Configura eventos
    const closeButtons = modal.querySelectorAll('.close-modal, .modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.remove();
        });
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}
