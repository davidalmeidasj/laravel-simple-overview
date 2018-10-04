/**
 * Classe que verifica se é necessário acrescentar o nono Dígito ao valor
 * de telefone do objeto informado, independente de máscara.
 *
 * Fontes 27/05/2015:
 * http://www.algartelecom.com.br/section.do?CodSec=19321
 * http://www.oi.com.br/oi/sobre-a-oi/empresa/informacoes/9-digito
 *
 * Fontes 03/11/2014:
 * http://g1.globo.com/economia/noticia/2014/10/nono-digito-do-celular-para-ap-am-ma-pa-e-rr-comeca-em-novembro.html
 * http://www.anatel.gov.br/Portal/exibirPortalNivelDois.do?codItemCanal=1794&nomeVisao=Cidad%E3o&nomeCanal=Telefonia%20M%F3vel&nomeItemCanal=Nono%20D%EDgito
 *
 * Fontes 28/10/2013:
 * http://www.nextel.com.br/NextelWebSite/atendimento-ao-cliente/nono_digito/nono_digito_ddd11.aspx
 * http://www.nextel.com.br/NextelWebSite/atendimento-ao-cliente/nono_digito/nono_digito_outros_ddds.aspx
 *
 * Fontes:
 * claroblog.com.br/conteudo.asp?POST_ID=1138
 * blog.thiagorodrigo.com.br/index.php/prefixos_das_operadoras_de_celular_em_sp
 * pt.wikipedia.org/wiki/Anexo:Centrais_telefônicas_na_cidade_de_São_Paulo
 * http://www.tellows.com.br/prefixo/S%C3%A3o+Paulo/011
 * http://atendimento.nextel.com.br/system/selfservice.controller?CONFIGURATION=1008&PARTITION_ID=1&TIMEZONE_OFFSET=&CMD=VIEW_ARTICLE&ARTICLE_ID=4345
 * http://atendimento.nextel.com.br/system/selfservice.controller?CONFIGURATION=1008&PARTITION_ID=1&TIMEZONE_OFFSET=&CMD=VIEW_ARTICLE&ARTICLE_ID=4188
 *
 * Modo de uso:
 * var nd = new NonoDigito(objeto);
 * nd.necessitaNonoDigito();
 * nd.ehNextel();
 * ...
 *
 * @param objeto {Object|String} elemento html ou o id do elemento.
 */
function NonoDigito(objeto)
{
    /**
	 * O elemento que terá o atributo value contendo o telefone.
	 */
	this.objeto = (typeof(objeto) === 'string') ? document.getElementById(objeto) : objeto;

	/**
	 * valor limpo, sem qualquer valor não numérico e sem o zero no início da
	 * string, caso exista.
	 *
	 * vai ocorrer um pouco de overhead, ao chamar várias vezes esse método,
	 * mas será tolerável, para poder funcionar independente de máscara.
	 */
	this.valor = function()
	{
		return window.parseInt(this.objeto.value.replace(/\D/g, ''), 10).toString();
	};

	/**
	 * Verifica se é Nextel.
	 */
	this.ehNextel = function()
	{
		/*
            novas fontes (28/10/2013):
            Definem um modo mais simplificado para definir se é nextel
            http://www.nextel.com.br/NextelWebSite/atendimento-ao-cliente/nono_digito/nono_digito_ddd11.aspx
            79xx, 78xx, 77xx e 70xx no DD11

            http://www.nextel.com.br/NextelWebSite/atendimento-ao-cliente/nono_digito/nono_digito_outros_ddds.aspx
            70xx, 77xx e 78xx nos outros DDD's

            fonte: http://atendimento.nextel.com.br/system/selfservice.controller?CONFIGURATION=1008&PARTITION_ID=1&TIMEZONE_OFFSET=&CMD=VIEW_ARTICLE&ARTICLE_ID=4345
            fonte: http://atendimento.nextel.com.br/system/selfservice.controller?CONFIGURATION=1008&PARTITION_ID=1&TIMEZONE_OFFSET=&CMD=VIEW_ARTICLE&ARTICLE_ID=4188

            7000 a 7010 (700)|(7010)
			um adendo, todos os telefones 77xx e 78xx estão acrescentando o 9,
			pois as faixas "7700 e 7801" não são utilizadas por
			outras operadoras
			7701 a 7799 (7[78])
			7800
			7802 a 7899
			7901 (790[124])
			7902
			7904
			7912 a 7920 (791[2-9])|(792[03489])
			7923
			7924
			7928 a 7932 (793[012])
			7934 a 7949 (793[4-9])|(794)
		 */
        return /^((1\d7[0789])|(2[12478]7[078]))/.test(this.valor());
	};

	/**
	 * Verifica se é necessário acrescentar o nono dígito ao telefone.
	 */
	this.necessitaNonoDigito = function()
	{
		if(this.ehNextel())
		{
			return false;
		} // if

		if(this.ehCelPrefixoCinco())
		{
			return true;
		} //if

		var valor = this.valor();

        /*
		necessário para não atropelar a verificação em this.ehNextel
		que pode necessitar de até 4 dígitos para efetuar a verificação
		com precisão.
        */
        if(valor.length === 4)
		{
			return /^(([1236789]\d))[678]/.test(valor);
		} // if

		return /^(([1236789]\d))[68]/.test(valor);
	};

	/**
	 * Verifica se é um celular iniciado com 5.
	 */
	this.ehCelPrefixoCinco = function()
	{
		/*
			OI
			5252 a 5267 (525[2-9])|(526[0-7])
			5400 a 5419	(54[01])
			5700 a 5768	(570)|(57[1-5])|(576[0-8])

			TIM
			5200 a 5211 (520)|(521[01])
			5214 a 5251 (521[4-9])|(52[234])|(525[01])
			5268 a 5351 (526[8-9])|(534)|(535[01])
			5420 a 5471 (54[2-6])|(547[01])
			5475 a 5499 (547[5-9])|(54[89])
			5787 a 5799 (578[7-9])|(579)

			VIVO
			5300 a 5324 (53[01])|(532[0-4])
			5472 a 5474 (547[234])
			5769 a 5786 (5769)|(577)|(578[0-6])
		 */

		// a identificação destes celulares carece de fonte confiável
		// a fonte utilizada foi http://www.tellows.com.br/prefixo/S%C3%A3o+Paulo/011
		return /^1\d5((25[2-9])|(26[0-7])|(4[01])|(70)|(7[1-5])|(76[0-8])|(20)|(21[01])|(21[4-9])|(2[234])|(25[01])|(26[8-9])|(34)|(35[01])|(4[2-6])|(47[01])|(47[5-9])|(4[89])|(78[7-9])|(79)|(3[01])|(32[0-4])|(47[234])|(769)|(77)|(78[0-6]))/.test(this.valor());
	};

	/**
	 * Verifica se é um telefone fixo iniciado com 5.
	 */
	this.ehTelPrefixoCinco = function()
	{
		// Fonte: http://www.anatel.gov.br/Portal/verificaDocumentos/documento.asp?numeroPublicacao=270699&assuntoPublicacao=Anexo%20IV%20da%20Ata%20da%208a%20Reuni%E3o%20do%20GT-%C1rea%2011%20-%2024/08/2011&caminhoRel=null&filtro=1&documentoPath=270699.pdf

		/*
			5010 a 5019		(501)
			5021 a 5022		(502[129])
			5029
			5031 a 5036		(503[1-6])
			5041 a 5042		(504[124569])
			5044 a 5046
			5049
			5051 a 5056		(505[1234568])
			5058
			5060 a 5063		(506[012356789])|(507[0-4])
			5065 a 5074
			5077 a 5099		(507[789])|(50[89])
			5102 a 5103		(510[235])
			5105
			5110 a 5112		(511[0125])
			5115
			5171			(5171)
			5180 a 5189		(518)
			5191			(5191)
			5212 a 5213		(521[23])
			5501 a 5519		(550[1-9])|(551)
			5521 a 5529		(552[1-9])
			5531 a 5539		(553[1-9])
			5541 a 5549		(554[1-9])
			5553			(5553)
			5560 a 5568		(556[0-8])
			5571 a 5576		(557[1234569])
			5579
			5581 a 5589		(558[1-9])
			5591 a 5599		(559[1-9])
			5601			(5601)
			5603			(5603)
			5611 a 5616		(561[1-6])
			5620 a 5627		(562[0-7])
			5631 a 5635		(563[1-5])
			5641 a 5646		(564[1-6])
			5660 a 5663		(566[012356789])|(567)
			5665 a 5679
			5681 a 5683		(568[123567])
			5685 a 5687
			5691			(569[1345689])
			5693 a 5696
			5698 a 5699
			5811 a 5812		(581[1246789])
			5814
			5816 a 5819
			5821 a 5827		(582[1-7])
			5831 a 5835		(583[1234579])
			5837
			5839
			5841 a 5846		(584[1-6])
			5851 a 5855		(585[1-5])
			5870 a 5875		(587[0-5])
			5890 a 5899		(589)
			5904			(590[46789])
			5906 a 5909
			5920 a 5929		(592)
			5931 a 5934		(593[123489])
			5938 a 5939
			5970 a 5979		(597)
		 */

		return /^1\d5((01)|(02[129])|(03[1-6])|(04[124569])|(05[1234568])|(06[012356789])|(07[0-4])|(07[789])|(0[89])|(10[235])|(11[0125])|(171)|(18)|(191)|(21[23])|(50[1-9])|(51)|(52[1-9])|(5[34][1-9])|(553)|(56[0-8])|(57[1234569])|(5[89][1-9])|(60[13])|(61[1-6])|(62[0-7])|(63[1-5])|(64[1-6])|(66[012356789])|(67)|(68[123567])|(69[1345689])|(81[1246789])|(82[1-7])|(83[1234579])|(84[1-6])|(85[1-5])|(87[0-5])|(89)|(90[46789])|(92)|(93[123489])|(97))/.test(this.valor());
	};

	/**
	 * Altera o valor original, acrescido do nono dígito.
	 */
	this.acrescentaNonoDigito = function()
	{
        /*
        o valor original, não o valor limpo de (this.valor)
		pode ter máscara ou não
		começar com ddd ou não
		ddd começar com zero ou não
        */
		this.objeto.value = this.objeto.value.replace(
            // SP
            /^(\W*0?1\d\W*)?([56789])/, '$19$2'
        ).replace(
            // (2N) RJ/ES
            // (3N) Minas Gerais
            // (7N) Bahia e Sergipe
            // (8N) Alagoas, Ceará, Paraíba, Pernambuco, Piaui e Rio Grande do Norte
            // (9N) Amapá, Amazonas, Maranhão, Pará e Roraima
			// (6N) Distrito Federal, Goiás, Tocantins, Mato Grosso, Mato Grosso do Sul, Acre e Rondônia.
            /^(\W*0?[236789]\d\W*)?([6789])/, '$19$2'
        );
	};

	/**
	 * Verifica se o nono dígito foi digitado.
	 */
	this.possuiNonoDigito = function()
	{
		return /^[1236789]\d9/.test(this.valor());
	};

	/**
	 * Verifica se é um cadastro antigo, sem o acréscimo do nono dígito.
	 */
	this.faltaUmDigito = function()
	{
		return /^[1236789]\d9\d{7}$/.test(this.valor());
	};

    /**
     * Verifica se o telefone, com ddd, pelos números iniciais, é telefone fixo.
     * Não verifica se o telefone é válido.
     */
    this.ehTelefoneFixo = function()
    {
        if(/^\d\d[234]/.test(this.valor()))
        {
            return true;
        } // if

        return this.ehTelPrefixoCinco();
    };

    /**
     * Verifica se o DDD é válido.
     */
    this.dddValido = function()
    {
        /* DDD's válidos
            1 	1-9
            4	1-9
            6	1-9
            8	1-9
            9	1-9

            2  	12478
            3	1234578
            5	1345
            7	134579
         */

        return /^(([14689][1-9])|(2[12478])|(3[1234578])|(5[1345])|(7[134579]))/.test(this.valor());
    };
}

/**
 * Uma verificação extra, para confirmar que as faixas dos telefones de
 * prefixo 5 (cinco), não estão misturadas nas verificações
 * ehCelPrefixoCinco e ehTelPrefixoCinco.
 *
 * Útil para abiente de testes.

function testaPrefixoCinco()
{
	var i = 0,
		objeto = new Object(),
		nonoDigito;

	for(i = 115000; i < 116000; i++)
	{
		objeto.value = i.toString();

		nonoDigito = new NonoDigito(objeto);
		if(nonoDigito.ehCelPrefixoCinco() && nonoDigito.ehTelPrefixoCinco())
		{
            try {
                console.log(i);
            } catch (ex) {}
		}
    }
}
*/