CKEDITOR.plugins.add('_save', {
    icons: '_Save',
    init: function (editor) {
        editor.addCommand('cmdSalvar', {
            exec: function (editor) {
                if (confirm("Deseja realmente salvar as alterações.")) {
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
        editor.ui.addButton('_Save', {
            label: 'Salvar alterações',
            command: 'cmdSalvar',
            toolbar: 'control'
        });
    }
});