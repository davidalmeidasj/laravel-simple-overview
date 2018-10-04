CKEDITOR.plugins.add('_closeEditor', {
    icons: '_Close',
    init: function (editor) {
        editor.addCommand('cmdCloseEditor', {
            exec: function (editor) {
                if (confirm("Deseja realmente fechar o editor?\nTodas as suas alterações serão perdidas.")) {
                    // Retrieve the editor contents. In an Ajax application, this data would be
                    // sent to the server or used in any other way.
                    editor.execCommand('maximize');
                    // Destroy the editor.
                    // "meuEditor" deve ser uma variável global que representa o editor aberto
                    meuEditor.destroy();
                    meuEditor = null;

                }
            }
        });
        editor.ui.addButton('_Close', {
            label: 'Fechar o editor',
            command: 'cmdCloseEditor',
            toolbar: 'about'
        });
    }
});

//editor.addCommand( '_closeEditor', new CKEDITOR.dialogCommand( 'abbrDialog' ) );