function OpenPopup(url, name, resizable, toolbar, statusBar, width, height, pontoX, pontoY)
{

	this.url 	   = url;
	this.name      = name;
	this.resizable = resizable;
	this.toolbar   = toolbar;
	this.statusBar = statusBar;
	this.width     = width;
	this.height    = height;
	this.pontoX    = pontoX;
	this.pontoY    = pontoY;

	this.open = function()
	{
		var resizable = (this.resizable) ? 'yes' : 'no';
		var toolbar   = (this.toolbar) ? 'yes' : 'no';
		var statusBar = (this.statusBar) ? 'yes' : 'no';

		try {
			// tenta manter o funcionamento normal
			window.open( url , name , "resizable=" + resizable + ",toolbar=" + toolbar + ",status=" + statusBar + ",system=no,menubar=no,scrollbars=yes,width=" + this.width + ",height=" + this.height + ",top=" + this.pontoY + ",left=" + this.pontoX);
		} catch( e ) {
			// tenta corrigir o fato do internet explorer 10 não aceitar espaços em branco no nome
			window.open( url , name.replace( /\s+/, '_' ) , "resizable=" + resizable + ",toolbar=" + toolbar + ",status=" + statusBar + ",system=no,menubar=no,scrollbars=yes,width=" + this.width + ",height=" + this.height + ",top=" + this.pontoY + ",left=" + this.pontoX);
		}
	};

}