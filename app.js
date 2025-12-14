// ===============================
// CONFIG
// ===============================
const API_URL = "https://fullbelly-cs9f.onrender.com/// FULLBELLY - JavaScript com Animações
class FullBellyApp {
    constructor() {
        this.state = {
            perfilAtivo: 'restaurante',
            usuarioLogado: null,
            doacoes: this.getMockData().doacoes,
            chatMessages: this.getMockData().chatMessages
        };
    }

    init() {
        this.setupAnimations();
        this.initNavigation();
        this.initEventListeners();
        this.initPageSpecificFeatures();
        this.checkBackendConnection();
    }

    setupAnimations() {
        // Observador de interseção para animações ao scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Elementos para animar
        document.querySelectorAll('.stat-card, .donation-card, .message-card').forEach(el => {
            observer.observe(el);
        });
    }

    initNavigation() {
        // Links de navegação
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                
                // Atualizar navegação ativa
                document.querySelectorAll('.nav-link').forEach(l => {
                    l.classList.remove('active');
                });
                link.classList.add('active');
                
                // Navegar para página
                if (target.startsWith('#')) {
                    this.navigateToSection(target.substring(1));
                } else if (target.startsWith('/')) {
                    window.location.href = target;
                }
            });
        });

        // Menu mobile
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                document.querySelector('.nav-menu').classList.toggle('active');
            });
        }

        // Efeito de scroll na navbar
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    navigateToSection(sectionId) {
        // Suave transição entre seções
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
        });

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Animação de entrada
            setTimeout(() => {
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
                targetSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }, 50);

            // Scroll suave
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }

    initEventListeners() {
        // Botões do perfil
        const btnRestaurante = document.getElementById('btnRestaurante');
        const btnBeneficiario = document.getElementById('btnBeneficiario');
        
        if (btnRestaurante && btnBeneficiario) {
            btnRestaurante.addEventListener('click', () => this.togglePerfil('restaurante'));
            btnBeneficiario.addEventListener('click', () => this.togglePerfil('beneficiario'));
        }

        // Formulários
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e, form));
        });

        // Botões de doação
        const novaDoacaoBtn = document.getElementById('novaDoacaoBtn');
        if (novaDoacaoBtn) {
            novaDoacaoBtn.addEventListener('click', () => this.openModal('novaDoacaoModal'));
        }

        // Botões de fechar modal
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => this.closeModal(btn.closest('.modal')));
        });

        // Filtros de doações
        const filterTipo = document.getElementById('filterTipo');
        const filterLocal = document.getElementById('filterLocal');
        
        if (filterTipo) filterTipo.addEventListener('change', () => this.filterDoacoes());
        if (filterLocal) filterLocal.addEventListener('change', () => this.filterDoacoes());
    }

    togglePerfil(perfil) {
        this.state.perfilAtivo = perfil;
        
        // Animação dos botões
        const btnRestaurante = document.getElementById('btnRestaurante');
        const btnBeneficiario = document.getElementById('btnBeneficiario');
        
        if (btnRestaurante && btnBeneficiario) {
            btnRestaurante.classList.toggle('active', perfil === 'restaurante');
            btnBeneficiario.classList.toggle('active', perfil === 'beneficiario');
            
            // Efeito de animação
            const activeBtn = perfil === 'restaurante' ? btnRestaurante : btnBeneficiario;
            activeBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                activeBtn.style.transform = 'scale(1)';
            }, 150);
        }

        // Atualizar campos do formulário
        this.updateFormFields(perfil);
    }

    updateFormFields(perfil) {
        const formTitle = document.getElementById('formTitle');
        const formDescription = document.getElementById('formDescription');
        
        if (perfil === 'restaurante') {
            if (formTitle) formTitle.textContent = 'Cadastro de Restaurante';
            if (formDescription) formDescription.textContent = 'Preencha os dados para se cadastrar como doador';
            
            // Mostrar campos de restaurante
            document.querySelectorAll('.restaurante-field').forEach(field => {
                field.classList.remove('hidden');
                field.style.animation = 'fadeIn 0.5s ease';
            });
            
            // Esconder campos de beneficiário
            document.querySelectorAll('.beneficiario-field').forEach(field => {
                field.classList.add('hidden');
            });
        } else {
            if (formTitle) formTitle.textContent = 'Cadastro de Beneficiário';
            if (formDescription) formDescription.textContent = 'Preencha os dados para receber doações';
            
            // Mostrar campos de beneficiário
            document.querySelectorAll('.beneficiario-field').forEach(field => {
                field.classList.remove('hidden');
                field.style.animation = 'fadeIn 0.5s ease';
            });
            
            // Esconder campos de restaurante
            document.querySelectorAll('.restaurante-field').forEach(field => {
                field.classList.add('hidden');
            });
        }
    }

    filterDoacoes() {
        const tipo = document.getElementById('filterTipo')?.value || 'todos';
        const local = document.getElementById('filterLocal')?.value || 'todos';
        
        const filtered = this.state.doacoes.filter(doacao => {
            const matchTipo = tipo === 'todos' || doacao.tipo === tipo;
            const matchLocal = local === 'todos' || doacao.local.toLowerCase().includes(local);
            return matchTipo && matchLocal;
        });

        this.renderDoacoes(filtered);
    }

    renderDoacoes(doacoes) {
        const container = document.getElementById('donationsList');
        if (!container) return;

        container.innerHTML = doacoes.map(doacao => `
            <div class="donation-card fade-in">
                <div class="donation-header">
                    <span class="donation-type">${this.getTipoLabel(doacao.tipo)}</span>
                </div>
                <div class="donation-body">
                    <h3 class="donation-title">${doacao.item}</h3>
                    <div class="donation-info">
                        <span><i class="fas fa-box"></i> ${doacao.quantidade}</span>
                        <span><i class="fas fa-calendar"></i> ${this.formatDate(doacao.validade)}</span>
                    </div>
                    <p><i class="fas fa-map-marker-alt"></i> ${doacao.local}</p>
                    <p><i class="fas fa-clock"></i> ${doacao.horario}</p>
                </div>
                <div class="donation-footer">
                    <div class="donor-info">
                        <div class="donor-avatar" style="background: ${this.getRandomColor()}">
                            ${doacao.doador.charAt(0)}
                        </div>
                        <span>${doacao.doador}</span>
                    </div>
                    <button class="btn btn-small btn-primary pulse"
                            onclick="app.reservarDoacao(${doacao.id})">
                        <i class="fas fa-hand-holding-heart"></i> Reservar
                    </button>
                </div>
            </div>
        `).join('');
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Animação de entrada
            modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
            setTimeout(() => {
                modal.querySelector('.modal-content').style.transform = 'scale(1)';
                modal.querySelector('.modal-content').style.transition = 'transform 0.3s ease';
            }, 10);
        }
    }

    closeModal(modal) {
        if (modal) {
            modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
            setTimeout(() => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }

    reservarDoacao(id) {
        const doacao = this.state.doacoes.find(d => d.id === id);
        if (doacao) {
            // Animação de confirmação
            const btn = event.target.closest('button');
            if (btn) {
                btn.innerHTML = '<i class="fas fa-check"></i> Reservado!';
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-secondary');
                btn.disabled = true;
                
                // Notificação
                this.showNotification('Doação reservada com sucesso!', 'success');
            }
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Animação de entrada
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    checkBackendConnection() {
        const backendUrl = 'https://fullbellyy.onrender.com';
        
        fetch(`${backendUrl}/`)
            .then(response => {
                if (response.ok) {
                    console.log('✅ Back-end conectado');
                    document.body.classList.add('backend-connected');
                }
            })
            .catch(error => {
                console.log('⚠️ Usando dados mockados');
                document.body.classList.add('backend-offline');
            });
    }

    // Métodos utilitários
    getMockData() {
        return {
            doacoes: [
                {
                    id: 1,
                    item: "Marmitas de frango",
                    quantidade: "50 unidades",
                    validade: "2024-12-20",
                    tipo: "pratos-prontos",
                    local: "Restaurante Sabor Caseiro - Centro",
                    horario: "18h às 20h",
                    doador: "Sabor Caseiro",
                    status: "disponivel"
                }
                // ... mais dados mockados
            ],
            chatMessages: [
                {
                    id: 1,
                    autor: "Maria Silva",
                    mensagem: "Acabei de retirar as doações! Muito obrigada!",
                    hora: "14:30",
                    data: "Hoje"
                }
                // ... mais mensagens
            ]
        };
    }

    getTipoLabel(tipo) {
        const labels = {
            'pratos-prontos': 'Pratos Prontos',
            'ingredientes': 'Ingredientes',
            'padaria': 'Padaria',
            'bebidas': 'Bebidas',
            'outros': 'Outros'
        };
        return labels[tipo] || tipo;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }

    getRandomColor() {
        const colors = ['#C62828', '#FF5252', '#FF9800', '#4CAF50', '#2196F3'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    handleFormSubmit(e, form) {
        e.preventDefault();
        
        // Simular envio
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
        submitBtn.disabled = true;
        
        // Simular delay de rede
        setTimeout(() => {
            this.showNotification('Cadastro realizado com sucesso!', 'success');
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            form.reset();
        }, 1500);
    }

    initPageSpecificFeatures() {
        // Página inicial
        if (document.getElementById('home')) {
            this.initHomePage();
        }
        
        // Página de doações
        if (document.getElementById('doacoes')) {
            this.renderDoacoes(this.state.doacoes);
        }
        
        // Página de chat
        if (document.getElementById('chat')) {
            this.initChat();
        }
    }

    initHomePage() {
        // Animação de contagem
        this.animateCounter('doacoesCount', 1245);
        this.animateCounter('restaurantesCount', 89);
        this.animateCounter('beneficiariosCount', 324);
        this.animateCounter('kgDoados', 5200);
    }

    animateCounter(elementId, target) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = this.formatNumber(Math.floor(current));
        }, 30);
    }

    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }

    initChat() {
        const chatForm = document.getElementById('chatForm');
        if (chatForm) {
            chatForm.addEventListener('submit', (e) => this.sendMessage(e));
        }
        
        const refreshBtn = document.getElementById('refreshChat');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.loadChatMessages());
        }
        
        this.loadChatMessages();
    }

    sendMessage(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('chatName');
        const messageInput = document.getElementById('chatMessage');
        
        if (!nameInput.value.trim() || !messageInput.value.trim()) {
            this.showNotification('Preencha nome e mensagem!', 'error');
            return;
        }
        
        const newMessage = {
            id: Date.now(),
            autor: nameInput.value,
            mensagem: messageInput.value,
            hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            data: 'Agora'
        };
        
        this.state.chatMessages.unshift(newMessage);
        this.loadChatMessages();
        
        // Limpar formulário
        messageInput.value = '';
        messageInput.focus();
        
        this.showNotification('Mensagem enviada!', 'success');
    }

    loadChatMessages() {
        const container = document.getElementById('chatMessages');
        if (!container) return;
        
        container.innerHTML = this.state.chatMessages.map(msg => `
            <div class="message-card">
                <div class="message-header">
                    <span class="message-author">${msg.autor}</span>
                    <span class="message-time">${msg.data}, ${msg.hora}</span>
                </div>
                <div class="message-text">${msg.mensagem}</div>
            </div>
        `).join('');
    }
}

// Inicializar aplicação
const app = new FullBellyApp();
document.addEventListener('DOMContentLoaded', () => app.init());

// Exportar para uso global
window.app = app;
