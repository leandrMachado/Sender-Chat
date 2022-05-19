window.onload = function() {

    var messages = [];
    var users = [];
    var socket = io.connect('http://localhost:3000');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var inputName = document.getElementById("name");

    inputName.value = socket.id
  

    var addUser = (id , name) =>{
        var user = { id, name }
        users.push(user)
        return { user }
    };

    var getUser = id =>{
        let user = users.find(user => user.id == id )
        return user
    }

    socket.on('connection', (socket)=>{
        console.log(socket.id)
    })

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                if(messages[i].username){
                    html += '<li> <b>' +  messages[i].username + ': </b>' + messages[i].message + '</li>';
                }
                else{
                    html += '<li class="server" <b>' + messages[i].message + '</li>';
                }
            }
            content.innerHTML = html;
            content.scrollTop = content.scrollHeight;
        } else {
            console.log("There is a problem:", data);
        }
    });

    sendButton.onclick = function() {
        addUser(socket.id, inputName.value)
        var text = field.value;
        var user = getUser(socket.id);
        socket.emit('send', { message: text, username: user.name });
        field.value = '';
    };

    field.addEventListener('keypress', function (e) {
	    var key = e.which || e.keyCode;
	    if (key === 13) { 
	    	sendButton.onclick();
    	}
	});
}