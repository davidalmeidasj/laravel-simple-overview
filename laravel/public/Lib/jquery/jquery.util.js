/**
 * @fileOverview
 * Arquivo js de utilidades mais comuns de uso para jQuery.
 *
 ***** métodos para elementos *****
 *
 * $('seletor').setMascara('mascara');
 * $('seletor').setNumberFormat(casas, separadorDecimais, separadorMilhar);
 * $('seletor').marcarElementosParaChecar(arrayMsg[opcional]);
 * $('#form').getErrosElementosParaChecar();
 * $('#seletor').possuiValor();
 *
 *
 ***** métodos para valores *****
 *
 * $.limparNumero(valorNumerico, casas);
 * $.dataValida(data);    // dd/mm/aaaa
 * $.popup(url, nome, altura, largura, stringStatus, redimensionavel);
 * $.quantidadeDiasEntreDatas(dataMenor, dataMaior);
 * $.completarString(string, complemento, quantidade, lado);
 * $.getHoje();
 * $.numberFormat(valor, casas, separadorDecimais, separadorMilhar);
 * $.cpfValido(valor, validarMascara[opcional]);
 * $.cnpjValido(valor, validarMascara[opcional]);
 */

/**
 * @class
 * Classe que irá extender $.fn do jQuery
 */
function Fn()
{
    /**
     * Adiciona o atributo checar a todos os elementos do array parametros tendo
     * como valor de atributo a mensagem do array mensagens de mesmo índice.
     *
     * @uses $.fn.verificarElementosParaChecar
     * Utilizar em conjunto com $('#form').verificarElementosParaChecar();
     *
     * @example $('seletor').marcarElementosParaChecar();
     * if($('#form').getErrosElementosParaChecar(true)){
     *       return false;
     * }
     *
     * @param {Array} mensagens [opcional]  vetor de mensagenss informativas para
     *                                     cada elemento de acordo com a ordem,
     *                                     caso o erro seja detectado
     * @return {jQuery}
     */
    this.marcarElementosParaChecar = function(mensagens)
    {
        // se o array de mensagem informativa NÃO foi informado corretamente
        if (!mensagens || this.length !== mensagens.length)
        {
            // usa o nome do elemento
            this.each(function()
            {
                $(this).attr('checar', this.name.replace(/\W/g, ''));
            });

            return this;
        }

        // usa a mensagen informada
        this.each(function(indice)
        {
            $(this).attr('checar', mensagens[indice]);
        });

        return this;
    };

    /**
     * Verifica se os elementos que possuem o atributo 'checar' possuem algum valor
     * informado pelo usuário.
     * Utilizar em conjunto com $('seletor').marcarElementosParaChecar();
     *
     * @example $('seletor').marcarElementosParaChecar();
     * if($('#form').getErrosElementosParaChecar(true)){
     *       return false;
     * }
     *
     * @param alertar [opcinal] {Bool}
     * @return {String}  sem erros == ''     com erros != ''
     */
    this.getErrosElementosParaChecar = function(alertar)
    {
        var erros = new Array(),
                atributo = null,
                msg = '';

        $.each(this.get(0).elements, function()
        {
            atributo = this.getAttribute('checar');

            if (atributo && !$(this).possuiValor())
            {
                erros.push('Preencha o campo ' + atributo);
            }
        });

        msg = erros.join('\n');

        if (alertar && !!msg)
        {
            alert(msg);
        }

        // sem erros == ''
        // com erros != ''
        return msg;
    };

    /**
     * Verifica se o elemento possui algum valor informado além de espaços em branco.
     *
     * @example
     * if($('seletor').possuiValor()){
     *       return true;
     * }
     * else{
     *       return false;
     * }
     *
     * @param {Void}
     * @return {Number}  número de caracteres, sem contar os espaços em branco
     */
    this.possuiValor = function()
    {
        // > 0 possui valor
        // == 0 não possui valor            // remove todos os espaços em branco
        return this.val() ? this.val().replace(/\s/g, '').length : 0;
    };

    /**
     * Monitora os eventos keydown, focus e blur e aplica a máscara ao valor
     * enquanto o usuário digita.
     *
     * @example
     * $(function(){
     *       $('seletor').setMascara('##/##/####');
     * });
     *
     * @param mascara {String} 'cep', 'cpf', '##/##/####', '(##)####-####', 'cnpj', ...
     * @return {jQuery}
     */
    this.setMascara = function(mascara)
    {
        this.bind('keydown focus', function(evento)
        {
            evento = $.getEvent(evento);

            if ($.teclaPermitida(evento))
            {
                return;
            }

            mascara = mascara.toLowerCase();

            var el = this,
                    tecla = $.teclaNumerica(evento),
                    valor = el.value,
                    tamanhoInicial = valor.length,
                    posicaoCursor = $(el).getPosicaoCursor(),
                    inicio = posicaoCursor.inicio,
                    fim = posicaoCursor.fim,
                    posicao = inicio,
                    posicao_,
                    _mascara,
                    textoExpReg = '',
                    expReg,
                    divisaoMascara,
                    substituicaoExpReg,
                    i,
                    loop = 1,
                    tamanhoSemMascara,
                    numeroFim,
                    expRegNumeroFim;

            if (evento.type !== 'focus')
            {
                evento.preventDefault();
                evento.stopPropagation();

                if (!tecla)
                {
                    return;
                }
            }
            else
            {
                // evita que o valor seja apagado no evento 'focus', quando acessado
                // com a tecla tab
                if (inicio == 0 && fim >= valor.length)
                {
                    fim = inicio;
                }
            }

            // do número digitado até o final
            numeroFim = String.fromCharCode(tecla) + valor.substr(fim);

            valor = (valor.substr(0, inicio) + numeroFim).replace(/\D/g, '');

            if (mascara.indexOf('#') != -1)
            {
                // máscara dinâmica
                _mascara = mascara;
            }
            else if (mascara === 'tel_sp')
            {
                // existe a classe NonoDigito, basta usá-la
                if (typeof (NonoDigito) !== 'function')
                {
                    $.console('erro 404.: arquivo nonoDigito.js não encontrado');

                    return;
                }

                // @see nonoDigito.js
                var nonoDigito = new NonoDigito(el);

                if (nonoDigito.possuiNonoDigito())
                {
                    if (nonoDigito.faltaUmDigito())
                    {
                        nonoDigito.acrescentaNonoDigito();
                    } // if

                    _mascara = '(##) #####-####';
                } // if
                else if (nonoDigito.necessitaNonoDigito())
                {
                    nonoDigito.acrescentaNonoDigito();
                    _mascara = '(##) #####-####';
                }
                else
                {
                    _mascara = '(##) ####-####';
                } // if

            }
            else     // máscaras prontas
            {
                var mascaras =
                        {
                            data: '##/##/####',
                            cep: '#####-###',
                            cpf: '###.###.###-##',
                            cnpj: '##.###.###/####-##',
                            tel: '(##) ####-####',
                            telefone: '(##) ####-####'
                        };

                _mascara = mascaras[mascara];
                mascaras = null;

                if (!_mascara)
                {
                    $.console('A mascara não foi definida corretamente. id.: ' + el.id);
                    return;
                }
            }

            // array criado pela divisão da string por tudo que não for #
            divisaoMascara = _mascara.split(/[^\#]/);
            substituicaoExpReg = _mascara;

            // como exemplo transforma ###.####.####-## em $1.$2.$3-$4
            while (/\#/.test(substituicaoExpReg))
            {
                substituicaoExpReg = substituicaoExpReg.replace(/\#+/, '$' + loop);
                loop++;
            }

            // cria a expressão regular em tempo de execução para formatar a máscara informada
            // como exemplo transforma ###.####.####-## em (###)(###)(###)(##)
            for (i = 0; i < divisaoMascara.length; i++)
            {
                // se não tiver nenhum valor para formar o grupo
                if (divisaoMascara[i] == '')
                {
                    continue;
                }

                // separa por grupos
                textoExpReg += '(' + divisaoMascara[i] + ')';
            }

            // o ponto na expressão regular substitui qualquer caracter
            // como exemplo transforma (###)(###)(###)(##) em (...)(...)(...)(..)
            textoExpReg = textoExpReg.replace(/\#/g, '.');

            expReg = new RegExp(textoExpReg, 'g');

            // descobre o tamanho eliminando tudo que não for tralha
            tamanhoSemMascara = _mascara.replace(/[^\#]/g, '').length;

            valor = (valor.length > tamanhoSemMascara) ?
                    valor.substring(0, tamanhoSemMascara) : // reduz
                    $.completarString(valor, '_', tamanhoSemMascara); // completa com '_'

            // aplica a máscara
            valor = valor.replace(expReg, substituicaoExpReg);

            el.value = valor;

            // parte de posicionamento do cursor
            posicao = inicio;

            if (evento.type !== 'focus')
            {
                // primeira posiçao dos caracteres que são substituídos pelos
                // valores numéricos
                posicao_ = valor.indexOf('_');

                // se o usuário moveu o cursor para alguma posição no meio do valor
                // e não selecionou nenhuma parte, ao digitar o valor é empurrado
                // para frente, sendo necessário eliminar o último caracter
                if (inicio == fim && tamanhoInicial == valor.length && numeroFim.indexOf('_') == -1)
                {
                    numeroFim = numeroFim.substr(0, numeroFim.length - 1);
                }

                // deixa somente os números e coloca entre eles \D* para escapar a máscara.
                // No final é incluído \D*$ para indicar que tem que combinar com o final
                // do valor.
                expRegNumeroFim = RegExp(numeroFim.replace(/\D/g, '').split('').join('\\D*') + '\\D*$');

                // pega a posição removendo do número digitado até o final
                // utilizando o tamanho do que sobrar
                posicao = valor.replace(expRegNumeroFim, '').length + 1;

                // verifica se o usuário moveu o cursor para a direita da máscara
                // desnecessariamente e reposiciona
                posicao = (posicao_ != -1 && posicao_ < posicao) ? posicao_ : posicao;

                // enquanto a posição não for '_' ou número de 0 a 9
                while (!/\_|\d/.test(valor.charAt(posicao)))
                {
                    posicao++;

                    if (posicao > valor.length)
                    {
                        break;
                    }
                }
            }

            $(el).setPosicaoCursor(posicao);

            // se não está monitorando ainda o evento blur
            if (el._obj_mascara)
            {
                // pode ocorrer de a máscara ser alterada dinamicamente, como
                // no caso do nono dígito para celular de SP
                el._obj_mascara = _mascara;

                // evita ficar adicionando diversas vezes a mesma função ao evento 'blur'
                return;
            }

            el._obj_mascara = _mascara;

            $(el).bind('blur', function()
            {
                // converte # para d
                var m = el._obj_mascara.replace(/\#/g, 'd');

                // escapa todos os caracteres
                // se abandonar o campo sem completar a digitação, apaga tudo
                if (!RegExp('^\\' + m.split('').join('\\') + '$').test(el.value))
                {
                    el.value = '';
                    return;
                }

                // campos para serem validados além da máscara
                var metodos =
                        {
                            dataValida: 'dd/dd/dddd',
                            cpfValido: 'ddd.ddd.ddd-dd',
                            cnpjValido: 'dd.ddd.ddd/dddd-dd'
                        };

                $.each(metodos, function(metodo)
                {
                    if (m == this)
                    {
                        // se já digitou todos os valores
                        if (el.value.indexOf('_') === -1)
                        {
                            if (!$[metodo](el.value))
                            {
                                el.value = '';
                            }
                        }
                    }
                });
            });

            el._obj_mascara = _mascara;
        });

        return this;
    };

    /**
     * Aplica máscara de expressão regular enquanto se digita.
     * @param {RegExp} erKeypress
     * @param {RegExp} erBlur
     * @returns {jQuery}
     */
    this.setMascaraExpReg = function(erKeypress, erBlur) {
        var $self = this,
            evKeydown;

        /**
         * Testa o valor na expressao regular e o apaga caso não seja compatível.
         * @param {RegExp} er
         * @returns {undefined}
         */
        function validar(er) {
            setTimeout(function() {
                if (!er.test($self.val())) {
                    $self.val('');
                }
            }, 10);
        };

        $self.on('keydown', function(ev) {
            // evita o problema com teclas permitidas do keypress,
            // não dá para usar só o keydown por causa do valor obtido
            // com String.fromCharCode($.getTecla(evDown)).
            evKeydown = ev;
        }).on('keypress', function(evKeypress) {
            var tecla = $.getTecla(evKeypress),
                posicaoCursor = $self.getPosicaoCursor(),
                val = '' + $self.val(),
                valor = val.substr(0, posicaoCursor.inicio)
                      + String.fromCharCode(tecla)
                      + val.substr(posicaoCursor.fim, val.length);

            // não dá para usar o keypress
            if ($.teclaPermitida(evKeydown)) {
                return;
            }

            if (evKeypress.ctrlKey) {
                switch(tecla) {
                    case 118:   // Ctrl + v (colar)
                    case 97:    // Ctrl + a (selecionar tudo)
                    case 120:   // Ctrl + x (cortar)
                        return;
                }
            }

            // Shift + Insert (colar)
            if (evKeypress.shiftKey && tecla === 45) {
                return;
            }

            evKeypress.stopPropagation();
            evKeypress.preventDefault();

            if (erKeypress.test(valor)) {
                $self.val(valor);
                $self.setPosicaoCursor((posicaoCursor.inicio + 1));
            }
        }).on('blur', function() {
            validar(erBlur);
        }).on('paste', function() {
            validar(erKeypress);
        }).on('cut', function() {
            validar(erKeypress);
        });

        return this;
    };

    /**
     * Monitora o evento keydown e blur dos elementos e formata o valor enquanto o usuário
     * digita.
     *
     * @example
     * $(function(){
     *       $('seletor').setNumberFormat();               // 9.999,99
     *       $('seletor2').setNumberFormat(3, '.', '');    // 999.999
     * });
     *
     * @param casas[opcional] {Number} default 2, valor inteiro que indica a quantidade de casas decimais
     * @param separadorDecimais[opcional] {String} default ','
     * @param separadorMilhar[opcional] {String} default '.'
     * @return {void}
     */
    this.setNumberFormat = function(casas, separadorDecimais, separadorMilhar)
    {
        this.bind('keydown', function(evento)
        {
            evento = $.getEvent(evento);

            if ($.teclaPermitida(evento))
            {
                return;
            }

            evento.preventDefault();
            evento.stopPropagation();

            var tecla = $.teclaNumerica(evento);

            if (!tecla)
            {
                return;
            }

            var el = this,
                    valor = el.value,
                    numeroFormatado,
                    // se está formatando enquanto digita, precisa posicionar o cursor
                    posicaoCursor = $(el).getPosicaoCursor(),
                    inicio = posicaoCursor.inicio,
                    fim = posicaoCursor.fim,
                    posicao,
                    // do número digitado até o final
                    numeroFim = String.fromCharCode(tecla) + valor.substr(fim),
                    // transformando em uma expressão regular, do número digitado até o final
                    expReg = RegExp(numeroFim.replace(/\D/g, '').split('').join('\\D*') + '\\D*$');

            posicaoCursor = null;

            // obedecendo o tamanho máximo de caracteres do campo
            if (this.maxLength > 0 && this.maxLength <= valor.length)
            {
                // se o usuário não fez uma seleção de valores e está digitando
                // por cima
                if (inicio == fim)
                {
                    return;
                }
            }

            valor = (valor.substr(0, inicio) + numeroFim);

            // limpa o número para não arredondar o valor em $.numberFormat
            valor = $.limparNumero(valor, casas) + '';

            numeroFormatado = $.numberFormat(valor, casas, separadorDecimais, separadorMilhar);

            // pega a posição removendo do número digitado até o final
            posicao = numeroFormatado.replace(expReg, '').length + 1;

            el.value = numeroFormatado;

            try
            {
                // se tem algum elemento da máscara na posição, incrementa a
                // posição até encontrar um número
                while (isNaN(numeroFormatado.charAt(posicao)))
                {
                    posicao++;

                    if (posicao > numeroFormatado.length)
                    {
                        break;
                    }
                }

                $(el).setPosicaoCursor(posicao);
            } catch (e) {
            }

            // se já está monitorando o evento blur
            if ($.varExiste(el._obj_numberFormat))
            {
                return;
            }

            // caso tenha valor numérico, formata ao abandonar o campo, pois o
            // método não impede que o usuário modifique o valor livremente.
            $(el).bind('blur', function()
            {
                // um valor numérico em qualquer posição
                if (/\d/.test(this.value))
                {
                    // limpa o número para não arredondar o valor em $.numberFormat
                    this.value = $.numberFormat(($.limparNumero(this.value, casas) + ''), casas, separadorDecimais, separadorMilhar);
                }
                else
                {
                    this.value = '';
                }
            });

            // evita ficar adicionando diversas vezes a mesma função ao evento 'blur'
            el._obj_numberFormat = true;
        });

        return this;
    };

    /**
     * Função que retorna a posição do cursor no valor tipo texto do elemento.
     *
     * @param {Void}
     * @return {Object}
     */
    this.getPosicaoCursor = function()
    {
        var el = this.get(0);

        // w3c
        if ($.varExiste(el.selectionStart))
        {
            return {
                inicio: el.selectionStart,
                fim: el.selectionEnd,
                selectionStart: el.selectionStart,
                selectionEnd: el.selectionEnd,
                textoSelecionado: el.value.substring(el.selectionStart, el.selectionEnd)
            };
        }

        // internet explorer < 9
        // créditos: http://stackoverflow.com/questions/3053542/how-to-get-the-start-and-end-points-of-selection-in-text-area
        var range = document.selection.createRange(),
                len = el.value.length,
                normalizedValue = el.value.replace(/\r\n/g, "\n"),
                start,
                end,
                // Create a working TextRange that lives only in the input
                textInputRange = el.createTextRange();
        textInputRange.moveToBookmark(range.getBookmark());

        // Check if the start and end of the selection are at the very end
        // of the input, since moveStart/moveEnd doesn't return what we want
        // in those cases
        var endRange = el.createTextRange();
        endRange.collapse(false);

        if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1)
        {
            start = end = len;
        }
        else
        {
            start = -textInputRange.moveStart("character", -len);
            start += normalizedValue.slice(0, start).split("\n").length - 1;

            if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1)
            {
                end = len;
            }
            else
            {
                end = -textInputRange.moveEnd("character", -len);
                end += normalizedValue.slice(0, end).split("\n").length - 1;
            }
        }

        return {
            inicio: start,
            fim: end,
            selectionStart: start,
            selectionEnd: end,
            textoSelecionado: el.value.substring(start, end)
        };
    };

    /**
     * Função que determina a posição do cursor no valor tipo texto do elemento.
     *
     * @param posicaoInicial {Number} valor inteiro
     * @param posicaoFinal {Number} valor inteiro
     * @return {jQuery}
     */
    this.setPosicaoCursor = function(posicaoInicial, posicaoFinal)
    {
        var posicao = posicaoInicial,
                posicaoFim = parseInt(posicaoFinal, 10) >= 0 ? posicaoFinal : posicaoInicial,
                el = this.get(0);

        try
        {
            if (!!el.setSelectionRange)
            {
                // demais navegadores
                el.setSelectionRange(posicao, posicaoFim);
                return this;
            }

            // internet explorer
            var range = el.createTextRange();
            range.collapse(true);
            range.moveEnd('character', posicaoFim);
            range.moveStart('character', posicao);
            range.select();

            return this;

        } catch (e) {
        }
    };

    /**
     * Caso o elemento esteja oculto, retorna true e false em caso contrário.
     * @return {Boolean}
     */
    this.oculto = function()
    {
        // não verifica visibility
        // não verifica se os pais do elemento estão ocultos
        // não verifica se o elemento está oculto por classe
        // is(':hidden') é incompatível com ie8
        return this.get(0).style.display === 'none' ? true : false;
    }; // function

    /**
     * Método que remove a acentuação das vogais e substitui 'çÇ' por 'cC',
     * do atributo value do elemento.
     *
     * @return {jQuery}
     */
    this.removerAcentos = function()
    {
        this.val(
                $.removerAcentos(this.val())
               );

        return this;
    };

    /**
     * Método que verifica se um CPF é válido, opcionalmente pode verificar
     * se a máscara foi digitada corretamente.
     *
     * @param {Bool} validarMascara [opcional]    se verifica a máscara ou não
     * @return {Bool}
     */
    this.cpfValido = function(validarMascara)
    {
        return $.cpfValido(this.val(), validarMascara);
    };

    /**
     * Método que verifica se um CNPJ é válido, opcionalmente pode verificar
     * se a máscara foi digitada corretamente.
     *
     * @param {Bool} validarMascara [opcional]    se verifica a máscara ou não
     * @return {Bool}
     */
    this.cnpjValido = function(validarMascara)
    {
        return $.cnpjValido(this.val(), validarMascara);
    };
} // fn

var extend = {
    /**
     * Limpa todos os caracteres que não sejam numéricos, formatando como float de acordo com a quantidade
     * de casas decimais informadas.
     *
     * @example
     * $.limparNumero('1g4j66&::2', 2);        // 146.62
     * $.limparNumero('1g4j66&::2');           // 14662
     * $.limparNumero('8d5d8d6d8d6d8', 3);     // 8586.868
     * el.value = '1d1d1d44';
     * $.limparNumero(el.value, 2);            // 111.44
     *
     * @param valorNumerico {Number} valor tipo float
     * @param casas {Number} (valor inteiro que indica a quantidade de casas decimais)
     * @return {Number} pode ser float ou integer dependendo do parâmetro casas.
     */
    limparNumero: function(valorNumerico, casas)
    {
        // transforma em string
        var numero = valorNumerico + '',
                valorTemp,
                retorno = 0,
                // pelo menos um número em qualquer posição
                expReg = /\d/,
                // limpa tudo que não é número
                valor = parseInt(numero.replace(/\D/g, ''), 10) + '',
                qtdCasas = parseInt(casas, 10);

        qtdCasas = isNaN(qtdCasas) ? 0 : qtdCasas;

        // verifica se não existe nenhum número no valor informado
        if (!expReg.test(numero))
        {
            try
            {
                return retorno.toFixed(qtdCasas);
            }
            catch (e)
            {
                return retorno;
            }
        }

        // retorna inteiro
        if (!qtdCasas)
        {
            return parseInt(valor, 10);
        }

        var inteiro = valor.length - qtdCasas;

        // retorna float
        if (inteiro > 0)
        {
            // expressão regular que formata o valor de acordo com a quantidade de casas decimais
            expReg = new RegExp('(\\d{' + inteiro + '})(\\d{' + qtdCasas + '})', 'g');

            valor = valor.replace(expReg, '$1.$2');
        }
        else if (inteiro < 0)
        {
            valorTemp = valor;
            valor = 0;
            valor = valor.toFixed(Math.abs(inteiro));
            valor += '' + valorTemp;
        }
        else
        {
            valorTemp = valor;
            valor = '0.' + valorTemp;
        }

        return parseFloat(valor).toFixed(casas);
    },
    /**
     * Verifica se uma data no formato 'dd/mm/aaaa' é valida, verificando inclusive anos bissextos para fevereiro.
     *
     * @param data {String}
     * @return {Boolean}
     */
    dataValida: function(data)
    {
        if (data.length != 10)
        {
            return false;
        }

        var dia = parseInt(data.substr(0, 2), 10),
                mes = parseInt(data.substr(3, 2), 10),
                ano = parseInt(data.substr(6, 4), 10);

        if ((ano < 1900) || (ano > 2100))
        {
            return false;
        }

        switch (mes)
        {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                if (dia >= 1 && dia <= 31)
                {
                    return true;
                }
                break;

            case 4:
            case 6:
            case 9:
            case 11:
                if (dia >= 1 && dia <= 30)
                {
                    return true;
                }
                break;

            case 2:
                if (dia >= 1 && dia <= 28)
                {
                    return true;
                }
                else if (dia == 29)
                {
                    // validando ano bissexto
                    if ((ano % 4 == 0) && ((ano % 100 != 0) || (ano % 400 == 0)))
                    {
                        return true;
                    }
                }
                break;
        }

        return false;
    },
    /**
     * Abre uma janela popup, e cria uma nova variável para o elemento,
     * para manipular esta janela popup, com o nome passado por parâmetro.
     *
     * @param url {String}
     * @param nome {String}
     * @param altura {Number} valor inteiro que indica a altura
     * @param largura {Number} valor inteiro que indica a largura
     * @param stringStatus {String}
     * @param redimensionavel {String}
     * @return {void}
     */
    popup: function(url, nome, altura, largura, stringStatus, redimensionavel)
    {
        var pontoX = parseInt((window.screen.availWidth / 2), 10) - parseInt((largura / 2), 10);
        var pontoY = parseInt((window.screen.availHeight / 2), 10) - parseInt((altura / 2), 10);

        var _status = (stringStatus == 'no') ? 'no' : 'yes';
        var _redimensionavel = (redimensionavel == 'no') ? 'no' : 'yes';

        var parametros = "";
        parametros += "resizable=" + _redimensionavel + ",";
        parametros += "toolbar=no,";
        parametros += "status=" + _status + ",";
        parametros += "system=no,";
        parametros += "menubar=no,";
        parametros += "scrollbars=yes,";
        parametros += "width=" + largura + ",";
        parametros += "height=" + altura + ",";
        parametros += "top=" + pontoY + ",";
        parametros += "left=" + pontoX;
        parametros = "'" + parametros + "'";

        return window.open(url, nome, parametros);
    },
    /**
     * Função que retorna a quantidade de dias existentes entre duas datas.
     *
     * @param dataMenor {String} (dd/mm/aaaa)
     * @param dataMaior {String} (dd/mm/aaaa)
     * @return {Number} valor inteiro
     */
    quantidadeDiasEntreDatas: function(dataMenor, dataMaior)
    {
        // divide a data em 3 partes
        var dMenor = dataMenor.split('/'),
                dMaior = dataMaior.split('/'),
                d1 = new Date(dMenor[2], parseInt(dMenor[1], 10) - 1, parseInt(dMenor[0], 10)),
                d2 = new Date(dMaior[2], parseInt(dMaior[1], 10) - 1, parseInt(dMaior[0], 10));

        // return Math.ceil((d2.getTime() - d1.getTime())/1000/60/60/24);
        // 86400000 representa a quantidade de milesegundos em um dia
        return Math.round(((d2.getTime() - d1.getTime()) / 86400000), 0);
    },
    /**
     * Função que retorna o objeto event de forma cross browser.
     *
     * @param evento {Object} event (para firefox e outros)
     * @return {Object} event
     */
    getEvent: function(evento)
    {
        var event = evento || window.event;

        // compatibiliza which para todos os navegadores
        try
        {
            event.which = event.which ? event.which : event.keyCode;
        } catch (e) {
        }

        // compatibiliza keyCode para todos os navegadores
        try
        {
            // nativo ie
            event.keyCode = event.keyCode ? event.keyCode : event.which;
        } catch (e) {
        }

        // compatibiliza target para todos os navegadores
        try
        {
            event.target = event.target ? event.target : event.srcElement;
        } catch (e) {
        }

        // compatibiliza srcElement para todos os navegadores
        try
        {
            // nativo ie
            event.srcElement = event.srcElement ? event.srcElement : event.target;
        } catch (e) {
        }

        return event;
    },
    /**
     * Função que retorna o código ascii da tecla que foi pressionada.
     *
     * @param evento {Object} event (evento que chamou a função).
     * @return {Number} valor inteiro da tecla pressionada em código ASCII.
     */
    getTecla: function(evento)
    {
        return $.getEvent(evento).which;
    },
    /**
     * Função que retorna um array com os valores das teclas, que teoricamente devem ser sempre permitidas.
     * Teclas de movimentação, shift, delete, etc.
     *
     * @return {Array}
     */
    getArrayTeclasPermitidas: function()
    {
        /*
         backspace  	8
         tab 		9
         enter 		13
         shift 		16
         ctrl 		17
         alt 		18
         pause/break 19
         caps lock 	20
         escape 		27
         page up 	33
         page down 	34
         end 		35
         home 		36
         left arrow 	37
         up arrow 	38
         right arrow 39
         down arrow 	40
         insert 		45
         delete 		46
         */

        return new Array(8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46);
    },
    /**
     * Função que retorna se a tecla que foi pressionada é uma das que normalmente são sempre permitidas.
     *
     * @param evento {Object} event
     * @return {Boolean}
     */
    teclaPermitida: function(evento)
    {
        // verifica se a tecla pressionada está no array de teclas permitidas
        return ($.inArray($.getTecla(evento), $.getArrayTeclasPermitidas()) == -1) ? false : true;
    },
    /**
     * Função que retorna se a tecla que foi pressionada é numérica.
     *
     * @param evento {Object} event (evento que chamou a função).
     * @return {Number}  0 (zero) para não numérica
     */
    teclaNumerica: function(evento)
    {
        var event = $.getEvent(evento),
                tecla = parseInt(event.which, 10);

        if (event.type == 'keydown' || event.type == 'keyup')
        {
            // teclado numérico do lado direito
            if (tecla > 95 && tecla < 106)
            {
                return tecla - 48;
            }
        }

        // teclas acima do teclado com letras e ao lado direito no evento 'keypress'
        if ((tecla > 47 && tecla < 58))
        {
            return tecla;
        }

        return 0;
    },
    /**
     * Função que retorna se a tecla que foi pressionada é uma letra.
     *
     * @param evento {Object} event
     * @return {Boolean}
     */
    teclaLetra: function(evento)
    {
        var tecla = $.getTecla(evento);

        // não verifica cedilha
        return (tecla > 64 && tecla < 91) ? true : false;
    },
    /**
     * Função que complementa uma string com a string informada em complemento.
     * Se quantidade maior que string.length, o complemento é efetuado.
     * O parâmetro lado informa se é para completar a direita(default) ou a esquerda
     *
     * @param string {String}
     * @param complemento {String}
     * @param quantidade {Number} valor inteiro
     * @param lado[opcional] {String} default 'direita' ('esquerda' || 'direita')
     * @return {String} com o complemento efetuado
     */
    completarString: function(string, complemento, quantidade, lado)
    {
        var texto = string + '',
                acrescimo = '',
                tamanhoComplemento = quantidade - texto.length,
                i;

        if (tamanhoComplemento > 0)
        {
            for (i = 0; i < tamanhoComplemento; i++)
            {
                acrescimo += '' + complemento;
            }
        }

        return (lado != 'esquerda') ? texto + acrescimo : acrescimo + texto;
    },
    /**
     * Função que retorna a data atual no formato 99/99/9999
     *
     * @return {String}
     */
    getHoje: function()
    {
        var hoje = new Date(),
                mes = hoje.getMonth() + 1,
                dia = hoje.getDate();

        mes = (mes > 9) ? mes : '0' + mes;
        dia = (dia > 9) ? dia : '0' + dia;

        return dia + '/' + mes + '/' + hoje.getFullYear();
    },
    /**
     * Formata valores numéricos. Método bem parecido com o number_format do php.
     *
     * @param valor {Number} valor que será formatado
     * @param casas {Number} valor inteiro que indica a quantidade de casas decimais
     * @param separadorDecimais {String}
     * @param separadorMilhar {String}
     * @return {String}
     */
    numberFormat: function(valor, casas, separadorDecimais, separadorMilhar)
    {
        casas = $.varExiste(casas) ? Math.abs(parseInt(casas, 10)) : 2;
        casas = isNaN(casas) ? 0 : casas;

        separadorDecimais = $.varExiste(separadorDecimais) ? separadorDecimais : ',';
        separadorMilhar = $.varExiste(separadorMilhar) ? separadorMilhar : '.';

        if (!separadorDecimais || casas === 0)
        {
            separadorDecimais = '';
            casas = 0;
        }

        // tem que ser um float
        // não é feita nenhuma verificação
        // arredonda valor
        valor = parseFloat(valor).toFixed(casas) + "";

        var arrayValores = valor.split('.'),
                inteiro = arrayValores[0],
                decimal = arrayValores[1],
                casasInteiro = inteiro.length,
                inteiroFormatado = '',
                i,
                string,
                partes;

        // @TODO: corrigir bug nesta parte quando $.numberFormat(valor, 2, '', '');
        if (separadorDecimais === '')
        {
            if (separadorMilhar === '')
            {
                return inteiro;
            }

            casas = 0;
            decimal = '';
        }

        if (casasInteiro > 3 && separadorMilhar !== '')
        {
            var qtdSeparadorMilhar = parseInt((casasInteiro / 3), 10),
                    sobra = casasInteiro % 3;

            if (sobra != 0)
            {
                string = '(\\d{' + sobra + '})';
                partes = '$1';
                for (i = 1; i <= qtdSeparadorMilhar; i++)
                {
                    string += '(\\d{3})';
                    partes += separadorMilhar + '$' + (i + 1);
                }
            }
            else
            {
                string = '';
                partes = '';
                for (i = 1; i <= qtdSeparadorMilhar; i++)
                {
                    string += '(\\d{3})';
                    partes += '$' + i;

                    if (i < qtdSeparadorMilhar)
                    {
                        partes += separadorMilhar;
                    }
                }
            }

            // expressão regular que formata o valor de acordo com a quantidade milhares
            var expReg = new RegExp(string, 'g');

            inteiroFormatado = inteiro.replace(expReg, partes);
        }
        else
        {
            inteiroFormatado = inteiro;
        }

        return inteiroFormatado + '' + separadorDecimais + '' + decimal;
    },
    /**
     * Executa todos os métodos da classe, que monitoram eventos.
     * Um método que não deva ser iniciado automaticamente deve
     * ser incluído dentro de um objeto qualquer da classe.
     *
     * @param classe {Object}
     * @returm {Void}
     */
    iniciar: function(classe)
    {
        $(function()
        {
            var funcao = null;

            for (funcao in classe)
            {
                if (funcao !== 'iniciar')
                {
                    if (typeof (classe[funcao]) === 'function')
                    {
                        classe[funcao]();
                    } // if
                } // if
            } // for
        }); // dom ready
    },
    /**
     * Método que verifica se um CPF é válido, opcionalmente pode verificar
     * se a máscara foi digitada corretamente.
     *
     * @param {String} valor      número do CPF
     * @param {Bool} validarMascara [opcional]    se verifica a máscara ou não
     * @return {Bool}
     */
    cpfValido: function(valor, validarMascara)
    {
        // somente valores numericos
        var CPF = valor.replace(/\D/g, ''),
                soma = 0,
                i = 0,
                resto = 0,
                mascara = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

        if (CPF.length != 11)
        {
            return false;
        } // if

        // '00000000000', '11111111111', ...
        if (/0{11}|1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11}/.test(CPF))
        {
            return false;
        }

        for (; i < 9; i++)
        {
            soma += parseInt(CPF.charAt(i)) * (10 - i);
        }

        resto = 11 - (soma % 11);

        if (resto == 10 || resto == 11)
        {
            resto = 0;
        }

        if (resto != parseInt(CPF.charAt(9)))
        {
            return false;
        } // if

        soma = 0;

        for (i = 0; i < 10; i++)
        {
            soma += parseInt(CPF.charAt(i)) * (11 - i);
        } // for

        resto = 11 - (soma % 11);

        if (resto == 10 || resto == 11)
        {
            resto = 0;
        }

        if (resto != parseInt(CPF.charAt(10)))
        {
            return false;
        }

        if (validarMascara)
        {
            return mascara.test(CPF);
        }

        return true;
    },
    /**
     * Método que verifica se um CNPJ é válido, opcionalmente pode verificar
     * se a máscara foi digitada corretamente.
     *
     * @param {String} valor      número do CNPJ
     * @param {Bool} validarMascara [opcional]    se verifica a máscara ou não
     * @return {Bool}
     */
    cnpjValido: function(valor, validarMascara)
    {
        var CNPJ = valor.replace(/\D/g, ''),
                a = new Array(),
                b = 0,
                i = 0,
                y = 0,
                x,
                c = new Array(6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2);

        if (CNPJ.length != 14)
        {
            return false;
        }

        // '00000000000000', '11111111111111', ...
        if (/0{14}|1{14}|2{14}|3{14}|4{14}|5{14}|6{14}|7{14}|8{14}|9{14}/.test(CNPJ))
        {
            return false;
        }

        for (; i < 12; i++)
        {
            a[i] = CNPJ.charAt(i);
            b += a[i] * c[i + 1];
        }

        x = b % 11;

        if (x < 2)
        {
            a[12] = 0;
        }
        else
        {
            a[12] = 11 - x;
        }

        b = 0;

        for (; y < 13; y++)
        {
            b += (a[y] * c[y]);
        }

        x = b % 11;

        if (x < 2)
        {
            a[13] = 0;
        }
        else
        {
            a[13] = 11 - x;
        }

        if (CNPJ.charAt(12) != a[12] || CNPJ.charAt(13) != a[13])
        {
            return false;
        } // if

        if (validarMascara)
        {
            return /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/.test(CNPJ);
        }

        return true;
    },
    /**
     * Método que verifica se a variável informada possui algum valor definido.
     *
     * @param variavel {var}
     * @return {Boolean}
     */
    varExiste: function(variavel)
    {
        return (typeof (variavel) == 'undefined') ? false : true;
    },
    /**
     * Método para ambiente de desenvolvimento, que utiliza o console do firebug,
     * para verificaçao de erros.
     *
     * @param {Mixed} conteudo
     * @return {Void}
     */
    console: function(conteudo)
    {
        if (typeof (console) != 'undefined')
        {
            console.log(conteudo);
        }
    },
    /**
     * Método que retorna uma string com a primeira letra em maiúsculo.
     *
     * @param {String} string
     * @return {String}
     */
    capitalize: function(string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    /**
     * Método que remove a acentuação das vogais e substitui 'çÇ' por 'cC',
     * do atributo value do elemento.
     *
     * @param {String} texto
     * @return {String}
     */
    removerAcentos: function(texto)
    {
        var i,
                length = texto.length,
                newTexto = '',
                caracter,
                acentos = {
                    // minúsculas
                    'á': 'a', 'à': 'a', 'ã': 'a', 'â': 'a', 'ä': 'a',
                    'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
                    'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i',
                    'ó': 'o', 'ò': 'o', 'õ': 'o', 'ô': 'o', 'ö': 'o',
                    'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u',
                    // MAIÚSCULAS
                    'Á': 'A', 'À': 'A', 'Ã': 'A', 'Â': 'A', 'Ä': 'A',
                    'É': 'E', 'È': 'E', 'Ê': 'E', 'Ë': 'E',
                    'Í': 'I', 'Ì': 'I', 'Î': 'I', 'Ï': 'I',
                    'Ó': 'O', 'Ò': 'O', 'Õ': 'O', 'Ö': 'O', 'Ô': 'O',
                    'Ú': 'U', 'Ù': 'U', 'Û': 'U', 'Ü': 'U',
                    // cedilhas
                    'ç': 'c', 'Ç': 'C'

                };

        for (i = 0; i < length; i++)
        {
            caracter = texto.charAt(i);
            newTexto += (acentos[caracter] || caracter);
        } // for

        acentos = null;

        return newTexto;

    }, // function
    // fonte: http://codigofonte.uol.com.br/codigos/validacao-completa-de-email-com-javascript-e-expressao-regular
    isEmail: function(email) {

        var exclude = /[^@\-\.\w]|^[_@\.\-]|[\._\-]{2}|[@\.]{2}|(@)[^@]*\1/;
        var check = /@[\w\-]+\./;
        var checkend = /\.[a-zA-Z]{2,3}$/;

        if (((email.search(exclude) !== -1) || (email.search(check)) === -1) || (email.search(checkend) === -1)) {
            return false;
        }
        else {
            return true;
        }

    }, // function

    /**
     * Método que abre uma popup em tela cheia.
     *
     * @param {String} url
     * @param {String} nome [opcional]
     * @return {Object}
     */
    popupFullScreen: function(url, nome)
    {
        return window.open(url, (nome || 'popupFullScreen'), 'status=no, toolbar=no, menubar=no, location=no, fullscreen=yes, scrolling=auto, scrollbars=yes');
    } // function

};

// para poder aparecer no ide as funções não foram criadas diretamente em $.fn
$.extend($.fn, new Fn());

// para poder aparecer no ide o objeto não foi criado diretamente dentro de $.extend();
$.extend(extend);

// liberando a memória
Fn = extend = null;