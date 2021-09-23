function Usuarios(){
    this_users = [];
}

Usuarios.prototype.insertUser = function(data){
    this_users.push(data);
    this_users.sort();
}

Usuarios.prototype.removeUser = function(data){
    ans = []
    for(let i = 0;i < this_users.length;i++){
        if(this_users[i].localeCompare(data) != 0)
            ans.push(this_users[i]);
    }
    this_users = ans;
    this_users.sort();
}

Usuarios.prototype.getUsers = function(){
    return this_users;
};

module.exports = function(){
    return Usuarios;
}