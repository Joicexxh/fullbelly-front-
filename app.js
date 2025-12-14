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
