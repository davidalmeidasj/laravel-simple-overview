/**
 * Classe que controla qualquer manipulação javascript necessária para as fontes
 * da Controllab.
 * @returns {FontControllab}
 */
function FontControllab()
{
    /**
     * Troca a classe de icone da Controllab por alguma outra que seja
     * compatível com internet explorer 8.
     * @returns {undefined}
     */
    this.trocarIconesInternetExplorerOito = function()
    {
        if (!$('.ie8').length) {
            return;
        }

        var classe,
            icone,
            map = { // @TODO: falta mapear todas as classes
                'controllab_icon_font-alerta-triangulo': 'fa fa-exclamation-triangle',
                'controllab_icon_font-alerta-redondo': 'fa fa-exclamation-circle',
                'controllab_icon_font-ajuda': 'fa fa-question-circle',
                'controllab_icon_font-check': 'fa fa-check-circle',
                'controllab_icon_font-erro': '',
                'controllab_icon_font-seta-direita': '',
                'controllab_icon_font-seta-esquerda': '',
                'controllab_icon_font-config': 'fa fa-cog',
                'controllab_icon_font-home': 'fa fa-home',
                'controllab_icon_font-lixo': '',
                'controllab_icon_font-menu-lista': '',
                'controllab_icon_font-menu-icone': '',
                'controllab_icon_font-email': '',
                'controllab_icon_font-power': 'fa fa-power-off',
                'controllab_icon_font-buscar': '',
                'controllab_icon_font-download': '',
                'controllab_icon_font-upload': '',
                'controllab_icon_font-perfil': 'fa fa-user',
                'controllab_icon_font-usuarios': 'fa fa-users',
                'controllab_icon_font-retornar': '',
                'controllab_icon_font-avancar': '',
                'controllab_icon_font-prancheta': '',
                'controllab_icon_font-documento': 'fa fa-file-text',
                'controllab_icon_font-lista': 'fa fa-list-alt',
                'controllab_icon_font-prancheta-check': '',
                'controllab_icon_font-noticias': 'fa fa-newspaper-o',
                'controllab_icon_font-imagem': '',
                'controllab_icon_font-livro': 'fa fa-book',
                'controllab_icon_font-contatos': '',
                'controllab_icon_font-clube-leitura': '',
                'controllab_icon_font-qualifique': 'fa fa-file-text-o',
                'controllab_icon_font-microbiologia': '',
                'controllab_icon_font-fisico-quimico': '',
                'controllab_icon_font-tuberculose': '',
                'controllab_icon_font-hemoterapia': '',
                'controllab_icon_font-clinico': '',
                'controllab_icon_font-recarregar': 'fa fa-exchange',
                'controllab_icon_font-comentario': '',
                'controllab_icon_font-megafone': 'fa fa-bullhorn',
                'controllab_icon_font-telefone': '',
                'controllab_icon_font-indicadores': '',
                'controllab_icon_font-arquivo': '',
                'controllab_icon_font-compras': '',
                'controllab_icon_font-caixa-aberta': '',
                'controllab_icon_font-alvo': '',
                'controllab_icon_font-apresentacao': '',
                'controllab_icon_font-estande': '',
                'controllab_icon_font-relogio': '',
                'controllab_icon_font-calendario': 'fa fa-calendar',
                'controllab_icon_font-mala': 'fa fa-suitcase',
                'controllab_icon_font-radio': '',
                'controllab_icon_font-aniversario': '',
                'controllab_icon_font-financeiro': '',
                'controllab_icon_font-certificado': '',
                'controllab_icon_font-lapis': '',
                'controllab_icon_font-educacao': ''
            };

        for (classe in map) {
            icone = map[classe];
            if (icone !== '') {
                $('.' + classe).removeClass(classe).addClass(icone);
            }
        }

        map = null;
    };

    /**
     * Inicia os métodos da classe.
     * @returns {undefined}
     */
    this.iniciar = function()
    {
        this.trocarIconesInternetExplorerOito();
    };
}

$(function() { // domReady jQuery
    new FontControllab().iniciar();
});