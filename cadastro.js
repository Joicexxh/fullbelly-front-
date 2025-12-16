document.addEventListener('DOMContentLoaded', function () {
    console.log('cadastro.js carregado 🚀');

    let currentStep = 1;
    let selectedProfile = '';
    let formData = {};

    // Inicializa apenas se as funções existirem
    if (typeof inicializarSelecaoPerfil === 'function') {
        inicializarSelecaoPerfil();
    }

    if (typeof inicializarNavegacao === 'function') {
        inicializarNavegacao();
    }

    if (typeof inicializarValidacoes === 'function') {
        inicializarValidacoes();
    }

    if (typeof inicializarModais === 'function') {
        inicializarModais();
    }

    if (typeof atualizarProgresso === 'function') {
        atualizarProgresso();
    }
});;
            
            // Funções de inicialização
            function inicializarSelecaoPerfil() {
                const perfilOptions = document.querySelectorAll('.perfil-option');
                const tipoInput = document.getElementById('tipo-usuario');
                
                perfilOptions.forEach(option => {
                    option.addEventListener('click', function() {
                        // Remove seleção de todas as opções
                        perfilOptions.forEach(opt => opt.classList.remove('selected'));
                        
                        // Adiciona seleção à opção clicada
                        this.classList.add('selected');
                        
                        // Atualiza o tipo selecionado
                        selectedProfile = this.dataset.tipo;
                        tipoInput.value = selectedProfile;
                        
                        // Atualiza a descrição do passo 3
                        atualizarDescricaoPasso3();
                    });
                });
                
                // Verifica se há tipo na URL
                const urlParams = new URLSearchParams(window.location.search);
                const tipoUrl = urlParams.get('tipo');
                
                if (tipoUrl) {
                    const option = document.querySelector(`.perfil-option[data-tipo="${tipoUrl}"]`);
                    if (option) {
                        option.click();
                    }
                }
            }
            
            function atualizarDescricaoPasso3() {
                const descricao = document.getElementById('step3-description');
                const secoes = document.querySelectorAll('.perfil-secao');
                
                // Esconde todas as seções
                secoes.forEach(secao => {
                    secao.style.display = 'none';
                });
                
                // Mostra a seção correta
                switch(selectedProfile) {
                    case 'restaurante':
                        descricao.textContent = 'Preencha as informações do seu restaurante:';
                        document.getElementById('secao-restaurante').style.display = 'block';
                        break;
                    case 'beneficiario':
                        descricao.textContent = 'Preencha as informações do beneficiário:';
                        document.getElementById('secao-beneficiario').style.display = 'block';
                        break;
                    case 'voluntario':
                        descricao.textContent = 'Preencha as informações do voluntário:';
                        document.getElementById('secao-voluntario').style.display = 'block';
                        inicializarOpcoesVoluntario();
                        break;
                }
            }
            
            function inicializarOpcoesVoluntario() {
                // Opções de veículo
                const veiculoOptions = document.querySelectorAll('.veiculo-option');
                const veiculoInput = document.getElementById('vol-veiculo');
                
                veiculoOptions.forEach(option => {
                    option.addEventListener('click', function() {
                        // Remove seleção de todas as opções
                        veiculoOptions.forEach(opt => opt.classList.remove('selected'));
                        
                        // Adiciona seleção à opção clicada
                        this.classList.add('selected');
                        
                        // Atualiza o valor do input
                        veiculoInput.value = this.dataset.veiculo;
                    });
                });
                
                // Controle do range de raio
                const raioSlider = document.getElementById('vol-raio');
                const raioValue = document.getElementById('raio-value');
                
                if (raioSlider && raioValue) {
                    raioSlider.addEventListener('input', function() {
                        raioValue.textContent = this.value + ' km';
                    });
                }
            }
            
            function inicializarNavegacao() {
    // Botões de próximo
    const next1 = document.getElementById('next-step1');
    const next2 = document.getElementById('next-step2');
    const next3 = document.getElementById('next-step3');

    if (next1) next1.addEventListener('click', () => irParaPasso(2));
    if (next2) next2.addEventListener('click', () => irParaPasso(3));
    if (next3) next3.addEventListener('click', () => irParaPasso(4));

    // Botões de voltar
    const prev2 = document.getElementById('prev-step2');
    const prev3 = document.getElementById('prev-step3');
    const prev4 = document.getElementById('prev-step4');

    if (prev2) prev2.addEventListener('click', () => irParaPasso(1));
    if (prev3) prev3.addEventListener('click', () => irParaPasso(2));
    if (prev4) prev4.addEventListener('click', () => irParaPasso(3));

    // Botão de submit
    const submit = document.getElementById('submit-cadastro');
    if (submit) submit.addEventListener('click', finalizarCadastro);
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
                document.getElementById(`step${passo}`).classList.add('active');
                
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
            
            function validarPassoAtual(passo) {
                switch(passo) {
                    case 1:
                        if (!selectedProfile) {
                            alert('Por favor, selecione um tipo de perfil.');
                            return false;
                        }
                        break;
                        
                    case 2:
                        // Valida campos obrigatórios do passo 2
                        const camposObrigatorios = ['nome', 'email', 'documento', 'telefone', 'endereco'];
                        for (let campo of camposObrigatorios) {
                            const input = document.getElementById(campo);
                            if (!input.value.trim()) {
                                alert(`Por favor, preencha o campo "${campo.replace('-', ' ')}".`);
                                input.focus();
                                return false;
                            }
                        }
                        
                        // Validação de e-mail
                        const email = document.getElementById('email').value;
                        if (!validarEmail(email)) {
                            alert('Por favor, digite um e-mail válido.');
                            document.getElementById('email').focus();
                            return false;
                        }
                        
                        // Validação de CPF/CNPJ baseado no perfil
                        const documento = document.getElementById('documento').value.replace(/\D/g, '');
                        if (selectedProfile === 'restaurante') {
                            if (!validarCNPJ(documento)) {
                                alert('Por favor, digite um CNPJ válido.');
                                document.getElementById('documento').focus();
                                return false;
                            }
                        } else {
                            if (!validarCPF(documento)) {
                                alert('Por favor, digite um CPF válido.');
                                document.getElementById('documento').focus();
                                return false;
                            }
                        }
                        break;
                        
                    case 3:
                        // Validações específicas por perfil
                        switch(selectedProfile) {
                            case 'voluntario':
                                const veiculo = document.getElementById('vol-veiculo').value;
                                if (!veiculo) {
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
                                const pessoas = document.getElementById('ben-pessoas').value;
                                const renda = document.getElementById('ben-renda').value;
                                
                                if (!pessoas || pessoas < 1) {
                                    alert('Por favor, informe o número de pessoas na família.');
                                    document.getElementById('ben-pessoas').focus();
                                    return false;
                                }
                                
                                if (!renda) {
                                    alert('Por favor, selecione a renda familiar.');
                                    document.getElementById('ben-renda').focus();
                                    return false;
                                }
                                break;
                        }
                        break;
                }
                
                return true;
            }
            
            function salvarDadosPasso(passo) {
                switch(passo) {
                    case 1:
                        formData.tipo = selectedProfile;
                        break;
                        
                    case 2:
                        formData.dadosPessoais = {
                            nome: document.getElementById('nome').value,
                            email: document.getElementById('email').value,
                            documento: document.getElementById('documento').value,
                            telefone: document.getElementById('telefone').value,
                            dataNascimento: document.getElementById('data-nascimento').value,
                            genero: document.getElementById('genero').value,
                            endereco: document.getElementById('endereco').value
                        };
                        break;
                        
                    case 3:
                        formData.infoEspecificas = {};
                        formData.descricao = document.getElementById('descricao-geral').value;
                        
                        switch(selectedProfile) {
                            case 'restaurante':
                                formData.infoEspecificas = {
                                    tipoEstabelecimento: document.getElementById('rest-tipo').value,
                                    especialidade: document.getElementById('rest-especialidade').value,
                                    horarioFuncionamento: document.getElementById('rest-horario').value,
                                    capacidadeDoacao: document.getElementById('rest-capacidade').value,
                                    tiposAlimentos: Array.from(document.querySelectorAll('input[name="rest-alimentos[]"]:checked'))
                                                         .map(cb => cb.value)
                                };
                                break;
                                
                            case 'beneficiario':
                                formData.infoEspecificas = {
                                    pessoasFamilia: document.getElementById('ben-pessoas').value,
                                    criancas: document.getElementById('ben-criancas').value || 0,
                                    idosos: document.getElementById('ben-idosos').value || 0,
                                    rendaFamiliar: document.getElementById('ben-renda').value,
                                    necessidades: Array.from(document.querySelectorAll('input[name="ben-necessidades[]"]:checked'))
                                                      .map(cb => cb.value),
                                    descricaoSituacao: document.getElementById('ben-descricao').value
                                };
                                break;
                                
                            case 'voluntario':
                                formData.infoEspecificas = {
                                    veiculo: document.getElementById('vol-veiculo').value,
                                    dias: Array.from(document.querySelectorAll('input[name="vol-dias[]"]:checked'))
                                             .map(cb => cb.value),
                                    horario: document.getElementById('vol-horario').value,
                                    raio: document.getElementById('vol-raio').value,
                                    habilidades: Array.from(document.querySelectorAll('input[name="vol-habilidades[]"]:checked'))
                                                    .map(cb => cb.value),
                                    experiencia: document.getElementById('vol-experiencia').value
                                };
                                break;
                        }
                        break;
                }
            }
            
            function atualizarCirculosProgresso(passo) {
                // Atualiza todos os círculos até o passo atual
                for (let i = 1; i <= 4; i++) {
                    const circle = document.getElementById(`step${i}-circle`);
                    if (i < passo) {
                        circle.className = 'step-circle completed';
                    } else if (i === passo) {
                        circle.className = 'step-circle active';
                    } else {
                        circle.className = 'step-circle';
                    }
                }
            }
            
            function atualizarTextosProgresso() {
                // Atualiza textos do progresso
                for (let i = 1; i <= 4; i++) {
                    const text = document.querySelector(`.progress-step:nth-child(${i}) .step-text`);
                    if (i === currentStep) {
                        text.className = 'step-text active';
                    } else if (i < currentStep) {
                        text.className = 'step-text completed';
                    } else {
                        text.className = 'step-text';
                    }
                }
            }
            
            function atualizarProgresso() {
                atualizarCirculosProgresso(currentStep);
                atualizarTextosProgresso();
            }
            
            function inicializarValidacoes() {
                // Validação de força da senha
                const senhaInput = document.getElementById('senha');
                const strengthBar = document.getElementById('strength-bar');
                const feedback = document.getElementById('password-feedback');
                
                if (senhaInput && strengthBar && feedback) {
                    senhaInput.addEventListener('input', function() {
                        const senha = this.value;
                        const forca = calcularForcaSenha(senha);
                        
                        // Atualiza barra de força
                        strengthBar.className = `strength-bar strength-${forca.nivel}`;
                        strengthBar.style.width = forca.porcentagem + '%';
                        
                        // Atualiza feedback
                        feedback.textContent = forca.mensagem;
                        feedback.style.color = forca.cor;
                        feedback.style.display = 'block';
                    });
                }
                
                // Validação de confirmação de senha
                const confirmarSenha = document.getElementById('confirmar-senha');
                const matchDiv = document.getElementById('password-match');
                
                if (confirmarSenha && matchDiv) {
                    confirmarSenha.addEventListener('input', function() {
                        const senha = document.getElementById('senha').value;
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
                }
                
                // Formatação automática de campos
                formatarCampoTelefone();
                formatarCampoDocumento();
            }
            
            function formatarCampoTelefone() {
                const telefoneInput = document.getElementById('telefone');
                
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
            
            function calcularForcaSenha(senha) {
                let forca = 0;
                let mensagem = '';
                let cor = '#dc3545';
                let nivel = 'weak';
                let porcentagem = 0;
                
                if (senha.length >= 8) forca += 1;
                if (senha.length >= 12) forca += 1;
                if (/[A-Z]/.test(senha)) forca += 1;
                if (/[0-9]/.test(senha)) forca += 1;
                if (/[^A-Za-z0-9]/.test(senha)) forca += 1;
                
                if (forca <= 2) {
                    mensagem = 'Senha fraca';
                    cor = '#dc3545';
                    nivel = 'weak';
                    porcentagem = 33;
                } else if (forca <= 4) {
                    mensagem = 'Senha média';
                    cor = '#ffc107';
                    nivel = 'medium';
                    porcentagem = 66;
                } else {
                    mensagem = 'Senha forte';
                    cor = '#28a745';
                    nivel = 'strong';
                    porcentagem = 100;
                }
                
                return { mensagem, cor, nivel, porcentagem };
            }
            
            function gerarResumo() {
                const resumoDiv = document.getElementById('resumo-cadastro');
                let html = `
                    <div class="resumo-item">
                        <strong>Tipo de Perfil:</strong> ${obterNomePerfil(formData.tipo)}
                    </div>
                    <div class="resumo-item">
                        <strong>Nome:</strong> ${formData.dadosPessoais.nome}
                    </div>
                    <div class="resumo-item">
                        <strong>E-mail:</strong> ${formData.dadosPessoais.email}
                    </div>
                    <div class="resumo-item">
                        <strong>Documento:</strong> ${formData.dadosPessoais.documento}
                    </div>
                    <div class="resumo-item">
                        <strong>Endereço:</strong> ${formData.dadosPessoais.endereco}
                    </div>
                `;
                
                // Adiciona informações específicas
                if (formData.infoEspecificas) {
                    switch(formData.tipo) {
                        case 'restaurante':
                            html += `
                                <div class="resumo-item">
                                    <strong>Tipo de Estabelecimento:</strong> ${formData.infoEspecificas.tipoEstabelecimento || 'Não informado'}
                                </div>
                                <div class="resumo-item">
                                    <strong>Especialidade:</strong> ${formData.infoEspecificas.especialidade || 'Não informada'}
                                </div>
                            `;
                            break;
                            
                        case 'beneficiario':
                            html += `
                                <div class="resumo-item">
                                    <strong>Pessoas na Família:</strong> ${formData.infoEspecificas.pessoasFamilia}
                                </div>
                                <div class="resumo-item">
                                    <strong>Renda Familiar:</strong> ${obterNomeRenda(formData.infoEspecificas.rendaFamiliar)}
                                </div>
                            `;
                            break;
                            
                        case 'voluntario':
                            html += `
                                <div class="resumo-item">
                                    <strong>Veículo:</strong> ${obterNomeVeiculo(formData.infoEspecificas.veiculo)}
                                </div>
                                <div class="resumo-item">
                                    <strong>Dias Disponíveis:</strong> ${formData.infoEspecificas.dias ? formData.infoEspecificas.dias.length + ' dias' : 'Não informado'}
                                </div>
                            `;
                            break;
                    }
                }
                
                resumoDiv.innerHTML = html;
            }
            
            function obterNomePerfil(tipo) {
                switch(tipo) {
                    case 'restaurante': return 'Restaurante/Estabelecimento';
                    case 'beneficiario': return 'Beneficiário/Família';
                    case 'voluntario': return 'Voluntário';
                    default: return tipo;
                }
            }
            
            function obterNomeRenda(renda) {
                switch(renda) {
                    case 'ate-1': return 'Até 1 salário mínimo';
                    case '1-2': return '1 a 2 salários mínimos';
                    case '2-3': return '2 a 3 salários mínimos';
                    case 'acima-3': return 'Acima de 3 salários mínimos';
                    case 'sem-renda': return 'Sem renda fixa';
                    default: return 'Não informado';
                }
            }
            
            function obterNomeVeiculo(veiculo) {
                switch(veiculo) {
                    case 'carro': return 'Carro';
                    case 'moto': return 'Moto';
                    case 'bicicleta': return 'Bicicleta';
                    case 'pe': return 'A pé';
                    default: return veiculo;
                }
            }
            
            function inicializarModais() {
                // Links para termos e política
                document.getElementById('link-termos').addEventListener('click', function(e) {
                    e.preventDefault();
                    mostrarTermosUso();
                });
                
                document.getElementById('link-politica').addEventListener('click', function(e) {
                    e.preventDefault();
                    mostrarPoliticaPrivacidade();
                });
                
                // Fechar modais
                document.querySelectorAll('.modal-close').forEach(button => {
                    button.addEventListener('click', function() {
                        this.closest('.modal').style.display = 'none';
                    });
                });
                
                // Fechar modal ao clicar fora
                document.querySelectorAll('.modal').forEach(modal => {
                    modal.addEventListener('click', function(e) {
                        if (e.target === this) {
                            this.style.display = 'none';
                        }
                    });
                });
            }
            
            function finalizarCadastro(e) {
                e.preventDefault();
                
                // Validações finais
                if (!validarPassoAtual(4)) {
                    return;
                }
                
                // Valida senha
                const senha = document.getElementById('senha').value;
                const confirmarSenha = document.getElementById('confirmar-senha').value;
                
                if (senha !== confirmarSenha) {
                    alert('As senhas não coincidem. Por favor, verifique.');
                    return;
                }
                
                if (senha.length < 8) {
                    alert('A senha deve ter pelo menos 8 caracteres.');
                    return;
                }
                
                // Valida termos
                if (!document.getElementById('termos').checked) {
                    alert('Você deve aceitar os Termos de Uso e Política de Privacidade.');
                    return;
                }
                
                // Salva dados finais
                salvarDadosPasso(4);
                formData.senha = senha;
                formData.aceitaNewsletter = document.getElementById('newsletter').checked;
                formData.dataCadastro = new Date().toISOString();
                
                // Salva no localStorage (simulação)
                salvarUsuario(formData);
                
                // Mostra mensagem de sucesso
                mostrarMensagemSucesso();
            }
            
            function salvarUsuario(dados) {
                // Cria objeto de usuário
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
                
                // Adiciona dados específicos do perfil
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
                
                // Salva no localStorage
                localStorage.setItem('fullbelly-usuario', JSON.stringify(usuario));
                localStorage.setItem('fullbelly-logado', 'true');
                
                console.log('Usuário cadastrado:', usuario);
                return usuario;
            }
            
            function mostrarMensagemSucesso() {
                // Esconde o formulário
                document.getElementById('cadastro-form').style.display = 'none';
                
                // Mostra mensagem de sucesso
                document.getElementById('success-message').style.display = 'block';
                
                // Atualiza o progresso para completado
                atualizarCirculosProgresso(5);
                
                // Redireciona automático após 5 segundos
                setTimeout(() => {
                    window.location.href = 'perfil.html';
                }, 5000);
            }
            
            // Funções de validação auxiliares
            function validarEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            }
            
            function validarCPF(cpf) {
                cpf = cpf.replace(/\D/g, '');
                
                if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
                    return false;
                }
                
                let soma = 0;
                let resto;
                
                for (let i = 1; i <= 9; i++) {
                    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
                }
                
                resto = (soma * 10) % 11;
                if (resto === 10 || resto === 11) resto = 0;
                if (resto !== parseInt(cpf.substring(9, 10))) return false;
                
                soma = 0;
                for (let i = 1; i <= 10; i++) {
                    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
                }
                
                resto = (soma * 10) % 11;
                if (resto === 10 || resto === 11) resto = 0;
                if (resto !== parseInt(cpf.substring(10, 11))) return false;
                
                return true;
            }
            
            function validarCNPJ(cnpj) {
                cnpj = cnpj.replace(/\D/g, '');
                
                if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
                    return false;
                }
                
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
                if (resultado !== parseInt(digitos.charAt(1))) return false;
                
                return true;
            }
  
