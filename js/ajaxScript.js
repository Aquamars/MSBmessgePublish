function Submit() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            alert(xhttp.responseText);
        }
    };
    var data = new FormData();
    var acnt = $('#acnt').val();
    var pwd = $('#pwd').val();
    var title = $('#title').val();
    title = "<b>"+title+"</b>";
    var msg = $('#message').val();
    msg = msg.replace(/\n/g, "<br>");
    data.append('account', acnt);
    data.append('password', pwd);
    data.append('title', title);
    data.append('message', msg);
    xhttp.open("POST", "/church/pgConnect.php", true);
    xhttp.send(data);
    
}
