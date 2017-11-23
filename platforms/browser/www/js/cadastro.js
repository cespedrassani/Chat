Cadastro.prototype = (function(){
	
	var verificarInfos = function(){
		if (util.isBlank(cadastro.senha.val())){
			alert('Senha está vazia.');
			return false;
		}

		if (util.isBlank(cadastro.nome.val())){
			alert('Nome está vazio.');
			return false;
		}

		if (util.isBlank(cadastro.email.val())){
			alert('E-mail está vazio.');
			return false;
		}
		return true;
	};

	var carregarDadosCadastro = function(){
		return {
			senha: cadastro.senha.val(),
			login: cadastro.login.val(),
			nome: cadastro.nome.val(),
			email: cadastro.email.val(),
			opt: 'criarUsuario'
		}
	};
	
	return {
		efetuarCadastro: function(){
			if(cadastro.verificarInfos()){
				$.ajax({ 
			      url: urlBase,
			      data: carregarDadosCadastro(),
			      dataType: 'json',
			      accept: 'application/json', 
			      type: 'POST',
			      crossDomain: true,
			    }).done(function(retorno){
			    	if (retorno.token != null){
			    		if ($.cookie('tempo') == undefined || $.cookie("tempo") == '') {
		                    $.cookie('tempo', '2004-01-01 00:00:00');
		                }
		                $.session.set("token", output.token);
		                $.session.set("user", output.nome);
		                $.session.set("email", output.email);

		                window.location.href = 'index.html';
			    	} else {
			    		alert("Falha ao cadastrar usuário");
			    	}
			    }); 
			}
		},
	}
})();

$(document).ready(function(){
	cadastro = new Cadastro();
});