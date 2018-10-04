/* global Document */

/**
 * Plugins Control
 * @param $
 */
(function ($) {

    /**
     * Verifica a rolagem da tela atingiu um dado elemento
     * @returns {Boolean}
     */
    $.fn.isInScrollControl = function (parent) {

        if (parent === null || parent === undefined || parent instanceof Document) {
            var docViewTop = $(window).scrollTop(),
                    docViewBottom = docViewTop + $(window).height(),
                    elemTop = $(this).offset().top,
                    elemBottom = elemTop + $(this).height();
            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        } else {
            if (Math.ceil($(parent).scrollTop() + $(parent).innerHeight()) >= $(parent)[0].scrollHeight) {
                return true;
            } else {
                return false;
            }
        }
    };

    jQuery(function ($) {
        $('#flux').on('scroll', function () {
            if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                alert('end reached');
            }
        });
    });

    /**
     * Verifica a rolagem da DIV atingiu um dado elemento
     * @returns {Boolean}
     */
    $.fnIsInScrollDivControl = function () {

    };

    /**
     * Plugin para exibiçãpo do loading na página
     * @param method (show|hide)
     * @param options (null|top|bottom|object):
     *  - null: centraliza o loading (default)
     *  - top: posiciona o loading na parte superior
     *  - bottom: posiciona o loading na parte inferior
     *  - options:
     *      - position: (null|top|bottom)
     *      - backdrop: (true|false) Indica que um elemento "backdrop" será inserido na
     *          tela, impedindo o usuário de clicar em outros elementos. O padrão é true.
     * Uso: $(#id).loadingControl('show', 'top|bottom|null')
     *      $(#id).loadingControl('hide');
     */
    $.fn.loadingControl = function (method, options) {
        var $loading = $(this);
        var distance = 25;
        var position = 'middle';
        var backdrop = true;

        if (typeof options === 'object') {
            position = options.position;

            if (typeof options.backdrop !== 'undefined') {
                backdrop = options.backdrop;
            }
        } else {
            position = options;
        }

        if (method === 'show') {
            $loading.removeAttr('style');

            // Tenta recupoerar uma modal Bootstrap aberta.
            var $btModal = $('.modal.in:visible').last().find('.modal-dialog');

            if ($btModal.length > 0) {

                // verifica se o elemento loading está dentro da modal.
                if ($loading.parents('.modal').length > 0) {
                    var $clone = $loading.clone().appendTo('body');

                    $loading.attr('id', 'md_' + $loading.attr('id'));

                    var $old = $loading;
                    $loading.remove();

                    $loading = $clone;
                }

                // Há uma modal aberta, então tenta posicionar o "loading" de acordo com
                // as dimensões da modal
                var mdTop = $btModal.offset().top - $(window).scrollTop();
                var mdHeight = $btModal.height();
                var mdBottom = $(window).innerHeight() - (mdTop + mdHeight);

                if (position === 'bottom') {
                    $loading.css('bottom', (distance + mdBottom) + 'px');
                } else if (position === 'top') {
                    $loading.css('top', (distance + mdTop) + 'px');
                } else {
                    $loading.css('top', (((mdHeight - $loading.height()) / 2) + mdTop) + 'px');
                }

                $loading.css('position', 'fixed');

            } else {
                if (position === 'bottom') {
                    $loading.css('bottom', distance + 'px');
                } else if (position === 'top') {
                    $loading.css('top', distance + 'px');
                } else {
                    $loading.css('top', (window.innerHeight - $loading.height()) / 2 + 'px');
                }
            }

            if (backdrop) {
                $('body').append('<div class="loading-control-backdrop" style="height: ' + $(window).height() + 'px"></div>');
                $loading.fadeIn();
            }
        }
        else if (method === 'hide') {
            $('.loading-control-backdrop').remove();
            $loading.fadeOut();
        }
    };

    /**
     * Plugin para criação de um header (TH) fixo que permanece visível mesmo com a rolagem da página.
     * Uso: $('#id').fixHeaderControl()
     */
    $.fn.fixHeaderControl = function () {
        return this.each(function () {
            var $this = $(this),
                    $t_fixed,
                    tableHeaderTop = 0;
            function init() {
                $this.wrap('<div />');
                $t_fixed = $this.clone();
                $t_fixed.attr('id', $($t_fixed).attr('id') + '_fixed');
                $t_fixed.find("tbody").remove().end().insertBefore($this);
                resizeFixed();
            }
            function styleFixed() {
                if ($('#navbar-toggle').is(':visible')) {
                    tableHeaderTop = $('#header').height();
                } else {
                    tableHeaderTop = 0;
                }

                $t_fixed.css({
                    top: tableHeaderTop + 'px',
                    position: 'fixed',
                    width: 'auto',
                    display: 'none',
                    border: 'none',
                    zIndex: 50
                });
            }
            function resizeFixed() {
                styleFixed();
                $t_fixed.find("th").each(function (index) {
                    $(this).css("width", $this.find("th").eq(index).outerWidth() + "px");
                });
            }
            function scrollFixed() {
                styleFixed();
                resizeFixed();
                var offset = $(this).scrollTop(),
                        tableOffsetTop = $this.offset().top - tableHeaderTop,
                        tableOffsetBottom = tableOffsetTop + $this.height() - $this.find("thead").height();

                if (offset < tableOffsetTop || offset > tableOffsetBottom) {
                    $t_fixed.hide();
                }
                else if (offset >= tableOffsetTop && offset <= tableOffsetBottom && $t_fixed.is(":hidden")) {
                    $t_fixed.show();
                }
            }
            $(window).resize(resizeFixed);
            $(window).scroll(scrollFixed);
            init();
        });
    };

    /**
     * Plugin para criação de um header (TH) fixo que permanece visível mesmo com a rolagem da página.
     * Uso: $('#id').fixHeaderControlPopUp()
     */
    $.fn.fixHeaderControlPopUp = function () {
        return this.each(function () {
            var $this = $(this),
                    $t_fixed,
                    tableHeaderTop = 0;
            function init() {
                $this.wrap('<div />');
                $t_fixed = $this.clone();
                $t_fixed.attr('id', $($t_fixed).attr('id') + '_fixed');
                $t_fixed.find("tbody").remove().end().insertBefore($this);
                resizeFixed();
            }
            function styleFixed() {
                tableHeaderTop = $('.navbar-controllab').height();
                $t_fixed.css({
                    top: tableHeaderTop + 'px',
                    position: 'fixed',
                    width: $this.width(),
                    display: 'none',
                    border: 'none',
                    zIndex: 50
                });
                // Largura das colunas
                var thead = $this.find('thead').get(0);
            }
            function resizeFixed() {
                styleFixed();
                $t_fixed.find("th").each(function (index) {
                    $(this).css("width", $this.find("th").eq(index).outerWidth() + "px");
                });
            }
            function scrollFixed() {
                styleFixed();
                resizeFixed();
                // recupera o header
                var offset = $(this).scrollTop(),
                        tableOffsetTop = $this.offset().top - tableHeaderTop,
                        tableOffsetBottom = tableOffsetTop + $this.height() - $this.find("thead").height();
                showVisibleOnly();
                if (offset < tableOffsetTop || offset > tableOffsetBottom) {
                    $t_fixed.hide();
                }
                else if (offset >= tableOffsetTop && offset <= tableOffsetBottom && $t_fixed.is(":hidden")) {
                    $t_fixed.show();
                }
            }
            function showVisibleOnly() {
                var tBodyInView = $this.find('tbody:in-viewport(80)').get(0);
                var idAnaVisible = $(tBodyInView).data('idana');
                if (idAnaVisible > 0) {
                    $t_fixed.find('thead').hide();
                    $t_fixed.find('thead').each(function () {
                        if ($(this).data('idana') === idAnaVisible) {
                            $(this).show();
                        }
                    });
                }
            }
            $(window).resize(scrollFixed);
            $(window).scroll(scrollFixed);
            init();
        });
    };

    /**
     * Plugin para exibição da opção de ir para o topo da página (scroll-to-top-button)
     * @param args Argumentos:
     *  - refDom, elemento de referência sobre o qual será verificado se o scroll-to-top-button deve ou não ser exibido.
     *      se não for informado, scroll-to-top-button será exibido logo que acontecer um scroll.
     */
    $.fn.scrollToTopControl = function (args) {
        args = args || {};
        var $this = $(this);
        var elRefTop = 0;

        function init() {
            if (args.refDom) {
                elRefTop = $(args.refDom).offset().top;
            }

            $this.click(function () {
                $('html, body').animate({scrollTop: 0}, '100');
            });

            $this.hide();
        }

        function testScrollToTop() {
            var offset = $(window).scrollTop();
            if (elRefTop < offset) {
                $this.fadeIn('slow');
            } else {
                $this.fadeOut('slow');
            }
        }

        $(window).scroll(testScrollToTop);
        init();
    };

    /**
     * Puglin que habilita rolagem "infinita" a uma lista (tabela).
     * @param {object} options
     *      - source: URL resource;
     *      - wrapperDivSelector:   Seletor da DIV pai que contém a rolagem,
     *                              se não for definido o plugin usará a rolagem
     *                               do document
     *      - lastItemSelector:     Seletor do último elemento da lista;
     *      - callback:             Função a ser executada após recuperar os
     *      dados através de 'source';
     *      - objLoading:           Elemento para exibição do 'Loading' na tela;
     *      - fnIsComplete:         Função que verifica se terminou de carregar
     *                              todos os dados;
     *      - fnGetParams:          Funçao que retorna parâmetros para resource;
     */
    $.fn.infiniteScrollControl = function (options) {
        var $this = $(this),
                isLoading = false, // identifica se está carregando conteúdo
                isComplete = false; // identifica se completou o carregamento de todos os dados

        var defaults = {
            lastItemSelector: 'tbody tr:last',
            type: 'get'
        };

        var $parentScroll = $(document);

        if (options.wrapperDivSelector) {
            $parentScroll = $($this.parents().get(0));
        }

        var settings = $.extend(defaults, options);

        if ($.trim($this.attr('id')) === '') {
            throw 'infiniteScrollControl: elemento sem ID definida';
        }

        function init() {

            if ($parentScroll.get(0) instanceof Document)
            {

                var testDocument = $parentScroll.bind('scroll.infiniteScrollControl', function () {

                    testScroll();
                });

                try {
                    var testIE = (testDocument.get(0) instanceof Document);
                }
                catch (e) {
                    window.onscroll = function () {
                        testScroll();
                    };
                }
            } else {

                $parentScroll.get(0).addEventListener('scroll', function () {
                    testScroll();
                });
            }

        }
        // Guarda a posição do scroll anterior para determinar se está subindo ou descendo.
        var previousScroll = 0;
        function testScroll() {
            var currentScroll = $parentScroll.scrollTop();
            var direction = null;
            if (currentScroll > previousScroll) {
                direction = 'down';
            } else {
                direction = 'up';
            }
            previousScroll = currentScroll;

            if (direction === 'down') {

                if (typeof settings.fnIsComplete === 'function') {
                    if (settings.fnIsComplete()) {
                        isComplete = true;
                    } else {
                        isComplete = false;
                    }
                }

                if ($('#' + $this.attr('id')).find(settings.lastItemSelector).isInScrollControl($parentScroll.get(0)) && !isLoading && !isComplete) {
                    isLoading = true;


                    if (typeof settings.objLoading === 'object') {
                        settings.objLoading.show('bottom');
                    }

                    var url = settings.source;

                    if (typeof settings.fnGetParams === 'function') {
                        url += settings.fnGetParams();
                    }

                    var configAjax = {
                        type: 'get',
                        url: url
                    };

                    // se a configuração for por post, altera o tipo da requisição e a variável
                    // url não pode ter o '?' no início
                    if (settings.type === 'post') {
                        configAjax = {
                            type: 'post',
                            data: url
                        };
                    }

                    $.ajax(configAjax).success(function (data) {
                        isLoading = false;

                        if (typeof settings.callback === 'function') {
                            settings.callback(data);
                        } else {
                            $this.append(data);
                        }

                        if (typeof settings.objLoading === 'object') {
                            settings.objLoading.hide();
                        }

                    });

                }
            }
        }

        init();
    };

    /*
     * Transforma uma input em um campo de busca.
     * @param {object} options
     *      - callback: Função a ser executada;
     *      - delay: tempo de espera para executar uma nova busca;
     */
    $.fn.searchField = function (options) {
        var $this = $(this),
                thread = null;

        var defaults = {
            delay: 500,
            acceptedKeys: [8, 46]
        };

        var settings = $.extend(defaults, options);

        if ($this.attr('type') !== 'text') {
            throw 'searchField: o elemento precisa ser do tipo "text".';
        }

        function exec(event) {
            if ((event.which >= 48 && event.which <= 90) || (event.which >= 96 && event.which <= 105) || (settings.acceptedKeys.indexOf(event.which) >= 0)) {
                clearTimeout(thread);
                thread = setTimeout(function () {
                    if (typeof settings.callback === 'function') {
                        settings.callback();
                    } else {
                        throw 'searchField: função de callback definida não definida.';
                    }
                }, settings.delay);
            }
        }

        $this.on('keyup', function (e) {
            exec(e);
        });

        $this.on('paste', function (e) {
            exec(e);
        });
    };

    /**
     * Transforma uma input em um campo de busca.
     * @param {object} options
     *      - orderFieldID: ID do campo escondido que deve guardar o campo "order"
     *      - orderByFieldID: ID do campo escondido que deve guardar o campo "orderBy"
     *      - objLoading: Elemento para exibição do 'Loading' na tela;
     *      - callback: Função a ser executada
     */
    $.fn.sortableControl = function (options) {
        var $this = $(this);

        var defaults = {
        };

        var settings = $.extend(defaults, options);

        if ($.trim(settings.orderFieldID) === '') {
            throw 'sortableControl: orderFieldID não definido.';
        } else {
            if ($('#' + settings.orderFieldID).length === 0) {
                throw 'sortableControl: campo "#' + settings.orderFieldID + '" não implementado.';
            }
        }

        if ($.trim(settings.orderByFieldID) === '') {
            throw 'sortableControl: orderByFieldID não definido.';
        } else {
            if ($('#' + settings.orderByFieldID).length === 0) {
                throw 'sortableControl: campo "#' + settings.orderByFieldID + '" não implementado.';
            }
        }

        $($this.selector).unbind('click').click(function () {
            var order = $('#' + settings.orderFieldID).val();

            if (order === 'asc' && $(this).data('orderBy') === $('#' + settings.orderByFieldID).val()) {
                order = 'desc';
            } else {
                order = 'asc';
            }

            $('#' + settings.orderFieldID).val(order);
            $('#' + settings.orderByFieldID).val($(this).data('orderBy'));

            if (typeof settings.objLoading === 'object') {
                settings.objLoading.show();
            }

            if (typeof settings.callback === 'function') {
                settings.callback();
            } else {
                throw 'sortableControl: função de callback definida não definida.';
            }
        });
    };

    /**
     * Exibe/oculta uma modal de loading.
     * @param {String} option 'show' ou 'hide'
     * @returns {undefined}
     */
    $.loading = function (option) {
        if (!$('.loading-control').size()) {
            // busca o html da modal, caso ele ainda não esteja na página
            $.ajax({
                type : 'post',
                async: false,
                data: {
                    action : 'loading'
                },
                success: function(data) {
                    $('body').append(data);
                }
            });
        }

        $('.loading-control').loadingControl(option);
    };
})(jQuery);