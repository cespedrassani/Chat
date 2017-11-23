var urlBase = 'https://jonasgassen.com/alunos/tesi20172/api.php';
var login;
var cadastro;
var chat;
var util;
var nome_conversa = "";
var email_conversa = "";

function Chat(){
    this.mensagem;
    this.btnEnviar;
    this.contato;
    this.listaContatos = $('.lista-contatos');
    this.nomeRecebe = $('.nome-recebe');
    this.statusRecebe = $('.status-recebe');
    this.avatarRecebe = $('.avatar-recebe');
};

function Login(){
    this.senha = $('.senha');
    this.nome = $('.nome');
}

function Cadastro(){
    this.nome = $('.nome-cadastro');
    this.senha = $('.senha-cadastro');
    this.email = $('.email-cadastro');
    this.login = $('.login-cadastro');
}

function Util(){

}

Chat.prototype = (function(){

    var carregarDadosConversas = function(){
        return {
            token: $.session.get("token"),
            tempo: $.cookie("tempo"),
            opt: 'buscaConversas'
        }
    };

    var carregarDadosMsgEnviada = function(){
        return {
            token: token,
            email: email,
            mensagem: chat.mensagem.val(),
            opt: 'enviarMensagem'
        }
    };

    var buscaMensagensConversa = function(){
        return {
            token: $.session.get("token"),
            email_conversa: email_conversa,
            opt: 'buscaMensagensConversa'
        }
    };

    var abrirConversa = function(nome, email){
        nome_conversa = nome;
        email_conversa = email;
        chat.nomeRecebe.text(nome);
        chat.avatarRecebe.removeClass().addClass("avatar " + nome.charAt(0).toLowerCase());
        chat.statusRecebe.text('Online');
        $.ajax({
            url: ip,
            data: buscaMensagensConversa(),
            dataType: 'json',
            accept: 'application/json',
            type: 'POST',
            crossDomain: true,
        }).done(function(retorno){
            if (data != null && data != undefined) {
                chat.mensagens.empty();
                var html = '';
                $.each(retorno.mensagens, function (key, val) {
                    val.data_hora = new Date(parseInt(val.dh_millis));
                    var dd = val.data_hora.getDate();
                    var mm = val.data_hora.getMonth() + 1;
                    var yyyy = val.data_hora.getFullYear();
                    if (dd < 10) {
                        dd = '0' + dd;
                    }
                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    var data_mensagem = dd + '/' + mm + '/' + yyyy;

                    if (val.nome == '') {
                        html += '<div class="row message-body"><div class="col-sm-12 message-main-sender"><div class="sender"><div class="message-text">' + val.mensagem + '</div><span class="message-time pull-right">' + data_mensagem + '</span></div></div></div>';
                    }
                    else {
                        html += '<div class="row message-body"><div class="col-sm-12 message-main-receiver"><div class="receiver"><div class="message-text">' + val.mensagem + '</div><span class="message-time pull-right">' + data_mensagem + '</span></div></div></div>';
                    }
                });
                chat.mensagens.append(html);
            } else {
                alert("Erro ao buscar mensagens");
            }
        });
    }

    var criarListaDeContatos = function() {
        chat.listaContatos.empty();
        $.ajax({
            url: ip,
            data: carregarDadosConversas(),
            dataType: 'json',
            accept: 'application/json',
            type: 'POST',
            crossDomain: true,
        }).done(function(retorno){
            if (retorno != null) {
                var html = '';
                var classe = '';
                var countConversa = 0;
                var notificacao = '';
                var contador = 1;

                $.each(retorno.users, function (key, val) {
                    if (val.count > 0) {
                        if (contador == 1) {
                            $.cookie('tempo', val.time);
                        }
                        notificacao = '<span class="time-meta pull-right" id="notificacao_' + val.email + '">' + val.count + '</span>';
                        contador++;
                    }
                    classe = val.nome.charAt(0).toLowerCase();
                    html += '<a onclick="abrirConversa(\'' + val.nome + '\',\'' + val.email + '\')"><div class="row sideBar-body"><div class="col-sm-3 col-xs-3 sideBar-avatar"><div class="avatar-icon"><p class="avatar ' + classe + '" id="pessoa"></p></div></div><div class="col-sm-9 col-xs-9 sideBar-main"><div class="row"><div class="col-sm-8 col-xs-8 sideBar-name"><span class="name-meta">' + val.nome + '</span></div><div class="col-sm-4 col-xs-4 pull-right sideBar-time">' + notificacao + '</div></div></div></div></a>';
             
                });
                $('#listContatos').append(html);
            } else {
                alert("Falha ao buscar conversas.");
            }
        });
    };

    return {
        enviarMensagem: function(){
            $.ajax({ 
              url: urlBase,
              data: carregarDadosMsgEnviada(),
              dataType: 'json',
              accept: 'application/json', 
              type: 'POST',
              crossDomain: true,
            }).done(function(retorno){
              if (retorno.nome == null){
                  
                } else {
                  console.log(retorno);
                }
            });
        },

        buscarMensagem: function(){
            $.ajax({ 
              url: urlBase,
              data: carregarDadosMsgRecebida(),
              dataType: 'json',
              accept: 'application/json', 
              type: 'POST',
              crossDomain: true,
            }).done(function(retorno){
              if (retorno.nome == null){
                  alert('Usuário não existe!');
                } else {
                  console.log(retorno);
                }
            }); 
        },

        buscarConversas: function(){
            $.ajax({ 
              url: urlBase,
              data: carregarDadosConversas(),
              dataType: 'json',
              accept: 'application/json', 
              type: 'POST',
              crossDomain: true,
            }).done(function(retorno){
              if (retorno.nome == null){
                  alert('Usuário não existe!');
                } else {
                  console.log(retorno);
                }
            }); 
        },
    }
})();

$(document).ready(function(){
    chat = new Chat();

    if ($.session.get("token") == undefined || $.session.get("token") == null) {
        window.location.href = "login.html";
    }

    var _nome = $.session.get("user");
    $('#avatar').addClass(_nome.charAt(0).toLowerCase());

    chat.criarListaDeContatos();
});