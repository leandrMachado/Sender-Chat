window.onload = () =>{
    var content = document.getElementById('content');

    setTimeout(()=>{
        animation();
        setTimeout(()=>{ window.location.href = 'http://localhost:3000/chat'}, 1000)
    },500);

    function animation(){
        content.style.animation = 'Opening';
        content.style.animationDuration = '2s';
        content.style.animationFillMode = 'both';
    }
}

