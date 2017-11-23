Login.prototype = (function() {
  var verificarInfos = function(){
    if (util.isBlank(login.senha.val())){
      alert('Senha está vazia.');
      return false;
    }

    if (util.isBlank(login.nome.val())){
      alert('Nome está vazio.');
      return false;
    }
    return true;
  };

  var carregarDadosLogin = function(){
    return {
      senha: login.senha.val(),
      login: login.nome.val(),
      opt: 'logUser'
    }
  };

  return {
    constructor: Login,

    efetuarLogin: function(){
      if(verificarInfos()){
        $.ajax({ 
          url: urlBase,
          data: carregarDadosLogin(),
          dataType: 'json',
          accept: 'application/json', 
          type: 'POST',
          crossDomain: true,
        }).done(function(retorno){
          if (retorno.token == null){
            alert('Login ou senha incorretos!');
          } else {
            $.session.set("token", output.token);
            $.session.set("user", output.nome);
            $.session.set("email", output.email);
            window.location.href = "index.html";
          }
        }); 
      }
    },

    ajaxEfetuarLogoff: function(){

    },

  }

})();

$(document).ready(function(){
  login = new Login();
});