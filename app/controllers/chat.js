module.exports.iniciaChat = function(application, req, res){
    var formData = req.body;

    req.assert('apelido', 'Nome ou apelido é obrigatório').notEmpty();
    req.assert('apelido', 'Nome ou apelido deve conter entre 4 a 20 caracteres').len(4,20);
    var erros = req.validationErrors();

    if(erros){
        res.render("index", {validacao : erros})
        return;
    }

    application.get('io').emit('msg4Cliente', {apelido: formData.apelido, complemento:'acabou de entrar no chat'});
    application.get('usuarios').removeUser(formData.apelido);
    application.get('usuarios').insertUser(formData.apelido);
    var usuarios = application.get('usuarios').getUsers();

    res.render("chat", {formData : formData, users:usuarios});
}