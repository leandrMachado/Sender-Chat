window.onload = function() {
    var messages = [];
    var socket = io.connect('http://localhost:3000');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");

    //message listener
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i = 0; i < messages.length; i++){
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

    // button to send message to socket
    sendButton.onclick = () => {
        var text = field.value;
        var user = socket.id;
        socket.emit('send', { message: text, username: user.substr(0, 4) });
        field.value = '';
    };
    // set enter key listener 
    field.addEventListener('keypress', function (e) {
	    var key = e.which || e.keyCode;
	    if (key === 13) { 
	    	sendButton.onclick();
    	}
	});
}