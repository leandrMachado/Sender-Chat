const users =  [];

const addUser = (id, name) =>{
    const existingUser = users.find(user => user.name.trim().toLowerCase() === name.trim().toLowerCase());

    if(existingUser) return { error: "Username has already been taken" }

    const user = { id, name }
    users.push(user);
    return { users }
}

const getUser = id =>{
    let user = users.find(user => user.id == id)
    return user;
}

const deleteUser = (id) =>{
    let index = users.findIndex((user) => user.id === id);
    if(index !== -1) return users.splice(index, 1)[0];
}

module.exports = [ addUser, getUser, deleteUser ]