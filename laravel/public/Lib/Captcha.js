/**
 * Controla o refresh da captcha.
 * @returns {Captcha}
 */
function Captcha()
{
    var c = this; // ponteiro

    /**
     * Monitora o click no botão de refresh da captcha.
     * @returns {undefined}
     */
    this.captchaRefresh = function()
    {
        $('#captchaRefresh').on('click', function(e) {
            e.preventDefault();
            this.disabled = true;
            c.desabilitarRefresh();

            $.ajax({
                data: {
                    action: 'gerarCaptcha'
                },
                type: 'post',
                success: function(response) {
                    $('#captcha').html(response);
                    new Captcha().captchaRefresh();
                    c.desabilitarRefresh();
                    c.habilitarRefresh(2000);
                }
            });
        });
    };

    /**
     * Desabilita o botão de refresh.
     * @returns {undefined}
     */
    this.desabilitarRefresh = function()
    {
        $('#captchaRefresh').addClass('disabled');
    };

    /**
     * Habilita o botão de refresh.
     * @param {Number} time tempo que será aguardado para reabilitar o botão
     * @returns {undefined}
     */
    this.habilitarRefresh = function(time)
    {
        setTimeout(function() {
            $('#captchaRefresh').removeClass('disabled');
        }, time);
    };
}

$(function() {
    new Captcha().captchaRefresh();
});