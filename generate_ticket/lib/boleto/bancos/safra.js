const path = require('path');
const StringUtils = require('../../utils/string-utils');
const pad = StringUtils.pad;

const CodigoDeBarrasBuilder = require('../codigo-de-barras-builder');

var Safra = (function() {
	var NUMERO_SAFRA = '422',
		DIGITO_SAFRA = '7';

	function Safra() {

	}

	Safra.prototype.getTitulos = function() {
		return {
			instrucoes: 'Informações de responsabilidade do beneficiário',
			nomeDoPagador: 'Nome do Pagador',
			especie: 'Moeda',
			quantidade: 'Quantidade',
			valor: 'Valor',
			moraMulta: '(+) Juros / Multa'
		};
	};

	Safra.prototype.exibirReciboDoPagadorCompleto = function() {
		return true;
	};

	Safra.prototype.exibirCampoCip = function() {
		return true;
	};

	Safra.prototype.geraCodigoDeBarrasPara = function(boleto) {
		var beneficiario = boleto.getBeneficiario(),
			campoLivre = [];

		campoLivre.push(beneficiario.getAgenciaFormatada());
		campoLivre.push(this.getCarteiraFormatado(beneficiario));
		campoLivre.push(this.getNossoNumeroFormatado(beneficiario));
		campoLivre.push(this.getCodigoFormatado(beneficiario));
		campoLivre.push('0');

		return new CodigoDeBarrasBuilder(boleto).comCampoLivre(campoLivre);
	};

	Safra.prototype.getNumeroFormatadoComDigito = function() {
		return [
			NUMERO_SAFRA,
			DIGITO_SAFRA
		].join('-');
	};

	Safra.prototype.getNumeroFormatado = function() {
		return NUMERO_SAFRA;
	};

	Safra.prototype.getCarteiraFormatado = function(beneficiario) {
		return pad(beneficiario.getCarteira(), 2, '0');
	};

	Safra.prototype.getCarteiraTexto = function(beneficiario) {
		return pad(beneficiario.getCarteira(), 2, '0');
	};

	Safra.prototype.getCodigoFormatado = function(beneficiario) {
		return pad(beneficiario.getCodigoBeneficiario(), 7, '0');
	};

	Safra.prototype.getImagem = function() {
		return path.join(__dirname, 'logotipos/safra.png');
	};

	Safra.prototype.getNossoNumeroFormatado = function(beneficiario) {
		return pad(beneficiario.getNossoNumero(), 11, '0');
	};

	Safra.prototype.getNossoNumeroECodigoDocumento = function(boleto) {
		var beneficiario = boleto.getBeneficiario();

		return this.getCarteiraFormatado(beneficiario) + '/' + [
			this.getNossoNumeroFormatado(beneficiario),
			beneficiario.getDigitoNossoNumero()
		].join('-');
	};

	Safra.prototype.getNome = function() {
		return 'Banco Safra S.A.';
	};

	Safra.prototype.getImprimirNome = function() {
		return false;
	};

	Safra.prototype.getAgenciaECodigoBeneficiario = function(boleto) {
		var beneficiario = boleto.getBeneficiario(),

			codigo = this.getCodigoFormatado(beneficiario),
			digitoCodigo = beneficiario.getDigitoCodigoBeneficiario();

		if (digitoCodigo) {
			codigo += '-' + digitoCodigo;
		}

		return beneficiario.getAgenciaFormatada() + '/' + codigo;
	};

	Safra.novoSafra = function() {
		return new Safra();
	};

	return Safra;
})();

module.exports = Safra;
