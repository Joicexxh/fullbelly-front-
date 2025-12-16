// cadastro.js - Versão corrigida para seu HTML
document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 cadastro.js carregado');

    // ============================================
    // VARIÁVEIS GLOBAIS
    // ============================================
    let currentStep = 1;
    let selectedProfile = '';
    let formData = {};

    // ============================================
    // DEBUG: VERIFICAR ELEMENTOS
    // ============================================
    console.log('=== VERIFICANDO ELEMENTOS ===');
    console.log('1. .perfil-option:', document.querySelectorAll('.perfil-option').length);
    console.log('2. #tipo-usuario:', document.getElementById('tipo-usuario'));
    console.log('3. #nome:', document.getElementById('nome'));
    console.log('4. #email:', document.getElementById('email'));
    console.log('5. #documento:', document.getElementById('documento'));
    console.log('6. #telefone:', document.getElementById('telefone'));
    console.log('7. #endereco:', document.getElementById('endereco'));
    console.log('8. #senha:', document.getElementById('senha'));
    console.log('9. #confirmar-senha:', document.getElementById('confirmar-senha'));
    console.log('10. .perfil-selector:', document.querySelector('.perfil-selector'));
    console.log('=== FIM VERIFICAÇÃO ===');

    // ============================================
    // INICIALIZAÇÃO
    // ============================================
    function inicializarTudo() {
        console.log('Inicializando sistema de cadastro...');
        
        // 1. Inicializar componentes
        inicializarSelecaoPerfil();
        inicializarNavegacao();
        inicializarValidacoes();
        inicializarModais();
        
        // 2. Atualizar UI
        atualizarProgresso();
        
        console.log('✅ Sistema de cadastro inicializado');
    }

    // ============================================
    // 1. SELEÇÃO DE PERFIL
    // ============================================
    function inicializarSelecaoPerfil() {
        // IMPORTANTE: Seus elementos têm classe .perfil-option mas estão dentro de .perfil-selector
        const perfilSelector = document.querySelector('.perfil-selector');
        if (!perfilSelector) {
            console.error('❌ Seletor de perfil (.perfil-selector) não encontrado!');
            return;
        }
        
        const perfilOptions = perfilSelector.querySelectorAll('.perfil-option');
        const tipoInput = document.getElementById('tipo-usuario');
        
        if (!perfilOptions.length) {
            console.error('❌ Nenhuma opção de perfil encontrada dentro do seletor');
            return;
        }
        
        console.log(`✅ Encontradas ${perfilOptions.length} opções de perfil`);
        
        perfilOptions.forEach(option => {
            option.addEventListener('click', function() {
                console.log('Opção clicada:', this.dataset.tipo);
                
                // Remove seleção de todas as opções
                perfilOptions.forEach(opt => {
                    opt.classList.remove('selected');
                    opt.style.borderColor = '';
                    opt.style.backgroundColor = '';
                });
                
                // Adiciona seleção à opção clicada
                this.classList.add('selected');
                this.style.borderColor = '#4CAF50';
                this.style.backgroundColor = '#f0f9f0';
                
                // Atualiza o tipo selecionado
                selectedProfile = this.dataset.tipo;
                if (tipoInput) {
                    tipoInput.value = selectedProfile;
                }
                
                console.log('✅ Perfil selecionado:', selectedProfile);
                atualizarDescricaoPasso3();
            });
        });
        
        // Verifica se há tipo na URL
        const urlParams = new URLSearchParams(window.location.search);
        const tipoUrl = urlParams.get('tipo');
        
        if (tipoUrl) {
            const option = perfilSelector.querySelector(`.perfil-option[data-tipo="${tipoUrl}"]`);
            if (option) {
                option.click();
            }
        }
        
        // Adicionar estilos CSS para visualização
        const style = document.createElement('style');
        style.textContent = `
            .perfil-option {
                cursor: pointer;
                transition: all 0.3s ease;
                border: 2px solid #ddd;
                border-radius: 10px;
                padding: 20px;
            }
            .perfil-option:hover {
                transform: translateY(-5px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
            .perfil-option.selected {
                border-color: #4CAF50 !important;
                background-color: #f0f9f0 !important;
            }
        `;
        document.head.appendChild(style);
    }

    function atualizarDescricaoPasso3() {
        const descricao = document.getElementById('step3-description');
        const secoes = document.querySelectorAll('.perfil-secao');
        
        if (!descricao) {
            console.error('Elemento #step3-description não encontrado');
            return;
        }
        
        console.log('Atualizando descrição para perfil:', selectedProfile);
        
        // Esconde todas as seções
        secoes.forEach(secao => {
            secao.style.display = 'none';
        });
        
        // Mostra a seção correta
        switch(selectedProfile) {
            case 'restaurante':
                descricao.textContent = 'Preencha as informações do seu restaurante:';
                const secaoRest = document.getElementById('secao-restaurante');
                if (secaoRest) {
                    secaoRest.style.display = 'block';
                    console.log('✅ Mostrando seção restaurante');
                }
                break;
            case 'beneficiario':
                descricao.textContent = 'Preencha as informações do beneficiário:';
                const secaoBen = document.getElementById('secao-beneficiario');
                if (secaoBen) {
                    secaoBen.style.display = 'block';
                    console.log('✅ Mostrando seção beneficiário');
                }
                break;
            case 'voluntario':
                descricao.textContent = 'Preencha as informações do voluntário:';
                const secaoVol = document.getElementById('secao-voluntario');
                if (secaoVol) {
                    secaoVol.style.display = 'block';
                    console.log('✅ Mostrando seção voluntário');
                    inicializarOpcoesVoluntario();
                }
                break;
        }
    }

    function inicializarOpcoesVoluntario() {
        // Opções de veículo
        const veiculoOptions = document.querySelectorAll('.veiculo-option');
        const veiculoInput = document.getElementById('vol-veiculo');
        
        if (!veiculoOptions.length || !veiculoInput) {
            console.warn('Opções de veículo não encontradas');
            return;
        }
        
        console.log('✅ Inicializando opções de veículo');
        
        veiculoOptions.forEach(option => {
            option.addEventListener('click', function() {
                veiculoOptions.forEach(opt => {
                    opt.classList.remove('selected');
                    opt.style.borderColor = '';
                    opt.style.backgroundColor = '';
                });
                
                this.classList.add('selected');
                this.style.borderColor = '#4CAF50';
                this.style.backgroundColor = '#f0f9f0';
                veiculoInput.value = this.dataset.veiculo;
                console.log('Veículo selecionado:', this.dataset.veiculo);
            });
        });
        
        // Controle do range de raio
        const raioSlider = document.getElementById('vol-raio');
        const raioValue = document.getElementById('raio-value');
        
        if (raioSlider && raioValue) {
            raioSlider.addEventListener('input', function() {
                raioValue.textContent = this.value + ' km';
            });
            console.log('✅ Slider de raio configurado');
        }
    }

    // ============================================
    // 2. NAVEGAÇÃO ENTRE PASSOS
    // ============================================
    function inicializarNavegacao() {
        console.log('Inicializando navegação...');
        
        // Botões de próximo
        const nextStep1 = document.getElementById('next-step1');
        const nextStep2 = document.getElementById('next-step2');
        const nextStep3 = document.getElementById('next-step3');
        
        if (nextStep1) {
            nextStep1.addEventListener('click', () => irParaPasso(2));
            console.log('✅ Botão next-step1 configurado');
        } else {
            console.error('❌ Botão next-step1 não encontrado');
        }
        
        if (nextStep2) {
            nextStep2.addEventListener('click', () => irParaPasso(3));
            console.log('✅ Botão next-step2 configurado');
        }
        
        if (nextStep3) {
            nextStep3.addEventListener('click', () => irParaPasso(4));
            console.log('✅ Botão next-step3 configurado');
        }
        
        // Botões de voltar
        const prevStep2 = document.getElementById('prev-step2');
        const prevStep3 = document.getElementById('prev-step3');
        const prevStep4 = document.getElementById('prev-step4');
        
        if (prevStep2) prevStep2.addEventListener('click', () => irParaPasso(1));
        if (prevStep3) prevStep3.addEventListener('click', () => irParaPasso(2));
        if (prevStep4) prevStep4.addEventListener('click', () => irParaPasso(3));
        
        // Botão de submit
        const submitBtn = document.getElementById('submit-cadastro');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault();
                finalizarCadastro();
            });
            console.log('✅ Botão submit-cadastro configurado');
        }
    }

    function irParaPasso(passo) {
        console.log(`Tentando ir para passo ${passo} (atual: ${currentStep})`);
        
        // Validações específicas antes de mudar de passo
        if (!validarPassoAtual(currentStep)) {
            console.log(`❌ Validação do passo ${currentStep} falhou`);
            return;
        }
        
        // Salva dados do passo atual
        salvarDadosPasso(currentStep);
        
        // Atualiza círculos do progresso
        atualizarCirculosProgresso(passo);
        
        // Esconde passo atual
        document.querySelectorAll('.form-step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Mostra novo passo
        currentStep = passo;
        const nextStep = document.getElementById(`step${passo}`);
        if (nextStep) {
            nextStep.classList.add('active');
        } else {
            console.error(`❌ Passo ${passo} não encontrado no DOM`);
            return;
        }
        
        // Atualiza textos do progresso
        atualizarTextosProgresso();
        
        // Se for o passo 3, atualiza a seção correta
        if (passo === 3) {
            atualizarDescricaoPasso3();
        }
        
        // Se for o passo 4, gera o resumo
        if (passo === 4) {
            gerarResumo();
        }
        
        // Rolar para o topo do passo
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        console.log(`✅ Agora no passo ${currentStep}`);
    }
// 3. VALIDAÇÕES
// ============================================
function inicializarValidacoes() {
    console.log('Inicializando validações...');
    
    // Validação de força da senha
    const senhaInput = document.getElementById('senha');
    const strengthBar = document.getElementById('strength-bar');
    const feedback = document.getElementById('password-feedback');
    
    if (senhaInput && strengthBar && feedback) {
        senhaInput.addEventListener('input', function() {
            const senha = this.value;
            const forca = calcularForcaSenha(senha);
            
            strengthBar.className = `strength-bar strength-${forca.nivel}`;
            strengthBar.style.width = forca.porcentagem + '%';
            
            feedback.textContent = forca.mensagem;
            feedback.style.color = forca.cor;
            feedback.style.display = 'block';
        });
        console.log('✅ Validação de senha configurada');
    } else {
        console.warn('⚠️ Elementos de validação de senha não encontrados');
    }
    
    // Validação de confirmação de senha
    const confirmarSenha = document.getElementById('confirmar-senha');
    const matchDiv = document.getElementById('password-match');
    
    if (confirmarSenha && matchDiv) {
        confirmarSenha.addEventListener('input', function() {
            const senha = document.getElementById('senha')?.value || '';
            const confirmacao = this.value;
            
            if (!confirmacao) {
                matchDiv.textContent = '';
                matchDiv.className = 'password-match';
            } else if (senha === confirmacao) {
                matchDiv.textContent = '✓ Senhas coincidem';
                matchDiv.className = 'password-match valid';
            } else {
                matchDiv.textContent = '✗ Senhas não coincidem';
                matchDiv.className = 'password-match invalid';
            }
        });
        console.log('✅ Validação de confirmação de senha configurada');
    }
    
    // ============================
    // Submissão do Formulário
    // ============================
    const submitBtn = document.getElementById('submit-cadastro');
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Não envia o form por padrão
        
        // Verificando se todas as validações foram feitas corretamente
        const senhaValida = feedback.style.color !== 'red';
        const senhasCoincidem = matchDiv.classList.contains('valid');
        
        if (senhaValida && senhasCoincidem) {
            // Se tudo estiver certo, envia os dados
            const dados = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                documento: document.getElementById('documento').value,
                telefone: document.getElementById('telefone').value,
                endereco: document.getElementById('endereco').value,
                senha: document.getElementById('senha').value,
                tipo: document.getElementById('tipo-usuario').value, // perfil escolhido
            };
            
            fetch(`${window.API_URL}/cadastro`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            })
            .then(response => response.json())
            .then(data => {
                console.log("✅ Cadastro realizado com sucesso:", data);
                alert("Cadastro realizado com sucesso!");
                // Redirecionar ou limpar o formulário após sucesso
            })
            .catch(error => {
                console.error("❌ Erro ao cadastrar:", error);
                alert("Erro ao realizar cadastro");
            });
        } else {
            // Se houver erros nas validações, mostre um alerta
            alert("Por favor, corrija os erros antes de submeter.");
        }
    });
}
        
        // Formatação automática de campos
        formatarCampoTelefone();
        formatarCampoDocumento();
        
        console.log('✅ Validações inicializadas');
    }

    function formatarCampoTelefone() {
        const telefoneInput = document.getElementById('telefone');
        
        if (!telefoneInput) {
            console.warn('⚠️ Campo telefone não encontrado');
            return;
        }
        
        console.log('✅ Configurando formatação de telefone');
        
        telefoneInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            
            if (value.length > 10) {
                // Formato: (11) 99999-9999
                value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length > 6) {
                // Formato: (11) 9999-9999
                value = value.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            } else if (value.length > 2) {
                // Formato: (11) 999
                value = value.replace(/^(\d{2})(\d+)/, '($1) $2');
            } else if (value.length > 0) {
                // Formato: (11
                value = value.replace(/^(\d+)/, '($1');
            }
            
            this.value = value;
        });
    }

    function formatarCampoDocumento() {
        const documentoInput = document.getElementById('documento');
        
        if (!documentoInput) {
            console.warn('⚠️ Campo documento não encontrado');
            return;
        }
        
        console.log('✅ Configurando formatação de documento');
        
        documentoInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            if (selectedProfile === 'restaurante') {
                // CNPJ: 14 dígitos
                if (value.length > 14) {
                    value = value.substring(0, 14);
                }
                
                if (value.length > 12) {
                    value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
                } else if (value.length > 8) {
                    value = value.replace(/^(\d{2})(\d{3})(\d{3})/, '$1.$2.$3/');
                } else if (value.length > 5) {
                    value = value.replace(/^(\d{2})(\d{3})/, '$1.$2.');
                }
            } else {
                // CPF: 11 dígitos
                if (value.length > 11) {
                    value = value.substring(0, 11);
                }
                
                if (value.length > 9) {
                    value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                } else if (value.length > 6) {
                    value = value.replace(/^(\d{3})(\d{3})/, '$1.$2.');
                } else if (value.length > 3) {
                    value = value.replace(/^(\d{3})/, '$1.');
                }
            }
            
            this.value = value;
        });
    }

    function validarPassoAtual(passo) {
        console.log(`Validando passo ${passo}...`);
        
        switch(passo) {
            case 1:
                if (!selectedProfile) {
                    alert('Por favor, selecione um tipo de perfil.');
                    return false;
                }
                console.log('✅ Passo 1 validado');
                break;
                
            case 2:
                // Valida campos obrigatórios do passo 2
                const camposObrigatorios = ['nome', 'email', 'documento', 'telefone', 'endereco'];
                for (let campo of camposObrigatorios) {
                    const input = document.getElementById(campo);
                    if (!input || !input.value.trim()) {
                        alert(`Por favor, preencha o campo "${campo}".`);
                        if (input) input.focus();
                        return false;
                    }
                }
                
                // Validação de e-mail
                const emailInput = document.getElementById('email');
                if (emailInput && !validarEmail(emailInput.value)) {
                    alert('Por favor, digite um e-mail válido.');
                    emailInput.focus();
                    return false;
                }
                
                // Validação de CPF/CNPJ
                const docInput = document.getElementById('documento');
                if (docInput) {
                    const documento = docInput.value.replace(/\D/g, '');
                    if (selectedProfile === 'restaurante') {
                        if (!validarCNPJ(documento)) {
                            alert('Por favor, digite um CNPJ válido.');
                            docInput.focus();
                            return false;
                        }
                    } else {
                        if (!validarCPF(documento)) {
                            alert('Por favor, digite um CPF válido.');
                            docInput.focus();
                            return false;
                        }
                    }
                }
                console.log('✅ Passo 2 validado');
                break;
                
            case 3:
                // Validações específicas por perfil
                switch(selectedProfile) {
                    case 'voluntario':
                        const veiculoInput = document.getElementById('vol-veiculo');
                        if (veiculoInput && !veiculoInput.value) {
                            alert('Por favor, selecione um meio de transporte.');
                            return false;
                        }
                        
                        const diasSelecionados = document.querySelectorAll('input[name="vol-dias[]"]:checked');
                        if (diasSelecionados.length === 0) {
                            alert('Por favor, selecione pelo menos um dia de disponibilidade.');
                            return false;
                        }
                        break;
                        
                    case 'beneficiario':
                        const pessoasInput = document.getElementById('ben-pessoas');
                        const rendaInput = document.getElementById('ben-renda');
                        
                        if (pessoasInput && (!pessoasInput.value || pessoasInput.value < 1)) {
                            alert('Por favor, informe o número de pessoas na família.');
                            pessoasInput.focus();
                            return false;
                        }
                        
                        if (rendaInput && !rendaInput.value) {
                            alert('Por favor, selecione a renda familiar.');
                            rendaInput.focus();
                            return false;
                        }
                        break;
                }
                console.log('✅ Passo 3 validado');
                break;
        }
        
        return true;
    }

    function salvarDadosPasso(passo) {
        console.log(`Salvando dados do passo ${passo}...`);
        
        switch(passo) {
            case 1:
                formData.tipo = selectedProfile;
                break;
                
            case 2:
                formData.dadosPessoais = {
                    nome: document.getElementById('nome')?.value || '',
                    email: document.getElementById('email')?.value || '',
                    documento: document.getElementById('documento')?.value || '',
                    telefone: document.getElementById('telefone')?.value || '',
                    dataNascimento: document.getElementById('data-nascimento')?.value || '',
                    genero: document.getElementById('genero')?.value || '',
                    endereco: document.getElementById('endereco')?.value || ''
                };
                break;
                
            case 3:
                formData.infoEspecificas = {};
                formData.descricao = document.getElementById('descricao-geral')?.value || '';
                
                switch(selectedProfile) {
                    case 'restaurante':
                        formData.infoEspecificas = {
                            tipoEstabelecimento: document.getElementById('rest-tipo')?.value || '',
                            especialidade: document.getElementById('rest-especialidade')?.value || '',
                            horarioFuncionamento: document.getElementById('rest-horario')?.value || '',
                            capacidadeDoacao: document.getElementById('rest-capacidade')?.value || '',
                            tiposAlimentos: Array.from(document.querySelectorAll('input[name="rest-alimentos[]"]:checked'))
                                             .map(cb => cb.value)
                        };
                        break;
                        
                    case 'beneficiario':
                        formData.infoEspecificas = {
                            pessoasFamilia: document.getElementById('ben-pessoas')?.value || '',
                            criancas: document.getElementById('ben-criancas')?.value || 0,
                            idosos: document.getElementById('ben-idosos')?.value || 0,
                            rendaFamiliar: document.getElementById('ben-renda')?.value || '',
                            necessidades: Array.from(document.querySelectorAll('input[name="ben-necessidades[]"]:checked'))
                                              .map(cb => cb.value),
                            descricaoSituacao: document.getElementById('ben-descricao')?.value || ''
                        };
                        break;
                        
                    case 'voluntario':
                        formData.infoEspecificas = {
                            veiculo: document.getElementById('vol-veiculo')?.value || '',
                            dias: Array.from(document.querySelectorAll('input[name="vol-dias[]"]:checked'))
                                     .map(cb => cb.value),
                            horario: document.getElementById('vol-horario')?.value || '',
                            raio: document.getElementById('vol-raio')?.value || '',
                            habilidades: Array.from(document.querySelectorAll('input[name="vol-habilidades[]"]:checked'))
                                            .map(cb => cb.value),
                            experiencia: document.getElementById('vol-experiencia')?.value || ''
                        };
                        break;
                }
                break;
        }
        
        console.log('📦 Dados salvos:', formData);
    }

    // ============================================
    // 4. PROGRESSO E UI
    // ============================================
    function atualizarCirculosProgresso(passo) {
        for (let i = 1; i <= 4; i++) {
            const circle = document.getElementById(`step${i}-circle`);
            if (circle) {
                circle.classList.remove('active', 'completed');
                if (i < passo) {
                    circle.classList.add('completed');
                } else if (i === passo) {
                    circle.classList.add('active');
                }
            }
        }
    }

    function atualizarTextosProgresso() {
        for (let i = 1; i <= 4; i++) {
            const text = document.querySelector(`.progress-step:nth-child(${i}) .step-text`);
            if (text) {
                text.classList.remove('active', 'completed');
                if (i === currentStep) {
                    text.classList.add('active');
                } else if (i < currentStep) {
                    text.classList.add('completed');
                }
            }
        }
    }

    function atualizarProgresso() {
        atualizarCirculosProgresso(currentStep);
        atualizarTextosProgresso();
    }

    // ============================================
    // 5. RESUMO DO CADASTRO
    // ============================================
    function gerarResumo() {
        const resumoDiv = document.getElementById('resumo-cadastro');
        if (!resumoDiv) {
            console.error('❌ Elemento #resumo-cadastro não encontrado');
            return;
        }
        
        let html = `
            <div class="resumo-item">
                <strong>📋 Tipo de Perfil:</strong> ${obterNomePerfil(formData.tipo)}
            </div>
            <div class="resumo-item">
                <strong>👤 Nome:</strong> ${formData.dadosPessoais?.nome || 'Não informado'}
            </div>
            <div class="resumo-item">
                <strong>📧 E-mail:</strong> ${formData.dadosPessoais?.email || 'Não informado'}
            </div>
            <div class="resumo-item">
                <strong>📄 Documento:</strong> ${formData.dadosPessoais?.documento || 'Não informado'}
            </div>
            <div class="resumo-item">
                <strong>📍 Endereço:</strong> ${formData.dadosPessoais?.endereco || 'Não informado'}
            </div>
        `;
        
        if (formData.infoEspecificas) {
            switch(formData.tipo) {
                case 'restaurante':
                    html += `
                        <div class="resumo-item">
                            <strong>🏪 Tipo de Estabelecimento:</strong> ${formData.infoEspecificas.tipoEstabelecimento || 'Não informado'}
                        </div>
                        <div class="resumo-item">
                            <strong>⭐ Especialidade:</strong> ${formData.infoEspecificas.especialidade || 'Não informada'}
                        </div>
                    `;
                    break;
                    
                case 'beneficiario':
                    html += `
                        <div class="resumo-item">
                            <strong>👨‍👩‍👧‍👦 Pessoas na Família:</strong> ${formData.infoEspecificas.pessoasFamilia || 'Não informado'}
                        </div>
                        <div class="resumo-item">
                            <strong>💰 Renda Familiar:</strong> ${obterNomeRenda(formData.infoEspecificas.rendaFamiliar)}
                        </div>
                    `;
                    break;
                    
                case 'voluntario':
                    html += `
                        <div class="resumo-item">
                            <strong>🚗 Veículo:</strong> ${obterNomeVeiculo(formData.infoEspecificas.veiculo)}
                        </div>
                        <div class="resumo-item">
                            <strong>📅 Dias Disponíveis:</strong> ${formData.infoEspecificas.dias ? formData.infoEspecificas.dias.length + ' dias' : 'Não informado'}
                        </div>
                    `;
                    break;
            }
        }
        
        resumoDiv.innerHTML = html;
        console.log('✅ Resumo gerado');
    }

    function obterNomePerfil(tipo) {
        const perfis = {
            'restaurante': '🍽️ Restaurante/Estabelecimento',
            'beneficiario': '👨‍👩‍👧‍👦 Beneficiário/Família',
            'voluntario': '🚗 Voluntário'
        };
        return perfis[tipo] || tipo;
    }

    function obterNomeRenda(renda) {
        const rendas = {
            'ate-1': 'Até 1 salário mínimo',
            '1-2': '1 a 2 salários mínimos',
            '2-3': '2 a 3 salários mínimos',
            'acima-3': 'Acima de 3 salários mínimos',
            'sem-renda': 'Sem renda fixa'
        };
        return rendas[renda] || 'Não informado';
    }

    function obterNomeVeiculo(veiculo) {
        const veiculos = {
            'carro': '🚗 Carro',
            'moto': '🏍️ Moto',
            'bicicleta': '🚲 Bicicleta',
            'pe': '🚶 A pé'
        };
        return veiculos[veiculo] || veiculo;
    }

    // ============================================
    // 6. MODAIS
    // ============================================
    function inicializarModais() {
        console.log('Inicializando modais...');
        
        // Links para termos e política
        const linkTermos = document.getElementById('link-termos');
        const linkPolitica = document.getElementById('link-politica');
        
        if (linkTermos) {
            linkTermos.addEventListener('click', function(e) {
                e.preventDefault();
                mostrarTermosUso();
            });
        }
        
        if (linkPolitica) {
            linkPolitica.addEventListener('click', function(e) {
                e.preventDefault();
                mostrarPoliticaPrivacidade();
            });
        }
        
        console.log('✅ Modais inicializados');
    }

    function mostrarTermosUso() {
        alert('Termos de Uso - Em breve uma janela completa será implementada.');
    }

    function mostrarPoliticaPrivacidade() {
        alert('Política de Privacidade - Em breve uma janela completa será implementada.');
    }

    // ============================================
    // 7. FINALIZAÇÃO DO CADASTRO
    // ============================================
    function finalizarCadastro() {
        console.log('Finalizando cadastro...');
        
        // Validações finais
        if (!validarPassoAtual(4)) {
            return;
        }
        
        // Valida senha
        const senhaInput = document.getElementById('senha');
        const confirmarSenhaInput = document.getElementById('confirmar-senha');
        
        if (!senhaInput || !confirmarSenhaInput) {
            alert('Campos de senha não encontrados.');
            return;
        }
        
        const senha = senhaInput.value;
        const confirmarSenha = confirmarSenhaInput.value;
        
        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem. Por favor, verifique.');
            return;
        }
        
        if (senha.length < 8) {
            alert('A senha deve ter pelo menos 8 caracteres.');
            return;
        }
        
        // Valida termos
        const termosCheckbox = document.getElementById('termos');
        if (!termosCheckbox || !termosCheckbox.checked) {
            alert('Você deve aceitar os Termos de Uso e Política de Privacidade.');
            return;
        }
        
        // Salva dados finais
        salvarDadosPasso(4);
        formData.senha = senha;
        formData.aceitaNewsletter = document.getElementById('newsletter')?.checked || false;
        formData.dataCadastro = new Date().toISOString();
        
        // Salva usuário
        salvarUsuario(formData);
        
        // Mostra mensagem de sucesso
        mostrarMensagemSucesso();
    }

    function salvarUsuario(dados) {
        const usuario = {
            id: Date.now(),
            ...dados.dadosPessoais,
            tipo: dados.tipo,
            infoEspecificas: dados.infoEspecificas,
            descricao: dados.descricao,
            senha: dados.senha,
            aceitaNewsletter: dados.aceitaNewsletter,
            dataCadastro: dados.dataCadastro,
            status: 'ativo',
            foto: null
        };
        
        switch(dados.tipo) {
            case 'voluntario':
                usuario.voluntario = {
                    veiculo: dados.infoEspecificas.veiculo,
                    diasDisponiveis: dados.infoEspecificas.dias,
                    horarioPreferido: dados.infoEspecificas.horario,
                    raioAtuacao: dados.infoEspecificas.raio,
                    habilidades: dados.infoEspecificas.habilidades,
                    experiencia: dados.infoEspecificas.experiencia,
                    missoesCompletadas: 0,
                    pontos: 0,
                    status: 'disponivel'
                };
                break;
                
            case 'restaurante':
                usuario.restaurante = {
                    tipoEstabelecimento: dados.infoEspecificas.tipoEstabelecimento,
                    especialidade: dados.infoEspecificas.especialidade,
                    horarioFuncionamento: dados.infoEspecificas.horarioFuncionamento,
                    capacidadeDoacao: dados.infoEspecificas.capacidadeDoacao,
                    tiposAlimentos: dados.infoEspecificas.tiposAlimentos,
                    doacoesRealizadas: 0,
                    avaliacao: 5.0
                };
                break;
                
            case 'beneficiario':
                usuario.beneficiario = {
                    pessoasFamilia: dados.infoEspecificas.pessoasFamilia,
                    criancas: dados.infoEspecificas.criancas,
                    idosos: dados.infoEspecificas.idosos,
                    rendaFamiliar: dados.infoEspecificas.rendaFamiliar,
                    necessidades: dados.infoEspecificas.necessidades,
                    descricaoSituacao: dados.infoEspecificas.descricaoSituacao,
                    doacoesRecebidas: 0
                };
                break;
        }
        
        localStorage.setItem('fullbelly-usuario', JSON.stringify(usuario));
        localStorage.setItem('fullbelly-logado', 'true');
        
        console.log('💾 Usuário salvo no localStorage:', usuario);
        return usuario;
    }

    function mostrarMensagemSucesso() {
        const cadastroForm = document.getElementById('cadastro-form');
        const successMessage = document.getElementById('success-message');
        
        if (cadastroForm) {
            cadastroForm.style.display = 'none';
            console.log('✅ Formulário escondido');
        }
        
        if (successMessage) {
            successMessage.style.display = 'block';
            console.log('✅ Mensagem de sucesso exibida');
        }
        
        atualizarCirculosProgresso(5);
        
        setTimeout(() => {
            window.location.href = 'perfil.html';
        }, 5000);
        
        console.log('✅ Cadastro finalizado com sucesso!');
    }

    // ============================================
    // 8. FUNÇÕES DE VALIDAÇÃO AUXILIARES
    // ============================================
    function calcularForcaSenha(senha) {
        let forca = 0;
        if (senha.length >= 8) forca += 1;
        if (senha.length >= 12) forca += 1;
        if (/[A-Z]/.test(senha)) forca += 1;
        if (/[0-9]/.test(senha)) forca += 1;
        if (/[^A-Za-z0-9]/.test(senha)) forca += 1;
        
        if (forca <= 2) {
            return { 
                mensagem: 'Senha fraca', 
                cor: '#dc3545', 
                nivel: 'weak', 
                porcentagem: 33 
            };
        } else if (forca <= 4) {
            return { 
                mensagem: 'Senha média', 
                cor: '#ffc107', 
                nivel: 'medium', 
                porcentagem: 66 
            };
        } else {
            return { 
                mensagem: 'Senha forte', 
                cor: '#28a745', 
                nivel: 'strong', 
                porcentagem: 100 
            };
        }
    }

    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
        
        // Cálculo dos dígitos verificadores
        let soma = 0;
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;
        
        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        return resto === parseInt(cpf.substring(10, 11));
    }

    function validarCNPJ(cnpj) {
        cnpj = cnpj.replace(/\D/g, '');
        if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
        
        // Cálculo dos dígitos verificadores
        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== parseInt(digitos.charAt(0))) return false;
        
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
        
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        return resultado === parseInt(digitos.charAt(1));
    }

    // ============================================
    // INICIALIZAÇÃO PRINCIPAL
    // ============================================
    inicializarTudo();
});
