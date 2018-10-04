// necessita do arquivo "../Lib/jquery/jquery.util.js"
$.extend($.fn, {
    setCondicaoLimite: function() {
        var erKeypress = /^([<>]=?(\d+,?\d*)?)$|^(([<>]=?\d+(,\d+)?)((\s)|(\s[eE])|(\s[eE]\s)|(\s[eE]\s[<>]=?)|(\s[eE]\s[<>]=?\d+)|(\s[eE]\s[<>]=?\d+,?)|(\s[eE]\s[<>]=?\d+,?\d+))?)$/,
            erBlur = /^[<>]=?\d+(,\d+)?(\s[eE]\s[<>]=?\d+(,\d+)?)?$/;

        // @see ../Lib/jquery/jquery.util.js
        this.setMascaraExpReg(erKeypress, erBlur).css('textTransform', 'uppercase');
    }
});